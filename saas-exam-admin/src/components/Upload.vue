<template>
  <t-upload ref="uploadRef1" :headers="{
    'Authorization': `Bearer ${user.token}`,
    'x-tenant-id': user.tenant._id
  }" @success="successUpload" :data="data" :action="props.action" :multiple="props.multiple" :accept="accept"
    :formatResponse="formatResponse">
    <slot></slot>
    <template #fileListDisplay="display">
      <slot name="fileListDisplay" :files="display.files"></slot>
    </template>
  </t-upload>
</template>
<script setup lang="ts">
import IconFont from '@/components/Icon'
import { onMounted, ref } from 'vue';
import { userStore } from '@/store/userStore'
import { SuccessContext } from 'tdesign-vue-next';
import { emit } from 'process';
const props = defineProps({
  files: {
    type: String || Array,
    default: []
  },
  action: {
    type: String,
    default: 'http://localhost:5000/admin/upload/img'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'image'
  },
  data: {
    type: Object,
    default: {}
  },
  accept: {
    type: String,
    default: 'image/*'
  }
})
const emits = defineEmits(['success'])
const user = userStore()
// import { ref } from 'vue';
const files = ref<Array<{
  label?: string;
  value: string;
}> | string | any>([])

const formatResponse = (e: any) => {
  return { url: e.data.file };
};
const successUpload = (context: SuccessContext) => {
  console.log(`output->context`, context)
  if (props.multiple) {
    files.value.push({
      label: context.file?.name,
      value: context.response[0].url
    })
  } else {
    files.value = {
      label: context.file?.name,
      value: context.response.url
    };
  }
  emits('success', {
    label: context.file?.name,
    value: props.multiple ? context.response[0].url : context.response.url
  });
}
</script>
<style scope lang="scss"></style>