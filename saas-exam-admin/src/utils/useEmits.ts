import { cloneDeep, set } from 'lodash'
import { defineEmits } from 'vue'
/**
 * 
 * @param value 整体的值
 * @param key 要修改的key
 * @param cvalue 要修改的值
 */
export const useChangeEmits = (value: any, key: string, cvalue: any, emits: any) => {
  const c = cloneDeep(value);
  set(c, key, cvalue)
  emits('update:modelValue', c)
}