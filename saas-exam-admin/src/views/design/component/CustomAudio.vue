<template>
  <div>
    <DesignContainer>
      <nut-audio :url="url" :loop="false" type="progress" @forward="forward" @fast-back="fastBack" @play="changeStatus"
        @ended="ended" @change-progress="changeProgress">
        <div class="nut-audio-operate-group">
          <nut-audio-operate type="back">
            <PlayDoubleBack width="35px" height="35px"></PlayDoubleBack>
          </nut-audio-operate>
          <nut-audio-operate type="play">
            <PlayStart v-if="!playing" width="35px" height="35px"></PlayStart>
            <PlayStop v-else width="35px" height="35px"></PlayStop>
          </nut-audio-operate>
          <nut-audio-operate type="forward">
            <PlayDoubleForward width="35px" height="35px"></PlayDoubleForward>
          </nut-audio-operate>
        </div>
      </nut-audio>
    </DesignContainer>
    <mountedTeleport v-bind="$attrs" to="#designSetting">
      <form-builder :options="formOptions" :modelValue="$props" @update:modelValue="updateSetting"></form-builder>
    </mountedTeleport>
  </div>
</template>
<script setup lang="ts">
import DesignContainer from '@/components/DesignContainer.vue';
import { ref } from 'vue';
import mountedTeleport from './mountedTeleport.vue';
import { PlayDoubleBack, PlayDoubleForward, PlayStart, PlayStop } from '@nutui/icons-vue'
interface Props {
  url: string;
}
const props = withDefaults(defineProps<Props>(), {})
const playing = ref(false)
const fastBack = () => {
  console.log('Backwards')
}
const forward = (progress: string) => {
  console.log('Fast forward', 'Current Time' + progress)
}
const changeStatus = (status: boolean) => {
  console.log('Current play status', status)
  playing.value = status
}
const ended = () => {
  console.log('Playing ended')
}
const changeProgress = (val: string) => {
  console.log('Change progress', val)
}
const formOptions = ref<Array<any>>([
  {
    prop: '',
    component: 'tip',
    text: '*设置基础配置'
  },
  {
    type: 'container',
    title: '配置',
    column: [
      {
        prop: "url",
        column: '选择音频',
        component: 'Choose',
        type: 'audio'
      }
    ]
  },

])
const emit = defineEmits(["del", "input", 'update:modelValue']);
const updateSetting = (value: any) => {
  emit('update:modelValue', value)
}

</script>
<style lang="scss" scoped></style>