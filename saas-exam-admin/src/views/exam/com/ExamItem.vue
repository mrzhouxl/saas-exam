<template>
  <div>
    <div class="componentDesign">
      <div class="box">
        <div class="title">
          <div class="id">
            {{ attrs.id }}<span style="color:red;">*</span>
          </div>
          <div class="exam-content">
            <!-- <EditInput class="exam-title">
              <div v-html="attrs.title">
              </div>
            </EditInput> -->
            <div class="exam-title" @blur="(e) => changeValue(e, 'title')" contenteditable="true" v-html="attrs.title">
            </div>
            <div class="score">
              (此题分值:{{ attrs.score || 0 }})
            </div>
          </div>
          <div class="setting">
            <span v-pointer @click="del">
              <icon-font name="icon-shanchu2"></icon-font>
            </span>
          </div>
        </div>
        <div class="select">
          <!-- 当是单选题和多选题的时候 -->
          <draggable
            v-if="attrs.type == 'single' || attrs.type == 'multiple' || attrs.type == 'judge' || attrs.type == 'indefinite' || attrs.type == 'sort'"
            :list="attrs.options" animation="300" @start="onStart" @end="onEnd">
            <template #item="{ element, index }">
              <div class="d-flex align-items-center">
                <div class="mr-8 draggable">
                  <IconFont name="icon-tuozhuai" color="#595961"></IconFont>
                </div>
                <div class="rich-text-item rich-text">

                  <t-popup destroy-on-close placement="top-left" trigger="focus" class="d-flex">
                    <template #content>
                      <!-- <div class="me-1 bar-item" id="test" @mousedown.prevent>
                        <t-dropdown @click="({ content }: DropdownOption) => updateFontSize(content)"
                          :hideAfterItemClick="false" placement="bottom" :popupProps="{ attach: (e) => e }"
                          :options="fontSizeOptions" @mousedown.prevent trigger="click">
                          <div>
                            <IconFont name="icon-toubu-wenzidaxiao"></IconFont>
                            {{ fontContent[0] }}
                          </div>
                        </t-dropdown>
                      </div>
                      <div class="me-1 bar-item" @mousedown.prevent="addBlod">
                        <IconFont name="icon-jiacu"></IconFont>
                      </div>
                      <div class="me-1 bar-item" @mousedown.prevent="updateFontColor('red')">
                        <IconFont name="icon-wenziyanse" size="11px"></IconFont>
                      </div>
                      <div class="me-1 bar-item" @mousedown.prevent="addUnderline">
                        <IconFont name="icon-zitixiahuaxian" size="13px"></IconFont>
                      </div>
                      <div class="me-1 bar-item" @mousedown.prevent="addImage">
                        <IconFont name="icon-tupian1" size="15px"></IconFont>
                        <span>图片</span>
                      </div> -->
                      <div class="editor-bar d-flex">
                        <div class="me-1 bar-item" @mousedown.prevent="openRichText(element, index)">
                          <IconFont name="icon-m-fuwenben" size="15px"></IconFont>
                          <span>富文本</span>
                        </div>
                      </div>
                    </template>
                    <div class="d-flex align-items-center">
                      <!--<div class="mr-8" style="width: 14px;">{{ element.label }}.</div>-->
                      <span v-if="attrs.type === 'single' || attrs.type === 'judge'">
                        <!-- <icon-font name="icon-weixuanzhongyuanquan"></icon-font> -->
                        <IconFont name="icon-danxuan" size="14px"></IconFont>
                      </span>
                      <span v-if="attrs.type === 'multiple'">
                        <IconFont name="icon-duoxuan" size="14px"></IconFont>
                      </span>
                    </div>
                    <!-- <div id="item-editer" @click="handleSelectItem"
                      @blur="(e) => changeValue(e, `options[${index}].value`)" contenteditable="true"
                      v-html="element.value" class="selectEditable">
                    </div> -->
                    <EditerInput id="item-editer" :model-value="element.value"
                      @change="(e) => changeValue(e, `options[${index}].value`)">
                    </EditerInput>
                    <div v-if="attrs.answer.search(element.label) != -1" class="answer">(正确答案)</div>
                  </t-popup>
                </div>
                <div class="rich-item-setting" @click.stop="handleDeleteOptions(element)">
                  <IconFont name="icon-jian"></IconFont>
                </div>
              </div>
            </template>
          </draggable>
          <!-- 简答题 -->
          <div v-if="attrs.type === 'enter'">
            <template v-for="item in attrs.answer.split(' ')">
              <t-input readonly style="width:200px;" class="mt-8" :modelValue="item"></t-input>
            </template>
          </div>
          <!-- 排序题 计算题 -->
          <div v-if="attrs.type === 'shortanswer' || attrs.type === 'calculate'">
            <div v-html="attrs.answer"> </div>
          </div>

          <div v-if="attrs.type === 'dropDown'">
            <DropDown :data="attrs.options" @remove="(e) => handleDeleteOptions(e)"
              @change="(e, index) => changeValue(e, `options.${index}.value`)"></DropDown>
          </div>
          <!-- 图片选择 -->
          <div v-if="attrs.type === 'picture'">
            <ImageChoose :data="attrs.options" @change="(e) => emits('changeValue', 'options', e)"></ImageChoose>
          </div>
          <!-- <div v-if="attrs.type === 'picture'">
            <ImageChoose :data="attrs.options" @change="(e)=>emits('changeValue','options',e)"></ImageChoose>
          </div> -->
          <div v-if="attrs.type === 'space'">
            <t-input value="内容输入" disabled></t-input>
          </div>
          <div v-if="attrs.type === 'multiLineSpace'">
            <MultiLineInput :data="attrs.options" @remove="(e) => handleDeleteOptions(e)"
              @change="(e, index) => changeValue(e, `options.${index}.value`)"></MultiLineInput>
          </div>

          <div v-if="attrs.type === 'scale'">
            <EditerInput class="rich-text w-100" :model-value="'5分表示非常满意，1分表示非常不满意，分值越低表示满意度越低'"></EditerInput>
            <Nsp :max="attrs.max" :min="attrs.min" :minText="attrs.minText" :maxText="attrs.maxText"></Nsp>
          </div>
          <div v-if="attrs.type === 'scoring'">
            <Rate :icon="attrs.icon" :max="attrs.max" :min="attrs.min" :minText="attrs.minText"
              :maxText="attrs.maxText">
            </Rate>
          </div>
          <div v-if="attrs.type === 'uploadImage'">
            <div class="uplaodTemplate">
              <IconFont name="icon-jia" color="#D8D8D8"></IconFont>
            </div>
          </div>
          <div v-if="attrs.type === 'name' || attrs.type === 'mobile' || attrs.type === 'email'">
            <t-input>
              <template #prefix-icon>
                <IconFont :name="formIconName(attrs.type)"></IconFont>
              </template>
            </t-input>
          </div>
          <div v-if="attrs.type === 'date'">
            <t-date-picker />
          </div>
          <div v-if="attrs.type === 'city'">
            <CityManage></CityManage>
          </div>
          <div v-if="attrs.type !== 'shortanswer' && attrs.type !== 'calculate'" class="push-select"
            @click="pushSelect">
            <IconFont name="icon-tianjia" color="#0A65FB"></IconFont>
            <span class="ml-8">添加选项</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { onMounted, ref, useAttrs, h } from 'vue';
