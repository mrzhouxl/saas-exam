<template>
  <div class="w-full flex bg-[#f7f8fa] h-full">
    <div class="w-[200px] h-full p-2 bg-white border-[]">
      <t-button size="small" @click="(curValue = 'create')">创建数据表</t-button>
      <TableList class="mt-1" :data="data" @choose="_id => (curValue = _id)"></TableList>
      <div v-if="data.length === 0">
        暂无数据
      </div>
    </div>
    <div class="flex-1 w-full" :class="{ 'items-center flex justify-center': !curValue }">
      <div v-if="!curValue" class="flex justify-center flex-col items-center">
        <img style="width: 130px;" :src="noContent2" />
        <span class=" text-xs text-gray-500">暂无选择数据</span>
      </div>
      <div v-else class="m-2">
        <t-card :bordered="false">
          <t-form ref="form" :data="formData" :rules="rules" label-align="top" @submit="onSubmit">
            <t-form-item label="名称" name="name">
              <t-input v-model="formData.name"></t-input>
            </t-form-item>
            <t-form-item label="数据库表名" name="tableName">
              <t-input v-model="formData.tableName"></t-input>
            </t-form-item>
            <t-form-item label="描述" name="describe">
              <t-input v-model="formData.describe"></t-input>
            </t-form-item>
            <t-form-item label="属性">
              <div class="data-source">
                <DataTable row-key="name" :editableCellState="editableCellState" :data="formData.tableProperty"
                  :columns="columns" :page="false">
                  <template #footerSummary>
                    <div class="w-full text-center h-[30px] flex items-center justify-center">
                      <IconFont name="icon-plus-circle-o cursor-pointer"></IconFont>
                      <span class="ml-1 cursor-pointer" @click="newAttr">新增属性</span>
                    </div>
                  </template>
                  <template #default="{ scope }">
                    <div class="text-xs" v-if="['_id', 'created_at', 'updated_at'].includes(scope.row.name)">
                      自动生成
                    </div>
                    <div v-else>
                      <t-input v-model="scope.row.default"></t-input>
                    </div>
                  </template>
                  <template #require="{ scope }">
                    <div>
                      <t-checkbox :disabled="[0, 1, 2].includes(scope.index)" v-model="scope.row.require"></t-checkbox>
                    </div>
                  </template>
                  <template #search="{ scope }">
                    <div>
                      <t-checkbox :disabled="[0, 1, 2].includes(scope.index)" v-model="scope.row.search"></t-checkbox>
                    </div>
                  </template>
                </DataTable>
              </div>
            </t-form-item>
            <t-form-item>
              <t-button type="submit">{{ actionName }}</t-button>
            </t-form-item>
          </t-form>
        </t-card>
      </div>
    </div>
  </div>
</template>

<script setup lang='tsx'>
import { computed, onMounted, reactive, ref, toRef, watch } from 'vue';
import TableList from '../../components/TableList.vue';
import noContent2 from '@/assets/img/nocontent2.png';
import DataTable from '@/components/DataTable.vue';
import IconFont from '@/components/Icon'
import { dataColumns } from './design.config'
import { FormProps, MessagePlugin, TableProps } from 'tdesign-vue-next'
import { generateRandomString } from '@/utils/random'
import axios from '@/utils/axios'
import services from '@/utils/axios';
const data = ref([])

const actionName = computed(() => {
  if (curValue.value) {
    return '保存'
  } else {
    return '创建'
  }
})
const rules = {
  name: [
    {
      required: true, message: '请填写名称', type: 'error', trigger: 'blur'
    }
  ],
  tableName: [{ required: true, messages: '请填写数据库表名', type: 'error', trigger: 'blur' }],
  describe: [{ required: true, messages: '请填写内容描述', type: 'error', trigger: 'blur' }]
}
const formData = reactive({
  name: '',
  tableName: '',
  describe: '',
  tableProperty: [{
    name: '_id',
    title: 'id',
    dataType: 'ObjectId',
    require: true,
    default: '',
    search: true
  },
  {
    name: 'created_at',
    title: '创建时间',
    dataType: 'DataTime',
    require: true,
    default: '',
    search: true
  }, {
    name: 'updated_at',
    title: '修改时间',
    dataType: 'DataTime',
    require: true,
    default: '',
    search: true
  }]
})

const editableCellState: TableProps['editableCellState'] = (cellParams: { rowIndex: any; }) => {
  const { rowIndex } = cellParams;
  // 设置前三个默认字段无法修改
  return ![0, 1, 2].includes(rowIndex)
}
const columns = dataColumns(formData)
const curValue = ref();

const fetch = async () => {
  const res = await axios.get('dynamic-table')
  data.value = res.data
}
onMounted(() => {
  fetch()
})
const newAttr = () => {
  formData.tableProperty.push({
    name: 'property-' + generateRandomString(2),
    title: '标题',
    dataType: 'String',
    require: false,
    default: '',
    search: false
  })
}
watch(() => curValue.value, async (newVal, oldVal) => {
  if (newVal != 'create') {
    const res = await services.get(`dynamic-table/${newVal}`)
    formData.name = res.name;
    formData.describe = res.describe;
    formData.tableName = res.tableName;
    formData.tableProperty = res.tableProperty;
  } else {
    formData.name = '';
    formData.describe = '';
    formData.tableName = '';
    formData.tableProperty = [{
      name: '_id',
      title: 'id',
      dataType: 'ObjectId',
      require: true,
      default: '',
      search: true
    },
    {
      name: 'created_at',
      title: '创建时间',
      dataType: 'DataTime',
      require: true,
      default: '',
      search: true
    }, {
      name: 'updated_at',
      title: '修改时间',
      dataType: 'DataTime',
      require: true,
      default: '',
      search: true
    }];
  }
})
const onSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError, e }) => {
  e.preventDefault();
  if (validateResult === true) {
    if (curValue.value) {
      const res = await services.put(`dynamic-table/${curValue.value}`, formData)
      if (res) {
        MessagePlugin.success('保存成功');
      }
    } else {
      const res = await services.post('dynamic-table', formData)
      res && MessagePlugin.success('提交成功');
    }
  } else {

  }
};
</script>

<style lang="scss" scoped>
.data-source {
  :deep(.t-table .t-table__body > tr:nth-of-type(-n+3) > td) {
    color: #999 !important;
  }

}
</style>