import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {usePagePropsStore} from "@/entrypoints/jobs.content/stores/pagePropsStore";
import {jobService} from "@/entrypoints/jobs.content/services/JobService";
import {JOBS} from "@/entrypoints/jobs.content/router";
import {JobViewPageSymbol} from "@/entrypoints/jobs.content/pages/JobViewPage.vue";
import {JobsPageSymbol} from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import {CompanyPageProps, CompanyPageSymbol} from "@/entrypoints/jobs.content/pages/CompanyPage.vue";
import {companyService} from "@/entrypoints/jobs.content/services/CompanyService";

export const provideJobsPageProps = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    try {
        const pagePropsStore = usePagePropsStore();
        const jobList = await jobService.fetchJobList();
        pagePropsStore.setPageProps(JobsPageSymbol, { jobList });
        next();
    } catch (e) {
        console.error('Error in provideJobsPageProps:', e);
    }
};

export const provideJobViewPageProps = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    try {
        const jobId = to.params.jobId as string;
        const pagePropsStore = usePagePropsStore();
        const jobDescription = await jobService.fetchJobById(jobId);
        pagePropsStore.setPageProps(JobViewPageSymbol, {jobDescription});

        next();
    } catch (e) {
        console.error('Error in provideJobViewPageProps:', e);
        next({ name: JOBS });
    }
};

export const provideCompanyPageProps = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    try {
        const companyId = to.params.companyId as string;
        const pagePropsStore = usePagePropsStore();

        const companyPageProps: CompanyPageProps = await companyService.fetchCompanyById(companyId)
        pagePropsStore.setPageProps(CompanyPageSymbol, companyPageProps);

        next();
    } catch (e) {
        console.error('Error in provideCompanyPageProps:', e);
        next({ name: JOBS });
    }
};