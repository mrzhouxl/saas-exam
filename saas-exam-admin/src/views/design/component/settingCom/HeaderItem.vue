<template>
  <div class="header-icon">
    <template v-for="(i, index) in modelValue">
      <div class="icon-item">
        <ImageList showImgH="85px" showImgW="100%" :modelValue="i.icon"
          @update:modelValue="(img) => useChangeEmits(modelValue, `[${index}].icon`, img, emits)"></ImageList>
        <div class="d-flex justify-content-between align-items-center">
          <div class="label">图标文本</div>
          <div>
            <t-input size="small" :value="i.value"
              @change="(v: any) => useChangeEmits(modelValue, `[${index}].value`, v, emits)">
            </t-input>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="label">行为</div>
          <div>
            <t-radio-group size="small" @change="(v: any) => changeRadio(v, index)" :value="i.type"
              variant="default-filled" default-value="alert">
              <t-radio-button value="alert">弹框</t-radio-button>
              <t-radio-button value="link">链接</t-radio-button>
              <t-radio-button value="jump">跳转</t-radio-button>
            </t-radio-group>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center" v-if="i.type == 'alert'">
          <div class="label">弹框</div>
          <div>
            <ImageList showImgH="100px" showImgW="100px" :modelValue="i.typeData"
              @update:modelValue="(img) => useChangeEmits(modelValue, `[${index}].typeData`, img, emits)"></ImageList>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center" v-if="i.type == 'jump'">
          <div class="label">跳转</div>
          <div>
            <ContentList :modelValue="i.typeData"
              @update:modelValue="(v: string | Array<string>) => useChangeEmits(modelValue, `[${index}].typeData`, v, emits)">
            </ContentList>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center" v-if="i.type == 'link'">
          <div class="label">链接</div>
          <div>
            <t-input size="small" :value="i.value"
              @change="(v: any) => useChangeEmits(modelValue, `[${index}].type`, v, emits)">
            </t-input>
          </div>
        </div>
      </div>
    </template>
    <div class="addIcon"></div>
  </div>
</template>
<script setup lang="ts">
import ImageList from '@/components/ImageList.vue'
import _, { cloneDeep } from 'lodash';
import { computed } from 'vue';
import { useChangeEmits } from '@/utils/useEmits';
import { emit } from 'process';
const props = defineProps({
  modelValue: {
    type: Array<any>,
    default: () => []
  }
})

const emits = defineEmits(['update:modelValue'])
const changeRadio = async (v: any, index: any) => {
  const value = cloneDeep(props.modelValue);
  value[index].type = v;
  value[index].typeData = '';
  emits('update:modelValue', value)
}
</script>
<style lang="scss" scoped>
.header-icon {
  width: 100%;

  .icon-item {
    width: 100%;
    margin-top: 10px;

    .label {
      width: 70px;
      line-height: 32px;
      font-size: 13px;
      color: #595961;
    }
  }

  .addIcon {}
}
</style>