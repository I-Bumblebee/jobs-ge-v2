import { Component, ComputedRef, h } from "vue";
import { BulletListTransformer } from "@/entrypoints/jobs.content/services/transformers/BulletListTransformer";
import { ParsedJobView } from "@/entrypoints/jobs.content/parsers/jobviewPageParser";

export interface ContentTransformer {
    transform(html: string): TransformerSegment[];
}

export interface TransformerSegment {
    start: number;
    end: number;
    render: () => Component;
}

const HtmlContent = {
    props: ['html'],
    setup(props: {html: string}) {
        return () => h('div', { innerHTML: props.html });
    }
};

export function useJobDescriptionTransformer(jobDescriptionRef: Ref<ParsedJobView>) {
    const transformers: ContentTransformer[] = [
        new BulletListTransformer(),
    ];

    const formattedDescriptionChunks: ComputedRef<Component[]> = computed(() => {
        const html = jobDescriptionRef.value.description;

        const allSegments = transformers.flatMap(t => t.transform(html));

        const sortedSegments = allSegments.sort((a, b) => a.start - b.start);

        const finalComponents: Component[] = [];
        let lastPosition = 0;

        for (const segment of sortedSegments) {
            if (segment.start > lastPosition) {
                const textContent = html.slice(lastPosition, segment.start);
                finalComponents.push(h(HtmlContent, { html: textContent }));
            }

            finalComponents.push(segment.render());

            lastPosition = segment.end;
        }

        if (lastPosition < html.length) {
            const textContent = html.slice(lastPosition);
            finalComponents.push(h(HtmlContent, { html: textContent }));
        }

        return finalComponents;
    });

    return {
        formattedDescriptionChunks
    };
}