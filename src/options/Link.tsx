import { defineComponent, reactive, watch, type PropType } from 'vue';
import { useEditorCtx } from '../hooks/useEditorCtx';

export type LinkOptionsPublic = {
    linkOptions: {
        href: string,
        text: string,
    }
}
const LinkOptions = defineComponent({
  name: 'LinkOptions',
  props: {
    href: {
      type: String as PropType<string>,
      default: '',
    },
    text: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props, { expose }) {
    const linkOptions = reactive({
      ...props,
    });
    const { form: Form, formitem: FormItem, input: Input } = useEditorCtx()

    watch(props, (val) => {
      linkOptions.href = val.href;
      linkOptions.text = val.text;
    });
    expose({
      linkOptions,
    })
    return () => {
      const { text } = props
      return (
        <Form
          ref="form"
          data={linkOptions}
          label-align="left"
          label-width="50px"
          style="width: 300px"
        >
          <FormItem label="地址" name="href">
            {/* @ts-ignore TS2604 - 组件类型问题 */}
            <Input v-model={linkOptions.href} placeholder="请输入目标地址" />
          </FormItem>
          <FormItem label="预览">
            <a href={linkOptions.href} target="_blank">{text}</a>
          </FormItem>
        </Form >
      )
    }
  }
})
export default LinkOptions