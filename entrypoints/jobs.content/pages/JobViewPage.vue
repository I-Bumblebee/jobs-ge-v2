<script setup lang="ts">
import {ref} from 'vue'
import {ParsedJobView} from "@/entrypoints/jobs.content/parsers/jobviewPageParser";
import {onBeforeRouteUpdate} from "vue-router";
import {getDeadlineText, getPublishTimeText} from "@/entrypoints/jobs.content/utils/dateUtils";
import {fetchJobByIdMiddleware} from "@/entrypoints/jobs.content/router/routeMiddleware";
import {useBulletListExtractor} from "@/entrypoints/jobs.content/composables/useBulletListExtractor";
import BulletListCard from "@/entrypoints/jobs.content/components/BulletListCard.vue";

export interface SubPageProps {
  jobDescription: ParsedJobView
}

const props = defineProps<SubPageProps>();
const jobDescriptionRef = computed(() => props.jobDescription);

const isFavorite = ref(props.jobDescription.isFavorite)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
}

const {reachDescription} = useBulletListExtractor(jobDescriptionRef);

onBeforeRouteUpdate(fetchJobByIdMiddleware)
</script>

<template>
  <div class="flex flex-col max-w-5xl w-full">
    <div class="flex justify-between items-start mb-6">
      <h1 class="text-2xl font-bold text-white break-words mr-4">
        {{ jobDescription.title }}
      </h1>

      <button
          class="flex-shrink-0 bg-transparent cursor-pointer p-1 hover:bg-[#212A36] rounded-full transition-colors duration-300"
          @click="toggleFavorite"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="stroke-gray-500 fill-none hover:stroke-yellow-500 transition-colors duration-300 stroke-[1.5px] hover:stroke-2"
            :class="{ 'stroke-yellow-500 fill-yellow-500': jobDescription.isFavorite }"
        >
          <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          ></polygon>
        </svg>
      </button>
    </div>

    <div class="flex flex-wrap gap-3 mb-6 text-sm">
      <span class="text-gray-400">
        {{ getPublishTimeText(jobDescription.dates.published) }}
      </span>
      <span v-if="jobDescription.dates.deadline" class="text-gray-400">
        • &nbsp; {{ getDeadlineText(jobDescription.dates.deadline) }}
      </span>
    </div>

    <div class="border-1 border-white rounded-xl p-5 leading-relaxed text-xl">
      <div class="text-white/90 flex flex-col gap-10">
        <template v-for="(item, index) in reachDescription" :key="index">
          <div v-if="item.type === 'text'" v-html="item.content"/>
          <BulletListCard
              v-else
              v-bind="item.props"
          />
        </template>
      </div>
    </div>
  </div>
</template>