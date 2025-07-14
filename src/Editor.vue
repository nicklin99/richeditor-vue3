<template>
  <div class="editor">
    <slot>
      <slot name="toolbar" :editor="editor">
        <RicheditorToolbar v-if="editor" />
      </slot>
      <RicheditorOptionsBubble v-if="editor" />
    </slot>
    <EditorContent :editor="editor!" />
  </div>
</template>

<script lang="ts">
import RicheditorToolbar from './menu/Toolbar'
import RicheditorOptionsBubble from './options/Bubble'
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { provide, type PropType, defineComponent, type ShallowRef, type Component } from "vue";
import { InlineImage, ResizeImage, Video } from "./extension";
import { MediaType, NodeTypes, provide_key_editor, supportCommand, type OnSelectCallback } from "./const";
import { Form, FormItem } from './options/FormItem';

export default defineComponent({
  name: 'TiptapRichEditor',
  components: {
    RicheditorToolbar,
    EditorContent,
    RicheditorOptionsBubble,
  },
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: "",
    },
    // 选择器
    selector: {
      type: Object as PropType<{
        onSelect: (success: OnSelectCallback) => void;
      }>,
      default: null,
    },
    messager: {
      type: Object as PropType<{
        warning: (msg: string) => void;
      }>,
      default: null,
    },
    uibutton: {
      type: Object as PropType<Component>,
      default: null,
    },
    uiuploader: {
      type: Object as PropType<Component>,
      default: null,
    },
    uiform: {
      type: Object as PropType<Component>,
      default: null,
    },
    uiformitem: {
      type: Object as PropType<Component>,
      default: null,
    },
    uiinput: {
      type: Object as PropType<Component>,
      default: null,
    },
    uitextarea: {
      type: Object as PropType<Component>,
      default: null,
    }
  },
  emits: ["update:modelValue"],
  data(): { editor: ShallowRef<Editor> | null } {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        InlineImage,
        StarterKit,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Highlight,
        ResizeImage,
        TextAlign.configure({
          types: [NodeTypes.heading, NodeTypes.paragraph],
        }),
        Link.configure({
          openOnClick: false,
        }),
        Video,
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor?.getHTML());
      },
    });
    const ctx = {
      editor: this.editor,
      selector: this.selector,
      messager: this.messager,
      button: this.uibutton,
      uploader: this.uiuploader,
      form: this.uiform || Form,
      formitem: this.uiformitem || FormItem,
      textarea: this.uitextarea || 'textarea',
      input: this.uiinput || 'input',
      onSelect: this.onSelect,
      handleCommand: (command: string) => {
        switch (command) {
          case supportCommand.selectMedia:
            this.selector.onSelect(this.onSelect)
            break;
          default:
            this.messager.warning("未知的命令");
            break;
        }
      }
    }
    provide(provide_key_editor, ctx)
  },
  beforeUnmount() {
    this.editor?.destroy();
  },
  methods: {
    onSelect(src: string, type: string) {
      switch (type) {
        case MediaType.video:
          // 插入视频
          this.editor?.chain()
            .focus()
            .setVideo({
              src: `${src}`,
            })
            .run()
          break;
        case MediaType.image:
          // 插入图片
          this.editor?.chain()
            .focus()
            .setImage({
              src: `${src}`,
            })
            .run();
          break
        default:
          throw new Error("sorry, unsupport media type")
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@use "./styles/editor.scss";
@use "./styles/table.scss";
</style>
