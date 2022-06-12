<script setup>
import AppBar from "./components/AppBar.vue";
</script>

<template>
  <div
      class="app flex h-screen w-full flex-col items-center justify-center bg-slate-300"
  >
    <div class=" bg-gray-300 h-full w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.drag {
  -webkit-app-region: drag;
}

.app {
  -webkit-app-region: no-drag;
}
</style>
