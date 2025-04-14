import { defineStore } from 'pinia';
import { Menu, menus } from '@/layout/menu'

export const loginStore = defineStore('loginStore', {
  state: () => {
    return {
      login: false,
      breadcrumb: '',
      menus,
      childrenMenus:new Array<Menu>()
    }
  },
  getters: {
    isLogin: (state) => state.login
  }
})