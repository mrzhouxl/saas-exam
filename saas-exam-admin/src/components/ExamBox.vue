<template>
  <ul class="box-list">
    <template v-for="item in props.examcom.length">
      <li :class="{ 'activate': props.examcom[item-1]._id === props.current._id }" @click="handleExamBox(item)" class="box-item">
        {{ item }}</li>
    </template>
  </ul>
</template>
<script setup lang="ts">
const props = defineProps({
  examcom: {
    type: Array,
    default: () => [],
  },
  current: Object
})
const emits = defineEmits(['boxClick'])
const handleExamBox = (e: any) => {
  console.log(props.examcom, 'props.examcom');

  emits('boxClick', props.examcom[e - 1]);
}
</script>
<style scoped lang="scss">
.activate{
  background-color: #0A65FB;
  color:#fff;
}
.box-list {
  display: flex;
  list-style: none;
  width: 100%;
  // padding: 10px;
  flex-wrap: wrap;
  padding: 0;

  .box-item {
    width: 30px;
    height: 30px;
    border: 1px solid #0A65FB;
    text-align: center;
    line-height: 30px;
    margin-right: 3px;
    margin-top: 3px;

    &:hover {
      background-color: #0A65FB;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>