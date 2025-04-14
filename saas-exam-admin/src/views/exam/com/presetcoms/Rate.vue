<template>
  <div class="nsp">
    <div class="d-flex w-100 justify-content-between question-tag-txt">
      <span>
        {{ props.minText }}
      </span>
      <span>
        {{ props.maxText }}
      </span>
    </div>
    <div class="mt-2">
      <t-rate :default-value="num" :count="max">
        <template #icon="iconProps">
          <IconFont :name="icon" v-bind="iconProps"></IconFont>
          <!-- <heart-filled></heart-filled> -->
          <!-- <ThumbUpIcon v-bind="iconProps"></ThumbUpIcon> -->
        </template>
      </t-rate>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed,h } from 'vue';
import IconFont from '@/components/Icon'
import { ThumbUpIcon } from 'tdesign-icons-vue-next'
const num = computed(() => {
  if (props.min > 1) {
    return props.max - props.min
  } else {
    return props.max
  }
})
const props = defineProps({
  max: {
    type: Number,
    default: 10
  },
  min: {
    type: Number,
    default: 1
  },
  num: {
    type: Number,
    default: 5
  },
  icon: {
    type: String,
    default: 'star'
  },
  minText: {
    type: String,
    default: '非常不满意'
  },
  maxText: {
    type: String,
    default: '非常满意'
  }
})
</script>
<style scoped lang="scss">
.nsp {
  width: 550px;

  .question-tag-txt {
    span {
      height: 22px;
      line-height: 22px;
      padding: 0 5px;
      background-color: #f2f2f2;
      border-radius: 3px;
      font-size: 14px;
      color: #6A6A6A;
    }
  }

  span {
    display: inline-block;
    height: 50px;
    min-width: 50px;
    margin-top: 2px;
    background-color: #E5E5E5;
    margin-right: 5px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    border-radius: 5px;
  }
}
</style>