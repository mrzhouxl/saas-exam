<template>
    <div class="w-[390px] h-full flex">
        <div class="asider w-[50px] h-full border-l border">
            <div 
                v-for="item in menu" 
                class="w-full flex flex-col items-center justify-center h-[50px] border-r cursor-pointer mt-2"
                :class="{'current-border':currentLeftItem === item.value}"
                @click="(currentLeftItem = item.value)"
                >
                <span>
                    <t-icon :name="item.icon" size="20"></t-icon>
                </span>
                <span>{{ item.name }}</span>
            </div>
        </div>
        <div class="flex-1">
            <Font v-if="currentLeftItem === 'font'"></Font>
        </div>
    </div>
</template>
<script setup lang="ts">
import Font from './Font.vue'
const currentLeftItem = ref<string>('font')
const menu = [
    {
        name: '文字',
        value: 'font',
        icon: "textformat-color"
    }, {
        name: "素材",
        value: 'material',
        icon: "app"
    }, {
        name: "图层",
        value: 'layer',
        icon: "layers"
    }
];
</script>
<style scoped>
.current-border{
    border-right:1px solid #0a65fb !important;
}
</style>