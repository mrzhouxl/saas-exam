<template>
    <t-upload
      :files="computedFiles"
      :headers="uploadHeaders"
      :action="uploadUrl"
      theme="image"
      :tips="tips"
      :size-limit="sizeLimit"
      :max="max"
      :multiple="multiple"
      accept="image/*"
      :format-response="formatResponse"
      @success="onSuccess"
      :locale="locale"
    />
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { SuccessContext } from 'tdesign-vue-next';
  import { userStore } from '@/store/userStore';
  
  const user = userStore();
  
  interface UploadFileItem {
    name: string;
    url: string;
    status: string;
  }
  
  interface Props {
    modelValue: string | UploadFileItem[]; // 支持单图 string，或多图数组
    max?: number;
    sizeLimit?: number;
    tips?: string;
    multiple?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    max: 3,
    sizeLimit: 1024,
    tips: '',
    multiple: true,
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const uploadUrl = `${import.meta.env.VITE_API_URL}/upload/img`;
  const imgBase = import.meta.env.VITE_IMG_BASE_URL;
  
  // ✨ 处理回显
  const computedFiles = computed(() => {
    if (!props.modelValue) return [];
  
    if (props.multiple && Array.isArray(props.modelValue)) {
      return props.modelValue.map((item) => ({
        ...item,
        url: imgBase + item.url,
      }));
    }
  
    // 单图场景
    if (!props.multiple && typeof props.modelValue === 'string') {
      return [
        {
          name: props.modelValue.split('/').pop() || 'image',
          url: imgBase + props.modelValue,
          status: 'success',
        },
      ];
    }
  
    return [];
  });
  
  // ✨ 上传响应格式化
  const formatResponse = (e: any) => {
    return {
      name: e.data.file.split('/').pop(),
      url: e.data.file,
    };
  };
  
  const locale = {
    triggerUploadText: {
      image: '请选择图片',
    },
  };
  
  const uploadHeaders = {
    Authorization: `Bearer ${user.token}`,
    'x-tenant-id': user.tenant._id,
  };
  
  // ✨ 上传成功处理
  const onSuccess = (context: SuccessContext) => {
    const file = context.file;
    const url = file?.response?.url;
    const name = file?.response?.name;
    const status = file.status as string;
  
    if (!url || !name) return;
  
    const newFile = { name, url, status };
  
    if (props.multiple) {
      const current = Array.isArray(props.modelValue) ? props.modelValue : [];
      emit('update:modelValue', [...current, newFile]);
    } else {
      emit('update:modelValue', url); // 单图模式返回字符串
    }
  };
  </script>
  