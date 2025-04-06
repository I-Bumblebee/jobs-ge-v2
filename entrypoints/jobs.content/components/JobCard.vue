<script setup lang="ts">
import {computed, defineEmits, defineProps, ref} from 'vue'
import placeholderLogo from "@/assets/company-logo-placeholder.png"
import {ParsedJobRow} from "@/entrypoints/jobs.content/parsers/jobListTableParser";
import {useFavorites} from "@/entrypoints/jobs.content/composables/useFavorites";

interface Props {
  job: ParsedJobRow
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'card-click', jobId: string | null): void
}>()

const {addFavorite, removeFavorite} = useFavorites()

const isFavorite = ref(props.job.metadata.isFavorite);

const toggleFavorite = () => {
  if (isFavorite.value) {
    isFavorite.value = false;
    removeFavorite(String(props.job.id))
  } else {
    isFavorite.value = true;
    addFavorite(String(props.job.id))
  }
}

const publishTimeText = computed(() => {
  if (!props.job.dates.published) return 'No publish date'

  const today = new Date()
  const published = props.job.dates.published
  const daysSincePublish = Math.floor(
      (today.getTime() - published.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysSincePublish === 0) return "Published today"
  if (daysSincePublish === 1) return "Published yesterday"
  return `${daysSincePublish} days ago`
})

const handleCardClick = () => {
  emit('card-click', props.job.id)
}
</script>

<template>
  <div
      class="max-w-[28rem] cursor-pointer bg-[#161C24] hover:bg-[#212A36] hover:rounded-[1.2rem] hover:shadow-md transition-all duration-300"
      @click="handleCardClick"
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

          <button
              class="flex-shrink-0 bg-transparent border-none cursor-pointer p-0"
              @click.stop="toggleFavorite"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="stroke-gray-500 fill-none hover:stroke-yellow-500 transition-colors duration-300 stroke-[1.5px] hover:stroke-2"
                :class="{ 'stroke-yellow-500 fill-yellow-500': isFavorite }"
            >
              <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
          </button>
        </div>

        <!-- Job Badges -->
        <div class="flex flex-wrap gap-2 mb-4 text-white/90">
          <span
              v-if="job.metadata.isNew"
              class="text-xs py-1 px-2 rounded font-extrabold bg-blue-900 text-white/95 font-serif"
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
          {{ publishTimeText }}
        </div>
      </div>
    </div>
  </div>
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