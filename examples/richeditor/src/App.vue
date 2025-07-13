<template>
  <div id="app">
    <h2>可视化编辑器<a href="https://github.com/ueberdosis/tiptap">tiptap</a>试验区域</h2>
    <p>TiptapRichEditor</p>
    <div>
      <h2>示例</h2>
      <nav>
        <h3>web html编辑器</h3>
        <!-- <router-link to="/about">
          <h3>markdown编辑器</h3>
        </router-link> -->
      </nav>
    </div>
    <div class="container">
      <div>
        <MyEditor v-model="content" />
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyEditor from './components/MyEditor.vue';
export default defineComponent({
  components: {
    MyEditor,
  },
  name: 'App',
  data() {
    return {
      
    }
  }
})
</script>