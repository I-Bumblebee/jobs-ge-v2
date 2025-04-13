
<script lang="ts">
export const JobsPageSymbol = Symbol('JobsPage');
</script>

<script setup lang="ts">
import JobCard from "@/entrypoints/jobs.content/components/JobCard.vue";
import {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";


export interface JobsPageProps {
  jobList: ParsedJobRow[]
}

const props = defineProps<JobsPageProps>()
</script>

<template>
  <div class="flex flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-24">
    <div class="w-1/3 lg:w-1/4 xl:w-2/5">
      <div
          v-if="jobList.length === 0"
          class="text-center text-gray-400 py-6 sm:py-8 md:py-10"
      >
        No jobs available
      </div>

      <div
          v-else
          class="flex flex-col flex-nowrap gap-1 sm:gap-2 md:gap-3"
      >
        <JobCard
            v-for="job in jobList"
            :key="job.id as string"
            :job="job"
        />
      </div>
    </div>

    <div class="w-2/3 lg:w-3/4 xl:w-4/5 relative">
      <div
          class="sticky top-6 max-h-screen md:h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl lg:rounded-2xl frosted-container"
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
  border: 2px solid #414D5D;;

}
</style>