import IconFont from '@/components/Icon'
import draggable from 'vuedraggable-es'
import _ from 'lodash';
import { nextOptions } from '@/utils/useExam';
import { useCommand } from '@/utils/useCommand'
import DropDown from './presetcoms/DropDown.vue'
import { DropdownOption } from 'tdesign-vue-next';
import ComEditer2 from '@/components/ComEditer2.vue';
import EditerInput from '@/components/EditerInput.vue';
import ImageChoose from './presetcoms/ImageChoose.vue'
import UploadImage from './presetcoms/ImageChoose.vue'
import MultiLineInput from './presetcoms/MultiLineInput.vue';
import Nsp from './presetcoms/Nsp.vue'
import Rate from './presetcoms/Rate.vue'
import CityManage from './presetcoms/CityManage'
import { render } from 'vue';
const emits = defineEmits(['del', 'changeValue', 'richText'])
const fontContent = ref<[string, string]>(['', ''])
const richtext = ref<boolean>(false)
const itemText = ref<string>('')
const optionIndex = ref<number>(0)
const attrs: any = useAttrs()
const { addBlod, addUnderline, updateFontColor, addImage, fontSizeOptions, checkCursorContent, updateFontSize } = useCommand()
const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})
const del = () => {
  emits('del', props.item)
}
//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};
onMounted(() => {
  let editableDiv = document.getElementById('item-editer') as HTMLDivElement;
  // 禁用输入事件
  // editableDiv.addEventListener('input', function (event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   return false;
  // });

  // // 禁用粘贴事件
  // editableDiv.addEventListener('paste', function (event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   return false;
  // });
})
//拖拽结束的事件
const onEnd = () => {
  console.log("结束拖拽");
};
const handleSelectItem = (e: Event) => {
  checkCursorContent(fontContent)
}

