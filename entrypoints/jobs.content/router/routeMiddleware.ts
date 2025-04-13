import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {usePagePropsStore} from "@/entrypoints/jobs.content/stores/pagePropsStore";
import {jobService} from "@/entrypoints/jobs.content/services/JobService";
import {HOME, JOBS} from "@/entrypoints/jobs.content/router";
import {JobViewPageSymbol} from "@/entrypoints/jobs.content/pages/JobViewPage.vue";
import {JobsPageSymbol} from "@/entrypoints/jobs.content/pages/JobsPage.vue";

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
        console.error('Error in fetchJobListMiddleware:', e);
        next({ name: HOME });
    }
};

export const provideJobViewPageProps = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    try {
        const jobId = to.params.id as string;
        const pagePropsStore = usePagePropsStore();
        const jobDescription = await jobService.fetchJobById(jobId);
        pagePropsStore.setPageProps(JobViewPageSymbol, {jobDescription});

        next();
    } catch (e) {
        console.error('Error in fetchJobByIdMiddleware:', e);
        next({ name: JOBS });
    }
};