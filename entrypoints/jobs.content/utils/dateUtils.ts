import {cookieManager} from "@/entrypoints/jobs.content/services/CookieManager";

/**
 * Language options for date formatting
 */
export type Language = 'en' | 'ka';

/**
 * Possible return strings for publish date formatting
 */
export type PublishTimeTextResult = string;

/**
 * Possible return strings for deadline formatting
 */
export type DeadlineTextResult = string | null;

/**
 * Translation dictionary for all text strings
 */
const translations = {
    en: {
        noPublishDate: 'No publish date',
        publishedToday: 'Published today',
        publishedYesterday: 'Published yesterday',
        publishedDaysAgo: (days: number) => `Published ${days} days ago`,

        deadlinePassed: 'Deadline passed',
        deadlineToday: 'Deadline is today',
        deadlineTomorrow: 'Deadline is tomorrow',
        deadlineInDays: (days: number) => `Deadline in ${days} days`
    },
    ka: {
        noPublishDate: 'გამოქვეყნების თარიღი არ არის',
        publishedToday: 'გამოქვეყნდა დღეს',
        publishedYesterday: 'გამოქვეყნდა გუშინ',
        publishedDaysAgo: (days: number) => `გამოქვეყნდა ${days} დღის წინ`,

        deadlinePassed: 'ვადა ამოიწურა',
        deadlineToday: 'ვადა დღეს იწურება',
        deadlineTomorrow: 'ვადა ხვალ იწურება',
        deadlineInDays: (days: number) => `ვადა ${days} დღეში იწურება`
    }
};

/**
 * Get user's preferred language from cookie or use default
 * @returns The language code ('en' or 'ka')
 */
export function getUserLanguage(): Language {
    return (cookieManager.getCookie('locale') as Language) || 'ka';
}

/**
 * Formats a publish date into a human-readable relative time string
 * @param publishDate - The date when the job was published (Date object, timestamp, or ISO string)
 * @param language - Language code ('en' or 'ka'), defaults to user's preference from cookie
 * @returns A formatted string indicating when the job was published relative to today
 */
export function getPublishTimeText(
    publishDate: Date | number | string | null | undefined,
    language: Language = getUserLanguage()
): PublishTimeTextResult {
    const text = translations[language];

    if (!publishDate) return text.noPublishDate;

    const today: Date = new Date();
    const published: Date = new Date(publishDate);
    const daysSincePublish: number = Math.floor(
        (today.getTime() - published.getTime()) / (1000 * 60 * 60 * 24)
    );

    switch (daysSincePublish) {
        case 0: return text.publishedToday;
        case 1: return text.publishedYesterday;
        default: return text.publishedDaysAgo(daysSincePublish);
    }
}

/**
 * Formats a deadline date into a human-readable relative time string
 * @param deadlineDate - The deadline date for the job (Date object, timestamp, or ISO string)
 * @param language - Language code ('en' or 'ka'), defaults to user's preference from cookie
 * @returns A formatted string indicating the deadline status relative to today, or null if no deadline exists
 */
export function getDeadlineText(
    deadlineDate: Date | number | string | null | undefined,
    language: Language = getUserLanguage()
): DeadlineTextResult {
    if (!deadlineDate) return null;

    const text = translations[language];
    const today: Date = new Date();
    const deadline: Date = new Date(deadlineDate);
    const daysUntilDeadline: number = Math.floor(
        (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline < 0) return text.deadlinePassed;

    switch (daysUntilDeadline) {
        case 0: return text.deadlineToday;
        case 1: return text.deadlineTomorrow;
        default: return text.deadlineInDays(daysUntilDeadline);
    }
}