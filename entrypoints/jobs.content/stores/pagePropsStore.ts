import {defineStore} from 'pinia'
import {HOME, PageName, JOBS, JOB_VIEW_IN_LIST, JOB_VIEW} from '@/entrypoints/jobs.content/constants/pageNames'
import {JobsPageProps} from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import {JobViewPageProps} from "@/entrypoints/jobs.content/pages/JobViewPage.vue";
import {HomePageProps} from "@/entrypoints/jobs.content/pages/HomePage.vue";

type PagePropsMap = {
    [JOBS]: JobsPageProps
    [JOB_VIEW_IN_LIST]: JobViewPageProps
    [JOB_VIEW]: JobViewPageProps
    [HOME]: HomePageProps
}

interface PagePropsState {
    commonData: string
    pageProps: Partial<PagePropsMap>
}

export const usePagePropsStore = defineStore('pageProps', {
    state: (): PagePropsState => ({
        commonData: '',
        pageProps: {}
    }),

    actions: {
        setPageProps<K extends PageName>(
            pageName: K,
            props: PagePropsMap[K]
        ) {
            this.pageProps[pageName] = props;
        },

        clearPageData(pageName: PageName) {
            delete this.pageProps[pageName];
        }
    },

    getters: {
        getPageProps: (state) => <K extends PageName>(pageName: K): PagePropsMap[K] => {
            return state.pageProps[pageName] as PagePropsMap[K]
        }
    }
})