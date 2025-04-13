export interface ParsedCompanyInfo {
    name: string;
    logoUrl?: string;
    description?: string;
};

export default function companyInfoParser(page: Document): ParsedCompanyInfo {
    const contentDiv = page.querySelector('.content');
    if (!contentDiv) return { name: '' };

    const tableData = Array.from(contentDiv.querySelector('table')?.querySelectorAll('tbody tr td') || []);

    return {
        name: contentDiv.querySelector('h1')?.textContent?.trim() || '',
        logoUrl: tableData.find(td => td.querySelector('img'))?.querySelector('img')?.getAttribute('src') ?? undefined,
        description: tableData.find(td => td.querySelector('p'))?.querySelector('p')?.textContent?.trim()
    };
}