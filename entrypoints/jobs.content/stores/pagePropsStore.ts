import {defineStore} from 'pinia'
import {HOME, PageName, TEST} from '@/entrypoints/jobs.content/constants/pageNames'
import {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";

export interface TestPageProps {
    jobList: ParsedJobRow[]
}

interface HomePageProps { }

type PagePropsMap = {
    [TEST]: TestPageProps
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
            this.pageProps[pageName] = undefined
        }
    },

    getters: {
        getPageProps: (state) => <K extends PageName>(pageName: K): PagePropsMap[K] => {
            return state.pageProps[pageName] as PagePropsMap[K]
        }
    }
})