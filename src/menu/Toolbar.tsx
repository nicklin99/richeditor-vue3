import "../styles/toolbar.scss";
import { selectionCheck } from "../options/command";
import { useEditorCtx } from '../hooks/useEditorCtx'
import { NodeTypes, type ProvideEditorCtx, supportCommand } from "../const";
import { menus } from "../config";
import { defineComponent, type PropType } from "vue";
import { VideoIcon, RollfrontIcon, ListIcon, ListNumberedIcon, RollbackIcon, LettersPIcon, ImageIcon, FormatVerticalAlignRightIcon, FormatVerticalAlignLeftIcon, LinkIcon, ClearFormattingIcon, TextformatBoldIcon, TextformatItalicIcon, TextformatStrikethroughIcon, FormatVerticalAlignCenterIcon } from 'tdesign-icons-vue-next'

const renderMenuIcon = (
  name: string,
  { editor, messager, uploader, onSelect, handleCommand }: ProvideEditorCtx,
) => {
  switch (name) {
    case "clearAll":
      return (
        <button
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          <ClearFormattingIcon />
        </button>
      );
    case "bold":
      return (
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().toggleBold()}
          class={{ "is-active": editor.isActive("bold") }}
        >
          <TextformatBoldIcon />
        </button>
      );
    case "italic":
      return (
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().toggleItalic()}
          class={{ "is-active": editor.isActive("italic") }}
        >
          <TextformatItalicIcon />
        </button>
      );
    case "strike":
      return (
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().toggleStrike()}
          class={{ "is-active": editor.isActive("strike") }}
        >
          <TextformatStrikethroughIcon />
        </button>
      );
    case "left":
      return (
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          class={{ "is-active": editor.isActive({ textAlign: "left" }) }}
        >
          <FormatVerticalAlignLeftIcon />
        </button>
      );
    case "center":
      return (
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          class={{
            "is-active": editor.isActive({ textAlign: "center" }),
          }}
        >
          <FormatVerticalAlignCenterIcon />
        </button>
      );
    case "right":
      return (
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          class={{ "is-active": editor.isActive({ textAlign: "right" }) }}
        >
          <FormatVerticalAlignRightIcon />
        </button>
      );
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6": {
      const level = Number(name.replace("h", ""));
      return (
        <button
          class={{ "is-active": editor.isActive("heading", { level }) }}
          // @ts-ignore
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
        >
          H{level}
        </button>
      );
    }
    case "paragraph":
      return (
        <button
          class={{ "is-active": editor.isActive("paragraph") }}
        >
          <LettersPIcon />
        </button>
      );
    case "image_upload":
      return uploader ? (
        <uploader onSuccess={onSelect}>
          <button>
            <ImageIcon /> 上传文件
          </button>
        </uploader>
      ) : null;
    case "image_picker":
      return (
        <button
          onClick={() =>handleCommand(supportCommand.selectMedia)}
        >
          <ImageIcon /> 选择图片
        </button>
      );
    case "video_picker":
      return (
        <button
          onClick={() => handleCommand(supportCommand.selectMedia)}
        >
          <VideoIcon /> 选择视频
        </button>
      );
    case "redo":
      return (
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <RollfrontIcon />
        </button>
      );
    case "undo":
      return (
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <RollbackIcon />
        </button>
      );
    case NodeTypes.link:
      return (
        <button
          class={{ "is-active": editor.isActive(NodeTypes.link) }}
          onClick={() => {
            if (selectionCheck(editor, messager, NodeTypes.link)) {
              editor.commands.setLink({
                href: '',
              })
            };
          }}
        >
          <LinkIcon />
        </button>
      );
    case "bulletList":
      return (
        <button
          class={{ "is-active": editor.isActive("bulletList") }}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListIcon />
        </button>
      );
    case "orderedList":
      return (
        <button
          class={{ "is-active": editor.isActive("orderedList") }}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListNumberedIcon />
        </button>
      );
    // List
    // TODO underlined
    default:
      return null;
  }
};
// 函数之间
export const RicheditorToolbar = defineComponent({
  props: {
    menus: {
      type: Array as PropType<string[]>,
      default: () => menus,
    }
  },
  setup(props) {
    const c = useEditorCtx()
    return () => {
      return (
        <div class="toolbar">
          {props.menus.map((menu) => renderMenuIcon(menu, c))}
        </div>
      )
    }
  }
})

export default RicheditorToolbar