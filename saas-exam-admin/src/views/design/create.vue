<template>
  <div class="design-content h-full">
    <div class="h-[60px] flex border-b">
      <div class="w-[400px] flex pl-10 items-center">
        <span class="w-[30px] text-center hover:bg-slate-50 cursor-pointer" @click="$router.go(-1)">
          <RollbackIcon />
        </span>
        <div>
          <img width="30" class="t-menu__logo--center" src="@/assets/img/logo/logo.png" alt="logo"
            style="width: 150px;height: 30px;object-fit:scale-down;" />
        </div>
      </div>
      <div class="flex-1 items-center flex justify-center">
        <div class="w-[600px] flex justify-around">
          <t-dropdown :options="commonSetting">
            <t-button>常用设置</t-button>
          </t-dropdown>
          <t-button variant="text" theme="default">发布</t-button>
          <t-button variant="text" theme="default">保存</t-button>
          <span class="w-[30px] text-center hover:bg-slate-50 cursor-pointer">
            <DownloadIcon />
          </span>
          <span class="w-[30px] text-center hover:bg-slate-50 cursor-pointer">
            <ImageIcon />
          </span>
          <t-button variant="text" theme="default">预览</t-button>
          <t-button variant="text" theme="default">使用文档</t-button>
        </div>
      </div>
      <div class="w-[400px] flex items-center justify-center">
        <div class="w-[200px] flex justify-between">
          <t-button theme="default" variant="outline">页面设置</t-button>
          <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
        </div>
      </div>
    </div>
    <div class="flex h-full">
      <!-- <div class="w-[60px]  border-r"> -->
      <!-- </div> -->
      <div class="left h-full">
        <sider class="h-full" @handleCom="basicsHandle"></sider>
      </div>
      <div class="middle">
        <div class="phone">
          <div class="h5top">
            <img :src="phoneHeader" />
          </div>
          <div class="designContent">
            <template v-for="(item, index) in com">
              <component :class="{ 'current-active': current == index }" :id="item.id"
                @update:modelValue="(props: any) => setProps(item.id, props)" v-bind="item.props"
                :modelValue="item.props" @del="comDelete" @mousedown.native="current = index"
                :active="current === index" class="com" :is="item.is">
              </component>
            </template>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="component-setting">
          <font>组件设置</font>
        </div>
        <div id="designSetting"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, provide, ref, resolveDynamicComponent } from "vue";
import './design.less'
import { v4 as uuidv4 } from 'uuid';
import bus from 'vue3-eventbus'
import { RollbackIcon, DownloadIcon, ImageIcon } from 'tdesign-icons-vue-next'
import sider from './component/sider.vue';
import phoneHeader from '../../assets/img/h5top.png'
const current = ref<number>()
const commonSetting = [
  { content: '新建界面', value: 1 },
  { content: '清空界面', value: 2 },
]
const com = ref<Array<any>>([])
const basicsHandle = (e: any) => {
  // let c = comData.find(v => v.is === e.is)
  com.value.push({
    id: uuidv4(),
    ...e
  })

}
const comDelete = (id: string) => {
  let i = com.value.findIndex(v => v.id === id)
  com.value.splice(i, 1)
}
bus.on('del', comDelete)
const setProps = (id: string, props: any) => {
  let i = com.value.findIndex(v => v.id === id);
  com.value[i].props = JSON.parse(JSON.stringify(props));
}
</script>
<style lang="scss" scoped>
.design-content {
  height: calc(100vh - 60px);

  .left {
    padding: 5px;
    display: flex;
    flex-direction: column;

    .mini-tip {
      margin-top: 20px;
      height: 40px;
      line-height: 40px;
      color: #595961;
      font-weight: 600;
    }

    .basics {
      border-top: 1px solid #EFF1F4;
    }

    .business {
      border-top: 1px solid #EFF1F4;
      display: flex;
    }
  }

  .right {
    .component-setting {
      height: 40px;
      font-weight: 600;
      border-bottom: 1px solid #EBEEF5;

      font {
        font-size: 16px;
      }
    }
  }
}
</style>