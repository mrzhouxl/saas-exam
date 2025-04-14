<template>
  <div>
    <DesignContainer>
      <t-swiper :duration="300" :interval="2000">
        <t-swiper-item v-for="(item, index) in items" :key="index">
          <img style="width:100%;height:200px;" :src="item.image" />
        </t-swiper-item>
      </t-swiper>
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <!-- {{ $props }} -->
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>
</template>
<script setup lang="ts">
import { ref, useAttrs } from 'vue';
import mountedTeleport from './mountedTeleport.vue';
import { useDesignDelete } from './js/showDelete';
import IconFont from '@/components/Icon'
import DesignContainer from '@/components/DesignContainer.vue';
const { comDelete, mouseenter, mouseleave } = useDesignDelete()
const props = defineProps({
  items: {
    type: Array<{
      image: ''
    }>,
    default: () => []
  },
  only:Boolean
})
const isShowSetting = ref<boolean>(false);
const formOptions = ref<Array<any>>([
  {
    prop:'',
    component:'tip',
    text:'*设置轮播图'
  },
  {
    prop: "items",
    only:true,
    component: 'SwiperSetting',
  }
])
const desginHandle = () => {
  isShowSetting.value = true
}
const emit = defineEmits(["del", "update:modelValue"]);

const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}
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