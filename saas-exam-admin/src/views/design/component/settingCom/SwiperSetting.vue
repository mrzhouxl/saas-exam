<template>
  <div class="d-flex flex-column w-100">
    <div class="content-swiper" v-for="(item, index) in modelValue" :key="index">
      <div class="d-flex w-100 justify-content-between">
        <div class="title">{{ typeName(type) }}</div>
        <div class="delete-remove" v-pointer @click="remove(index)">删除</div>
      </div>
      <div class="bottom">
        <div class="left-swiper font-color">
          <div class="">
            <span>{{ typeName(type) }}:</span>
            <span>{{ item.name}}</span>
          </div>
          <div class="d-flex">
            <div>链接：</div>
            <div></div>
          </div>
        </div>
        <div class="right-swiper">
          <image-list :modelValue="item.image" @update:modelValue="(e: any) => updateSetting(e, 'image', index)">
          </image-list>
        </div>
      </div>
    </div>
    <div v-pointer @click="addImage" class="add-image" v-if="only">
      <span>新增</span>
    </div>
  </div>

</template>
<script setup lang="ts">
import _ from 'lodash';
interface Props {
  modelValue: any;
  only?: boolean;
  type?: string;
}
const props = withDefaults(defineProps<Props>(), {
  only: false,
  type: 'img'
})
const typeName = (name: string) => {
  if (name == 'img') {
    return '图片'
  }
  if (name == 'audio') {
    return '音频'
  }
  if (name == 'video') {
    return '视频'
  }
}
const emits = defineEmits(['update:modelValue'])
const updateSetting = (e: any, key: string, index: number) => {
  const value = _.cloneDeep(props.modelValue)
  _.set(value, [index], e)
  emits('update:modelValue', value)
}
const remove = (index: number) => {
  const v = _.cloneDeep(props.modelValue)
  v.splice(index, 1)
  emits('update:modelValue', v)
}
const addImage = () => {
  const v = _.cloneDeep(props.modelValue);
  v.push({
    image: '',
    name: '测试图片',
    link: ''
  })
  emits('update:modelValue', v)
}
</script>
<style scoped lang="less">
.content-swiper {
  width: 100%;
  height: 135px !important;
  background: #f0f2f5;
  margin-top: 10px;
  padding: 10px;

  .bottom {
    display: flex;
    width: 100%;
    height: calc(100% - 32px);

    .left-swiper {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 1;
    }

    .right-swiper {
      display: flex;
      align-items: center;
      width: 70px;
    }
  }
}

.add-image {
  height: 40px;
  background: #fff;
  border-radius: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #2589ff;
  border: none;
  margin-top: 10px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>