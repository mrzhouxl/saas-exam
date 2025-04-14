<template>
  <div>
    <DesignContainer class="container">
      <nut-tabs @update:modelValue="onChange" :modelValue="currentValue" :background="background" :align="align">
        <nut-tab-pane v-for="(item, index) in tabItem" :key="index" :title="item.label" :pane-key="index">
          Content 1
        </nut-tab-pane>
      </nut-tabs>
      <!-- <Tabs :value="currentValue" @change="onChange" :theme="theme">
        <TabPanel v-for="(item, index) in tabItem" :key="index" :value="item.value" :label="item.label">
          <p>11</p>
        </TabPanel>
      </Tabs> -->
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>
</template>
<script setup lang="ts">
import DesignContainer from '@/components/DesignContainer.vue';
import mountedTeleport from './mountedTeleport.vue';
import { ref, useAttrs, watch } from 'vue';
const currentValue = ref(0)
const attrs = useAttrs()
interface TabProps {
  tabItem: Array<any>;
  theme: 'line' | 'tag' | 'card',
  activeColor: string;
  background: string;
  align: string;
  headerTextColor: string;
}
const props = withDefaults(defineProps<TabProps>(), {
  tabItem: () => [
    {
      value: 'first',
      label: '选项1',
    },
    {
      value: 'second',
      label: '选项2',
    },
    {
      value: 'third',
      label: '选项3',
    },
  ],
  theme: 'line',
  activeColor: '#0A65FB',
  align: 'center'
})
const formOptions = ref<Array<any>>([
  {
    prop: '',
    component: 'tip',
    text: '*基础设置'
  },
  {
    type: 'container',
    title: '选项设置',
    column: [
      {
        prop: 'activeColor',
        column: '激活颜色',
        component: 't-color-picker',
        size: 'small',
        format: "CSS",
        colorModes: "['linear-gradient']"
      },
      {
        prop: 'headerTextColor',
        column: '激活文字颜色',
        component: 't-color-picker',
        size: 'small',
        format: "CSS",
        colorModes: "['linear-gradient']"
      },
      {
        prop: 'theme',
        column: "选项样式",
        labelWid: 80,
        component: 'RadioGroup',
        items: [
          {
            value: 'line',
            label: '默认'
          },
          {
            value: 'tag',
            label: '标签'
          },
          {
            value: 'card',
            label: '卡片'
          }
        ]
      }, {
        prop: "tabItem",
        column: '选项类别',
        labelWid: 80,
        component: 'MutilpItem',
        
      }, {
        prop: 'background',
        column: '标题栏背景颜色',
        component: 't-color-picker',
        size: 'small',
        format: "CSS",
        colorModes: "['linear-gradient']"
      }, {
        prop: 'align',
        column: "对齐方式",
        labelWid: 80,
        component: 'RadioGroup',
        items: [
          {
            value: 'center',
            label: '居中'
          },
          {
            value: 'left',
            label: '左对齐'
          }
        ]
      }
    ]
  }
])
watch(() => props.tabItem, (newVal, oldVal) => {
  currentValue.value = 0
})
const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}
const emit = defineEmits(["del", "update:modelValue"]);

const onChange = (value: any) => {
  currentValue.value = value;
};
</script>
<style scoped lang="less">
.container {
  padding: 0;
  --nut-tabs-horizontal-tab-line-color: v-bind(activeColor);
  --nut-tabs-titles-item-color: v-bind(headerTextColor);
}
</style>