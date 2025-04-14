<script lang="ts">
export const CompanyPageSymbol = Symbol('CompanyPage');
</script>
<script setup lang="ts">
import {ParsedCompanyInfo} from "@/entrypoints/jobs.content/parsers/companyInfoParser";
import JobsPage from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";
import {useRouteParamWatch} from "@/entrypoints/jobs.content/composables/useRouterParamWatch";
import {COMPANY_JOB_VIEW} from "@/entrypoints/jobs.content/router";

export interface CompanyPageProps {
  companyInfo: ParsedCompanyInfo;
  companyJobs: ParsedJobRow[];
};

const props = defineProps<CompanyPageProps>();

useRouteParamWatch('jobId', (newJobId, { replace }) => {
  if (!newJobId && props.companyJobs.length > 0) {
    void replace({
      name: COMPANY_JOB_VIEW,
      params: { jobId: props.companyJobs[0]?.id }
    });
  }
});
</script>

<template>

  <JobsPage :jobList="companyJobs"/>
</template>