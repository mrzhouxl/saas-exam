<template>
  <t-dialog v-model:visible="show" width="50%" @confirm="ok">
    <div class="d-flex justify-content-between w-100">
      <t-button>搜索图片</t-button>
      <t-input style="width:200px"></t-input>
    </div>
    <data-table :is-delete-link="false" class="mt-2" :selected-row-keys="selectRowValue"
      action="http://localhost:5000/admin/userfile" row-key="_id" :columns="columns" :bordered="false" :hover="true"
      :table-layout="'auto'" size="medium" cell-empty-content="" @selectChange="selectValue">
      <template #status="{ scope }">
        <div class="status" v-if="!scope.row.status">正常</div>
      </template>
      <template #image="{ scope }">
        <img :src="scope.row.baseUrl" style="height: 50px;width: 200px;" />
      </template>
    </data-table>
  </t-dialog>
  <div class="image-show position-relative">
    <div v-if="modelValue === ''" class="select-image" @click="showDialog">选择图片</div>
    <!-- <van-image v-else :width="showImgW" :height="showImgH" fit="cover" :src="modelValue"></van-image> -->
    <img :width="showImgW" :height="showImgH" fit="cover" :src="modelValue" v-else/>
    <div class="maskUpdate position-absolute w-100 d-flex align-items-center justify-content-center">
      <t-button @click="showDialog">替换</t-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DataTable from './DataTable.vue';

const show = ref<boolean>(false);
const filename = ref<string>();
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  showImgW: String,
  showImgH: String,
  isReplace: Boolean
})

const showDialog = () => {
  show.value = true;
}


const columns = [
  {
    colKey: 'row-select',
    type: 'single',
    // 允许单选(Radio)取消行选中
    checkProps: { allowUncheck: true },
    width: 50,
  },
  {
    width: '150',
    colKey: '_id',
    title: 'id',
    align: 'center',
  },
  {
    colKey: 'image',
    title: '图片',
    align: 'center',
  },
  {
    colKey: 'type',
    title: '类型',
    className: 'aaaa',
    align: 'center',
  },
  {
    colKey: 'status',
    title: '状态',
    align: 'center',
  }
];
const emits = defineEmits(['update:modelValue'])
const selectRowValue = ref<Array<string>>([])
const selectValue = (value: Array<string>, selectData: any) => {
  selectRowValue.value = value;
  filename.value = selectData[0].baseUrl;
}
const ok = () => {
  show.value = false;
  emits('update:modelValue', {
    image:filename.value,
    name:'1111',
    link:'11'
  })
}
</script>
<style lang="scss" scoped>
.select-image {
  cursor: pointer;
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

.image-show {
  vertical-align: middle;

  .maskUpdate {
    top: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    transition: opacity 0.3s;

    &::after {
      display: inline-block;
      content: "";
      height: 100%;
      vertical-align: middle;
    }

    &:hover {
      opacity: 1;
    }
  }

}
</style>