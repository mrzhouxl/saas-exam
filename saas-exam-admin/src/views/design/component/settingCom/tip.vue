<template>
  <div class="text">
    <span :style="{color}">
      {{ text }}
    </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  text: String,
  color:String
})
</script>
<style scoped lang="scss">
.text {
  min-height: 25px;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}
</style>