<template>
  <div>
    <DesignContainer>
      <div :style="{ height: `${size}px`, background: color }"></div>
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
  size: {
    type: Number,
    default: 2
  },
  color: {
    type: String,
    default: '#0052d9'
  }
})
const formOptions = ref<Array<any>>([
  {
    type: 'container',
    title: '分割占位',
    column: [{
      prop: "size",
      column: '宽度',
      component: 't-input',
      suffix: 'px',
      autoWidth: true
    }, {
      prop: "color",
      column: '颜色',
      component: 't-color-picker'
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