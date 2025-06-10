<template>
    <div class="h-[60px] flex border-b">
        <div class="w-[400px] flex pl-10 items-center">
            <span class="w-[30px] text-center hover:bg-slate-50 cursor-pointer" @click="$router.go(-1)">
                <RollbackIcon />
            </span>
            <div>
                <img width="30" class="t-menu__logo--center" src="@/assets/img/logo/logo.png" alt="logo"
                    style="width: 150px;height: 30px;object-fit:scale-down;" />
            </div>
        </div>
        <div class="flex-1 items-center flex justify-center">
            <div class="w-[600px] flex justify-around">
                <t-dropdown :options="commonSetting" @click="handleCommon">
                    <t-button>常用设置</t-button>
                </t-dropdown>
                <t-button variant="text" theme="default">发布</t-button>
                <t-button variant="text" theme="default">保存</t-button>
                <span class="w-[30px] text-center flex items-center justify-center hover:bg-slate-50 cursor-pointer">
                    <DownloadIcon />
                </span>
                <span class="w-[30px] text-center flex items-center justify-center hover:bg-slate-50 cursor-pointer">
                    <ImageIcon />
                </span>
                <t-button variant="text" theme="default">预览</t-button>
                <t-button variant="text" theme="default">使用文档</t-button>
            </div>
        </div>
        <div class="w-[400px] flex items-center justify-center">
            <div class="w-[200px] flex justify-between">
                <t-button theme="default" variant="outline" @click="pageSetting">页面设置</t-button>
                <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
            </div>
        </div>
    </div>
    <t-dialog v-model:visible="visible" header="设置" width="40%" :confirm-on-enter="true" 
        :on-close="close" :on-confirm="onConfirmAnother">
        <t-space direction="vertical" style="width: 100%">
            <div>
                <p>这是弹框内容</p>
                <p>This is Dialog Content</p>
            </div>
        </t-space>
    </t-dialog>
</template>
<script setup lang="ts">
import useSelect from '@/hooks/select';
import { RollbackIcon, DownloadIcon, ImageIcon } from 'tdesign-icons-vue-next'
import { DialogCloseContext, DialogConfig, DropdownOption } from 'tdesign-vue-next';

const { canvasEditor } = useSelect()
const commonSetting = [
    { content: '新建界面', value: 1 },
    { content: '清空界面', value: 2 },
]
const visible = ref(false);


const onConfirmAnother = (context:DialogConfig) => {
    console.log('点击了确认按钮', context);
    visible.value = false;
};
const close = (context: DialogCloseContext) => {
    console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
};



const handleCommon = (dropdownItem: DropdownOption, context: { e: MouseEvent }) => {
    console.log(dropdownItem)
    if (dropdownItem?.value === 2) {
        canvasEditor.clear()
    }
}

const pageSetting = () => {
    visible.value = true
}
</script>
<style></style>