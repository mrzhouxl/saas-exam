<template>
    <div class="w-[330px] h-full p-2">
        <t-form label-align="top">
            <t-form-item label="画布宽高">
                <span>宽：</span><t-input v-model="canvasSize.width"></t-input>
                &nbsp;
                <span>高：</span><t-input v-model="canvasSize.width"></t-input>
            </t-form-item>
            <t-form-item label="颜色">
                <t-color-picker :show-primary-color-preview="false" format="HEX"/>
            </t-form-item>
            <t-form-item label="位置">
                <DirectionControl></DirectionControl>
            </t-form-item>
        </t-form>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import DirectionControl from './DirectionControl.vue';
const canvasSize = reactive({
    width: 0,
    height: 0
})
</script>
<style scoped></style>