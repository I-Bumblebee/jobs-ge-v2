import {defineStore} from 'pinia'
import {HOME, PageName, JOBS, JOBS_SUB} from '@/entrypoints/jobs.content/constants/pageNames'
import {JobsPageProps} from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import {SubPageProps} from "@/entrypoints/jobs.content/pages/SubPage.vue";
import {HomePageProps} from "@/entrypoints/jobs.content/pages/HomePage.vue";

type PagePropsMap = {
    [JOBS]: JobsPageProps
    [JOBS_SUB]: SubPageProps
    [HOME]: HomePageProps
}

interface PagePropsState {
    commonData: string
    pageProps: Partial<PagePropsMap>
}

export const usePagePropsStore = defineStore('pageData', {
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