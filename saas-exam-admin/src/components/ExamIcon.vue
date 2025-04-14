<template>
  <div class="exam-icon-button d-flex">
    <IconFont :name="icon"></IconFont>
    <div class="button-name ml-8">{{typeName}}</div>
  </div>
</template>
<script setup lang="ts">
import IconFont from '@/components/Icon';
const props = defineProps({
  icon: String,
  type: String,
  typeName: String
})
</script>
<style scoped lang="scss">
.exam-icon-button {
  width: 100px;
  align-items: center;
  justify-content: center;
  height: 30px;
  border: 1px solid #EEEEEE;
  margin-right: 8px;
  margin-top: 8px;
  &:hover{
    border: 1px solid #0A65FB;
    cursor: pointer;
  }
}
</style>