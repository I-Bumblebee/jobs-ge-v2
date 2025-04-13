<script setup lang="ts">
import PointIcon from "@/entrypoints/jobs.content/components/icons/PointIcon.vue";

type PropsType = {
  header: string;
  body: string[];
}

const props = defineProps<PropsType>();
</script>

<template>
  <div class="rounded-xl border border-white/5 bg-[#212A36] p-5 shadow-sm">
    <p class="text-xl tracking-wider font-bold text-white mb-3" v-html="header"></p>
    <ul class="space-y-3 text-white/95">
      <li v-for="point in body" :key="point" class="flex items-start gap-1.5">
        <PointIcon class="inline-block fill-[#BD85FB]/80  w-5 h-5 flex-shrink-0" />
        <span v-html="point" class="-mt-1.5"></span>
      </li>
    </ul>
  </div>
</template>