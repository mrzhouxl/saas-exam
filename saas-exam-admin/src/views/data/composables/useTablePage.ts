import axios, { IResponseList } from "@/utils/axios";
import { PageInfo } from "tdesign-vue-next"
import { onMounted, ref, watch } from "vue"

interface Column {
  colKey: string;
  title: string;
  align: string;
}
// 
interface TableProperty {
  title: string;
  dataType: string;
  name: string;
}
export const useTablePage = () => {
  // 分页
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    showPageSize: false,
    onChange: (pageInfo: PageInfo) => {
      pagination.value.current = pageInfo.current
      queryTableData(pageInfo.current)
    }
  })
  // 表格显示列
  const columns = ref<Column[]>([])
  // 表格搜索
  const tableSearch = ref<Array<TableProperty>>([])
  // 表单展示
  const formColumns = ref<Array<TableProperty>>([])

  const curValue = ref<string>('')
  // 初始化并获取所有的数据菜单
  const loadSearchColumnUi = async (id: string) => {
    const res = await axios.get<any, any>(`dynamic-table/${id}`)
    tableSearch.value = res.tableProperty.filter((v: any) => v.search === true)
    formColumns.value = res.tableProperty.filter((v: any) => !['_id', 'created_at', 'updated_at'].includes(v.name));
    // 计算列
    columns.value = res.tableProperty.map((v: any) => {
      if (['created_at', 'updated_at'].includes(v.name)) {
        return {
          title: v.title,
          colKey: v.name,
          align: 'center',
          cell: (h, { row }) => {
            return new Date(row[v.name]).toLocaleString()
          }
        }
      }
      return {
        title: v.title,
        colKey: v.name,
        align: 'center'
      }
    })
    columns.value.push({
      colKey: 'operation',
      title: '操作',
      align: 'center'
    })
  }

  // 表格数据
  const tableData = ref<any>([])
  const queryTableData = async (page: number = 1) => {
    const res = await axios.get<any, IResponseList>('dynamic-db', {
      params: {
        query: {
          where: {
            tablePreset: curValue.value
          },
          page
        }
      }
    })
    tableData.value = res.data
    pagination.value.total = res.total;
  }

  const menu = ref<Array<{
    _id: string;
    name: string;
  }>>([])
  const fetchMenu = async () => {
    const res = await axios.get('dynamic-table')
    menu.value = res.data
  }

  // 页面加载加载所有的数据菜单
  onMounted(() => {
    fetchMenu()
  })

  // 监听是否选中菜单
  watch(() => curValue.value, (newVal: string, oldVal: string) => {
    loadSearchColumnUi(newVal)
    queryTableData()
  })


  return { menu, tableData, pagination, curValue, columns, formColumns, tableSearch, queryTableData, loadSearchColumnUi, fetchMenu }
}