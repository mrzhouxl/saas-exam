<template>
  <draggable :list="props.data" animation="300" @start="onStart" @end="onEnd">
    <template #item="{ element, index }">
      <div class="mb-2">
        <div class="d-flex align-items-center">
          <span>
            <IconFont name="icon-tuozhuai"></IconFont>
          </span>
          <div class="rich-text">
            <EditerInput @change="e => emits('change', e, index)" :model-value="element.value">
            </EditerInput>
          </div>
          <span @click="e => emits('remove', e, index)">
            <IconFont name="icon-shanchu1"></IconFont>
          </span>
        </div>
        <div class="ps-4">
          <t-input disabled style="width: 250px;"></t-input>
        </div>
      </div>
    </template>
  </draggable>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable-es'
import IconFont from "@/components/Icon";
import EditerInput from "@/components/EditerInput.vue";
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['change', 'remove'])

const onStart = () => {

}
const onEnd = () => { }
</script>
<style scoped></style>