<script setup lang="ts">
import { TiptapRichEditor } from 'tiptap-richeditorv-vue3'
import UploaderButton from './UploaderButton.vue'
import 'tiptap-richeditorv-vue3/style.css'
import { ref } from 'vue';
const content = ref('<p>h2</p><img src="https://public.app.wfell.top/storage/v1/render/image/public/demo/Case%20Study/PJ1018-AerospaceBlade/Aerospace%20Blade1.png?width=600" />')
</script>

<template>
  <div class="card">
    <TiptapRichEditor v-model="content" :uiuploader="UploaderButton" />
  </div>
  <div class="card">
    <h3>html输出</h3>
    <textarea v-model="content" />
  </div>
  <p class="read-the-docs">更多</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
