import jobListTableParser, {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";
import jobViewPageParser, {ParsedJobView} from "@/entrypoints/jobs.content/parsers/jobviewPageParser";
import {cookieManager} from "@/entrypoints/jobs.content/services/CookieManager";

export class JobService {
    getLocal(): string {
        return cookieManager.getCookie('locale') as string;
    }

    async fetchJobList(): Promise<ParsedJobRow[]> {
        try {
            const response = await fetch(`https://jobs.ge/${this.getLocal()}`);
            const rawHtml = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(rawHtml, 'text/html');
            return jobListTableParser(doc);
        } catch (error) {
            console.error('Error fetching job list:', error);
            throw error;
        }
    }

    async fetchJobById(jobId: string): Promise<ParsedJobView> {
        try {
            const response = await fetch(`https://jobs.ge/${this.getLocal()}/?view=jobs&id=${jobId}`);
            const rawHtml = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(rawHtml, 'text/html');
            return jobViewPageParser(doc);
        } catch (error) {
            console.error(`Error fetching job with ID ${jobId}:`, error);
            throw error;
        }
    }
}

export const jobService = new JobService();
