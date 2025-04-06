import {useRouter} from "vue-router";
import {usePagePropsStore} from "@/entrypoints/jobs.content/stores/pagePropsStore";
import {PageName, TEST} from "@/entrypoints/jobs.content/constants/pageNames";
import jobListTableParser from "@/entrypoints/jobs.content/parsers/jobListTableParser"

const routeConfigs = [
    {
        externalPath: '/',
        internalName: TEST,
        parser: (doc: Document) => ({jobList: jobListTableParser(doc)})
    },
];

function determineRouteNameFromURL(url: string): PageName {
    return TEST;
}

export function usePageRouter() {
    const router = useRouter()
    const viewData = ref({})
    const pagePropsStore = usePagePropsStore();

    function parseAndRedirect(htmlContent: string, redirect: boolean = true, targetRouteName?: PageName) {
        const routeName = targetRouteName || determineRouteNameFromURL(window.location.href)
        const parserConfig = routeConfigs.find(config => config.internalName === routeName)

        if (!parserConfig) {
            console.log("We fucked up!")
            return;
        }

        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlContent, 'text/html')
        const value = parserConfig.parser(doc)
        viewData.value = value;

        if (redirect)
        {
            pagePropsStore.setPageProps(routeName, value)
            void router.push({
                name: routeName,
            })
        }
    }

    return { viewData, parseAndRedirect }
}
