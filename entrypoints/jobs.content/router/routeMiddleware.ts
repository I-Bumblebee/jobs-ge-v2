import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { usePagePropsStore } from "@/entrypoints/jobs.content/stores/pagePropsStore";
// import { jobService } from "@/entrypoints/jobs.content/services/JobService";
import { jobService } from "@/entrypoints/jobs.content/services/MockJobService";
import { JOBS, JOBS_SUB } from "@/entrypoints/jobs.content/constants/pageNames";

export const fetchJobListMiddleware = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    try {
        const pagePropsStore = usePagePropsStore();
        const jobList = await jobService.fetchJobList();
        pagePropsStore.setPageProps(JOBS, { jobList });
        next();
    } catch (e) {
        console.error('Error in fetchJobListMiddleware:', e);
        next({ name: JOBS });
    }
};

export const fetchJobByIdMiddleware = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    try {
        const jobId = to.params.id as string;
        const pagePropsStore = usePagePropsStore();
        const jobDescription = await jobService.fetchJobById(jobId);
        pagePropsStore.setPageProps(JOBS_SUB, { jobDescription });
        next();
    } catch (e) {
        console.error('Error in fetchJobByIdMiddleware:', e);
        next({ name: JOBS });
    }
};