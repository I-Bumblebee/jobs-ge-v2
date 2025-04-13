import { h } from 'vue';
import BulletListCard from "@/entrypoints/jobs.content/components/BulletListCard.vue";
import { ContentTransformer, TransformerSegment } from "@/entrypoints/jobs.content/composables/useJobDescriptionTransformer";

export class BulletListTransformer implements ContentTransformer {
    transform(html: string): TransformerSegment[] {
        const headerPattern = /<br>\s*([^<*]+?)\s*<br>\s*<br>(?=\s*\*\*)/g;
        const bulletPattern = /\*\*\s*([\s\S]*?)(?=<br>|$)/g;

        const headers = [...html.matchAll(headerPattern)].map(m => ({
            text: m[1].trim(),
            position: m.index!,
            end: m.index! + m[0].length
        }));

        return headers.map((head, i) => {
            const next = headers[i + 1]?.position ?? html.length;
            const section = html.slice(head.end, next);
            const body = [...section.matchAll(bulletPattern)].map(m => m[1].trim());

            return {
                start: head.position,
                end: next,
                render: () => h(BulletListCard, { header: head.text, body })
            };
        });
    }
}