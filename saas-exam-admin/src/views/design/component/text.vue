<template>
  <div>
    <DesignContainer>
      {{ text }}
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>
</template>
<script setup lang="ts">
import DesignContainer from '@/components/DesignContainer.vue';
import { ref } from 'vue';
import mountedTeleport from './mountedTeleport.vue';
const props = defineProps({
  text: {
    type: String,
    default: '请输入试卷名称'
  }
})
const formOptions = ref<Array<any>>([
  {
    prop: '',
    component: 'tip',
    text: '*设置文本内容'
  },
  {
    type: 'container',
    title: '文本内容',
    column: [{
      prop: "text",
      column: '文本内容',
      labelWid: 80,
      component: 't-textarea',
      placeholder: '请输入文本内容'
    }]
  }
])
const emit = defineEmits(["del", "input", 'update:modelValue']);
const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}

</script>
<style lang="scss" scoped>

</style>