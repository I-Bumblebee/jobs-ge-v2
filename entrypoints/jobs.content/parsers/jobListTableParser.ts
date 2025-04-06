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

interface JobDates {
    published: Date | null;
    deadline: Date | null;
}

export interface ParsedJobRow {
    id: string | null;
    title: string;
    location: string;
    metadata: JobMetadata;
    company: JobCompany;
    dates: JobDates;
}

export interface JobDescription {
    title: string;
    isFavorite: boolean;
    releaseDate: Date | null;
    deadline: Date | null;
    description: string;
}

const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;

    const georgianMonths = [
        "იანვარი",
        "თებერვალი",
        "მარტი",
        "აპრილი",
        "მაისი",
        "ინვისი",
        "ივლისი",
        "აგვისტო",
        "სექტემბერი",
        "ოქტომბერი",
        "ნოემბერი",
        "დეკემბერი",
    ];

    const englishMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const parts = dateStr.trim().split(" ");

    if (parts.length < 2) return null;

    const day = parseInt(parts[0], 10);
    const monthStr = parts[1];

    const currentYear = new Date().getFullYear();

    let month = georgianMonths.indexOf(monthStr);

    if (month === -1) {
        month = englishMonths.indexOf(monthStr);
    }

    if (month === -1) return null;

    return new Date(currentYear, month, day);
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
