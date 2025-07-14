import { defineComponent, type PropType } from "vue";
import { reactive, watch } from 'vue';
import { useEditorCtx } from "../hooks/useEditorCtx";

export default defineComponent({
    name: 'ImageOptions',
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
        alt: {
            type: String as PropType<string>,
            default: '',
        },
    },
    setup(props, { expose }) {
        const imageOptions = reactive({
            ...props,
        });
        const { form: Form, formitem: FormItem, input: Input, textarea: Textarea } = useEditorCtx()

        watch(props, () => {
            Object.assign(imageOptions, props);
        });
        expose({
            imageOptions
        })
        return () => (
            <Form
                ref="form"
                data={imageOptions}
                label-align="left"
                label-width="50px"
                style="width: 300px"
            >
                <FormItem label="宽度" name="width">
                    {/* @ts-ignore TS2604 - 组件类型问题 */}
                    <Input v-model={imageOptions.width} placeholder="请输入图片宽度" />
                </FormItem>
                <FormItem label="高度">
                    {/* @ts-ignore TS2604 - 组件类型问题 */}
                    <Input v-model={imageOptions.height} placeholder="请输入图片高度" />
                </FormItem>
                <FormItem label="地址">
                    {/* @ts-ignore TS2604 - 组件类型问题 */}
                    <Textarea v-model={imageOptions.src} placeholder="请输入图片地址" />
                </FormItem>
                <FormItem label="描述">
                    {/* @ts-ignore TS2604 - 组件类型问题 */}
                     <Input v-model={imageOptions.alt} placeholder="请输入图片描述" />
                </FormItem>
            </Form>
        )
    }
})