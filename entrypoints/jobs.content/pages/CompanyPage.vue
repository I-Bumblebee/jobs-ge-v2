<script lang="ts">
export const CompanyPageSymbol = Symbol('CompanyPage');
</script>
<script setup lang="ts">
import {ParsedCompanyInfo} from "@/entrypoints/jobs.content/parsers/companyInfoParser";
import JobsPage from "@/entrypoints/jobs.content/pages/JobsPage.vue";
import {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";

export interface CompanyPageProps {
  companyInfo: ParsedCompanyInfo;
  companyJobs: ParsedJobRow[];
};

const props = defineProps<CompanyPageProps>();

// TODO: If route.props.jobId becomes null navigate to jobId: props.companyJobs[0]?.id
</script>

<template>

  <JobsPage :jobList="companyJobs"/>
</template>