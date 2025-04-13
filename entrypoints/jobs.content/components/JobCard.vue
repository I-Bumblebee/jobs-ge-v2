<script setup lang="ts">
import {defineEmits, defineProps, ref} from 'vue'
import placeholderLogo from "@/assets/company-logo-placeholder.png"
import {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";
import {useFavorites} from "@/entrypoints/jobs.content/composables/useFavorites";
import {JOB_VIEW_IN_LIST} from "@/entrypoints/jobs.content/constants/pageNames";
import {getPublishTimeText} from "../utils/dateUtils";
import StarIcon from "@/entrypoints/jobs.content/components/icons/StarIcon.vue";

interface PropsType {
  job: ParsedJobRow
}

const props = defineProps<PropsType>()
const emit = defineEmits<{ (e: 'card-click', jobId: string | null): void }>()

const {addFavorite, removeFavorite} = useFavorites()

const isFavorite = ref(props.job.metadata.isFavorite);

const toggleFavorite = () => {
  // if (isFavorite.value) {
  //   isFavorite.value = false;
  //   removeFavorite(String(props.job.id));
  // } else {
  //   isFavorite.value = true;
  //   addFavorite(String(props.job.id));
  // }
}
</script>

<template>
  <RouterLink
      :to="{ name: JOB_VIEW_IN_LIST, params: { id: job.id } }"
      class="max-w-[28rem] cursor-pointer bg-[#161C24] hover:bg-[#212A36] hover:rounded-[1.2rem] hover:shadow-md transition-all duration-300"
      @click="() => emit('card-click', props.job.id)"
  >
    <div class="flex p-4 gap-4">
      <div class="w-24 h-24 flex-shrink-0 relative">
        <div class="mask-container">
          <img
              :src="job.company.logoSrc || placeholderLogo"
              alt="Company Logo"
              class="company-logo"
          />
        </div>
      </div>

      <div class="flex-grow flex flex-col">
        <div class="flex justify-between items-start mb-3">
          <div class="flex-grow mr-2 break-words">
            <div class="text-lg font-bold text-white">
              {{ job.title }}
            </div>
          </div>

          <!-- TODO: For Next Iteration Use Float Right and Put It In Same Container As the Title -->
          <button
              class="flex-shrink-0 bg-transparent cursor-pointer p-1 hover:bg-[#212A36] rounded-full transition-colors duration-300"
              @click.prevent="toggleFavorite"
          >
            <StarIcon
                class="stroke-gray-500 fill-none hover:stroke-yellow-500 transition-colors duration-300 stroke-[1.5px] hover:stroke-2"
                :class="{ 'stroke-yellow-500 fill-yellow-500': isFavorite }"
            />
          </button>
        </div>

        <!-- Job Badges -->
        <div class="flex flex-wrap gap-2 mb-4 text-white/90">
          <span
              v-if="job.metadata.isNew"
              class="text-xs py-1 px-2 rounded font-extrabold bg-blue-900 text-white/95"
          >
            NEW
          </span>

          <span
              v-if="job.metadata.hasSalaryInfo"
              class="text-xs py-1 px-2 rounded font-extrabold bg-green-950 "
          >
            $$$
          </span>

          <span
              v-if="job.metadata.wasRecentlyUpdated"
              class="text-xs py-1 px-2 rounded font-extrabold bg-purple-900 "
          >
            UPD
          </span>

          <span
              v-if="job.metadata.isExpiring"
              class="text-xs py-1 px-2 rounded font-extrabold bg-red-950 "
          >
            EXP
          </span>

          <span
              v-if="job.metadata.isInRegion"
              class="text-xs py-1 px-2 rounded font-extrabold bg-orange-950 "
          >
            REG
          </span>
        </div>

        <div class="text-xs text-gray-400">
          {{ getPublishTimeText(job.dates.published) }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.mask-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  -webkit-mask-image: url('@/assets/super-ellipse-mask.svg');
  mask-image: url('@/assets/super-ellipse-mask.svg');
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.company-logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>