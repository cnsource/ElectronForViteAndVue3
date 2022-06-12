<script setup>
import {ref, onMounted} from "vue";
import AppBar from "../components/AppBar.vue";

const electron = window.Electron;
const selectCode = ref("");
const edit = ref(false)

onMounted(() => {
  electron.ipcRenderer.on("clipMsg", (e, data) => {
    selectCode.value = data;
  });
});
</script>
<template>
  <div class="flex flex-col h-full bg-white">
    <AppBar view="codeSaveView" action="hide"></AppBar>
    <div class="flex-grow p-2 overflow-auto">
      <textarea class="w-full h-full resize-none break-all whitespace-pre p-2" v-show="edit" v-model="selectCode" @dblclick="edit = !edit">

      </textarea>
      <div class="whitespace-pre" v-show="!edit" @dblclick="edit = !edit">
        <code class="whitespace-pre">{{ selectCode }}</code>
      </div>
    </div>
    <div class="flex justify-end px-4 py-2">
      <button class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">保存</button>
    </div>
  </div>
</template>
