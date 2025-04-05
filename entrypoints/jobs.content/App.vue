<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';

const props = defineProps<{
  originalContent?: string
}>();
</script>

<template>
  <div class="w-full px-4 bg-white">
    <a href="https://wxt.dev" target="_blank">
      <img src="@/assets/wxt.svg" class="logo" alt="WXT logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="WXT + Vue" />

    <div v-if="originalContent">
      amazing
       <div v-html="originalContent"></div>
    </div>
  </div>
</template>