// TODO: In Future we might implement original path resolver
// So that if user visits https://jobs.ge/ge/?view=jobs&id=625451 will get redirected to https://jobs.ge/#/viewjob/625451

// import { ref } from 'vue'
// import { useRouter } from "vue-router";
// import { usePagePropsStore } from "@/entrypoints/jobs.content/stores/pagePropsStore";
// import { PageName, JOBS, JOBS_SUB } from "@/entrypoints/jobs.content/constants/pageNames";
// import jobListTableParser from "@/entrypoints/jobs.content/parsers/jobListTableParser"
// import { jobViewPageParser } from "@/entrypoints/jobs.content/parsers/jobviewPageParser";
//
// const routeConfigs = [
//     {
//         externalPath: '/',
//         internalName: JOBS,
//         parser: (doc: Document) => ({ jobList: jobListTableParser(doc) })
//     },
//     {
//         externalPath: '/',
//         internalName: JOBS_SUB,
//         parser: (doc: Document) => ({ jobDescription: jobViewPageParser(doc) })
//     },
// ];
//
// function determineRouteNameFromURL(url: string): PageName {
//     return JOBS;
// }
//
// export function usePageRouter() {
//     const router = useRouter()
//     const viewData = ref({})
//     const pagePropsStore = usePagePropsStore();
//
//     function parseAndRedirect(
//         htmlContent: string,
//         redirect: boolean = true,
//         targetRouteName?: PageName,
//         params: Record<string, string> = {},
//         query: Record<string, string> = {}
//     ) {
//         const routeName = targetRouteName || determineRouteNameFromURL(window.location.href)
//         const parserConfig = routeConfigs.find(config => config.internalName === routeName)
//
//         if (!parserConfig) {
//             console.log("Route configuration not found!")
//             return;
//         }
//
//         const parser = new DOMParser()
//         const doc = parser.parseFromString(htmlContent, 'text/html')
//         const value = parserConfig.parser(doc)
//         viewData.value = value;
//
//         if (redirect) {
//             pagePropsStore.setPageProps(routeName, value)
//             void router.push({
//                 name: routeName,
//                 params,
//                 query
//             })
//         }
//     }
//
//     return { viewData, parseAndRedirect }
// }
