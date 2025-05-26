<template>
    <div class="w-full p-2">
        <div class="py-3 text-line">基础元素</div>
        <div class="w-full flex h-[40px]">
            <div @click="addFont"
                class=" w-[50px] h-[35px] rounded flex items-center justify-center bg-[#f6f6f6] cursor-pointer mr-1 hover:text-white hover:bg-[#0a65fb] ">
                <Icon name="icon-ziti"></Icon>
            </div>
            <div
                @click="addRect"
                class=" w-[50px] h-[35px] rounded flex items-center justify-center bg-[#f6f6f6] cursor-pointer hover:text-white hover:bg-[#0a65fb]">
                <Icon name="icon-dantupailie"></Icon>
            </div>
        </div>
        <div class="py-3 text-line">设计元素</div>
        <div class="w-full h-full">
            <div class="grid grid-cols-2 gap-4 justify-items-center overflow-y-auto h-[650px]">
                <div v-for="item in materialList" :key="item.name" class="w-[140px] h-[187px] rounded">
                    <img :src="item.img" class="w-full h-full">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject } from 'vue';
import Icon from '@/components/Icon';
import useSelect from '@/hooks/select';
import qiang from '@/assets/img/qiang.png'
import zuowei from '@/assets/img/zuowei.png'
import zuozi from '@/assets/img/zuozi.png'
import flower from '@/assets/img/flower.png'
const { canvasEditor } = useSelect()
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
        img: ref(qiang),
    },
    {
        name: '座位',
        img: ref(zuowei),
    },
    {
        name: '桌子',
        img: ref(zuozi),
    },
    {
        name: '花盆',
        img: ref(flower),
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
  console.log(canvasEditor,'canvasEditor')
  canvasEditor.addBaseType(rect, { center: true, event });
};
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