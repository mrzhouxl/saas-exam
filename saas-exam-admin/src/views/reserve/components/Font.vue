<template>
    <div class="w-full h-full  p-2">
        <div class="py-3 text-line">基础元素</div>
        <div class="w-full flex h-[40px]">
            <div
                class=" w-[50px] h-[35px] rounded flex items-center justify-center bg-[#f6f6f6] cursor-pointer mr-1 hover:text-white hover:bg-[#0a65fb] ">
                <Icon name="icon-ziti"></Icon>
            </div>
            <div
                class=" w-[50px] h-[35px] rounded flex items-center justify-center bg-[#f6f6f6] cursor-pointer hover:text-white hover:bg-[#0a65fb]">
                <Icon name="icon-dantupailie"></Icon>
            </div>
        </div>
        <div class="py-3 text-line">设计元素</div>
        <div class="w-full h-full">
            <div class="grid grid-cols-2 gap-4 justify-items-center">
                <div v-for="item in 8" :key="item" class="w-[140px] h-[187px] rounded bg-red"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Icon from '@/components/Icon';

</script>
<style lang="less" scoped>
.text-line {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #333;
}

.bg-red {
    background-color: red;
}

.text-line::before,
.text-line::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ddd;
}
</style>