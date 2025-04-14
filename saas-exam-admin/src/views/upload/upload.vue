<template>
  <div class="">
    <t-card :bordered="false">
      <t-button @click="visibleDialog = true">上传图片</t-button>
      <div class="m-t-10">
        <data-table ref="tableList" action="http://localhost:5000/admin/userfile" row-key="index" :columns="columns"
          :bordered="false" :hover="true" :table-layout="'auto'" size="medium" :pagination="pagination">
          <template #status="{ scope }">
            <div class="status" v-if="!scope.row.status">正常</div>
          </template>
          <template #image="{ scope }">
            <t-image :src="scope.row.baseUrl" :style="{ width: '100px', height: '50px' }" />
          </template>
        </data-table>
      </div>
    </t-card>
    <t-dialog width="60%" v-model:visible="visibleDialog" @confirm="dialogConfirm">
      <t-upload v-model="files" ref="uploadRef1" :headers="{
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': user.tenant._id
      }" action="http://localhost:5000/admin/upload/img" theme="image" tips="单张图片文件上传（上传成功状态演示）" accept="image/*"
        :formatResponse="formatResponse" @success="successUpload">
      </t-upload>
    </t-dialog>
  </div>
</template>
<script setup lang="tsx">
import { userStore } from '@/store/userStore';
import services from '@/utils/axios';
import { MessagePlugin, SuccessContext } from 'tdesign-vue-next';
import { onMounted, reactive, ref } from 'vue';
const visibleDialog = ref<boolean>(false);
const file = ref('');
const files = ref<[]>([])
const tableList = ref<any>()
const dialogConfirm = async () => {
  // if (!file.value) {
  //   MessagePlugin.error('图片上传失败，请重新尝试')
  //   return;
  // }
  // const result = await services.post('upload/saveImg', {
  //   url: file.value
  // })
  // if (result.data) {
  //   files.value = []
  //   MessagePlugin.success('图片上传完成')
  await tableList.value.fetch()
  // }
  visibleDialog.value = false;
}
//
const successUpload = async (content: SuccessContext) => {
  file.value = content.response.url
}
const user = userStore()
const token = ref<string>('')
//分页
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showJumper: true,
  onChange: (pageInfo: any) => {
    console.log('pagination.onChange', pageInfo);
  },
});
onMounted(() => {
  token.value = localStorage.getItem('token') as string;
})

const formatResponse = (e: any) => {
  return { url: e.data.file };
};
const columns = [
  {
    width: '100',
    colKey: '_id',
    title: 'id',
    align: 'center',
  },
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
  },
  {
    colKey: 'operation',
    title: '操作'
  }
];



//行点击
const handleRowClick = (e: any) => {
  console.log(e);
};


</script>
<style></style>