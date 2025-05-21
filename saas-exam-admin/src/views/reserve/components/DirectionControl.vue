<template>
  <div class="w-24 h-24 bg-white rounded-xl shadow-md">
    <!-- 3x3网格布局 -->
    <div class="w-full h-full grid grid-cols-3 grid-rows-3 gap-1">
      <!-- 空白格子 -->
      <div class=""></div>
      <!-- 上箭头 -->
      <div 
        @click="handleDirection('up')"
        class="flex items-center justify-center items-center cursor-pointer hover:bg-gray-100 rounded"
      >
        <!-- <div class="w-0 h-0 border-[6px] border-transparent border-b-gray-500"></div> -->
        <ArrowUpIcon />
      </div>
      <!-- 空白格子 -->
      <div class=""></div>

      <!-- 左箭头 -->
      <div 
        @click="handleDirection('left')"
        class="flex items-center justify-center cursor-pointer items-center hover:bg-gray-100 rounded"
      >
        <!-- <div class="w-0 h-0 border-[6px] border-transparent border-r-gray-500"></div> -->
        <ArrowLeftIcon />
      </div>
      <!-- 中心点 -->
      <div class="flex items-center justify-center">
        <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      </div>
      <!-- 右箭头 -->
      <div 
        @click="handleDirection('right')"
        class="flex items-center justify-center cursor-pointer items-center hover:bg-gray-100 rounded"
      >
        <!-- <div class="w-0 h-0 border-[6px] border-transparent border-l-gray-500"></div> -->
        <ArrowRightIcon />
      </div>

      <!-- 空白格子 -->
      <div class=""></div>
      <!-- 下箭头 -->
      <div 
        @click="handleDirection('down')"
        class="flex items-center justify-center cursor-pointer items-center hover:bg-gray-100 rounded"
      >
        <ArrowDownIcon />
        <!-- <div class="w-0 h-0 border-[6px] border-transparent border-t-gray-500"></div> -->
      </div>
      <!-- 空白格子 -->
      <div class=""></div>
    </div>
  </div>
</template>

<script setup>
import { ArrowUpIcon,ArrowDownIcon,ArrowLeftIcon,ArrowRightIcon } from 'tdesign-icons-vue-next'
const emit = defineEmits(['direction'])

// 方向控制处理函数
const handleDirection = (direction) => {
  emit('direction', direction)
}
</script>