import {defineStore} from 'pinia'
import {JobsPageProps, JobsPageSymbol} from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import {JobViewPageProps, JobViewPageSymbol} from "@/entrypoints/jobs.content/pages/JobViewPage.vue";
import {HomePageProps, HomePageSymbol} from "@/entrypoints/jobs.content/pages/HomePage.vue";

type ComponentSymbol =
    | typeof HomePageSymbol
    | typeof JobsPageSymbol
    | typeof JobViewPageSymbol
    ;

type PagePropsMap = {
    [HomePageSymbol]: HomePageProps;
    [JobsPageSymbol]: JobsPageProps;
    [JobViewPageSymbol]: JobViewPageProps;
}

interface PagePropsState {
    commonData: string;
    pageProps: Partial<PagePropsMap>;
}

export const usePagePropsStore = defineStore('pageProps', {
    state: (): PagePropsState => ({
        commonData: '',
        pageProps: {}
    }),

    actions: {
        setPageProps<S extends ComponentSymbol>(
            componentSymbol: S,
            props: PagePropsMap[S]
        ) {
            this.pageProps[componentSymbol] = props;
        },

        clearPageData(componentSymbol: ComponentSymbol) {
            delete this.pageProps[componentSymbol];
        }
    },

    getters: {
        getPageProps: (state) => <S extends ComponentSymbol>(componentSymbol: S): PagePropsMap[S] => {
            return state.pageProps[componentSymbol] as PagePropsMap[S];
        }
    }
});