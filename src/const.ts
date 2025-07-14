import { type Editor } from "@tiptap/vue-3";
import { type Component } from "vue";
import type { Form, FormItem } from "./options/FormItem";
export type OnSelectCallback = {
  (src: string, type: string): void
}
// provide keys
export const provide_key_editor = 'tiptap_rich_editor'
export type ProvideEditorCtx = {
  editor: Editor
  messager: {
    warning: (msg: string) => void;
    error: (msg: string) => void;
  }
  button: Component
  uploader: Component
  form: typeof Form
  formitem: typeof FormItem
  input: Component
  textarea: Component
  handleCommand: (command: string) => void
  onSelect: (src: string, type: string) => void
}
// 节点类型
export const NodeTypes = {
  link: "link",
  image: "image",
  video: "video",
  heading: "heading",
  paragraph: "paragraph"
};

export const supportCommand = {
  selectMedia: "selectMedia", // 选择媒体库
  setLink: "setLink", // 设置链接
  resizeImage: "resizeImage", // 调整图片大小
};

// 媒体文件类型
export const MediaType = {
  image: "image",
  video: "video",
};
