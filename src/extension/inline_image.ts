import Image from "@tiptap/extension-image";

// 图片都设置 inline, 不采用 block
export const InlineImage = Image.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      inline: true,
    };
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },
});
