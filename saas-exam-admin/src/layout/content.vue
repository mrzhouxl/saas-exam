<template>
  <div class="left-menu">
    <t-layout style="height: 100vh;width:100%;">
      <t-layout>
        <t-aside style="width:210px;">
          <layoutMenu></layoutMenu>
        </t-aside>
        <t-layout>
          <t-header>
            <div class="header">
              <div class="header-right">
                <span>
                  <t-breadcrumb :max-item-width="'150'">
                    <t-breadcrumbItem to="/index">首页</t-breadcrumbItem>
                    <t-breadcrumbItem v-for="(item, index) in useLoginStore.breadcrumb.split('-')">{{
                      item
                    }}</t-breadcrumbItem>
                  </t-breadcrumb>
                </span>
              </div>
              <div class="right-user">
                <div @click="fullScreen">
                  <IconFont size="20" :name="!isFull ? 'icon-quanping' : 'icon-guanbiquanping'" >
                  </IconFont>
                </div>
                <!-- <icon name="check-circle-filled" @click="fullScreen" /> -->
                <!-- <icon name="check-circle-filled" @click="exiteFullScreen" /> -->
                <!-- <LaptopIcon /> -->
                <span>{{ user.admin?.mobile }}</span><br />
                <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
              </div>
            </div>
          </t-header>
          <t-content class="m-2 bg-white">
              <router-view></router-view>
          </t-content>
        </t-layout>
      </t-layout>
    </t-layout>
  </div>
</template>
  
<script setup lang='ts'>
import layoutMenu from './menu.vue';
import { loginStore } from '@/store/loginStore'
import { userStore } from '@/store/userStore';
import { onMounted, ref } from 'vue';
import IconFont from '@/components/Icon'
import { Icon } from 'tdesign-icons-vue-next';
const useLoginStore = loginStore();
const user = userStore()
const isFull = ref<boolean>(false);
onMounted(() => {
  console.log(user.admin)
})
const fullScreen = () => {
  // 获取要全屏显示的元素
  var elem: any = document.documentElement;
  // 如果当前的浏览器支持 Fullscreen API
  if (elem.requestFullscreen && !isFull.value) {
    isFull.value = true;
    // 进入全屏模式
    elem.requestFullscreen();
  } else {
    isFull.value = false;
    document.exitFullscreen();
  }
}
</script>
  
<style lang="less" scoped>
.left-menu {
  height: 100vh;
  width: 100%;
}

.content {
  box-sizing: border-box;
  background: #fff;
  height: 100%;
  width: 100%;
}

.header {
  height: 100%;
  display: flex;
  align-items: center;

  .header-right {
    flex: 1;
  }

  .right-user {
    align-items: center;
    display: flex;
    justify-content: space-around;
    width: 150px;
  }
}
</style>