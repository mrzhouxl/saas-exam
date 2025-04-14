<template>
  <div class="componentDesign" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <slot></slot>
    <div class="delete" v-if="comDelete">
      <div class="item" @click="del">删除
        <icon-font name="icon-shanchu"></icon-font>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, useAttrs } from 'vue';
import { useDesignDelete } from '@/views/design/component/js/showDelete';
import bus from 'vue3-eventbus'
const { comDelete, mouseenter, mouseleave } = useDesignDelete();
const attrs = useAttrs()
const emit = defineEmits(["del", "input"]);
const del = () => {
  bus.emit('del', attrs.id)
  emit('del', attrs.id)
}
</script>
<style scoped lang="scss">
.componentDesign {
  position: relative;

  .delete {
    width: 80px;
    height: 30px;
    position: absolute;
    // position: relative;
    left: 370px;
    z-index: 999;
    top: 0;

    .item {
      height: 100%;
      margin-left: 10px;
      background: #fff;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      border-radius: 8px;
    }
  }
}
</style>