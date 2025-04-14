<script lang="ts">
export const JobViewPageSymbol = Symbol('JobViewPage');
</script>

<script setup lang="ts">
import {ref} from 'vue'
import {ParsedJobView} from "@/entrypoints/jobs.content/parsers/jobviewPageParser";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import {getDeadlineText, getPublishTimeText} from "@/entrypoints/jobs.content/utils/dateUtils";
import StarIcon from "@/entrypoints/jobs.content/components/icons/StarIcon.vue";
import {buildJobViewUrl} from "../utils/urlUtils";
import LinkPlusIcon from "@/entrypoints/jobs.content/components/icons/LinkPlusIcon.vue";
import ExternalLinkIcon from "@/entrypoints/jobs.content/components/icons/ExternalLinkIcon.vue";
import ListSearchIcon from "@/entrypoints/jobs.content/components/icons/ListSearchIcon.vue";
import {COMPANY_JOB_VIEW, JOB_VIEW} from "@/entrypoints/jobs.content/router"
import {useJobDescriptionTransformer} from "@/entrypoints/jobs.content/composables/useJobDescriptionTransformer";
import {provideJobViewPageProps} from "@/entrypoints/jobs.content/router/routeMiddleware";


export interface JobViewPageProps {
  jobDescription: ParsedJobView
}

const props = defineProps<JobViewPageProps>();

const router = useRouter();

const isFavorite = computed(() => props.jobDescription.isFavorite);

const copied = ref(false);

const copyLink = () => {
  navigator.clipboard.writeText(buildJobViewUrl(props.jobDescription.id));
  copied.value = true;
  setTimeout(() => copied.value = false, 1500);
}

const {formattedDescriptionChunks} = useJobDescriptionTransformer(computed(() => props.jobDescription))

onBeforeRouteUpdate(provideJobViewPageProps)
</script>

<template>
  <div class="flex flex-col max-w-5xl w-full">
    <div class="flex justify-between items-start mb-6">
      <h1 class="text-3xl font-bold text-white break-words mr-4">
        {{ jobDescription.title }}
      </h1>

      <div class="flex items-center gap-1">
        <!-- Open in New Tab -->
        <a
            :href="router.resolve({ name: JOB_VIEW, params: { jobId: jobDescription.id } }).href"
            target="_blank"
            class="p-2 rounded-full hover:bg-[#212A36] transition-colors"
        >
          <ExternalLinkIcon class="stroke-gray-500 hover:stroke-blue-500 transition-colors stroke-[1.5px]"/>
        </a>

        <!-- Copy Link -->
        <button @click="copyLink" class="p-2 rounded-full hover:bg-[#212A36] transition-colors relative">
          <LinkPlusIcon
              class="stroke-gray-500 hover:stroke-green-500 transition-colors stroke-[1.5px]"
              :class="{ 'stroke-green-500': copied }"
          />
        </button>

        <!-- View Company Listings -->
        <a
            v-if="jobDescription.company.id"
            :href="router.resolve({name: COMPANY_JOB_VIEW, params: {companyId: jobDescription.company.id, jobId: jobDescription.id}}).href"
            target="_blank"
            class="p-2 rounded-full hover:bg-[#212A36] transition-colors"
        >
          <ListSearchIcon class="stroke-gray-500 hover:stroke-purple-500 transition-colors stroke-[1.5px]"/>
        </a>

        <div v-else class="p-2">
          <ListSearchIcon class="stroke-gray-500/50 transition-colors stroke-[1.5px]"/>
        </div>

        <!-- Favorite Button -->
        <button
            class="p-2 rounded-full hover:bg-[#212A36] transition-colors"
        >
          <StarIcon
              class="stroke-gray-500 fill-none hover:stroke-yellow-500 transition-colors stroke-2"
              :class="{ 'stroke-yellow-500 fill-yellow-500': isFavorite }"
          />
        </button>
      </div>
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
        <component
            v-for="(component, idx) in formattedDescriptionChunks"
            :key="idx"
            :is="component"
        />
      </div>
    </div>
  </div>
</template>