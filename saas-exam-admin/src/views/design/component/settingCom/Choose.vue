<template>
  <div class="w-full">
  </div>
  <UploadDialog :visible="visible" :query="{
    where: {
      type: 'audio'
    }
  }" :data="{
    type: 'audio'
  }" accept=".wav, .mp3, .ogg, .acc, .webm, .amr" action="http://localhost:5000/admin/userfile">
    <div>
      <t-link>{{ typeName(type) }}</t-link>
    </div>
  </UploadDialog>
</template>

<script setup lang='ts'>
import UploadDialog from "@/components/UploadDialog.vue"
import { ref } from "vue";
interface Props {
  modelValue: string;
  type?: string;
}
const visible = ref(false)
const props = withDefaults(defineProps<Props>(), {
  type: 'img'
})
const typeName = (name: string) => {
  if (name == 'img') {
    return '图片'
  }
  if (name == 'audio') {
    return '音频'
  }
  if (name == 'video') {
    return '视频'
  }
}
// 处理选中内容
const handleChoose = () => {
  console.log('handleChoose');

  visible.value = true
}
</script>

<style></style>