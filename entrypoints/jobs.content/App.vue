<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  <div class="w-full px-4 bg-white animate-grow-height">
    <a href="https://wxt.dev" target="_blank">
      <img src="@/assets/wxt.svg" class="logo" alt="WXT logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="WXT + Vue" />
  </div>
</template>

<style>
@keyframes grow-height {
  0% {
    height: 6rem;
  }
  100% {
    height: 100vh;
  }
}

.animate-grow-height {
  animation: grow-height 2s ease-in-out forwards;
}
</style>