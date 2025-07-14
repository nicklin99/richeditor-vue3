<template>
  <!-- 弃用 -->
  <Form
    ref="form"
    :data="linkOptions"
    label-align="left"
    label-width="50px"
    style="width: 300px"
  >
    <FormItem label="地址" name="href">
      <input v-model="linkOptions.href" placeholder="请输入目标地址" />
    </FormItem>
    <FormItem label="预览">
      <a :href="linkOptions.href" target="_blank">{{ text }}</a>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { FormItem, Form } from './FormItem';
import { reactive, useTemplateRef, watch } from 'vue';
type Props = {
  href?: string;
  text: string;
};
const props = defineProps<Props>();
const linkOptions = reactive({
  ...props,
});
const formRef = useTemplateRef('form');
// const rules = {
//   href: [
//     {
//       required: true,
//     },
//   ],
// };
watch(props, (val) => {
  linkOptions.href = val.href;
  linkOptions.text = val.text;
});
defineExpose({
  linkOptions,
  formRef,
});
</script>
