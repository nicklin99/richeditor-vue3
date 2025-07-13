import type { Editor } from "@tiptap/vue-3";
import { NodeTypes, type ProvideEditorCtx } from "../extension";

/**
 * 选中检查
 * @param editor
 * @param name NodeType.name
 */
export const selectionCheck = (editor: Editor, messager: ProvideEditorCtx['messager'], name: string) => {
  if (editor.isActive(name)) {
    return true;
  }
  if (editor.state.selection.empty) {
    messager.error("请先选中区域");
    return false;
  }
  return true;
};

// 确认链接
export const confirmLink = (editor: Editor, messager: ProvideEditorCtx['messager'], href: string) => {
  console.log(editor.state.selection)
  if (editor.state.selection.empty) {
    messager.error("请选中链接内容");
    return;
  }
  editor
    .chain()
    .focus()
    .extendMarkRange(NodeTypes.link)
    .setLink({ href })
    .blur()
    .run();
};
export const unsetLink = (editor: Editor) => {
  editor.chain().focus().extendMarkRange(NodeTypes.link).unsetLink().blur().run();
};

// 需要判断节点类型
export const confirmNodeOptions = (editor: Editor, type: string, options: Record<string, any>) => {
  editor.chain().focus().updateAttributes(type, options).run();
};
