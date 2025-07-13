# richeditor-vue3

web富文本编辑基于tiptap/vue3/prosemirror

## props

| 属性 | 类型 | ts 类型 |
| --- | --- | --- |
| v-model | String | `string` | 
| selector | Object | `{onSelect: (success: OnSelectCallback) => void;}` `type OnSelectCallback = { (src: string, type: string): void}`| 
messager | Object | `{warning: (msg: string) => void;}`| 
uibutton | Object | `ConcreteComponent`|
uiuploader | Object | `ConcreteComponent` 组件属性 `{ onSuccess(src: string, type: string): void }`| 

> 文件类型暂时只支持图片和视频

## examples

`examples/richeditor` 基础功能