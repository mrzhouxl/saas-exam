<template>
  <div>
    <draggable :list="props.data" animation="300" @start="onStart" @end="onEnd">
      <template #item="{ element, index }">
        <div class="d-flex align-items-center">
          <span>
            <IconFont name="icon-tuozhuai"></IconFont>
          </span>
          <div class="rich-text">
            <EditerInput preIcon="icon-xiala1" @change="e => emits('change', e,index)" :model-value="element.value">
            </EditerInput>
          </div>
          <span @click="e => emits('remove', e,index)">
            <IconFont name="icon-shanchu1"></IconFont>
          </span>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable-es'
import IconFont from '@/components/Icon'
import EditerInput from '@/components/EditerInput.vue'
const props = defineProps({
  data: Array
})
const emits = defineEmits(['change','remove'])
const onStart = () => {
  console.log("开始拖拽");
};
//拖拽结束的事件
const onEnd = () => {
  console.log("结束拖拽");
};
const remove = ()=>{

}
</script>
<style scoped lang="scss">

</style>