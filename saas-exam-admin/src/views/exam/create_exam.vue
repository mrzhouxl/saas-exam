<template>
  <div class="d-flex" style="height:100%;">
    <div class="exam-content">
      <div class="exam-header" @click="() => tabsValue = 'first'">
        <div class="mr-8" style="width:60px;">
          <img :src="exam.image" style="height:60px;width:60px;">
        </div>
        <div class="d-flex flex-column" style="flex:1;">
          <div>{{ exam.title }}</div>
          <div>{{ exam.describe }}</div>
        </div>
        <div class="exam-score">
          <div>总分</div>
          <div style="font-size: 30px;">{{ examScore || 0 }}</div>
        </div>
      </div>
      <draggable :list="com" animation="300" @end="onEnd">
        <template #item="{ element, index }">
          <div class="position-relative" :id="element._id">
            <div class="position-absolute" style="top:5px;left:5px;cursor: move;">
              <IconFont name="icon-tuozhuai1" color="#595961"></IconFont>
            </div>
            <exam-item @richText="handleRichText"
              @changeValue="(title: string, value: string) => changValue(title, value, index)"
              :class="{ 'activity': element._id === currentExam._id }" @click="handleCurrent(element)" :item="element"
              class="mb-8" @del="del" v-bind="element"></exam-item>
          </div>
        </template>
      </draggable>
      <div class="w-100 bottom-setting">
        <div class="d-flex justify-content-between">
          <div class="addExam" @click="() => visible = true">
            <icon-font name="icon-untitled44"></icon-font>
            <span class="ml-8">题库添加</span>
          </div>
          <div class="addExam" @click="() => (addExamVisible = true)">
            <icon-font name="icon-untitled44"></icon-font>
            <span class="ml-8">新增试题</span>
          </div>
        </div>
        <div class="exam-import" @click="importWord">
          <IconFont name="icon-word" size="20"></IconFont>
          word导入
        </div>
        <div class="save-box d-flex justify-content-center">
          <t-button type="submit" @click="submit">保存</t-button>
        </div>
      </div>
    </div>
    <div class="right" id="examSetting">
      <t-tabs v-model="tabsValue" theme="card">
        <t-tab-panel :destroyOnHide="false" value="first" class="p-3">
          <template #label>
            <t-icon name="home" class="tabs-icon-margin" />全局设置
          </template>
          <t-form :data="exam" ref="ruleForm" :onSubmit="save" :rules="allRule">
            <t-form-item label="试卷名称:" name="title">
              <t-input v-model="exam.title"></t-input>
            </t-form-item>
            <t-form-item label="试卷简介:" name="describe">
              <t-input x v-model="exam.describe"></t-input>
            </t-form-item>
            <t-form-item label="试卷封面:" name="image">
              <ImageList v-model="exam.image"></ImageList>
            </t-form-item>
            <t-form-item label="是否公开:" name="is_public">
              <t-switch :modelValue="examPublic" @change="(e: number) => exam.is_public = (e == 1 ? true : false)" />
            </t-form-item>
            <t-form-item label="开始时间:" name="time">
              <t-date-picker style="width:150px;" v-model="exam.time" />
            </t-form-item>
            <t-form-item label="结束时间:" name="end_time">
              <t-date-picker style="width:150px;" v-model="exam.end_time" />
            </t-form-item>
          </t-form>
        </t-tab-panel>
        <t-tab-panel value="second" class="p-2">
          <template #label>
            <t-icon name="calendar" class="tabs-icon-margin" />题目设置
          </template>
          <div v-if="currentExam.type">
            <div>
              <p>当前题型</p>
              <h3>{{ examType2Local(currentExam.type) }}</h3>
            </div>
            <hr />
            <div>
              <t-form>
                <t-form-item label="切换题型:">
                  <t-select v-model="currentExam.type">
                    <t-option key="single" value="single" label="单选题"></t-option>
                    <t-option value="multiple" label="多选题"></t-option>
                    <t-option value="judge" label="判断题"></t-option>
                    <t-option value="enter" label="填空题"></t-option>
                    <t-option value="sort" label="排序题"></t-option>
                    <t-option value="indefinite" label="不定项"></t-option>
                    <t-option value="shortanswer" label="简答题"></t-option>
                    <t-option value="calculate" label="计算题"></t-option>
                  </t-select>
                </t-form-item>
                <t-form-item label="答案:">
                  <t-radio-group v-if="currentExam.type === 'single' || currentExam.type === 'judge'"
                    class="d-flex flex-column align-items-start justify-content-center" v-model="currentExam.answer">
                    <t-radio :value="item.label" :label="item.value.replace(/<[^>]*>/g, '')"
                      v-for="item in currentExam.options">

                    </t-radio>
                  </t-radio-group>
                  <t-checkbox-group v-if="currentExam.type === 'multiple' || currentExam.type === 'indefinite'"
                    class="d-flex flex-column" :modelValue="currentExam.answer.split('')"
                    @update:modelValue="(e: any) => (currentExam.answer = e.join(''))">
                    <t-checkbox v-for="item in currentExam.options" :value="item.label"
                      :label="item.value.replace(/<[^>]*>/g, '')">
                    </t-checkbox>
                  </t-checkbox-group>
                  <!-- enter -->
                  <div v-if="currentExam.type === 'enter'">
                    <t-input style="width:180px;" v-model="currentExam.answer"></t-input>
                    <p class="gay">1.一个空格填写一个答案，如果答案有多种表达方式，例如：二和2，中间用#隔开，二#2
                      <br />
                      2.如多个空的答案包含重复项，需要勾选【答案有顺序要求】
                    </p>
                  </div>
                  <!-- sort -->
                  <div v-if="currentExam.type === 'sort'">
                    <t-input style="width:180px;" v-model="currentExam.answer" placeholder="请输入正确的排序顺序"></t-input>
                  </div>
                  <!-- shortanswer -->
                  <div class="w-100" v-if="currentExam.type === 'shortanswer' || currentExam.type === 'calculate'">
                    <ComEditer v-model="currentExam.answer"></ComEditer>
                  </div>
                </t-form-item>
                <t-form-item label="解析:">
                  <t-textarea size="small" v-model="currentExam.analysis" placeholder="请输入解析" name="description" />
                </t-form-item>
                <t-form-item label="题目分值:">
                  <t-input size="small" v-model.number="currentExam.score"></t-input>
                </t-form-item>
                <t-form-item label="此题必答:">
                  <t-switch size="small" v-model="currentExam.required"></t-switch>
                </t-form-item>
                <t-form-item label="计分方式:">
                  <t-select size="small" v-model="currentExam.score_method" placeholder="请选择计分方式">
                    <t-option key="only" value="only" label="有唯一的答案和分值"></t-option>
                    <t-option key="manual" value="manual" label="此题人工评分"></t-option>
                  </t-select>
                </t-form-item>
              </t-form>
            </div>
          </div>
          <div v-else>
            <!-- 请先选择，试卷内容 -->
            <img src="@/assets/img/nocontent.png" />
            <p class="w-100 text-center fs-6">请选择试卷内容</p>
          </div>
        </t-tab-panel>
        <t-tab-panel value="currency" class="p-2">
          <template #label>
            <t-icon name="home" class="tabs-icon-margin" />通用
          </template>
          <!-- <t-form labelWidth="80px"> -->
          <span>快速查找</span>
          <ExamBox :examcom="com" :current="currentExam" @boxClick="handleBoxClick"></ExamBox>
          <!-- <t-form-item label="批量设置：">
            </t-form-item>
            <t-form-item label="快速定位：">
            </t-form-item> -->
          <!-- </t-form> -->
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
  <t-dialog v-model:visible="visible" confirmBtn="" width="60%" @confirm="addQuestionExam">
    <div class="d-flex">
      <div style="width: 226px;">
        <t-tree style="width: 226px;" @click="selectNode" :data="items" activable icon hover transition expandOnClickNode>
          <template #icon="{ node }">
            <IconFont :color="'#0A65FB'" name="icon-wenjianjia"></IconFont>
          </template>
        </t-tree>
      </div>
      <div class="ml-8">
        <DataTable :page-size="5" rowKey="_id" @select-change="selectChange" :selected-row-keys="selectedRowKeys"
          ref="dataTable" :rowAttributes="{ draggable: true }" :columns="columns"
          action="http://localhost:5000/admin/exam-item" :query="query" :isDeleteLink="false">
        </DataTable>
      </div>
    </div>
  </t-dialog>
  <t-dialog v-model:visible="addExamVisible" confirmBtn="" width="30%">
    <div class="d-flex flex-wrap">
      <template v-for="item in examType">
        <ExamIcon @click="addExam(item)" :icon="item.icon" :type-name="item.typeName"></ExamIcon>
      </template>
    </div>
  </t-dialog>
  <t-dialog v-model:visible="importVisible" @confirm="wordConfirm">
    <t-upload @success="uploadSuccess" ref="examUpload" :auto-upload="false" v-model="word" :formatRequest="uploadRequest"
      action="http://localhost:5000/admin/exam-item/importWord" accept=".doc,.docx" />
  </t-dialog>
  <t-dialog v-model:visible="richtext" width="60%" @confirm="handleConfirm">
    <ComEditer2 v-model="itemText"></ComEditer2>
  </t-dialog>
