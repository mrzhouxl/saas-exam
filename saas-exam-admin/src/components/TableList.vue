<template>
  <div class="w-full">
    <template v-for="item in data">
      <div @click="chooseTable(item._id)" class="flex w-full items-center cursor-pointer hover:bg-slate-300">
        <IconFont name="icon-shujuku1"></IconFont>
        <span class="ml-1 text-xs">{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>
  
<script setup lang='ts'>
import IconFont from './Icon'
interface Props {
  data: Array<any>
}
const props = defineProps<Props>();
const emits = defineEmits(['choose'])
const chooseTable = (_id: number) => {
  emits('choose', _id)
}
</script>
  
<style></style>