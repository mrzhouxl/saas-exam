<template>
  <div>
    <DesignContainer>
      <van-notice-bar left-icon="volume-o" :text="text" />
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>
</template>
<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue';
import mountedTeleport from './mountedTeleport.vue';
import DesignContainer from '@/components/DesignContainer.vue';
const attrs = useAttrs()
const props = defineProps({
  text: {
    type: String,
    default: '请输入文本'
  },
  jumpType: {
    type: String,
    default: ''
  },
  jumpValue: {
    type: String,
    default: ''
  }
})
const formOptions = ref<Array<any>>([
  {
    prop: '',
    component: 'tip',
    text: '*设置通知类型以及跳转路径'
  },
  {
    type: 'container',
    title: '通知设置',
    column: [
      {
        prop: "text",
        column: '通知内容',
        labelWid: 80,
        component: 't-input'
      }, {
        prop: "jumpType",
        column: '跳转类型',
        labelWid: 80,
        component: 't-select',
        options: [
          { label: '试卷', value: '1' },
          { label: '落地页', value: '2' }
        ]
      }, {
        prop: "jumpValue",
        column: '跳转路径',
        labelWid: 80,
        component: 't-select',
        options: []
      }
    ]
  }
])
const emit = defineEmits(["del", "input", 'update:modelValue']);
const del = () => {
  emit('del', attrs.id)
}
const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}
watch(() => props.jumpType, (n, o) => {
  if (n === '1') {
    formOptions.value[0][2]['options'] = [{ label: '测试', value: '1' },
    { label: '测试', value: '2' }]
  } else {
    formOptions.value[2]['options'] = [{ label: '测试2', value: '1' },
    { label: '测试2', value: '2' }]
  }
})
</script>
<style scoped lang="less">
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