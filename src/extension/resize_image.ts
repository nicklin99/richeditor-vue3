import { Extension } from "@tiptap/core";

// 图片调整大小
export interface ResizeImageOptions {
  /**
   * image width
   * @example ['100px']
   */
  width: string | null;
  /**
   * image height
   * @example ['100px']
   */
  height: string | null;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resize_image: {
      resizeImage: (options: { width: string | null, height: string | null }) => ReturnType;
    };
  }
}

export const ResizeImage = Extension.create<ResizeImageOptions>({
  name: "resize_image",
  addOptions() {
    return {
      width: null,
      height: null,
    };
  },
  addCommands() {
    return {
      resizeImage:
        (options) => (ctx) => {
          const { commands } = ctx
          return commands.updateAttributes('image', options)
        },
    };
  },
});
