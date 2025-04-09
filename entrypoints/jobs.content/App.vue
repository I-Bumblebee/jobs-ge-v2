<script lang="ts" setup>
import {HOME, JOBS} from "@/entrypoints/jobs.content/constants/pageNames"

const props = defineProps<{ originalContent: string }>();
</script>

<template>
  <div class="bg-[#161C24] flex flex-col">
    <RouterLink :to="{ name: HOME }" class="text-blue-500 underline mr-4">Home</RouterLink>
    <RouterLink :to="{ name: JOBS }" class="text-blue-500 underline">Test</RouterLink>

    <div class="container self-center">
      <RouterView/>
    </div>

    <div class="w-full px-4 bg-white">
      <div v-if="originalContent">
        <div v-html="originalContent"/>
      </div>
    </div>
  </div>
</template>

<style>
* {
  font-family: "Helvetica Neue", 'Helvetica', serif;
}
</style>
