<template>
  <div class="container1 ">
    <t-menu v-model:expanded="expanded" width="220px" theme="light" v-model="menuValue1">
      <template #logo>
        <img width="30" class="t-menu__logo--center" src="@/assets/img/logo/logo.png" alt="logo"
          style="width: 150px;height: 30px;object-fit:scale-down;" />
      </template>
      <t-menu-item to="/upload/upload">
        &nbsp;
        文件上传
      </t-menu-item>
      <!-- <template v-for="(item, index) in useLoginStore.menus">
        <t-submenu :value="item.path" :title="item.name">
          <template v-for="(item2, index2) in item.children">
            <t-menu-item :to="item2.path" :value="item2.path"> {{ item2.name }}
              <template #icon>
                <icon-font :size="item2.size" :name="item2.icon"></icon-font>
              </template>
            </t-menu-item>
          </template>
        </t-submenu>
      </template> -->
      <template v-for="(item, index) in useLoginStore.menus">
        <t-menu-item value="item1" :disabled="true"> {{ item.name }} </t-menu-item>
        <template v-for="(itemChildren, childrenIndex) in item.children">
          <t-menu-item :value="itemChildren.path" :to="itemChildren.path">
            <template #icon>
              <icon-font :size="itemChildren.size" :name="itemChildren.icon"></icon-font>
            </template>
            {{ itemChildren.name }}
          </t-menu-item>
        </template>
      </template>
    </t-menu>
  </div>

</template>

<script setup lang='ts'>
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { Menu, menus } from './menu'
import { loginStore } from '@/store/loginStore';
import { useRoute, useRouter } from 'vue-router';
import { MenuValue } from 'tdesign-vue-next/es/menu/type';
import IconFont from '@/components/Icon'
const menuValue1 = ref<MenuValue>()
const menuValue2 = ref<MenuValue>()
const useLoginStore = loginStore()
const isClick = ref<boolean>(false)
const childrenMenus = ref<Array<Menu>>()
const menuIndex = ref<Array<number>>([])
const route = useRoute()
const router = useRouter()
const expanded = ref(['design', 'context', 'marketing', 'plan', 'data'])
let refChidlren = ref<string>()
const firstClick = (index: number) => {
  let i = localStorage.getItem('childrenIndex')
  localStorage.setItem('menuValue', menuValue1.value + '/' + menuValue2.value)
  if (!i || i != String(index)) {
    localStorage.setItem('childrenIndex', String(index))
    changeMenu()
  } else {
    let index = i as unknown as number;
    changeMenu()
  }

}

const change1 = (value: MenuValue) => {
  console.log(value)
}

const changeMenu = () => {
  let i = localStorage.getItem('childrenIndex')
  refChidlren.value = i as string;
  menuIndex.value = [];
  menuIndex.value.push(Number(refChidlren.value));
  isClick.value = true;
  useLoginStore.childrenMenus = menus[Number(refChidlren.value)].children;
}
onMounted(() => {
  let menuValue = localStorage.getItem('menuValue')?.split('/') as Array<string>;
  menuValue1.value = menuValue ? menuValue[0] : ""
  menuValue2.value = menuValue ? menuValue[1] : ""
  changeMenu()
})
const routeToClick = (index: number, path: string) => {
  menuIndex.value.splice(1, 1);
  menuIndex.value.push(index);
  useLoginStore.$patch(state => {
    console.log(menuIndex.value[1], 'index')
    state.breadcrumb = menus[menuIndex.value[0]].name + '-' + menus[menuIndex.value[0]].children[menuIndex.value[1]].name;
  })
  router.push(path)
}
</script>

<style scoped lang="less">
.container1 {
  display: flex;
  height: 100vh;
  width: 100%;
}

// .menuItem{
//   height: 40px;
//   margin-top: 10px;
// }
// .t-default-menu .t-menu__item:hover:not(.t-is-active):not(.t-is-disabled) {
//     background: var(--td-gray-color-2);
//     margin-top: 10px;
//     height: 40px;
// }

.container1 .menu-left {
  overflow-y: auto;
  // width: 105px;
  /* margin-top: 66px; */
  background-color: #fff;
}
</style>