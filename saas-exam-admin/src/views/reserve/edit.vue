<template>
    <div class="p-2">
        <div class="flex justify-center w-full flex-col items-center ">
            <t-form statusIcon labelAlign="top" :rules="FORM_RULES" layout="inline" :data="reserveForm">
                <div class="w-[675px]">
                    <div class="text-2xl">{{ params.type === 'common' ? '通用预约' : "座位预约" }}</div>
                    <t-row class="row-gap" :gutter="[32, 24]">
                        <t-col :span="6">
                            <t-form-item label="预约名称" name="name">
                                <t-input :style="{ width: '322px' }" v-model="reserveForm.name" placeholder="请输入内容" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="6">
                            <t-form-item label="预约类型" name="type">
                                <t-input :style="{ width: '322px' }" v-model="reserveForm.type" placeholder="请输入内容" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="12">
                            <t-form-item label="介绍" name="description">
                                <t-textarea class="w-[400px]" v-model="reserveForm.description" placeholder="请输入描述内容" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="6">
                            <t-form-item label="位置" name="location">
                                <t-input :style="{ width: '322px' }" v-model="reserveForm.location"
                                    placeholder="请输入内容" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="6">
                            <t-form-item label="标签" name="tags">
                                <t-tag-input class="w-[322px]" v-model="reserveForm.tags" placeholder="添加新标签"
                                    :tag-props="{ theme: 'primary' }" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="8">
                            <t-form-item label="展示头图" name="banner">
                                <ImageUploader v-model="reserveForm.banner" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="6">
                            <t-form-item label="开始时间-结束日期" name="start_time">
                                <t-date-range-picker allow-input clearable format="YYYY-MM-DD HH:mm:ss"
                                    @change="handleChange" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="6">
                            <t-form-item label="预约时间间隔" name="split_time">
                                <t-input :style="{ width: '322px' }" v-model="reserveForm.split_time" type="number"
                                    placeholder="请输入选择时间间隔的分段" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="6">
                            <t-form-item label="是否开启子项" name="is_subporject">
                                <t-switch v-model="reserveForm.is_subporject" />
                            </t-form-item>
                        </t-col>
                        <t-col :span="8" v-if="reserveForm.is_subporject">
                            <t-form-item label="子项目" name="project">
                                <div class="w-full">
                                    <div class="mb-2 flex justify-between items-center">
                                        <span class="text-lg font-medium">子项目设置</span>
                                        <t-button theme="primary" @click="addRow">添加子项目</t-button>
                                    </div>
                                    <table class="w-full table-fixed border border-gray-300">
                                        <thead>
                                            <tr class="bg-gray-100 text-left text-sm">
                                                <th class="border border-gray-300 p-2 w-[150px]">宣传图</th>
                                                <th class="border border-gray-300 p-2 w-[200px]">名称</th>
                                                <th class="border border-gray-300 p-2 w-[200px]">描述</th>
                                                <th class="border border-gray-300 p-2 w-[120px]">剩余</th>
                                                <th class="border border-gray-300 p-2 w-[80px]">操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in reserveForm.project" :key="index"
                                                class="align-top">
                                                <td class="border border-gray-300 align-middle p-2" align="center">
                                                    <div class="flex justify-center items-center">
                                                        <ImageUploader v-model="item.banner" :multiple="false"
                                                            :max="1" />
                                                    </div>
                                                </td>
                                                <td class="border border-gray-300 align-middle p-2" align="center">
                                                    <div class="flex justify-center items-center">
                                                        <t-input v-model="item.name" placeholder="请输入名称" />
                                                    </div>
                                                </td>
                                                <td class="border border-gray-300 p-2 align-middle min-h-[150px]"
                                                    align="center">
                                                    <div class="flex justify-center items-center h-full">
                                                        <t-textarea v-model="item.description" placeholder="请输入描述" />
                                                    </div>
                                                </td>
                                                <td class="border border-gray-300 align-middle p-2" align="center">
                                                    <div class="flex justify-center items-center h-full">
                                                        <t-input v-model="item.remaining" type="number" />
                                                    </div>
                                                </td>
                                                <td class="border border-gray-300 align-middle p-2 text-center"
                                                    align="center">
                                                    <t-button theme="danger" size="small"
                                                        @click="removeRow(index)">删除</t-button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </t-form-item>
                        </t-col>
                    </t-row>
                </div>
                <div class="form-submit-container">
                    <div class="form-submit-left">
                        <t-button theme="primary" class="form-submit-confirm" type="submit">
                            确认提交
                        </t-button>
                        <t-button type="reset" class="form-submit-cancel" theme="default" variant="base">
                            取消
                        </t-button>
                    </div>
                </div>
            </t-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouteParams } from '@/utils/useRouteParams'
import { SuccessContext } from 'tdesign-vue-next';
import { FORM_RULES } from './base/constants'
import ImageUploader from '@/components/ImageUploader.vue';
const { params, query, fullPath } = useRouteParams()
interface ReserveForm {
    name: string;              // 预约名称
    type: string;              // 预约类型
    location: string;          // 位置
    banner: {
        name: string;
        url: string;
        status: string;
    }[];                       // 展示头图，数组，包含图片名称和 URL
    start_time: string;        // 开始时间
    end_time: string;          // 结束时间
    split_time: string;        // 预约时间间隔
    is_subporject: boolean;    // 是否开启子项
    project: any[];            // 子项目（可细化类型）
    description: string;
    tags: [];
}
const reserveForm = reactive<ReserveForm>({
    name: "",
    type: "",
    location: "",
    banner: [],
    start_time: "",
    end_time: "",
    split_time: "",
    is_subporject: false,
    project: [{}],
    description: "",
    tags: []
})



const addRow = () => {
    reserveForm.project.push({
        banner: '',
        name: '',
        description: '',
        price: ''
    });
};

const removeRow = (index: number) => {
    reserveForm.project.splice(index, 1);
};

const handleChange = (value: any) => {
    reserveForm.start_time = value[0]
    reserveForm.end_time = value[1]
}

</script>
<style lang="scss" scoped>
.form-submit-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: var(--td-comp-paddingLR-xl);
    padding-bottom: var(--td-comp-paddingLR-xl);
    border-bottom-left-radius: var(--td-radius-medium);
    border-bottom-right-radius: var(--td-radius-medium);
    border-top: 1px solid var(--td-component-stroke);

    .form-submit-left {
        .form-submit-upload-span {
            font-size: 14px;
            line-height: 22px;
            color: var(--td-text-color-placeholder);
            padding-top: 8px;
            display: inline-block;
        }
    }
}
</style>