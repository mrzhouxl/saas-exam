<template>
  <t-dialog width="60%" v-model:visible="visible" @confirm="handleConfirm">
    <t-tabs :default-value="1">
      <t-tab-panel v-if="['question'].includes(type)" :value="1" label="题库">
        <DataTable class="mt-8" @selectChange="selectValue" :selected-row-keys="selectQuestionRowKeys" :pageSize="5"
          row-key="_id" :columns="question" action="http://localhost:5000/admin/questionbank">
        </DataTable>
      </t-tab-panel>
      <t-tab-panel v-if="['exam'].includes(type)" :value="2" label="试卷">
        <DataTable class="mt-8" @selectChange="selectValue" :selected-row-keys="selectQuestionRowKeys" :pageSize="5"
          row-key="_id" :columns="exam" action="http://localhost:5000/admin/exam">
          <template #image="{ scope }">
            <img :src="`http://localhost:5000/${scope.row.image}`" style="height: 50px;width: 100%;" />
          </template>
          <template #time="{ scope }">
            {{ formatTime(scope.row.time, 'YYYY-MM-DD') }}--{{ formatTime(scope.row.endTime, 'YYYY-MM-DD') }}
          </template>
          <!-- <template #num="{ scope }">
            {{ scope.row }}
          </template> -->
        </DataTable>
      </t-tab-panel>
      <t-tab-panel v-if="['plan'].includes(type)" :value="3" label="计划">
        <DataTable class="mt-8" @selectChange="selectValue" :selected-row-keys="selectQuestionRowKeys" :pageSize="5"
          row-key="_id" :columns="question" action="http://localhost:5000/admin/plan">
          <template #image="{ scope }">
            <img :src="`http://localhost:5000/${scope.row.image}`" style="height: 50px;width: 100%;" />
          </template>
        </DataTable>
      </t-tab-panel>
    </t-tabs>
  </t-dialog>
  <div class="">
    <!-- 单选多选显示框 -->
    <div v-if="modelValue.length > 0">
      <div class="box">
        <template v-for="item in modelValue">
          <div class="box-item">
            <span>
              {{ item.title }}
            </span>
            <span @click="handerDel(item)">
              <IconFont color="#9797A1" name="icon-anniu_guanbi"></IconFont>
            </span>
          </div>
        </template>
      </div>
    </div>
    <t-link theme="success" :suffix-icon="renderSuffixIcon" @click="() => visible = true">
      {{ modelValue.length > 0 ? "重新选择" : "跳转链接" }} </t-link>
  </div>
</template>
<script setup lang="tsx">
import { onMounted, ref, watch } from 'vue';
import { JumpIcon, BulletpointIcon } from 'tdesign-icons-vue-next';
import IconFont from '@/components/Icon';
import DataTable from "@/components/DataTable.vue";
import { formatTime } from '@/utils/useTime'
import services from '@/utils/axios';
import { find, findIndex } from 'lodash';
const props = defineProps({
  type: {
    type: String,
    default: 'exam'
  },
  isMultiple: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: Array<any>,
    default: ''
  }
})
const renderSuffixIcon = () => <JumpIcon />;
const emits = defineEmits(['update:modelValue'])
const visible = ref<boolean>(false);
const selectQuestionRowKeys = ref<any>([]);
const selectQuestionRowValue = ref<any>([])
const valueData = ref<Object | Array<any>>({})
const question = [
  {
    colKey: 'row-select',
    type: props.isMultiple ? 'multiple' : 'single',
    checkProps: { allowUncheck: true },
    width: 30,
  },
  {
    align: 'center',
    width: 50,
    colKey: '_id',
    title: 'id',
  }, {
    align: 'center',
    width: 100,
    colKey: 'title',
    title: '名称',
  },
  {
    align: 'center',
    width: 100,
    colKey: 'created_at',
    title: '创建时间',
  }
]
const exam = [
  {
    colKey: 'row-select',
    type: props.isMultiple ? 'multiple' : 'single',
    checkProps: { allowUncheck: true },
    width: 30,
  },
  {
    align: 'center',
    width: 80,
    colKey: '_id',
    title: 'id',
  },
  {
    align: 'center',
    width: 100,
    colKey: 'image',
    title: '封面',
  },
  {
    align: 'center',
    width: 100,
    colKey: 'title',
    title: '名称',
  },
  {
    align: 'center',
    width: 100,
    colKey: 'describe',
    title: '介绍',
  },
  {
    align: 'center',
    width: 100,
    colKey: 'time',
    title: '开放时间',
  }, {
    align: 'center',
    width: 100,
    colKey: 'examNumber',
    title: '题目数量',
  }
]
const plan = []
onMounted(() => {
})
watch(() => props.modelValue, () => {
  console.log('触发')
  fetch()
})
const selectValue = (value: Array<string>, selectData: any) => {
  selectQuestionRowKeys.value = value
  selectQuestionRowValue.value = selectData
}
const fetch = async () => {
  if (props.type === 'question') {
    if (props.isMultiple) {
      valueData.value = (await services.get(`questionbank`, {
        params: {
          query: {
            where: {
              _id: { $in: props.modelValue }
            }
          }
        }
      })).data
      return
    }
    valueData.value = await services.get(`questionbank/${props.modelValue}`)
  }
  if (props.type === 'exam') {
    if (props.isMultiple) {
      valueData.value = (await services.get(`exam`, {
        params: {
          query: {
            where: {
              _id: { $in: props.modelValue }
            }
          }
        }
      })).data
      return
    }
    valueData.value = await services.get(`exam/${props.modelValue}`)
  }
  if (props.type === 'plan') {
  }
}
const handleConfirm = () => {
  if (props.type === 'question')
    emits('update:modelValue', selectQuestionRowValue.value)
  if (props.type === 'exam')
    emits('update:modelValue', selectQuestionRowValue.value)
  if (props.type === 'plan')
    emits('update:modelValue', selectQuestionRowValue.value)
  visible.value = false
}
const handerDel = (item: any) => {
  const index = findIndex(props.modelValue, { _id: item._id })
  console.log(index)
  selectQuestionRowKeys.value.splice(index, 1)
  selectQuestionRowValue.value.splice(index, 1)
  emits('update:modelValue', selectQuestionRowValue.value)
}
</script>
<style scoped lang="scss">
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

.box {
  width: 90px;

  .box-item {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    height: 20px;
    margin-top: 3px;
    line-height: 20px;
    border: 1px solid #0A65FB;
    color: #0A65FB;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>