</template>
<script setup lang="ts">
import services from '@/utils/axios';
import IconFont from '@/components/Icon'
import { computed, onMounted, ref, watch } from 'vue';
import { MessagePlugin, SubmitContext, TreeNodeModel } from 'tdesign-vue-next';
import DataTable from '@/components/DataTable.vue';
import _, { map } from 'lodash'
import { computedExamId, examType2Local, isUUid } from '@/utils/useExam'
import ImageList from '@/components/ImageList.vue';
import draggable from 'vuedraggable-es';
import ComEditer from '@/components/ComEditer.vue'
import ExamIcon from '@/components/ExamIcon.vue';
import { examType } from './types';
import { v4 as uuidv4 } from 'uuid';
import { useRoute, useRouter } from 'vue-router';
import { SuccessContext } from 'tdesign-vue-next/es/upload/type';
import ComEditer2 from '@/components/ComEditer2.vue'
import ExamBox from '@/components/ExamBox.vue';
let ruleForm = ref<any>(null)
let examUpload = ref<any>(null)

interface ExamItem {
  id: number;
  _id: string;
  answer: string;
  options: Array<{ label: string; value: string }>;
  title: string;
  type: string;
  analysis: string;
  difficulty: string;
  score: number;
  required: boolean;
  score_method: string;
  [key: string]: any;
};

