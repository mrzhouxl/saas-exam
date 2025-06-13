import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { route } from '@/router';
import { MessagePlugin } from 'tdesign-vue-next';

const services = axios.create({
  baseURL: 'http://localhost:5000/admin/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
services.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  const tid = localStorage.getItem('yunti_t_id');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  if (tid) config.headers['x-tenant-id'] = tid;
  return config;
}, Promise.reject);

// 响应拦截器
services.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const res = response.data;
    if (res.type === 'error') {
      MessagePlugin.error(res.message || '请求失败');
    }
    return res.data;
  },
  (error) => {
    if (error?.response?.status === 401) {
      MessagePlugin.error('身份失效，请重新登录！');
      localStorage.removeItem('token');
      route.push('/login');
    }
    return Promise.reject(error);
  }
);

// === 🌟 封装请求方法并加泛型支持 ===

type RequestConfig<D = any> = AxiosRequestConfig<D>;
interface BaseModel {
  isDelete?: boolean;
  id?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type WithOptionalId<T> = T & BaseModel;

async function get<T = any>(url: string, config?: RequestConfig): Promise<WithOptionalId<T>> {
  const res = await services.get(url, config);
  return res as unknown as WithOptionalId<T>;
}




// 请求封装
async function post<T = any, D = any>(
  url: string,
  data?: D,
  config?: any
): Promise<WithOptionalId<T>> {
  const res = await axios.post(url, data, config);
  // 如果你的后端返回的就是最终结构，不包 data，就直接 as
  return res as unknown as WithOptionalId<T>;
}

async function put<T = any, D = any>(url: string, data?: D, config?: RequestConfig<D>): Promise<WithOptionalId<T>> {
  const res = await services.put(url, data, config);
  return res as unknown as WithOptionalId<T>;
}

async function del<T = any>(url: string, config?: RequestConfig): Promise<WithOptionalId<T>> {
  const res = await services.delete(url, config);
  return res as unknown as WithOptionalId<T>;
}

// 导出方法
export { get, post, put, del };

export default services

// 你的分页接口数据类型
export interface IResponseList<T = any> {
  data: T[];
  lastPage: number;
  page: number;
  total: number;
}