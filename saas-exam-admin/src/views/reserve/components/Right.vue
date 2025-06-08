<template>
    <div class="w-[330px] h-full p-2">
        <div class="space-y-2">
            <h3 class="text-sm text-gray-600 font-semibold">快捷操作</h3>
            <div class="flex justify-around items-center bg-[#f7f8fa] rounded-xl p-2 mb-2">

                <button class="flex flex-col items-center focus:outline-none hover:text-blue-500" @click="handleDelete">
                    <t-icon name="delete" size="16" />
                </button>
                <button class="flex flex-col items-center focus:outline-none hover:text-blue-500" @click="handleCopy">
                    <t-icon name="file" size="16" />
                </button>
            </div>
        </div>
        <!-- Section: 画布尺寸 -->
        <div class="space-y-2">
            <h3 class="text-sm text-gray-600 font-semibold">尺寸</h3>
            <div class="flex items-center gap-2 bg-[#f5f5f5] p-2 rounded-lg">
                <div>
                    <span>宽度</span>
                    <span><t-input class="w-[140px]" v-model.number="canvasSize.width" /></span>
                </div>
                <div>
                    <span>高度</span>
                    <span><t-input class="w-[140px]" v-model.number="canvasSize.height" /></span>
                </div>
            </div>
        </div>

        <!-- Section: 颜色 -->
        <div class="space-y-2" v-if="comAttr.type === 'zuowei' || comAttr.type === 'qiang'">
            <h3 class="text-sm text-gray-600 font-semibold">颜色</h3>
            <div class="flex items-center gap-2 bg-[#f5f5f5] p-2 rounded-lg">
                <t-color-picker class="w-full" format="HEX" :value="comAttr.fill" @change="handleChangeColor"
                    :show-primary-color-preview="true" :popup-props="{ placement: 'bottom-left' }" />
            </div>
        </div>


        <!-- Section: 座位号 -->
        <div class="space-y-2" v-if="comAttr.type === 'zuowei'">
            <h3 class="text-sm text-gray-600 font-semibold">座位号</h3>
            <div class="flex items-center gap-2 bg-[#f5f5f5] p-2 rounded-lg">
                <span>
                    <t-input :value="comAttr.seatNumber" class="w-[150px]" @change="updateNumber" />
                </span>
            </div>
        </div>

        <!-- Section: 位置 -->
        <div class="space-y-2" v-if="comAttr.type === 'zuowei' || comAttr.type === 'zuozi'">
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
import { fabric } from 'fabric';
import { ColorObject, ColorPickerChangeTrigger } from 'tdesign-vue-next';
import { values } from 'lodash';
const { canvasEditor, mixinState, isOne } = useSelect()
const update = getCurrentInstance();
const canvasSize = reactive({
    width: 0,
    height: 0
})

const comAttr = reactive({
    type: '',
    fill: '',
    seatNumber: ''
})


watch(()=>[canvasSize.height, canvasSize.width],()=>{
    setSize()
})


const getObjectAttr = () => {
    const activeObject = canvasEditor.canvas?.getActiveObjects()[0];
    // 不是当前obj，跳过
    // if (e && e.target && e.target !== activeObject) return;
    if (activeObject && isOne.value) {
        comAttr.type = activeObject.name
        if (activeObject.name === 'zuowei') {
            const active = activeObject.getObjects().find(v => v.type === 'text');
            const fill = active.get('fill')
            comAttr.fill = fill;
        } else {
            const fill = activeObject.get('fill') as string
            comAttr.fill = fill;
        }
        const seatNumber = activeObject.get('seatNumber') as string;
        comAttr.seatNumber = seatNumber
    }
}

const getWorkSpaceSize = () => {
    const size = canvasEditor.getWorkspase();
    const { width: w, height: h } = size || {};
    canvasSize.width = w;
    canvasSize.height = h;
    canvasEditor.on('sizeChange', (w: number, h: number) => {
        canvasSize.width = w;
        canvasSize.height = h;
    });
}

const setSize = () => {
    canvasEditor.setSize(canvasSize.width, canvasSize.height);
};

const handleDelete = () => {
    const activeObject = canvasEditor.canvas?.getActiveObjects()[0];
    if (activeObject) {
        canvasEditor.canvas?.remove(activeObject);
    }
}
const handleCopy = () => {
    const activeObject = canvasEditor.canvas?.getActiveObjects()[0];
    if (activeObject) {
        canvasEditor.canvas?.add(activeObject);
    }
}
const selectCancel = () => {
    update?.proxy?.$forceUpdate();
};
onMounted(() => {
    nextTick(() => {
        getWorkSpaceSize();
        canvasEditor.on('selectCancel', selectCancel);
        canvasEditor.on('selectOne', getObjectAttr);
    });
});
onBeforeUnmount(() => {
    canvasEditor.off('selectCancel', selectCancel);
    canvasEditor.off('selectOne', getObjectAttr);
});


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

const handleChangeColor = (value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => {
    // 修改字体颜色 或者墙的颜色，展示不修改座位颜色
    const activeObject = canvasEditor.canvas?.getActiveObjects()[0];
    if (activeObject.name === 'zuowei') {
        activeObject.getObjects().forEach(obj => {
            if (obj.isType('text')) {
                obj.set({
                    fill: value
                });
            }
        });
    } else {
        activeObject?.set('fill', value)
    }
    activeObject.setCoords();
    canvasEditor.canvas?.renderAll();
    getObjectAttr()
}

const updateNumber = (val: number) => {
    const activeObject = canvasEditor.canvas?.getActiveObjects()[0];
    console.log(activeObject, val, 'activeObject')
    if (activeObject?.type === 'group') {
        activeObject.setOptions({
            seatNumber: val
        })
        // 遍历 group 内的所有子对象
        activeObject.getObjects().forEach(obj => {
            if (obj.isType('text')) {
                obj.set({
                    text: String(val),
                    seatNumber: val
                });
            }
        });
        // 必须调用一次 setCoords，否则渲染可能错位
        activeObject.setCoords();
        getObjectAttr()
        canvasEditor.canvas?.renderAll();
    }
};
</script>
<style scoped></style>