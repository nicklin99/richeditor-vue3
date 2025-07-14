<script setup lang="ts">
import { TiptapRichEditor, RicheditorToolbar } from 'tiptap-richeditorv-vue3'
import UploaderButton from './UploaderButton.vue'
import 'tiptap-richeditorv-vue3/style.css'
import { Form as TForm, FormItem as TFormItem, Input as TInput, Textarea as TTextarea } from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import { ref } from 'vue';
const content = ref('<p>h2</p><img src="https://public.app.wfell.top/storage/v1/render/image/public/demo/Case%20Study/PJ1018-AerospaceBlade/Aerospace%20Blade1.png?width=600" />')
</script>

<template>
  <div class="card">
    <TiptapRichEditor v-model="content" :uiinput="TInput" :uitextarea="TTextarea" :uiuploader="UploaderButton" :uiform="TForm" :uiformitem="TFormItem">
      <template #toolbar="{ editor }">
        <RicheditorToolbar v-if="editor" />
      </template>
    </TiptapRichEditor>
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
