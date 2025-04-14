<template>
  <t-radio-group size="small" @change="changeRadio" :value="modelValue" variant="default-filled"
    :default-value="modelValue">
    <template v-for="(item, index) in items">
      <t-radio-button :value="item.value">{{ item.label }}</t-radio-button>
    </template>
  </t-radio-group>
</template>

<script setup lang='ts'>
const props = defineProps<{
  modelValue: {},
  items: Array<any>
}>()

const emits = defineEmits(['update:modelValue'])
const changeRadio = async (v: any, index: any) => {
  // const value = cloneDeep(props.modelValue);
  emits('update:modelValue', v)
}
</script>

<style></style>