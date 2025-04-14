<template>
  <!-- <div class="imageBox">
    <IconFont name="icon-untitled44"></IconFont>
  </div> -->
  <Upload :data="props.data" :multiple="true" @success="handleSuccess" theme="custom">
    <template #fileListDisplay>
      <div class="d-flex">
        <template v-for="(item, index) in props.data">
          <div class="imageBox position-relative me-1">
            <div @click="handleRemove(index)" class="boxDelete position-absolute" style="right: 0;top:0;z-index: 999;cursor: pointer;">
              <IconFont name="icon-shanchu" color="red"></IconFont>
            </div>
            <div style="width: 130px;height: 130px;">
              <t-image :src="item.value" style="width: 100%;height: 100%;" />
            </div>
            <div class="d-flex align-items-center p-1">
              <IconFont name="icon-danxuan pe-1"></IconFont>
              <t-input autoWidth :value="item.label" @change="(e: InputValue) => handleImageName(e, index)"></t-input>
            </div>
          </div>
        </template>
      </div>
    </template>
  </Upload>
</template>
<script setup lang="ts">
import Upload from '@/components/Upload.vue'
import IconFont from '@/components/Icon'
import { onMounted, ref } from 'vue';
import { InputValue } from 'tdesign-vue-next';
const emits = defineEmits(['change'])
interface option {
  label: string,
  value: string
}
const props = defineProps({
  data: {
    type: Array<option>,
    default: () => []
  }
})
const options = ref<Array<option>>([])
const handleSuccess = (files: option) => {
  // 处理盛传成功的数据
  // if (Array.isArray(files)) {
    // 构造问卷options
    // files.map((v: option, index: number) => {
    options.value.push(files)
    // })
  // }
  emits('change', options.value)
}
const handleImageName = (value: InputValue, index: number) => {
  options.value[index]['label'] = value;
  emits('change', options.value)
}
const handleRemove = (index:number)=>{
  options.value.splice(index, 1)
  emits('change', options.value)
}
</script>
<style scope lang="scss">
.imageBox {
  margin-top: 5px;
  width: 132px;
  border: 1px dashed #aaa;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
}
</style>