<template>
  <div class="">
    <template v-for="(item, index) in (modelValue as any)">
      <div class="flex items-center p-1">
        <div class="flex justify-between">
          <t-input :style="{ width: width + 'px' }" :modelValue="item.label"
            @update:modelValue="(e: any) => updateLabel(e, index)"></t-input>
          <!-- icon选择 -->
          <t-popup trigger="click" v-if="isIcon">
            <div class="w-[30px] h-[30px] border ml-1 cursor-pointer flex items-center justify-center">
              <IconFont :name="item.icon"></IconFont>
            </div>
            <template #content>
              <div class="w-[200px] grid grid-cols-5 grid-flow-row gap-1 p-1">
                <template v-for="icon in icons">
                  <div @click="chooseIcon(icon, index)"
                    class="flex w-[30px] h-[30px] cursor-pointer  items-center justify-center hover:bg-slate-50">
                    <IconFont color="#000000" :name="icon"></IconFont>
                  </div>
                </template>
              </div>
            </template>
          </t-popup>
          <t-link link class="w-[40px] justify-center" v-if="isAction">行为</t-link>
        </div>
        <span class="px-1 cursor-pointer" @click="remove(item.value)">
          <t-icon name="minus-circle-filled"></t-icon>
        </span>
      </div>
    </template>
    <div class="mt-1">
      <t-button @click="pushItem">新增数据</t-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import * as _ from 'lodash'
import { IconFont } from 'tdesign-icons-vue-next'
import { v4 as uuid } from 'uuid'
interface MutilsProps {
  modelValue: any;
  isIcon?: boolean;
  width?: number;
  isAction?:boolean;
}
const props = withDefaults(defineProps<MutilsProps>(), {
  modelValue: {
  },
  width: 160,
  isAction:false
})
const icons: string[] = [
  'add-rectangle',
  'filter-clear',
  'ellipsis',
  'check-rectangle',
  'share',
  'load'
]
const emits = defineEmits(['update:modelValue'])
const updateLabel = (e: any, index: number) => {
  const value = _.cloneDeep(props.modelValue)
  _.set(value, [index, 'label'], e)
  emits('update:modelValue', value)
}
const pushItem = () => {
  const value = _.cloneDeep(props.modelValue)
  value.push({
    value: uuid(),
    label: '新增项'
  })
  emits('update:modelValue', value)
}
const chooseIcon = (icon: string, index: number) => {
  const value = _.cloneDeep(props.modelValue)
  _.set(value, [index, 'icon'], icon)
  console.log(`output->icon`, value)
  emits('update:modelValue', value)
}
const remove = (val: string) => {
  const value = _.cloneDeep(props.modelValue)
  const index = value.findIndex((v: any) => v.value == val)
  value.splice(index, 1)
  emits('update:modelValue', value)
}
</script>

<style></style>