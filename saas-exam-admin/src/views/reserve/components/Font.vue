<template>
    <div class="w-full p-2">
        <div class="py-3 text-line">基础元素</div>
        <div class="w-full flex h-[40px]">
            <div @click="addFont"
                class=" w-[50px] h-[35px] rounded flex items-center justify-center bg-[#f6f6f6] cursor-pointer mr-1 hover:text-white hover:bg-[#0a65fb] ">
                <Icon name="icon-ziti"></Icon>
            </div>
            <div @click="addRect"
                class=" w-[50px] h-[35px] rounded flex items-center justify-center bg-[#f6f6f6] cursor-pointer hover:text-white hover:bg-[#0a65fb]">
                <Icon name="icon-dantupailie"></Icon>
            </div>
        </div>
        <div class="py-3 text-line">设计元素</div>
        <div class="w-full h-[650px]">
            <div class="grid grid-cols-2 gap-2 justify-items-center">
                <div v-for="item in materialList" :key="item.name"
                    class="w-[140px] relative cursor-pointer rounded transition-transform duration-200 hover:scale-105 group bg-[#e5e1e1] flex items-center justify-center">
                    <img :src="item.img" class="w-full h-auto object-contain" />
                    <!-- 添加按钮 -->
                    <button @click="addMaterial(item)"
                        class="absolute z-999 right-2 bottom-2 px-2 py-1 text-xs bg-blue-500 text-white rounded shadow  group-hover:opacity-100 transition-opacity duration-200">
                        添加
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import Icon from '@/components/Icon';
import useSelect from '@/hooks/select';
enum IControlKey {
    bl = 'bl',
    br = 'br',
    mb = 'mb',
    ml = 'ml',
    mr = 'mr',
    mt = 'mt',
    tl = 'tl',
    tr = 'tr',
    mtr = 'mtr',
    lock = 'lock',
}
const { canvasEditor, fabric } = useSelect()
const defaultPosition = { shadow: '', fontFamily: 'arial' };
const addFont = () => {
    const text = new fabric.IText("欢迎使用", {
        ...defaultPosition,
        fontSize: 80,
        fill: '#000000FF',
    });
    canvasEditor.addBaseType(text, { center: true });
}

const materialList = [
    {
        name: '墙体',
        value: 'qiang',
        img: "http://oss.qinglingdesign.cn/yuyue/qiang.png",
        icon: "http://oss.qinglingdesign.cn/yuyue/Rectangle%201.png"
    },
    {
        name: '座位',
        value: 'zuowei',
        img: "http://oss.qinglingdesign.cn/yuyue/zuowei%20%281%29.png",
        icon: "http://oss.qinglingdesign.cn/yuyue/zuowei.png"
    },
    {
        name: '桌子',
        value: 'zuozi',
        img: "http://oss.qinglingdesign.cn/yuyue/zuozi.png",
        icon: "http://oss.qinglingdesign.cn/yuyue/zz.png"
    },
    {
        name: '花盆',
        value: 'hua',
        img: "http://oss.qinglingdesign.cn/yuyue/flower.png",
        icon: "http://oss.qinglingdesign.cn/yuyue/fff.png"
    }
]


const addRect = (event) => {
    const rect = new fabric.Rect({
        ...defaultPosition,
        fill: '#F57274FF',
        width: 400,
        height: 400,
        name: '矩形',
    });
    // 关闭拖拽点
    rect.set({
        hasControls: false,
        borderColor: '#F57274FF',
        borderOpacityWhenMoving: 0,
        borderScaleFactor: 0,
    });
    console.log(canvasEditor, 'canvasEditor')
    canvasEditor.addBaseType(rect, { center: true, event });
};
const addMaterial = (item) => {
    if (item.value === 'qiang') {
        // 画一个墙体，用矩形
        const rect = new fabric.Rect({
            ...defaultPosition,
            fill: '#F57274FF',
            width: 80,
            height: 400,
            name: 'qiang',
        });
        // 关闭拖拽点
        rect.set({
            borderColor: '#F57274FF',
            borderOpacityWhenMoving: 0,
            borderScaleFactor: 0,
        });
        canvasEditor.addBaseType(rect, { center: true, event });
        return
    }
    fabric.Image.fromURL(item.icon, (img) => {
        // 需要缩放的统一处理

        img.scaleToWidth(50);
        img.scaleToHeight(50);
        // 设置通用属性
        img.set({
            name: item.name,
            hasControls: false,
            originX: 'center',
            originY: 'center'
        });
        canvasEditor.addBaseType(img, { center: true });
    }, { crossOrigin: 'anonymous' });
}
</script>
<style lang="less" scoped>
.text-line {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #333;
}

.bg-red {
    background-color: rgb(175, 170, 170);
}

.text-line::before,
.text-line::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ddd;
}
</style>