export interface JobDates {
    published: Date | null;
    deadline: Date | null;
}

export const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;

    const georgianMonths = [
        "იანვარი",
        "თებერვალი",
        "მარტი",
        "აპრილი",
        "მაისი",
        "ივნისი",
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
