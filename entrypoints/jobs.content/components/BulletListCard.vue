<script setup lang="ts">
type PropsType = {
  header: string;
  body: string[];
}

const props = defineProps<PropsType>();
</script>

<template>
  <div class="rounded-xl border border-white/10 bg-[#212A36] p-5 mb-4 shadow-md">
    <p class="text-lg font-bold text-white mb-3" v-html="header"></p>
    <ul class="space-y-3 text-white/95">
      <li v-for="point in body" :key="point" class="flex items-start">
        <span class="inline-block w-4 h-4 mt-1 mr-2 flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-blue-500">
            <circle cx="12" cy="12" r="9" stroke-width="2"/>
            <path d="M8 12L11 15L16 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span v-html="point" class="-mt-1"></span>
      </li>
    </ul>
  </div>
</template>