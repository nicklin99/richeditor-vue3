import { BubbleMenu } from '@tiptap/vue-3'
import { NodeTypes } from "../extension";
import { computed, defineComponent } from "vue";
import RicheditorOptions from './index'
import { useEditorCtx } from "../hooks/useEditorCtx";
// 冒泡菜单编辑区域
export default defineComponent({
  name: 'RicheditorOptionsBubble',
  setup() {
    const { editor } = useEditorCtx();
    // 当前选中节点
    const selectedNode = computed(() => {
      // @ts-ignore
      return editor.state?.selection?.node;
    });
    // 是否显示链接bubble菜单
    const shouldShowLink = () => editor.isActive(NodeTypes.link)
    // 是否显示内联菜单
    const shouldShowNode = () => {
      if (
        selectedNode.value?.type.name === NodeTypes.image ||
        selectedNode.value?.type.name === NodeTypes.video
      ) {
        return true;
      }
      return false;
    };
    // 当前选中链接属性
    const selectedLink = computed(() => {
      return editor.getAttributes(NodeTypes.link) ?? null;
    });
    return () => {
      return (
        <div>
          {/* 图片/视频等节点设置菜单 */}
          <BubbleMenu
            editor={editor}
            tippy-options={{
              delay: 0,
              duration: 100,
              appendTo: document.body,
              placement: "auto-end",
            }}
            should-show={shouldShowNode}
          >
            <RicheditorOptions
              ref="image"
              type={selectedNode.value?.type.name}
              attrs={selectedNode.value?.attrs}
            />
          </BubbleMenu>
          {/* 超链接管理冒泡菜单 */}
          <BubbleMenu
            editor={editor}
            plugin-key="bubble-menu-link"
            tippy-options={{
              duration: 100,
              appendTo: document.body,
              placement: "auto-end",
            }}
            should-show={shouldShowLink}
          >
            <RicheditorOptions
              type={NodeTypes.link}
              attrs={selectedLink.value}
            />
          </BubbleMenu>
        </div>
      );
    };
  },
});
