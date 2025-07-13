import { Node } from "@tiptap/core";

export interface VideoOptions {
  /**
   * Controls if the youtube node should be inline or not.
   * @default false
   * @example true
   */
  inline: boolean;
}

/**
 * The options for setting a youtube video.
 */
type SetVideoOptions = {
  src: string;
  width?: number;
  height?: number;
  start?: number;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /**
       * Insert a video
       * @param options The video attributes
       * @example editor.commands.setYoutubeVideo({ src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
       */
      setVideo: (options: SetVideoOptions) => ReturnType;
    };
  }
}

/**
 * 支持插入video标签
 * @see https://www.tiptap.dev/api/nodes/youtube
 */
export const Video = Node.create<VideoOptions>({
  name: "video",
  addOptions() {
    return {
      inline: false,
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: true,
  addAttributes() {
    return {
      width: {
        default: "600",
      },
      height: {
        default: "auto",
      },
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
        getAttrs: (node) => ({
          width: node.getAttribute("width"),
          height: node.getAttribute("height"),
          src: node.querySelector("source")?.getAttribute("src"),
        }),
      },
    ];
  },
  addCommands() {
    return {
      setVideo:
        (options: SetVideoOptions) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              width: options.width,
              height: options.height,
              src: options.src,
            },
          });
        },
    };
  },

  renderHTML(props) {
    const { HTMLAttributes, node } = props;
    console.log("renderHTML:", HTMLAttributes);
    return [
      "video",
      {
        width: HTMLAttributes.width,
        height: HTMLAttributes.height,
        controls: true,
      },
      ["source", { src: node.attrs.src, type: node.attrs.type }],
    ];
  },
});
