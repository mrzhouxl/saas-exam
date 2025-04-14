import { defineStore } from 'pinia';
import services from '@/utils/axios'

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      admin: '' as any,
      tenant: '' as any,
      token: ''
    }
  },
  getters: {
    isUserInfo: (state) => state.admin != '' && state.tenant != ''
  },
  actions: {
    async getUserInfo() {
      const tenant = localStorage.getItem('yunti_t_id');
      const admin = localStorage.getItem('yunti_ad_info');
      const token = localStorage.getItem('token') as string;
      let axTenant = await services.get(`tenants/${tenant}?notenant=no`);
      let axAdmin = await services.get(`admin/${admin}?notenant=no`);
      this.tenant = axTenant;
      this.admin = axAdmin;
      this.token = token;
    }
  }
})