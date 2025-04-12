import { computed, Ref} from "vue";
import bulletListExtractor from "@/entrypoints/jobs.content/utils/bulletListExtractor";
import {ParsedJobView} from "@/entrypoints/jobs.content/parsers/jobviewPageParser";

export function useBulletListExtractor(jobDescriptionRef: Ref<ParsedJobView>) {
    const reachDescription = computed(() => {
        const description = jobDescriptionRef.value.description;
        const extractedSections = bulletListExtractor(description);

        // If no sections found, return a simple text wrapper
        if (!extractedSections.length) {
            return [{ type: 'text', content: description }];
        }

        // Create segments array with properly typed items
        const segments = [];
        let currentPosition = 0;

        extractedSections.forEach((section) => {
            // Add text before the current section if any
            const textBefore = description.slice(currentPosition, section.start);
            if (textBefore) {
                segments.push({ type: 'text', content: textBefore });
            }

            // Add component for the section with a clear type
            segments.push({
                type: 'component',
                props: {
                    header: section.header,
                    body: section.body
                }
            });

            // Update position tracker
            currentPosition = section.end;
        });

        // Add any remaining text after the last section
        const textAfter = description.slice(currentPosition);
        if (textAfter) {
            segments.push({ type: 'text', content: textAfter });
        }

        return segments;
    });

    return {
        reachDescription
    };
}