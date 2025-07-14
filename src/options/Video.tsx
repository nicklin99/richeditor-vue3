import { defineComponent, reactive, watch, type PropType } from 'vue';
import { useEditorCtx } from '../hooks/useEditorCtx';

export type VideoOptionsPublic = {
  videoOptions: {
    width: string
    height: string
    src: string
  }
}
export default defineComponent({
  name: 'VideoOptions',
  props: {
    width: {
      type: String as PropType<string>,
      default: '',
    },
    height: {
      type: String as PropType<string>,
      default: '',
    },
    src: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props, { expose }) {
    const videoOptions = reactive({
      ...props,
    });
    const { form: Form, formitem: FormItem, input: Input, textarea: Textarea } = useEditorCtx()
    watch(props, () => {
      Object.assign(videoOptions, props)
    });
    expose({
      videoOptions
    })
    return () => (
      <Form
        ref="form"
        data={videoOptions}
        label-align="left"
        label-width="50px"
        style="width: 300px"
      >
        <FormItem label="宽度" name="width">
          {/* @ts-ignore TS2604 - 组件类型问题 */}
          <Input v-model={videoOptions.width} placeholder="请输入视频宽度" />
        </FormItem>
        <FormItem label="高度">
          {/* @ts-ignore TS2604 - 组件类型问题 */}
          <Input v-model={videoOptions.height} placeholder="请输入视频高度" />
        </FormItem>
        <FormItem label="地址">
          {/* @ts-ignore TS2604 - 组件类型问题 */}
          <Textarea v-model={videoOptions.src} placeholder="请输入视频地址" />
        </FormItem>
      </Form>
    )
  }
})