const formIconName = (type: string) => {
  switch (type) {
    case 'name': return 'icon-xingming';;
    case 'mobile': return 'icon-shouji';;
    case 'email': return 'icon-email';;
  }
}

const handleConfirm = () => {
  emits('changeValue', `options.${optionIndex.value}.value`, itemText.value);
}
// const addBlod = () => {
//   let selection = window.getSelection() as Selection;
//   document.execCommand('bold', false, selection?.toString())
// }
//删除选项
const handleDeleteOptions = (e: { label: string; value: string }) => {
  const options = _.cloneDeep(attrs.options);//拷贝新选项
  const index = _.findIndex(options, { value: e.value })//查询当前index
  options.splice(index, 1)//删除当前选项
  //对当前选项的lable ABC进行重新排序
  for (const key in options) {
    let code = 65;
    options[key].label = String.fromCharCode(code + Number(key));
  }
  emits('changeValue', 'options', options)
}
//新增选项
const pushSelect = () => {
  const options = _.cloneDeep(attrs.options)
  const nextOption = nextOptions(options.slice(-1)[0].label)
  options.push({
    label: nextOption,
    value: '空白选项'
  })
  emits('changeValue', 'options', options)
}
// 开启富文本弹框
const openRichText = (element: any, index: number) => {
  // itemText.value = element.value;
  // richtext.value = true;
  // optionIndex.value = index;
  emits('richText', element, index)
}
const changeValue = (e: HTMLInputElement | any, title: string) => {
  emits('changeValue', title, e.target.innerHTML)
}
</script>
<style scoped lang="scss">
.ghost {
  border: solid 1px rgb(19, 41, 239) !important;
}

.chosenClass {
  background-color: #f1f1f1;
}

.editer {
  position: absolute;
  left: 20px;
  top: -20px;
  display: flex;
  cursor: pointer;
}

.componentDesign {
  min-height: 203px;
  border: 1px solid #EEEEEE;
  padding: 18px 40px 30px 30px;

  // &:active {
  //   border: 1px solid #0A65FB;
  // }

  // &:hover {
  //   border: 1px solid #0A65FB;
  // }
  .push-select {
    height: 25px;
    line-height: 25px;
    border: 1px dashed #EEEEEE;
    width: 100px;
    margin-top: 5px;
  }

  .title {
    display: flex;

    .exam-content {
      flex: 1;
      display: flex;
      cursor: text;
      min-height: 36px;
      line-height: 36px;

      .exam-title {
        min-width: 150px;
        max-width: 575px;
        border: 1px dashed #fff;

        &:hover {
          border: 1px dashed #999999;
        }

        &:focus {
          background: #f4f4f4;
          cursor: auto;
          outline: none;
        }

      }

      .exam-foce {
        cursor: auto;
        background: #f4f4f4;
      }

      .score {
        color: #d8d8d8;
        margin-left: 12px;
      }
    }

    .id {
      display: flex;
      align-items: center;
      padding-right: 10px;
    }

    .setting {
      width: 50px;
    }
  }

  .select {
    margin-left: 10px;

    .uplaodTemplate {
      height: 130px;
      width: 130px;
      border: 1px solid #D8D8D8;
      text-align: center;
      line-height: 130px;
    }

    .draggable {
      cursor: move;
    }


    .rich-text-item {
      position: relative;
      // display: flex;
      // align-items: center;
      // min-width: 350px;
      // min-height: 35px;
      // padding-left: 8px;
      // margin-bottom: 3px;
      // cursor: pointer;
      // border: 1px dashed #fff;

      .editor-bar {
        width: 180px;
        height: 100px;

        :global(.bar-item:hover) {
          background-color: #F3F3F3;
          cursor: pointer;
          // position: relative;
        }

        .bar-item {
          display: flex;
          line-height: 30px;
          width: 40px !important;
          height: 30px !important;
        }
      }

      .answer {
        color: #00bf6f;
        min-width: 60px;
      }

      // &:focus-within {
      //   background: #f4f4f4;
      //   cursor: auto;
      //   outline: none;
      // }

      // &:hover {
      //   border: 1px dashed #999999;
      // }

      .selectEditable {
        min-width: 240px;
        margin-left: 8px;
        // font: initial;

        &:deep(p) {
          padding: 0 !important;
          margin: 0 !important;
        }

        &:focus-within {
          background: #f4f4f4;
          cursor: auto;
          outline: none;
        }
      }
    }



  }
}
</style>