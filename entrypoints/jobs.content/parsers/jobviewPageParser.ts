import {JobDates, parseDate} from "@/entrypoints/jobs.content/parsers/jobDatesParser"

export interface ParsedJobView {
    title: string;
    isFavorite: boolean;
    dates: JobDates;
    description: string;
}

const parseJobDescriptionFromJobDiv = (jobDiv: HTMLDivElement): ParsedJobView => {
    const titleSpan = jobDiv.querySelector('span');
    const title = titleSpan ? titleSpan.textContent?.trim() || '' : '';

    const starIcon = jobDiv.querySelector('img');
    const isFavorite = starIcon ? !starIcon.src.includes('unstar') : false;

    const tables = jobDiv.querySelectorAll('table');
    if (tables.length < 2) {
        console.error('Required tables not found');
    }

    const dtable = Array.from(tables).find(table => table.classList.contains('dtable')) || tables[1];
    const tableRows = dtable.querySelectorAll('tr');

    if (tableRows.length < 4) {
        console.error('Required table rows not found');
    }

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
        title,
        isFavorite,
        dates: {
            published: releaseDate,
            deadline
        },
        description
    };
}

export default function jobViewPageParser(page: Document): ParsedJobView {
    const jobDiv = page.getElementById('job') as HTMLDivElement;
    return parseJobDescriptionFromJobDiv(jobDiv)
}
