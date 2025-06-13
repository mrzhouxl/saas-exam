<template>
  <t-table :row-key="rowKey||'index'" v-bind="$props" :data="action ? dataValue : $props.data" :pagination="isPageBar"
    @select-change="rehandleSelectChange">
    <template v-slot:[item]="scope" v-for="item in Object.keys(slots)">
      <slot :name="item" :scope="{
        row: scope.row,
        index:scope.rowIndex
      }"></slot>
    </template>
    <template v-slot:operation="{ row }">
      <t-link v-if="isDeleteLink" theme="primary" hover="color" @click="remove(row)">删除</t-link>
    </template>
  </t-table>
</template>
<script setup lang="ts">
import service from '@/utils/axios';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref, useSlots, watch, useAttrs, computed } from 'vue';
const props = defineProps({
  page: {
    type: Boolean,
    default: true
  },
  action: {
    type: String,
    default: ''
  },
  data: Array<any>,
  columns: {
    type: Array,
    default: () => []
  },
  bordered: Boolean,
  hover: Boolean,
  tableLayout: String,
  size: String,
  // pagination: {
  //   type: Object,
  //   default: {
  //     pageSize: 10,
  //     total: 0
  //   }
  // },
  cellEmptyContent: String,
  isDeleteLink: {
    type: Boolean,
    default: true
  },
  selectedRowKeys: {
    type: Array,
    default: () => []
  },
  rowKey: String,
  query: Object,
  rowAttributes: Object,
  pageSize: Number,
  loading: Boolean,
  editableCellState:Function
})
const slots = useSlots()

const dataValue = ref([])
const emits = defineEmits(['selectChange'])
const remove = async (row: any) => {
  let res = await service.delete(props.action + `/${row._id}`);
  if (res) {
    // 
    fetch()
    MessagePlugin.success('删除成功！')
  }
}
const fetch = async (query?: any) => {
  let res: any = await service.get(props.action, {
    params: {
      query: query ? query : props.query
    }
  })
  dataValue.value = res.data;
  pagination.value = Object.assign(pagination.value, {
    current: res.page,
    pageSize: props.pageSize || 10,
    total: res.total
  })
}
watch(() => props.query, (n, o) => {
  if (props.action) {
    fetch();
  }
}, { immediate: true })

let pagination = ref<any>({
  showPageSize: false,
  current: 1,
  pageSize: props.pageSize,
  total: 1,
  onChange({ current }: {
    current: number
  }) {
    fetch({ page: current })
  }
})
const isPageBar = computed(() => {
  if (!props.page) {
    return null
  } else {
    return pagination
  }
})

const rehandleSelectChange = (value: string, rowData: any) => {
  emits('selectChange', value, rowData.selectedRowData);
}
onMounted(() => {
  // !props.data && fetch()
})
defineExpose({
  fetch
})
</script>
<style scoped></style>
