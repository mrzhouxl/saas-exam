<template>
  <div>
    <DesignContainer>
      <t-input :placeholder="placeholder" />
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>
</template>
<script setup lang="ts">
import DesignContainer from '@/components/DesignContainer.vue';
import { ref, useAttrs } from 'vue';
import mountedTeleport from './mountedTeleport.vue';
const attrs = useAttrs()
const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入试卷名称'
  }
})
const formOptions = ref<Array<any>>([
  {
    prop:'',
    component:'tip',
    text:'*设置搜索内容'
  },
  {
    type: 'container',
    title: '搜索内容',
    column: [{
      prop: "placeholder",
      column: '搜索内容',
      labelWid: 80,
      component: 't-input'
    }]
  }
])
const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}
const emit = defineEmits(["del", "update:modelValue"]);



</script>
<style scoped lang="less">

</style>