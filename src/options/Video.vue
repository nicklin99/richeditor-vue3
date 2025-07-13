<template>
  <Form
    ref="form"
    :data="videoOptions"
    label-align="left"
    label-width="50px"
    style="width: 300px"
  >
    <FormItem label="宽度" name="width">
      <input v-model="videoOptions.width" placeholder="请输入视频宽度" />
    </FormItem>
    <FormItem label="高度">
      <input v-model="videoOptions.height" placeholder="请输入视频高度" />
    </FormItem>
    <FormItem label="地址">
      <textarea v-model="videoOptions.src" placeholder="请输入视频地址" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { FormItem, Form } from './FormItem';
import { reactive, useTemplateRef, watch } from 'vue';

type Props = {
  width: string;
  height: string;
  src: string;
};
const props = defineProps<Props>();
const videoOptions = reactive({
  ...props,
});
const formRef = useTemplateRef('form');
watch(props, () => {
  Object.assign(videoOptions, props)
});
defineExpose({
  videoOptions,
  formRef,
});
</script>
