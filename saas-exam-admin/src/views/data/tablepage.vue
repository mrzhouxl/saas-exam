<template>
  <div class="w-full flex bg-[#f7f8fa] h-full">
    <div class="w-[200px] h-full p-2 bg-white border-[]">
      <span>菜单</span>
      <t-menu width="180px">
        <t-menu-item @click="(curValue = item._id)" value="0" v-for="item in menu">
          {{ item.name }}
        </t-menu-item>
      </t-menu>
    </div>
    <div class="w-full h-full p-2">
      <t-card :bordered="false">
        <t-form layout="inline">
          <template v-for="item in tableSearch">
            <t-form-item :label="item.title">
              <t-input v-if="['ObjectId', 'String'].includes(item.dataType)"></t-input>
              <t-date-picker v-if="['DataTime'].includes(item.dataType)"></t-date-picker>
            </t-form-item>
          </template>
        </t-form>
      </t-card>
      <t-card :bordered="false" class=" mt-2">
        <t-button @click="visibleData = true">新增</t-button>
        <DataTable :pagination="pagination" :data="tableData" :columns="columns" :isDeleteLink="false">
          <template #operation="{ scope }">
            <t-button variant="text" @click="editData(scope.row)">编辑</t-button>
            <t-button variant="text" @click="deleteData(row)">删除</t-button>
          </template>
        </DataTable>
      </t-card>
    </div>
  </div>
  <t-dialog v-model:visible="visibleData" @confirm="addData">
    <t-form :data="formData">
      <template v-for="item in formColumns">
        <t-form-item :label="item.title">
          <t-input v-model="formData[item.name]" v-if="['ObjectId', 'String'].includes(item.dataType)"></t-input>
          <t-date-picker v-if="['DataTime'].includes(item.dataType)"></t-date-picker>
        </t-form-item>
      </template>
    </t-form>
  </t-dialog>
</template>

<script setup lang='tsx'>
import axios from '@/utils/axios';
import { onMounted, ref, watch } from 'vue';
import TableList from '@/components/TableList.vue'
import DataTable from '@/components/DataTable.vue';
import { PageInfo } from 'tdesign-vue-next';
import { useTablePage } from './composables/useTablePage';
const formData = ref<any>({});
const visibleData = ref<boolean>(false);
const curPageSubmitStatus = ref<boolean>(false);
const { curValue, pagination, formColumns, tableData, queryTableData, menu, columns, tableSearch } = useTablePage();
const addData = async () => {
  const res = await axios.post('dynamic-db', {
    tablePreset: curValue.value,
    ...formData.value
  })
  if (res) {
    queryTableData()
  }
}
const editData = (row) => {
  visibleData.value = true
  formData.value = row
}
</script>

<style></style>