<template>
  <div class="operation p-3">
    <div>
      <t-space>
        <t-button @click="addExam">添加题目</t-button>
        <t-button theme="default" variant="base">批量录入</t-button>
        <t-button theme="default" variant="base">excel导入</t-button>
        <t-button theme="default" variant="base">word导入</t-button>
      </t-space>
    </div>
  </div>
  <div class="px-3 d-flex">
    <div class="tdesign-tree-base tree-left">
      <div class="d-flex p-2">
        <t-space size="large w-100">
          <span class="mr-8">题目分类</span>
          <t-popup v-model="examclass" trigger="click" destroy-on-close>
            <span style="cursor: pointer;">
              <IconFont class="mr-8" :color="'#0A65FB'" name="icon-tianjia"></IconFont>
            </span>
            <template #content>
              <div style="width:300px;height:150px" class="d-flex flex-column justify-content-center">
                <div class="text-center">
                  <p>添加分类</p>
                </div>
                <div>
                  <t-input placeholder="分类名称" v-model="title"></t-input>
                </div>
                <div class="w-100 d-flex  justify-content-center mt-8">
                  <t-space>
                    <t-button theme="default" variant="base" @click="examclass = false">取消</t-button>
                    <t-button @click="addQueationBank">确认</t-button>
                  </t-space>
                </div>
              </div>
            </template>
          </t-popup>
        </t-space>
      </div>
      <div class="d-flex p-2">
        <t-space :size="4">
          <t-input></t-input>
          <t-button class="">搜索</t-button>
        </t-space>
      </div>
      <t-tree :data="items" @click="nodeClick" activable icon hover transition>
        <template #operations="{ node }">
          <span class="mr-8">
            <t-popup v-model="examclasstree" v-if="node.getParents().length < 2" trigger="click" destroy-on-close>
              <a style="margin-right: 5px;cursor:pointer;">
                <IconFont class="mr-8" :color="'#0A65FB'" name="icon-tianjia"></IconFont>
              </a>
              <template #content>
                <div style="width:300px;height:150px" class="d-flex flex-column justify-content-center">
                  <div class="text-center">
                    <p>添加分类</p>
                  </div>
                  <div>
                    <t-input placeholder="分类名称" v-model="title"></t-input>
                  </div>
                  <div class="w-100 d-flex  justify-content-center mt-8">
                    <t-space>
                      <t-button theme="default" variant="base" @click="examclasstree = false">取消</t-button>
                      <t-button @click="addQueationBank(node)">确认</t-button>
                    </t-space>
                  </div>
                </div>
              </template>
            </t-popup>
            <a v-pointer style="margin-left: 8px" @click="deleteQueationBank(node)">
              <IconFont :color="'#0A65FB'" name="icon-shanchu1"></IconFont>
            </a>
          </span>
        </template>
        <template #icon="{ node }">
          <IconFont :color="'#0A65FB'" name="icon-wenjianjia"></IconFont>
        </template>
      </t-tree>
    </div>
    <div class="content-right ml-8">
      <DataTable ref="dataTable" :rowAttributes="{ draggable: true }" :columns="columns"
        action="http://localhost:5000/admin/exam-item" :query="query" :isDeleteLink="true">
        <template #operation="{ scope }">
          <t-button variant="text" theme="primary" @click="edit(scope.row._id)">编辑</t-button>
          <t-button variant="text" theme="danger" @click="del(scope.row._id)">删除</t-button>
        </template>
      </DataTable>
    </div>
  </div>
  <t-dialog v-model:visible="visible" @confirm="questionOk">
    <t-tree @click="selectNode" :data="items" activable icon hover transition expandOnClickNode>
      <template #icon="{ node }">
        <IconFont :color="'#0A65FB'" name="icon-wenjianjia" @click="aa(node)"></IconFont>
      </template>
    </t-tree>
  </t-dialog>
</template>
<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import IconFont from '@/components/Icon'
import services from '@/utils/axios';
import { Message, MessagePlugin, TreeNodeModel } from 'tdesign-vue-next';
import { TreeNode } from 'tdesign-vue-next/es/cascader/interface';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const title = ref<string>()
const items = ref<Array<any>>([])
const visible = ref<boolean>(false)
const current = ref<string>()
const router = useRouter()
const dataTable = ref(null)
const query = ref<any>()
const examclass = ref<boolean>(false)
const examclasstree = ref<boolean>(false)
const columns = [
  {
    width: '100',
    colKey: '_id',
    title: 'id',
    align: 'center',
    cell(h, { row: { _id } }) {
      return String(_id).substring(0, 6)
    },
  }, {
    colKey: 'title',
    title: '题目',
    align: 'center',
  },
  {
    colKey: 'type',
    title: '题型',
    align: 'center',
  },
  {
    colKey: 'answer',
    title: '答案',
    align: 'center',
  }, {
    colKey: 'difficulty',
    title: '难易程度',
    align: 'center',
  }, {
    colKey: 'operation',
    title: '操作',
    align: 'center'
  }
]
const nodeClick = (e: any) => {
  query.value = {
    where: {
      group: e.node.data._id ?? null
    }
  }
}
onMounted(() => {
  fetch()
})
const aa = (node: any) => {
  console.log(node)
}
const selectNode = (e: any) => {
  let node: TreeNodeModel = e.node;
  current.value = node.data._id
}
const addExam = () => {
  visible.value = true;
}
const edit = (id: string) => {
  router.push(`exam/${id}/edit`)
}
const del = async (id: string) => {
  let res = await services.put(`exam-item/${id}`, {
    isDelete: true
  })
  if (res) {
    MessagePlugin.success('删除成功！')
    query.value = { ...query.value }
  }
}
const questionOk = () => {
  console.log(11)
  router.push(`/exam/exam/${current.value}`)
}
const fetch = async () => {
  let res = await services.get('questionbank', {
    params: {
      query: {
        where: {
          parent: null
        },
        populate: {
          path: 'children',
          populate: 'children'
        }
      }
    }
  })
  items.value = res.data;
}
const addQueationBank = async (node: any) => {
  let res = await services.post('questionbank', {
    title: title.value,
    parent: node?.data?.id ?? null
  })
  if (res) {
    MessagePlugin.success('分类创建成功！')
    fetch()
    title.value = ""
    examclass.value = false
  }
}

const deleteQueationBank = async (node: any) => {
  let res = await services.post<any, any>('questionbank/delete_node', { id: node.data._id });
  res.data ? MessagePlugin.success(res.message) : MessagePlugin.error(res.message)
  fetch()
}
</script>
<style scoped>
.demo-tree-base {
  display: block;
}

.tree-left {
  min-width: 250px;
  border: 1px solid #e7e7e7;
  min-height: 700px;
  padding: 10px;
}
</style>