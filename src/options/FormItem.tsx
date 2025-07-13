import { defineComponent, type PropType } from "vue";

export const FormItem = defineComponent({
    name: 'FormItem',
    props: {
        label: {
            type: String as PropType<string>,
            default: '',
        },
        name: {
            type: String as PropType<string>,
            default: '',
        },
    },
    setup(_, { slots }) {
        return () => <div class="form-item">{ slots.default?.() }</div>
    }
})

export const Form = defineComponent({
    name: 'Form',
    props: {
        data: {
            type: Object as PropType<any>,
        },
    },
    setup(_, { slots }) {
        return () => (
            <div class="form">
                { slots.default?.() }
            </div>
        )
    }
})