interface Exam {
  title: string;
  type: string;
  image: string;
  describe: string;
  is_public: boolean;
  white_list: Array<string>;
  time: string;
  end_time: string;
  exam_item: Array<Exam>;
  exam_optration: Map<string, object>;
  unofficial_item?: Array<Exam>;
  [key: string]: any;
}
const router = useRouter()
const route = useRoute()
const rightHeight = ref()
//tabs选项卡
const tabsValue = ref<string>('first')
const visible = ref<boolean>(false)
const addExamVisible = ref<boolean>(false)
const importVisible = ref<boolean>(false)
const richtext = ref<boolean>(false)
const itemText = ref<string>('')
const richItemIndex = ref<number>(0)
const word = ref([])
//题库试题
const items = ref<Array<any>>([])
const current = ref();
const allRule = {
  title: [{ required: true, message: '请填写试卷标题' }],
  describe: [{ required: true, message: '请填写试卷简介' }],
  is_public: [{ required: true, message: '请选择是否公开' }],
  time: [{ required: true, message: '请选择开始时间' }],
  end_time: [{ required: true, message: '请选择结束时间' }],
};

//当前试题
const currentExam = ref<ExamItem>({
  id: 1,
  _id: '',
  answer: '',
  options: [
    {
      label: 'A',
      value: '我是答案'
    }
  ],
  title: '',
  type: '',
  analysis: '',
  difficulty: '',
  score: 5,
  required: true,
  score_method: ''
})

