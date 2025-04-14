<template>
  <div class="content" :contenteditable="props.isContentEditable">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  isContentEditable: {
    type: Boolean,
    default: true
  }
})
</script>
<style scoped lang="scss">
.content {
  &[contentEditable="true"] {
    background: #f4f4f4;
    cursor: auto;
    border: none;
  }
}
</style>