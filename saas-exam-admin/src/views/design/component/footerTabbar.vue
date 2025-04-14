<template>
  <!-- <DesignContainer class="absolute bottom-0 w-full"> -->
  <div class="absolute bottom-0 w-full">
    <DesignContainer>
      <nut-tabbar :active-color="activeColor" :unactive-color="unactiveColor">
        <nut-tabbar-item :tab-title="item.label" v-for="item in items" :icon="item.icon">
          <template #icon="prop">
            <IconFont :name="item.icon"></IconFont>
          </template>
        </nut-tabbar-item>
      </nut-tabbar>
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>

</template>

<script setup lang='ts'>
import DesignContainer from '@/components/DesignContainer.vue';
import { ref, useAttrs, h } from 'vue';
import mountedTeleport from './mountedTeleport.vue';
import bus from 'vue3-eventbus'
import { useDesignDelete } from './js/showDelete';
import { IconFont } from 'tdesign-icons-vue-next';
const { comDelete, mouseenter, mouseleave } = useDesignDelete();
const attrs = useAttrs()
interface Tabbar {
  items?: any[any];
  activeColor: string;
  unactiveColor: string;
  placeholder: boolean;
}
const del = () => {
  bus.emit('del', attrs.id)
  emit('del', attrs.id)
}
const props = withDefaults(defineProps<Tabbar>(), {
  items: [
    {
      icon: 'home',
      label: '首页',
      link: ''
    },
    {
      icon: 'home',
      label: '首页',
      link: ''
    },
    {
      icon: 'home',
      label: '首页',
      link: ''
    }, {
      icon: 'home',
      label: '首页',
      link: ''
    }
  ],
  activeColor: '#0A65FB',
  unactiveColor: '#7d7e80'
})
const formOptions = ref<Array<any>>([
  {
    prop: '',
    component: 'tip',
    text: '*设置导航条内容'
  },
  {
    type: 'container',
    title: '配置',
    column: [
      {
        prop: "items",
        column: '导航配置',
        labelWid: 80,
        component: 'MutilpItem',
        isIcon: true,
        width: 100,
        isAction: true
      },
      {
        prop: 'activeColor',
        column: '激活颜色',
        component: 't-color-picker',
      },
      {
        prop: 'unactiveColor',
        column: '未激活颜色',
        component: 't-color-picker',
      }
    ]
  }
])
const emit = defineEmits(["del", "input", 'update:modelValue']);
const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}

</script>

<style></style>