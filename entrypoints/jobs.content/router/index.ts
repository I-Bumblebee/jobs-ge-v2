import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "@/entrypoints/jobs.content/pages/HomePage.vue";
import TestPage from "@/entrypoints/jobs.content/pages/TestPage.vue";
import {HOME, TEST} from "@/entrypoints/jobs.content/constants/pageNames";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: HOME,
        component: HomePage,
    },
    {
        path: "/test",
        name: TEST,
        component: TestPage,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
