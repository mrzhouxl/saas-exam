import { del, get, post, put } from '@/utils/axios'

export function getReserveList(params:any) {
  return get('/reserve', params)
}

export function getReserveDetail(id:string) {
  return get(`/reserve/${id}`)
}

export async function  createReserve<T>(data:any) {
  return await post<T>('/reserve', data)
}

export function updateReserve(id:string, data:any) {
  return put(`/reserve/${id}`, data)
}

export function deleteReserve(id:string) {
  return del(`/reserve/${id}`)
}
