import {cookieManager} from "@/entrypoints/jobs.content/services/CookieManager";
import {buildCompanyProfileUrl} from "@/entrypoints/jobs.content/utils/urlUtils";
import companyInfoParser, {ParsedCompanyInfo} from "@/entrypoints/jobs.content/parsers/companyInfoParser";
import jobListTableParser, {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";

export class CompanyService {
    getLocal(): string {
        return cookieManager.getCookie('locale') as string;
    }

    async fetchCompanyById(companyId: string, locale?: string): Promise<{companyInfo: ParsedCompanyInfo, companyJobs: ParsedJobRow[]}> {
        try {
            const response = await fetch(buildCompanyProfileUrl(companyId, locale || this.getLocal()));
            const rawHtml = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(rawHtml, 'text/html');

            const companyInfo = companyInfoParser(doc);
            const companyJobs = jobListTableParser(doc);

            return {
                companyInfo,
                companyJobs,
            }
        } catch (error) {
            console.error(`Error fetching company with ID ${companyId}:`, error);
            throw error;
        }
    }
}

export const companyService = new CompanyService();