// 


const query = ref<any>()
const selectedRowKeys = ref([]);
const exam = ref<Exam>({
  title: '试卷标题',
  type: 'exam',
  image: '',
  describe: '欢迎来到本次考试',
  is_public: true,
  white_list: [],
  time: '',
  end_time: '',
  exam_item: [],
  score: 0,//试卷总分
  exam_optration: new Map()
})
const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  {
    width: '100',
    colKey: '_id',
    title: 'id',
    align: 'center',
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
  },
  // {
  //   colKey: 'operation',
  //   title: '操作',
  //   align: 'center'
  // }
]
const com = ref<Array<ExamItem>>([])
const answerDescribe = ref<Array<any>>()
const examPublic = computed(() => {
  //@ts-ignore
  const is_public = exam.value.is_public as number;
  if (is_public === 1) {
    return true
  } else {
    return false
  }
})
const submit = () => {
  ruleForm.value.submit()
}
const importWord = () => {
  const id = route.params.id;
  if (!id) {
    MessagePlugin.warning('请先保存此试卷，在做导入。');
  } else {
    importVisible.value = true
  }
}
const uploadRequest = () => {
  return {
    sortId: com.value.length,
    id: route.params.id,
    //@ts-ignore
    file: word.value[0].raw
  }
}
// 处理富文本
const handleRichText = (e: { label: string, value: string }, index: number) => {
  itemText.value = e.value
  richtext.value = true;
  richItemIndex.value = index
}
// 处理富文本修改信息
const handleConfirm = () => {
  console.log(itemText.value);
  currentExam.value.options[richItemIndex.value].value = itemText.value as any;
  richtext.value = false;
}
//上传成功
const uploadSuccess = (context: SuccessContext) => {
  if (context.response.data) {
    MessagePlugin.success('上传成功')
    word.value = []
    importVisible.value = false
    fetchParams()
  } else {
    MessagePlugin.error('异常，请重试')
    return
  }
}
// 处理通用box点击事件
const handleBoxClick = (e: ExamItem) => {
  const dom = document.getElementById(e._id) as HTMLDivElement;
  dom.scrollIntoView({ behavior: 'smooth' });
  // 设置为当前current
  currentExam.value = e
}
const save = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult !== true) {
    MessagePlugin.error(firstError as string);
    return
  }
  const exam_optration: any = {};
  const exam_item = new Array();
  const unofficial_item = new Array();
  com.value.forEach((v: ExamItem) => {
    // ..._.omit(v, ['score', 'required', 'score_method'])
    if (!isUUid(v._id)) {
      exam_item.push(v._id)
    } else {
      unofficial_item.push(v)
    }
    exam_optration[v._id] = {
      id: v.id,
      _id: v._id,
      score: v.score,
      required: v.required,
      score_method: v.score_method
    }
  })
  exam.value.exam_item = exam_item;
  exam.value.exam_optration = exam_optration;
  exam.value.unofficial_item = unofficial_item;
  const isEdit = route.params.id
  let result = undefined;
  if (isEdit) {
    result = await services.put('exam/' + route.params.id, exam.value)
  } else {
    result = await services.post('exam', exam.value)
  }
  if (result) {
    MessagePlugin.success("保存成功");
  } else {
    MessagePlugin.error("保存异常");
  }
  router.go(-1)
}
//拖拽结束的事件
const onEnd = () => {
  computedExamId<ExamItem>(com.value)
};
onMounted(() => {
  const id = route.params.id
  rightHeight.value = document.querySelector('.right')?.scrollHeight + 'px'
  fetchQuestion()
  id ? fetchParams() : null
})
let row: any[] = []
watch(currentExam, (n: ExamItem, o: ExamItem) => {
  const index = com.value.findIndex((v: any) => v._id === n._id)
  com.value[index] = n;
  tabsValue.value = 'second';
}, {
  deep: true
})

