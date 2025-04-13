<script lang="ts" setup>
import {HOME, JOBS} from "@/entrypoints/jobs.content/constants/pageNames"
</script>

<template>
  <div class="bg-[#161C24] flex flex-col min-h-svh custom-scrollbar">
    <RouterLink :to="{ name: HOME }" class="text-blue-500 underline mr-4">Home</RouterLink>
    <RouterLink :to="{ name: JOBS }" class="text-blue-500 underline">Jobs</RouterLink>

    <div class="container self-center">
      <RouterView/>
    </div>
  </div>
</template>

<style>
* {
  font-family: "Helvetica Neue", 'Helvetica', serif;
}
</style>
