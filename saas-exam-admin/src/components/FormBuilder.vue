<template>
  <div>
    <template v-for="(item, index) in options">
      <div class="container" v-if="item.type === 'container'" :key="index">
        <div class="header">
          <span>{{ item.title }}</span>
        </div>
        <div class="item" v-for="(c, index2) in item.column" :key="index2">
          <div class="label" v-if="_.get(c, 'isLabel', true)">
            <span> {{ c.column }}</span>
          </div>
          <div :style="{ width: _.get(c, 'isLabel', true) ? 'auto' : '100%' }">
            <component v-bind="c" :is="getCom(c)" :modelValue="_.get(modelValue, c.prop)"
              @update:modelValue="(v: any) => updateSetting(v, c)"></component>
          </div>
        </div>
      </div>
      <t-form class="mt-8" v-else>
        <t-form-item :labelWidth="item.labelWid || 0" :label="item.column" class="w-100">
          <slot :name="item.prop">
            <component v-bind="item" :is="getCom(item)" :modelValue="_.get(modelValue, item.prop)"
              @update:modelValue="(v: any) => updateSetting(v, item)"></component>
          </slot>
        </t-form-item>
      </t-form>
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import changeCase from '@juln/change-case';
import * as _ from 'lodash';
const props = defineProps({
  options: {
    type: Array<any>,
    default: () => []
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(["update:modelValue"])
const updateSetting = (value: any, item: any) => {
  let v: any = _.cloneDeep(props.modelValue)
  _.set(v, item.prop, value)
  console.log(`output->v`,v)
  emits('update:modelValue', v)
}
const insideValue = computed(() => {
  return props.modelValue
})
const getCom = (item: any) => {
  if (item.component) {
    return changeCase(item.component, "kebab");
  }
};
</script>
<style lang="scss" scoped>
.container {
  border-radius: 4px;
  padding: 10px 10px;
  background: #f0f2f5;
  margin: 0 auto 10px;
  width: 100%;

  .header {
    font-size: 14px;
    font-weight: 700;
    color: #595961;
    margin-bottom: 10px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;

    .label {
      font-size: 13px;
      color: #595961;
    }
  }
}
</style>