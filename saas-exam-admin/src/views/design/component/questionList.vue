<template>
  <div>
    <DesignContainer>
      <div class="question-header">
        <div class="title">
          题库
        </div>
        <div class="all">全部></div>
      </div>
      <div class="content-list">
        <template v-for="item in items">
          <div class="item-list">
            <div class="item-time">
              <span>开放时间：</span>
              <!-- {{ item.time }} -->
            </div>
            <!-- <div class="question-title"><b>{{ item.title }}</b></div> -->
            <div class="d-flex justify-content-between item-time">
              <div><span>数量：100</span></div>
              <t-button size="small" theme="danger">开始练习</t-button>
            </div>
          </div>
        </template>
      </div>
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>
</template>
<script setup lang="ts">
import DesignContainer from '@/components/DesignContainer.vue';
import { ref } from 'vue';
import mountedTeleport from './mountedTeleport.vue';
const props = defineProps({
  items: Array<any>
})
const formOptions = ref<Array<any>>([
  {
    prop: '',
    component: 'tip',
    text: '*设置题库'
  },
  {
    type: 'container',
    title: '头部设置',
    column: [
      {
        prop: "items",
        column: '题库',
        component: 'ContentList',
        width: 1,
        type: 'question',
        isMultiple: true
      }
    ]
  }
])
const emit = defineEmits(["del", "input", 'update:modelValue']);
const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}
</script>
<style scoped lang="scss">
.question-header {
  display: flex;
  justify-content: space-between;

  .title {
    font-size: 16px !important;
  }
}

.content-list {
  display: flex;
  height: 110px;
  padding: 10px;
  padding-left: 0px;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .item-list {
    border-radius: 8px;
    height: 100%;
    min-width: 240px;
    border: 1px solid #EBEBEB;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 10px #EBEBEB;
    margin-right: 10px;

    .question-title {
      font-size: 15px;
    }

    .item-time {
      color: #A9A9A9;
      font-size: 12px;
    }

  }
}
</style>