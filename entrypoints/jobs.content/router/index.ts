import {createRouter, createWebHashHistory, type RouteRecordRaw} from "vue-router";
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

export const JOBS = 'Jobs';
export const JOB_VIEW_IN_LIST = 'JobsViewInList';
export const JOB_VIEW = 'JobView';
export const COMPANY_PAGE = 'CompanyPage';
export const COMPANY_JOB_VIEW = 'CompanyJobView';


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: {name: JOBS},
    },
    {
        path: "/jobs",
        name: JOBS,
        component: JobsPage,
        beforeEnter: provideJobsPageProps,
        props: () => usePagePropsStore().getPageProps(JobsPageSymbol),
        children: [
            {
                path: ":jobId",
                name: JOB_VIEW_IN_LIST,
                component: JobViewPage,
                beforeEnter: provideJobViewPageProps,
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
                        beforeEnter: provideJobViewPageProps,
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
        beforeEnter: provideCompanyPageProps,
        props: () => usePagePropsStore().getPageProps(CompanyPageSymbol),
        children: [
            {
                path: ":jobId",
                name: COMPANY_JOB_VIEW,
                component: JobViewPage,
                beforeEnter: provideJobViewPageProps,
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