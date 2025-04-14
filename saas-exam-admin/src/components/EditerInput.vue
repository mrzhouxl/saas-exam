<template>
  <div class="d-flex editer-hover">
    <span>
      <IconFont :name="props.preIcon"></IconFont>
    </span>
    <div id="item-editer" @click="handleSelectItem" @blur="change" contenteditable="true" v-html="modelValue"
      class="selectEditable w-100">
    </div>
  </div>
</template>
<script setup lang="ts">
import IconFont from "@/components/Icon"
import { useCommand } from '@/utils/useCommand'
const { checkCursorContent } = useCommand()
const props = defineProps({
  modelValue: String,
  preIcon: String,
  height: String,
  width: String,
})
const emits = defineEmits(['change'])
const change = (e: FocusEvent) => {
  emits('change', e)
}
const handleSelectItem = (e: Event) => {
}
</script>
<style scoped lang="scss">
.rich-text-item {
  display: flex;
  align-items: center;
  min-width: 350px;
  min-height: 35px;
}
// .editer-hover{
//   border: 1px dashed #999999 !important;
// }
.selectEditable {
  min-width: 240px;
  margin-left: 8px;

  // height: 34px;
  // font: initial;
  &:v-deep p {
    padding: 0 !important;
    margin: 0 !important;
  }
  // &:hover{
  //   border: 1px dashed #999999 !important;
  // }
  &:focus-within {
    background: #f4f4f4;
    cursor: auto;
    outline: none;
  }
}
</style>