const examScore = computed(() => {
  return _.sumBy(com.value, (v: any) => {
    return v.score
  })
})

const selectNode = (e: any) => {
  let node: TreeNodeModel = e.node;
  current.value = node.data._id

  query.value = {
    where: {
      group: node.data._id
    }
  }
}
const fetchQuestion = async () => {
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
const fetchParams = async () => {
  const id = route.params.id;
  let res = await services.get<any, any>(`exam/find_exam/${id}`);
  exam.value = res.data
  com.value = res.data.exam_item
}
const del = (_item: any) => {
  //待优化
  const index = _.findIndex(com.value, { title: _item.title });
  com.value.splice(index, 1);
  //重新计算id的值
  com.value = computedExamId(com.value);
}
const changValue = (title: string, value: string, index: string) => {
  // 更新侧边栏选中信息
  _.set(currentExam.value, title, value)
  // 更改整个com
  _.set(com.value, `${index}.${title}`, value)
}
const handleCurrent = (item: ExamItem) => {
  if (item._id === currentExam.value._id)
    return
  currentExam.value = item;
  tabsValue.value = 'second'
}
const selectChange = (v: any, rowData: any) => {
  selectedRowKeys.value = v;
  row = rowData.map((v: ExamItem) => {
    return {
      ...v,
      score: 5
    }
  });
}

const addQuestionExam = () => {
  com.value = computedExamId(_.uniqBy([...com.value, ...row], '_id')).map(v => {
    return {
      ...v,
      required: true,
      score: 5,
      score_method: 'only'
    }
  })
  selectedRowKeys.value = []
  visible.value = false;
}
const wordConfirm = () => {
  const id = route.params.id;
  if (!id) {
    MessagePlugin.warning('请先保存此试卷，在做导入。');
    importVisible.value = false;
    word.value = []
  } else {
    examUpload.value.uploadFiles()
  }
}
const addExam = (e: any) => {
  const id = com.value.at(-1)?.id as number || 0;
  com.value.push({
    id: id + 1,
    _id: uuidv4(),
    answer: 'A',
    options: [
      {
        label: 'A',
        value: '新选项'
      }
    ],
    title: '新题目',
    type: e.type,
    analysis: '',
    difficulty: '',
    score: 5,
    required: true,
    score_method: 'only'
  })
  addExamVisible.value = false
}
</script>
<style scoped lang="scss">
.p-none {

  // &:active{
  //   border-right:1px solid #0A65FB;
  // }
  p {
    padding: 0 !important;
    margin: 0 !important;
  }

}

.exam-content {
  flex: 1;
  padding: 20px;
  width: 100%;
  overflow-y: scroll;
  height: calc(100vh - 70px);

  .bottom-setting {
    width: 100%;

    .exam-import {
      width: 100%;
      margin-top: 24px;
      margin-bottom: 24px;
      border-radius: 4px;
      width: 100%;
      height: 42px;
      background: #fff;
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
      line-height: 42px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
    }


  }

  .exam-header {
    display: flex;
    color: #484848;
    border: 1px solid #EEEEEE;
    align-items: center;
    padding: 18px 40px 30px 30px;
    margin-bottom: 10px;

    &:hover {
      cursor: pointer;
    }

    .exam-score {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 60px;
      width: 60px;
      background-color: #62A7FF;
      border-radius: 4px;
      color: #fff;
    }
  }

  .addExam {
    height: 35px;
    border: 1px solid #EEEEEE;
    cursor: pointer;
    margin-top: 10px;
    line-height: 35px;
    text-align: center;
    width: 49%;

    &:hover {
      border: 1px dashed #0A65FB;
      color: #0A65FB;
    }
  }
}

.activity {
  border: 1px solid #0A65FB;
}

.right {
  width: 300px;
  border: 1px solid #F3F5F6;
}
</style>