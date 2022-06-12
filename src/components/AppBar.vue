<script setup>

const props = defineProps(['view','action'])
const data = {
  view: props.view,
  action: props.action
}

function closeWindow() {
  window.Electron.ipcRenderer.send("window-close", data);
}

function minimizeWindow() {
  window.Electron.ipcRenderer.send("window-min", data);
}

function maximizeWindow() {
  window.Electron.ipcRenderer.send("window-max", data);
}
</script>
<template>
  <div
      class="drag flex h-8 w-full items-center justify-end bg-[#3D5AFE] shadow-2xl px-4"
  >
    <div class="flex h-full w-full items-center justify-between">
      <span class="text-white font-semibold">绿色青蛙 🐸</span>
      <div class="flex items-center gap-3.5">
        <span class="app hover:bg-gray-200 hover:bg-opacity-30 rounded p-1" @click="minimizeWindow">
        <svg t="1654938264863" class="icon w-4 h-4" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="2706" width="200" height="200"><path
            d="M930.355 551.424H94.218c-23.987 0-43.975-17.408-43.975-39.424 0-21.504 19.42-39.424 43.975-39.424h835.564c23.987 0 43.975 17.408 43.975 39.424 0.006 22.016-19.415 39.424-43.402 39.424z"
            fill="#ffffff" p-id="2707"></path></svg>
        </span>
        <span class="app hover:bg-gray-200 hover:bg-opacity-30 rounded p-1" @click="closeWindow">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-white "
            viewBox="0 0 20 20"
            fill="currentColor"
        >
          <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
          />
        </svg>
      </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.drag {
  -webkit-app-region: drag;
}

.app {
  -webkit-app-region: no-drag;
}
</style>
