<template>
  <t-dialog v-model:visible="visible" width="50%" :destroyOnClose="true">
    <Upload @success="handleSuccess" theme="custom" :data="data" :accept="accept">
      <t-button>选择并上传</t-button>
    </Upload>
    <div class="mt-2">
      <data-table ref="table" :query="query" :action="action" row-key="index" :isDeleteLink="false"
        selected-row-keys="selectRowValue" :columns="columns" :bordered="false" :hover="true" :table-layout="'auto'"
        size="medium" :pagination="pagination">
        <template #status="{ scope }">
          <div class="status" v-if="!scope.row.status">正常</div>
        </template>
        <template #image="{ scope }">
          <t-image :src="scope.row.baseUrl" :style="{ width: '100px', height: '50px' }" />
        </template>
      </data-table>
    </div>
  </t-dialog>
  <div @click="chooseFile">
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from "vue";
import Upload from "@/components/Upload.vue"
interface Props {
  action?: string;
  query?: any;
  data?: any;
  accept: string;
}
const visible = ref<boolean>(false)
const table = ref(null)
const props = withDefaults(defineProps<Props>(), {
})
const columns = [
  // {
  //   width: '100',
  //   colKey: '_id',
  //   title: 'id',
  //   align: 'center',
  // },
  {
    colKey: 'image',
    title: '图片',
    align: 'center',
    width: '100'
  },
  // {
  //   colKey: 'filename',
  //   title: '文件名',
  //   align: 'center',
  // },
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
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showJumper: true,
  onChange: (pageInfo: any) => {
    console.log('pagination.onChange', pageInfo);
  },
});
const chooseFile = () => {
  visible.value = true;
}
// 处理成功
const handleSuccess = () => {
  table.value.fetch()
  visible.value = false
}
</script>

<style></style>