import {
    createRouter,
    createWebHashHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    type RouteRecordRaw
} from "vue-router";
import HomePage from "@/entrypoints/jobs.content/pages/HomePage.vue";
import JobsPage, {JobsPageSymbol} from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import JobViewPage, {JobViewPageSymbol} from "@/entrypoints/jobs.content/pages/JobViewPage.vue";
import CompanyPage, {CompanyPageSymbol} from "@/entrypoints/jobs.content/pages/CompanyPage.vue";
import {usePagePropsStore} from "@/entrypoints/jobs.content/stores/pagePropsStore";
import {
    provideCompanyPageProps,
    provideJobsPageProps,
    provideJobViewPageProps
} from "@/entrypoints/jobs.content/router/routeMiddleware";
import JobViewLayout from "@/entrypoints/jobs.content/layouts/JobViewLayout.vue";

export const HOME = 'Home';
export const JOBS = 'Jobs';
export const JOB_VIEW_IN_LIST = 'JobsViewInList';
export const JOB_VIEW = 'JobView';
export const COMPANY_PAGE = 'CompanyPage';
export const COMPANY_JOB_VIEW = 'CompanyJobView';

const JOBS_PAGE_MIDDLEWARE = [
    provideJobsPageProps,
    async function (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) {
        if (to.name === JOBS) {
            const pagePropsStore = usePagePropsStore();
            const jobsPageProps = pagePropsStore.getPageProps(JobsPageSymbol);

            const firstJobId = jobsPageProps.jobList[0].id;

            return next({
                name: JOB_VIEW_IN_LIST,
                params: {jobId: firstJobId}
            });
        }

        next();
    }
];

const COMPANY_PAGE_MIDDLEWARE = [
    provideCompanyPageProps,
    async function (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) {
        if (to.name === COMPANY_PAGE) {
            const pagePropsStore = usePagePropsStore();
            const companyProps = pagePropsStore.getPageProps(CompanyPageSymbol);

            const firstJobId = companyProps.companyJobs[0].id;

            return next({
                name: COMPANY_JOB_VIEW,
                params: {jobId: firstJobId, companyId: to.params.companyId}
            });
        }

        next();
    }
];


const JOB_VIEW_MIDDLEWARE = [
    provideJobViewPageProps
];

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: HOME,
        component: HomePage,
    },
    {
        path: "/jobs",
        name: JOBS,
        component: JobsPage,
        beforeEnter: JOBS_PAGE_MIDDLEWARE,
        props: () => usePagePropsStore().getPageProps(JobsPageSymbol),
        children: [
            {
                path: ":jobId",
                name: JOB_VIEW_IN_LIST,
                component: JobViewPage,
                beforeEnter: JOB_VIEW_MIDDLEWARE,
                props: () => usePagePropsStore().getPageProps(JobViewPageSymbol)
            }
        ]
    },
    {
        path: "/job",
        children: [
            {
                path: ":jobId",
                component: JobViewLayout,
                children: [
                    {
                        name: JOB_VIEW,
                        path: "",
                        component: JobViewPage,
                        beforeEnter: JOB_VIEW_MIDDLEWARE,
                        props: () => usePagePropsStore().getPageProps(JobViewPageSymbol)
                    }
                ]
            }
        ]
    },
    {
        path: '/company/:companyId/jobs',
        name: COMPANY_PAGE,
        component: CompanyPage,
        beforeEnter: COMPANY_PAGE_MIDDLEWARE,
        props: () => usePagePropsStore().getPageProps(CompanyPageSymbol),
        children: [
            {
                path: ":jobId",
                name: COMPANY_JOB_VIEW,
                component: JobViewPage,
                beforeEnter: JOB_VIEW_MIDDLEWARE,
                props: () => usePagePropsStore().getPageProps(JobViewPageSymbol)
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;