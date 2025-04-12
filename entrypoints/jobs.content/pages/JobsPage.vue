<script setup lang="ts">
import JobCard from "@/entrypoints/jobs.content/components/JobCard.vue";
import {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";

export interface JobsPageProps {
  jobList: ParsedJobRow[]
}

const props = defineProps<JobsPageProps>()
</script>

<template>
  <div class="flex flex-row gap-32">
    <div class="w-1/3 lg:w-auto lg:flex-shrink-0">
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
            :key="job.id as string"
            :job="job"
        />
      </div>
    </div>

    <div class="w-2/3 lg:flex-grow lg:w-auto relative overflow-hidden">
      <div
          class="fixed top-auto h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-4 rounded-2xl frosted-container"
      >
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<style>
.custom-scrollbar {
  scrollbar-width: inherit;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin-top: 50px;
  margin-bottom: 50px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
  border: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(107, 114, 128, 0.7);
}

.frosted-container {
  background-color: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(209, 213, 219, 0.5);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>