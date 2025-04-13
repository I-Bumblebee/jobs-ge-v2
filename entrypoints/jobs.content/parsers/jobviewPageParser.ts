import {JobDates, parseDate} from "@/entrypoints/jobs.content/parsers/jobDatesParser"

export interface ParsedJobView {
    id: string;
    title: string;
    location: string | null;
    company: {
        id: string | null;
        name: string;
    };
    isFavorite: boolean;
    dates: JobDates;
    description: string;
}

const parseJobDescriptionFromJobDiv = (jobDiv: HTMLDivElement): ParsedJobView => {
    const titleSpan = jobDiv.querySelector('span');
    const title = titleSpan ? titleSpan.textContent?.trim() || '' : '';

    const italicElement = titleSpan?.querySelector('i');
    const location = italicElement ? italicElement.textContent?.trim().replace(/^-\s*/, '') || null : null;

    const starIcon = jobDiv.querySelector('img') as HTMLImageElement;
    const isFavorite = !starIcon.src.includes('unstar');
    const jobId = starIcon.getAttribute('id') as string;

    const tables = jobDiv.querySelectorAll('table');
    if (tables.length < 2) {
        console.error('Required tables not found');
    }

    const dtable = Array.from(tables).find(table => table.classList.contains('dtable')) || tables[1];
    const tableRows = dtable.querySelectorAll('tr');

    if (tableRows.length < 4) {
        console.error('Required table rows not found');
    }

    const companyRow = tableRows[1];
    const anchor = companyRow.querySelector('a');
    const companyId = anchor?.getAttribute('href')?.match(/client=([^&]+)/)?.[1] || null;
    const companyName = (anchor || companyRow.querySelector('b'))?.textContent?.trim() || '';

    const dateRow = tableRows[2];
    const dateTags = dateRow.querySelectorAll('b');

    let releaseDate = null;
    let deadline = null;

    if (dateTags.length >= 2) {
        releaseDate = parseDate(dateTags[0].textContent || '');
        deadline = parseDate(dateTags[1].textContent || '');
    }

    const descriptionRow = tableRows[3];
    const descriptionCell = descriptionRow.querySelector('td');
    const description = descriptionCell ? descriptionCell.innerHTML || '' : '';

    return {
        id: jobId,
        title,
        location,
        company: {
            id: companyId,
            name: companyName
        },
        isFavorite,
        dates: {
            published: releaseDate,
            deadline
        },
        description
    };
}

export function shouldRefetchJobView(description: string, jobId: string): string | null {
    const doc = new DOMParser().parseFromString(description, 'text/html');
    const link = Array.from(doc.querySelectorAll('a')).find(a => {
        const href = a.getAttribute('href');
        const match = href?.match(/^\/([a-z]{2})\/ads\/\?view=jobs&id=(\d+)$/);
        return match?.[2] === jobId;
    });

    return link
        ? link.getAttribute('href')!.match(/^\/([a-z]{2})\//)![1]
        : null;
}


export default function jobViewPageParser(page: Document): ParsedJobView {
    const jobDiv = page.getElementById('job') as HTMLDivElement;
    return parseJobDescriptionFromJobDiv(jobDiv)
}
