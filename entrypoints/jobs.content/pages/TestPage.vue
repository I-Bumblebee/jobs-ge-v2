<script setup lang="ts">
import {TEST} from "@/entrypoints/jobs.content/constants/pageNames";
import {TestPageProps, usePagePropsStore} from "@/entrypoints/jobs.content/stores/pagePropsStore";
import JobCard from "@/entrypoints/jobs.content/components/JobCard.vue";

const store = usePagePropsStore()
const {jobList}: TestPageProps = store.getPageProps(TEST)

const handleJobCardClick = (jobId: string | null) => {
  if (jobId) {
    console.log('Clicked job:', jobId)
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-white">Job Listings</h1>

    <div
        v-if="jobList.length === 0"
        class="text-center text-gray-400 py-10"
    >
      No jobs available
    </div>

    <div
        v-else
        class="flex flex-col flex-nowrap gap-1"
    >
      <JobCard
          v-for="job in jobList"
          :key="String(job.id)"
          :job="job"
          @card-click="handleJobCardClick"
          class="w-full"
      />
    </div>
  </div>
</template>