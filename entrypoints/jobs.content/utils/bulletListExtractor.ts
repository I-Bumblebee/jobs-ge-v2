export default function bulletListExtractor(html: string) {
    console.log(html)
    const headerPattern = /<br>\s*([^<*]+?)\s*<br>\s*<br>(?=\s*\*\*)/g;
    const bulletPattern = /\*\*\s*([\s\S]*?)(?=<br>|$)/g;

    const headers = [...html.matchAll(headerPattern)].map(m => ({
        text: m[1].trim(),
        position: m.index,
        end: m.index + m[0].length
    }));

    return headers.map((h, i) => {
        const next = headers[i + 1]?.position ?? html.length;
        const section = html.slice(h.end, next);
        const body = [...section.matchAll(bulletPattern)].map(m => m[1].trim());

        return {
            header: h.text,
            body,
            start: h.position,
            end: next
        };
    });
}