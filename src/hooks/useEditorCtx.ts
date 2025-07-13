import { inject } from 'vue'
import { provide_key_editor, type ProvideEditorCtx } from '../const'

export const useEditorCtx = () => {
    return inject<ProvideEditorCtx>(provide_key_editor)!
}