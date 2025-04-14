import { route } from '@/router';
import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next';
// 创建axios
const services = axios.create({
  baseURL: 'http://localhost:5000/admin/'
});
//post请求头
services.defaults.headers.post["Content-Type"] = "application/json";

// 添加请求拦截器
services.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('token')
  const tid = localStorage.getItem('yunti_t_id')
  //@ts-ignore
  token && (config.headers['Authorization'] = "Bearer  " + token);
  //@ts-ignore
  tid && (config.headers['x-tenant-id'] = tid)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
services.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.data.type == 'error') {
    MessagePlugin.error(response.data.message)
  }
  //身份信息失效跳转登录页

  return response.data;
}, (error) => {
  console.log(error, 'error')
  if (error?.response.status === 401) {
    MessagePlugin.error('身份失效，请重新登录！')
    localStorage.removeItem('token')
    route.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

export interface IResponseList {
  data: Array<any>;
  lastPage: number;
  page: number;
  total: number;
}

export default services;
