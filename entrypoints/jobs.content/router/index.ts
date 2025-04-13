import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "@/entrypoints/jobs.content/pages/HomePage.vue";
import JobsPage from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import { HOME, JOBS, JOB_VIEW_IN_LIST, JOB_VIEW } from "@/entrypoints/jobs.content/constants/pageNames";
import JobViewPage from "@/entrypoints/jobs.content/pages/JobViewPage.vue";
import { usePagePropsStore } from "@/entrypoints/jobs.content/stores/pagePropsStore";
import { fetchJobListMiddleware, fetchJobByIdMiddleware } from "@/entrypoints/jobs.content/router/routeMiddleware";
import JobViewLayout from "@/entrypoints/jobs.content/layouts/JobViewLayout.vue";

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
        beforeEnter: fetchJobListMiddleware,
        props: () => usePagePropsStore().getPageProps(JOBS),
        children: [
            {
                path: ":id",
                name: JOB_VIEW_IN_LIST,
                component: JobViewPage,
                beforeEnter: fetchJobByIdMiddleware,
                props: () => usePagePropsStore().getPageProps(JOB_VIEW)
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
                        beforeEnter: fetchJobByIdMiddleware,
                        props: () => usePagePropsStore().getPageProps(JOB_VIEW)
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