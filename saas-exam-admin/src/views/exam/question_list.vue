<template>
  <t-card :bordered="false">
    <t-button @click="createExam">创建问卷</t-button>
    <div class="mt-8">
      <DataTable :query="{
        where:{
          type:'question'
        }
      }" :columns="columns" class="m-t-8" action="http://localhost:5000/admin/exam">
        <template #image="{ scope }">
          <img :src="scope.row.image" style="width:60px;height:60px;">
        </template>
        <template #exam_item_number="{ scope }">
          {{ scope.row.exam_item.length + scope.row.unofficial_item.length }}
        </template>
        <template #is_public="{ scope }">
          <div :class="!!scope.row.is_public ? 'status' : 'unhealth'" v-if="!!scope.row.is_public">
            {{ !!scope.row.is_public ? '公开' : '私有' }}</div>
        </template>
        <template #end_time="{ scope }">
          {{ formatTime(scope.row.end_time) }}
        </template>
        <template #operation="{ scope }">
          <t-button ariant="text" theme="primary" @click="findExam(scope.row._id)">查看问卷</t-button>
          &nbsp;
          <t-button ariant="text" theme="error">删除</t-button>
        </template>
      </DataTable>
    </div>
  </t-card>
</template>
<script lang="tsx" setup>
import DataTable from '@/components/DataTable.vue';
import services from '@/utils/axios';
import { formatTime } from '@/utils/useTime';
import { useRouter } from 'vue-router';
const router = useRouter();
const createExam = async () => {
  router.push('/exam/create_question')
}
const columns = [
  {
    colKey: 'image',
    title: '封面',
    align: 'center',
  },
  {
    width: '100',
    colKey: '_id',
    title: 'id',
    align: 'center',
    cell(h:any, { row: { _id } }:any) {
      return String(_id).substring(0, 6)
    },
  }, {
    colKey: 'title',
    title: '问卷名',
    align: 'center',
  },
  {
    colKey: 'exam_item_number',
    title: '问题数量',
    align: 'center',
  }, {
    colKey: 'is_public',
    title: '是否公开',
    align: 'left',
  },
  {
    colKey: 'end_time',
    title: '开放时间',
    align: 'center',
  },
  {
    colKey: 'operation',
    title: '操作',
    align: 'center'
  }
] 
const findExam = (id: string) => {
  router.push(`/exam/create_question/${id}`)
  // services.get(`exam/find_exam/${id}`)
}
</script>
<style>

</style>