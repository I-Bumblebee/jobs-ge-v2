import {JobDates, parseDate} from "@/entrypoints/jobs.content/parsers/jobDatesParser";

interface JobMetadata {
    isFavorite: boolean;
    isExpiring: boolean;
    wasRecentlyUpdated: boolean;
    hasSalaryInfo: boolean;
    isNew: boolean;
    isInRegion: boolean;
}

interface JobCompany {
    name: string;
    jobsUrl: string;
    logoSrc: string;
}

export interface ParsedJobRow {
    id: string | null;
    title: string;
    location: string;
    metadata: JobMetadata;
    company: JobCompany;
    dates: JobDates;
}

const parseJobListTableRow = (row: HTMLTableRowElement): ParsedJobRow => {
    const starCell = row.querySelector("td:nth-child(1)");
    const starIcon = starCell?.querySelector("img") as HTMLImageElement;
    const isFavorite = starIcon ? !starIcon.src.includes("unstar") : false;

    const titleCell = row.querySelector("td:nth-child(2)");
    const jobLink = titleCell?.querySelector("a") as HTMLAnchorElement | null;
    const jobTitle = jobLink ? jobLink.textContent?.trim() ?? "" : "";
    const jobId = jobLink ? jobLink.href.match(/id=(\d+)/)?.[1] ?? null : null;

    const locationElement = titleCell?.querySelector("i");
    const location = locationElement ? locationElement.textContent?.trim() ?? "" : "";

    const metadataImages = Array.from(titleCell?.querySelectorAll("img") ?? [])
        .map((img: HTMLImageElement) => img.src);
    const metadata: JobMetadata = {
        isFavorite: isFavorite,
        isExpiring: metadataImages.some((src) => src.includes("exp")),
        wasRecentlyUpdated: metadataImages.some((src) => src.includes("upd")),
        hasSalaryInfo: metadataImages.some((src) => src.includes("salary")),
        isNew: metadataImages.some((src) => src.includes("new")),
        isInRegion: metadataImages.some((src) => src.includes("reg")),
    };

    const companyLogoCell = row.querySelector("td:nth-child(3)");
    const companyLogoLink = companyLogoCell?.querySelector("a");
    const companyLogoSrc = companyLogoLink?.querySelector("img")
        ? (companyLogoLink.querySelector("img") as HTMLImageElement).src
        : "";

    const companyCell = row.querySelector("td:nth-child(4)");
    const companyLink = companyCell?.querySelector("a") as HTMLAnchorElement | null;
    const companyName = companyLink ? companyLink.textContent?.trim() ?? "" : "";
    const companyJobsUrl = companyLink ? companyLink.href : "";

    const publishDateCell = row.querySelector("td:nth-child(5)");
    const deadlineDateCell = row.querySelector("td:nth-child(6)");
    const publishDateStr = publishDateCell
        ? publishDateCell.textContent?.trim() ?? ""
        : "";
    const deadlineDateStr = deadlineDateCell
        ? deadlineDateCell.textContent?.trim() ?? ""
        : "";

    return {
        id: jobId,
        title: jobTitle,
        location,
        metadata,
        company: {
            name: companyName,
            jobsUrl: companyJobsUrl,
            logoSrc: companyLogoSrc,
        },
        dates: {
            published: parseDate(publishDateStr),
            deadline: parseDate(deadlineDateStr),
        },
    };
}

export default function jobListTableParser(page: Document): ParsedJobRow[] {
    const jobTable = page.getElementById("job_list_table") as HTMLTableElement;
    const rows = jobTable.rows;

    const results = [];

    for (let i = 1; i < rows.length; i++) {
        const parsedRow = parseJobListTableRow(rows[i]);
        results.push(parsedRow);
    }

    return results;
}
