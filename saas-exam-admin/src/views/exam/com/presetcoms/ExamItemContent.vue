<template>
  <draggable
    v-if="type == 'single' || type == 'multiple' || type == 'judge' || type == 'indefinite' || type == 'sort'"
    :list="options" animation="300" @start="onStart" @end="onEnd">
    <template #item="{ element, index }">
      <div class="d-flex align-items-center">
        <div class="mr-8 draggable">
          <IconFont name="icon-tuozhuai" color="#595961"></IconFont>
        </div>
        <div class="rich-text-item">
          <t-popup destroy-on-close placement="top-left" trigger="focus" class="d-flex">
            <template #content>
              <div class="editor-bar d-flex">
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
                        </div> -->
                <!-- <div class="me-1 bar-item" @mousedown.prevent="addImage">
                          <IconFont name="icon-tupian1" size="15px"></IconFont>
                          <span>图片</span>
                        </div> -->
                <div class="me-1 bar-item" @mousedown.prevent="openRichText(element, index)">
                  <IconFont name="icon-m-fuwenben" size="15px"></IconFont>
                  <span>富文本</span>
                </div>
              </div>
            </template>
            <div class="d-flex align-items-center">
              <div class="mr-8" style="width: 14px;">{{ element.label }}.</div>
              <span v-if="type === 'single' || type === 'judge'">
                <!-- <icon-font name="icon-weixuanzhongyuanquan"></icon-font> -->
                <IconFont name="icon-danxuan" size="14px"></IconFont>
              </span>
              <span v-if="type === 'multiple'">
                <IconFont name="icon-duoxuan" size="14px"></IconFont>
              </span>
            </div>
            <div id="item-editer" @click="handleSelectItem" @blur="(e) => changeValue(e, `options[${index}].value`)"
              contenteditable="true" v-html="element.value" class="selectEditable">
            </div>
            <div v-if="answer.search(element.label) != -1" class="answer">(正确答案)</div>
          </t-popup>
        </div>
        <div class="rich-item-setting" @click.stop="handleDeleteOptions(element)">
          <IconFont name="icon-jian"></IconFont>
        </div>
      </div>
    </template>
  </draggable>
</template>
<script setup lang="ts">
import draggable from 'vuedraggable-es';
import { useCommand } from '@/utils/useCommand'
const { addBlod, addUnderline, updateFontColor, addImage, fontSizeOptions, checkCursorContent, updateFontSize } = useCommand()
const props = defineProps({
  type:String,
  answer:String,
  options:Array,
})
//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};
const onEnd = () => {
  console.log("结束拖拽");
};
const handleSelectItem = (e: Event) => {
}
</script>
<style scoped></style>