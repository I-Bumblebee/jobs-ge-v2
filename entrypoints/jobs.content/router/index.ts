import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "@/entrypoints/jobs.content/pages/HomePage.vue";
import JobsPage from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import { HOME, JOBS, JOBS_SUB } from "@/entrypoints/jobs.content/constants/pageNames";
import SubPage from "@/entrypoints/jobs.content/pages/SubPage.vue";
import { usePagePropsStore } from "@/entrypoints/jobs.content/stores/pagePropsStore";
import { fetchJobListMiddleware, fetchJobByIdMiddleware } from "@/entrypoints/jobs.content/router/routeMiddleware";

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
                name: JOBS_SUB,
                component: SubPage,
                beforeEnter: fetchJobByIdMiddleware,
                props: () => usePagePropsStore().getPageProps(JOBS_SUB)
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;