import { Input, Select } from "tdesign-vue-next";
import { computed } from "vue";
import IconFont from '@/components/Icon'



export const editInput = (data: any) => {
  return {
    component: Input,
    props: {
      clearable: true,
      autofocus: true,
    },
    validateTrigger: 'change',
    // defaultEditable:true
    onEdited: (context: any) => {
      const newData = [...data.tableProperty];
      newData.splice(context.rowIndex, 1, context.newRowData);
      data.tableProperty = newData;
    },
  }

}

export const renderSelectData = () => {
  const options = [
    {
      label: 'String (字符文本)',
      value: 'String'
    }, {
      label: 'Integer (数字类型)',
      value: 'Integer'
    }, {
      label: 'Boolean (布尔类型)',
      value: 'Boolean'
    }, {
      label: 'Date (时间类型)',
      value: 'Date'
    }
  ]
  const optionsData = () => options.map(v => ({
    ...v,
    content: (h) => {
      return (
        <div class="w-full h-[30px] flex items-center">
          <IconFont name="icon-shujukuziduan" color="#5C85F5"></IconFont>
          <span class="ml-1">{v.label}</span>
        </div>
      )
    }
  }))
  return optionsData();
}

export const editSelect = (data: any) => {
  return {
    component: Select,
    props: {
      options: renderSelectData()
    },
    validateTrigger: 'change',
    // defaultEditable:true
    onEdited: (context) => {
      const newData = [...data.tableProperty];
      newData.splice(context.rowIndex, 1, context.newRowData);
      data.tableProperty = newData;
    },
  }

}

export const dataColumns = (tableAttr) => {

  return computed(() => [
    {
      colKey: "name",
      title: '名称',
      align: 'center',
      edit: editInput(tableAttr)
    }, {
      colKey: "title",
      title: '标题',
      align: 'center',
      edit: editInput(tableAttr)
    }, {
      colKey: "dataType",
      title: '数据类型',
      align: 'center',
      edit: editSelect(tableAttr)
    }, {
      colKey: "require",
      title: '是否必填',
      align: 'center'
    }, {
      colKey: "default",
      title: '默认值',
      align: 'center'
    }, {
      colKey: "search",
      title: '是否为搜索条件',
      align: 'center'
    }
  ])
} 