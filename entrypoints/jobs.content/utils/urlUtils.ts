export const getBaseDomain = (): string => {
    if (typeof window !== 'undefined') {
        const { protocol, hostname } = window.location;

        if (hostname.includes('jobs.ge')) {
            return `${protocol}//${hostname}`;
        }
    }

    return 'https://www.jobs.ge';
};


export const buildJobListUrl = (locale: string = 'ge'): string =>
    `${getBaseDomain()}/${locale}`;


export const buildJobViewUrl = (jobId: string, locale: string = 'ge'): string =>
    `${getBaseDomain()}/${locale}/?view=jobs&id=${jobId}`;


export const buildCompanyProfileUrl = (companyId: string, locale: string = 'ge'): string =>
    `${getBaseDomain()}/${locale}/?view=client&client=${companyId}`;