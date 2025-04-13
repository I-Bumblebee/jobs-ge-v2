import {createRouter, createWebHashHistory, type RouteRecordRaw} from "vue-router";
import HomePage from "@/entrypoints/jobs.content/pages/HomePage.vue";
import JobsPage, {JobsPageSymbol} from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import JobViewPage, {JobViewPageSymbol} from "@/entrypoints/jobs.content/pages/JobViewPage.vue";
import {usePagePropsStore} from "@/entrypoints/jobs.content/stores/pagePropsStore";
import {provideJobViewPageProps, provideJobsPageProps} from "@/entrypoints/jobs.content/router/routeMiddleware";
import JobViewLayout from "@/entrypoints/jobs.content/layouts/JobViewLayout.vue";

export const HOME = 'Home';
export const JOBS = 'Jobs';
export const JOB_VIEW_IN_LIST = 'JobsViewInList';
export const JOB_VIEW = 'JobView';

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
        beforeEnter: provideJobsPageProps,
        props: () => usePagePropsStore().getPageProps(JobsPageSymbol),
        children: [
            {
                path: ":id",
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
                path: ":id",
                name: JOB_VIEW,
                component: JobViewLayout,
                children: [
                    {
                        path: "",
                        component: JobViewPage,
                        beforeEnter: provideJobViewPageProps,
                        props: () => usePagePropsStore().getPageProps(JobViewPageSymbol)
                    }
                ]
            }
        ]
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;