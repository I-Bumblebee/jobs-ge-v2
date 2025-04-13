export const buildJobListUrl = (locale: string = 'ge') =>
    `https://jobs.ge/${locale}`;

export const buildJobViewUrl = (jobId: string, locale: string = 'ge') =>
    `https://jobs.ge/${locale}/?view=jobs&id=${jobId}`;

export const buildCompanyProfileUrl = (companyId: string, locale: string = 'ge') =>
    `https://jobs.ge/${locale}/?view=client&client=${companyId}`;