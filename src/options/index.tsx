import {
  getMarkRange,
  getMarkType,
  getTextBetween,
} from "@tiptap/vue-3";
import {
  confirmLink,
  unsetLink,
  confirmNodeOptions,
} from "./command";
import { NodeTypes } from "../extension";
import { defineComponent, useTemplateRef, type PropType } from "vue";
import { useEditorCtx } from "../hooks/useEditorCtx";
import RicheditorOptionsImage from './Image.vue'
import RicheditorOptionsVideo from './Video.vue'
import RicheditorOptionsLink from './Link.vue'
import "../styles/bubble.scss"
import "../styles/form.scss"
// 元素编辑区域
export default defineComponent({
  name: "RicheditorOptions",
  props: {
    type: {
      type: String as PropType<string>,
      default: null,
    },
    attrs: {
      type: Object as PropType<any>,
      default: null,
    },
  },
  setup(props) {
    const imageRef = useTemplateRef<InstanceType<typeof RicheditorOptionsImage>>('image');
    const videoRef = useTemplateRef<InstanceType<typeof RicheditorOptionsVideo>>('video');
    const linkRef = useTemplateRef<InstanceType<typeof RicheditorOptionsLink>>('link');
    const { editor, button, messager } = useEditorCtx()
    return () => {
      const { type } = props;
      switch (type) {
        case "image":
          return (
            <div class="bubble-menu">
              <div class="toolbar">
                <h3>图片设置</h3>
                <div>
                  <button
                    onClick={() =>
                      confirmNodeOptions(
                        editor,
                        type,
                        imageRef.value?.imageOptions!
                      )
                    }
                  >
                    确定
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().deleteSelection().run()
                    }
                  >
                    删除
                  </button>
                </div>
              </div>
              <RicheditorOptionsImage ref="image" {...props.attrs} />
            </div>
          );
        case NodeTypes.link: {
          const isActiveLink = editor.isActive(NodeTypes.link);
          // 计算文本区域
          let text = "";
          if (isActiveLink) {
            const range = getMarkRange(
              editor.state.selection.$from,
              getMarkType(NodeTypes.link, editor.state.schema)
            );
            if (range) {
              text = getTextBetween(editor.state.doc, range);
            }
          } else {
            text = getTextBetween(editor.state.doc, {
              from: editor.state.selection.$from.pos,
              to: editor.state.selection.$to.pos,
            });
          }
          return (
            <div class="bubble-menu">
              <div class="toolbar">
                <h3>超链接</h3>
                <div>
                  <button
                    onClick={() => confirmLink(editor, messager, linkRef.value?.linkOptions.href!)}
                  >
                    确定
                  </button>
                  <button
                    disabled={!isActiveLink}
                    onClick={() => unsetLink(editor)}
                  >
                    删除
                  </button>
                </div>
              </div>
              <RicheditorOptionsLink ref="link" text={text} {...props.attrs} />
            </div>
          );
        }
        case NodeTypes.video: {
          return (
            <div class="bubble-menu">
              <div class="toolbar">
                <h3>视频设置</h3>
                <div>
                  <button
                    onClick={() => {
                      confirmNodeOptions(
                        editor,
                        type,
                        videoRef.value?.videoOptions!
                      );
                    }}
                  >
                    确定
                  </button>
                  <button
                    onClick={() =>
                      editor.chain().focus().deleteSelection().run()
                    }
                  >
                    删除
                  </button>
                </div>
              </div>

              <RicheditorOptionsVideo ref="video" {...props.attrs} />
            </div>
          );
        }
        default:
          return null;
      }
    };
  },
});
