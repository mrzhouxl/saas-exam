<template>
  <div>
    <DesignContainer>
      <div class="header-content">
        <div class="header-text">{{ text }}</div>
        <div class="d-flex">
          <div class="header-icon-right" v-for="(item, index) in iconList" :key="index">
            <img :src="item.icon" />
            <div>
              <span>{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>
</template>
<script setup lang="ts">
import DesignContainer from '@/components/DesignContainer.vue';
import { width } from 'dom7';
import { ref } from 'vue';
import mountedTeleport from './mountedTeleport.vue';
const props = defineProps({
  text: {
    type: String,
    default: 'Hi，欢迎来到爱学习'
  },
  iconList: {
    type: Array<iconType>,
    default: () => []
  }
})
interface iconType {
  icon: string;
  value: string;
  type:string;
  link:string;
  alert:string;
  typeData:any;
}
const formOptions = ref<Array<any>>([
  {
    prop: '',
    component: 'tip',
    text: '*设置轮播图'
  },
  {
    type: 'container',
    title: '头部设置',
    column: [
      {
        prop: "text",
        column: '文本内容',
        component: 't-input',
        placeholder: '请输入文本内容',
        width: 1,
        style: {
          width: '100%'
        }
      }
    ]
  }, {
    type: 'container',
    title: '图标列表',
    column: [
      {
        prop: "iconList",
        isLabel: false,
        component: 'HeaderItem',
        width: 1
      }
    ]
  }
])
const emit = defineEmits(["del", "input", 'update:modelValue']);
const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}

</script>
<style lang="scss" scoped>
.header-content {
  display: flex;
  justify-content: space-between;

  .header-text {
    font-size: 12px;
  }

  .header-icon-right {
    display: flex;
    margin-right: 10px;

    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>