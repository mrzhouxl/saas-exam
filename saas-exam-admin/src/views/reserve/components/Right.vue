<template>
    <div class="w-[330px] h-full p-2">
        <t-form label-align="top">
            <t-form-item label="画布宽高">
                <span>宽：</span><t-input v-model="canvasSize.width"></t-input>
                &nbsp;
                <span>高：</span><t-input v-model="canvasSize.width"></t-input>
            </t-form-item>
            <t-form-item label="颜色">
                <t-color-picker :show-primary-color-preview="false" format="HEX" />
            </t-form-item>
            <t-form-item label="位置">
                <DirectionControl @direction="handleDirection"></DirectionControl>
            </t-form-item>
        </t-form>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import DirectionControl from './DirectionControl.vue';
import useSelect from '@/hooks/select';
const { canvasEditor, getObjectAttr, mixinState } = useSelect()
const canvasSize = reactive({
    width: 0,
    height: 0
})


const handleDirection = (direction: string) => {
    const [item] = mixinState.mSelectActive;
    if (item.name != 'qiang') {
        if (!item || typeof item.set !== 'function') return;

        let angle = 0;

        if (direction === 'left') {
            angle -= 90;
        } else if (direction === 'right') {
            angle += 90;
        } else if (direction === 'up') {
            angle = 0;
        } else if (direction === 'down') {
            angle = 180;
        }

        // 以中心为轴旋转
        item.set({
            angle
        });

        // 画布刷新
        item.canvas?.requestRenderAll();
    }

}
</script>
<style scoped></style>