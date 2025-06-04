<template>
    <div class="w-[330px] h-full p-2">
        <div class="space-y-2">
            <h3 class="text-sm text-gray-600 font-semibold">快捷操作</h3>
            <div class="flex justify-around items-center bg-[#f7f8fa] rounded-xl p-2 mb-2">
                <button class="flex flex-col items-center focus:outline-none hover:text-blue-500">
                    <t-icon name="lock-on" size="16" />
                </button>
                <button class="flex flex-col items-center focus:outline-none hover:text-blue-500">
                    <t-icon name="delete" size="16" />
                </button>
                <button class="flex flex-col items-center focus:outline-none hover:text-blue-500">
                    <t-icon name="file" size="16" />
                </button>
                <button class="flex flex-col items-center focus:outline-none hover:text-blue-500">
                    <t-icon name="browse" size="16" />
                </button>
            </div>
        </div>
        <!-- Section: 画布尺寸 -->
        <div class="space-y-2">
            <h3 class="text-sm text-gray-600 font-semibold">尺寸</h3>
            <div class="flex items-center gap-2 bg-[#f5f5f5] p-2 rounded-lg">
                <div>
                    <span>宽度</span>
                    <span><t-input class="w-[150px]" v-model="canvasSize.width" /></span>
                </div>
                <div>
                    <span>高度</span>
                    <span><t-input class="w-[150px]" v-model="canvasSize.height" /></span>
                </div>
            </div>
        </div>

        <!-- Section: 颜色 -->
        <div class="space-y-2">
            <h3 class="text-sm text-gray-600 font-semibold">颜色</h3>
            <div class="flex items-center gap-2 bg-[#f5f5f5] p-2 rounded-lg">
                <t-color-picker class="w-full" format="HEX" :show-primary-color-preview="true"
                    :popup-props="{ placement: 'bottom-left' }" />
            </div>
        </div>


        <!-- Section: 座位号 -->
        <div class="space-y-2">
            <h3 class="text-sm text-gray-600 font-semibold">座位号</h3>
            <div class="flex items-center gap-2 bg-[#f5f5f5] p-2 rounded-lg">
                <span>
                    <t-input class="w-[150px]" @change="updateNumber" />
                </span>
            </div>
        </div>

        <!-- Section: 位置 -->
        <div class="space-y-2">
            <h3 class="text-sm text-gray-600 font-semibold">位置</h3>
            <div class="flex items-center gap-2 bg-[#f5f5f5] p-2 rounded-lg">
                <DirectionControl @direction="handleDirection" />
            </div>
        </div>
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

const updateNumber = (val: number) => {
    const activeObject = canvasEditor.canvas?.getActiveObjects()[0];
    if (activeObject?.type === 'group') {
        activeObject.setOptions({
            seatNumber: val
        })
        // 遍历 group 内的所有子对象
        activeObject.getObjects().forEach(obj => {
            if (obj.isType('i-text')) {
                obj.set({
                    text: String(val),
                    seatNumber: val
                });
            }
        });
        // 必须调用一次 setCoords，否则渲染可能错位
        activeObject.setCoords();
        canvasEditor.canvas?.renderAll();
    }
};
</script>
<style scoped></style>