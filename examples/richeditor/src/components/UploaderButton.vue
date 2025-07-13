<template>
    <div>
        <input type="file" hidden ref="input" @change="handleChange" />
        <div @click="trigger">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
const props = defineProps<{
    onSuccess(src: string, type: string): void
}>()
const file = useTemplateRef("input")
const trigger = () => {
    file.value?.click()
}
const handleChange = async (e: Event) => {
    const files = (e.target as HTMLInputElement)?.files
    if (!files || files?.length == 0) {
        return
    }
    const file = files[0] as File
    // 仅演示,实际使用url
    const dataurl = await readFileAsDataURL(file)
    props.onSuccess(dataurl, 'image')
}
function readFileAsDataURL(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result as string);
        };

        reader.onerror = function () {
            reject(new Error('读取文件失败'));
        };

        reader.readAsDataURL(file);
    });
}
</script>