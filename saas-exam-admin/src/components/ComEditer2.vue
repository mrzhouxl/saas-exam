<template>
  <div style="border: 1px solid #ccc;width: 100%;">
    <Toolbar style="border-bottom: 1px solid #ccc;" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="width: 100%;height:auto;" :modelValue="modelValue" @update:modelValue="valueHtml"
      :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onFocus="focusHandle" @onBlur="blurHandle" />
  </div>
</template>
<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig } from '@wangeditor/editor'
import services from '@/utils/axios'

export default {
  components: { Editor, Toolbar },
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const focus = ref<boolean>(false)
    // 内容 HTML
    const valueHtml = (e: any) => {
      emit('update:modelValue', e)
    }
    const focusHandle = () => {
      focus.value = true;
    }
    const blurHandle = () => {
      focus.value = false;
    }
    // 模拟 ajax 异步获取内容
    let editorConfig: Partial<IEditorConfig> = {
      placeholder: '请输入内容...', hoverbarKeys: {}, MENU_CONF: {
        uploadImage: {
          // 小于该值就插入 base64 格式（而不上传），默认为 0
          base64LimitSize: 5 * 1024, // 5kb
          allowedFileTypes: ['image/*'],
          async customUpload(file:any, insertFn:any) { // 文件上传
            const formData = new FormData();
            formData.set('file', file)
            // 这里根据自己项目封装情况，设置上传地址
            let result = await services.post('/upload/img', formData)
            // 插入到富文本编辑器中，主意这里的三个参数都是必填的，要不然控制台报错：typeError: Cannot read properties of undefined (reading 'replace')
            insertFn(result.data.file, result.data.name, result.data.name)
          }
        }
      }
    }
    // onMounted(() => {
    //   editorConfig.MENU_CONF['uploadImage'] = {
    //     server: '/api/upload-image',
    //     fieldName: 'custom-field-name'
    //   }
    // })

    const toolbarConfig = {
      toolbarKeys: ['bold', 'underline', 'color', 'italic', "bgColor", 'through', 'sub', 'sup', 'clearStyle', 'uploadVideo', 'uploadImage']
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    onMounted(() => {

    })
    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      focus,
      handleCreated,
      focusHandle,
      blurHandle
    };
  }
}
</script>
<style></style>    