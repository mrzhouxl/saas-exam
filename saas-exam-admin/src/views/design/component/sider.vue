<template>
  <div class="h-full">
    <t-tabs class="h-full" size="large" :value="value" :placement="placement" @change="handlerChange">
      <t-tab-panel value="base">
        <template #label>
          <span class="">
            <t-icon name="layers" class="tabs-icon-margin" />
            基础
          </span>
        </template>
        <div class="grid grid-cols-2 gap-1">
          <div class="w-[90px] h-[95px] cursor-pointer flex flex-col justify-center items-center hover:bg-[#F8F9FA]"
            v-for="(item, index) in basics" :key="index" @click="basicsHandle(item)">
            <div>
              <img style="width:74px;height:45px;"
              :src="IconSearch" />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </t-tab-panel>
      <t-tab-panel value="media" label="选项卡2">
        <template #label>
          <span class="">
            <t-icon name="video" class="tabs-icon-margin" />
            媒体
          </span>
        </template>
        <div class="grid grid-cols-2 gap-1">
          <div class="w-[90px] h-[95px] cursor-pointer flex flex-col justify-center items-center hover:bg-[#F8F9FA]"
            v-for="(item, index) in media" :key="index" @click="basicsHandle(item)">
            <div>
              <img style="width:74px;height:45px;"
              :src="IconSearch" />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </t-tab-panel>
      <t-tab-panel value="business">
        <template #label>
          <span class="">
            <t-icon name="view-module" class="tabs-icon-margin" />
            业务
          </span>
        </template>
        <div class="grid grid-cols-2 gap-1">
          <div class="w-[90px] h-[95px] cursor-pointer flex flex-col justify-center items-center hover:bg-[#F8F9FA]"
            v-for="(item, index) in business" :key="index" @click="basicsHandle(item)">
            <div>
              <img style="width:74px;height:45px;"
                :src="IconSearch" />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
      </t-tab-panel>
      <t-tab-panel value="my" label="选项卡3">
        <template #label>
          <span class="">
            <t-icon name="user" class="tabs-icon-margin" />
            我的
          </span>
        </template>
        <p style="padding: 25px">选项卡3</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import IconSearch from '@/assets/img/search.png'
const value = ref('base');
const placement = ref('left');
const comData = [
  {
    is: 'swiper',
    props: {
      items: [
        // {
        //   name:'11222',
        //   image: 'https://worthdaily-app.oss-cn-hangzhou.aliyuncs.com/files/1662002380085-5eac63182543f541.png'
        // },
        // {
        //   name:'333',
        //   image: 'https://worthdaily-app.oss-cn-hangzhou.aliyuncs.com/files/1641805253137-4ece85df5733adba.png'
        // }
      ],
      only:true
    }
  }, {
    is: 'search',
    props: {}
  }, {
    is: 'notice',
    props: {}
  }, {
    is: 'text',
    props: {}
  }, {
    is: 'division',
    props: {
      size: 10,
      color: '#0052d9'
    }
  }, {
    is: 'pageHeader',
    props: {
      text: 'Hi，欢迎来到爱学习',
      iconList: [
        {
          icon: 'http://localhost:5000/å®¢æ.png',
          value: '1111',
          type: 'alert'
        }
      ]
    }
  }, {
    is: 'QuestionList',
    props: {
      items: []
    }
  }, {
    is: 'CustomTabs',
    props: {

    }
  }, {
    is: 'FooterTabbar',
    props: {

    }
  },{
    is:'CustomAudio',
    props:{}
  }
]
const handlerChange = (newValue: any) => {
  value.value = newValue;
};
const basics = [
  {
    name: '搜索',
    iconImage: '',
    is: 'search'
  },
  {
    name: '轮播',
    iconImage: '',
    is: 'swiper'
  }, {
    name: '通知',
    iconImage: '',
    is: 'notice'
  }, {
    name: '文本',
    iconImage: '',
    is: 'text'
  }, {
    name: '首页头部',
    iconImage: '',
    is: 'pageHeader'
  }, {
    name: '分割占位',
    iconImage: '',
    is: 'division'
  }, {
    name: '标题栏',
    iconImage: '',
    is: ''
  }, {
    name: '选项卡',
    iconImage: '',
    is: 'CustomTabs'
  }, {
    name: '底部导航',
    iconImage: '',
    is: 'FooterTabbar'
  }
]
const media = [
  {
    name: '音频',
    iconImage: '',
    is: 'CustomAudio'
  }, {
    name: '视频',
    iconImage: '',
    is: 'CustomVideo'
  }
]
const business = [
  {
    name: '视频组件',
    iconImage: '',
    is: 'question'
  }, {
    name: '专题文章',
    iconImage: '',
    is: ''
  }
]
const emits = defineEmits(['handleCom'])
const handleSide = (e: any) => {
  // siderType
}
const basicsHandle = (e: any) => {
  let c = comData.find(v => v.is === e.is)
  emits('handleCom', c)
}
</script>

<style scoped>
:deep(.t-tabs__content) {
  height: 100%;
}

:deep(.t-tabs__header) {
  height: 100% !important;
}

:deep(.t-tabs__header .t-tabs__nav) {
  height: 100% !important;
}

:deep(.t-tabs__nav-container) {
  height: 100%;
}
</style>