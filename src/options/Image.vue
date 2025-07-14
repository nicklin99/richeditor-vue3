<template>
  <!-- 弃用 -->
  <Form
    ref="form"
    :data="imageOptions"
    label-align="left"
    label-width="50px"
    style="width: 300px"
  >
    <FormItem label="宽度" name="width">
      <input v-model="imageOptions.width" placeholder="请输入图片宽度" />
    </FormItem>
    <FormItem label="高度">
      <input v-model="imageOptions.height" placeholder="请输入图片高度" />
    </FormItem>
    <FormItem label="地址">
      <textarea v-model="imageOptions.src" placeholder="请输入图片地址" />
    </FormItem>
    <FormItem label="描述">
      <input v-model="imageOptions.alt" placeholder="请输入图片描述" />
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
  alt: string;
};
const props = defineProps<Props>();
const imageOptions = reactive({
  ...props,
});
const formRef = useTemplateRef('form');
watch(props, () => {
  Object.assign(imageOptions, props);
});
defineExpose({
  imageOptions,
  formRef,
});
</script>
