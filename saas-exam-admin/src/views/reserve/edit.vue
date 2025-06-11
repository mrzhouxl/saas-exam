<template>
    <div class="p-2">
        <div class="flex justify-center w-full flex-col items-center overflow-y-auto">
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
                                <t-upload :files="computedBanners" :headers="{
                                    'Authorization': `Bearer ${user.token}`,
                                    'x-tenant-id': user.tenant._id
                                }" :action="`${apiUrl}/upload/img`" theme="image" tips="单张图片文件上传（上传成功状态演示）"
                                    :size-limit="1024" multiple :max="3" accept="image/*"
                                    :formatResponse="formatResponse" @success="successUpload" :locale="{
                                        triggerUploadText: {
                                            image: '请选择图片',
                                        },
                                    }">
                                </t-upload>
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
                                    <template v-for="(item, index) in reserveForm.project">
                                        <div class="w-full flex">
                                            <div>
                                                上传
                                            </div>
                                            <div>
                                                <t-input v-model="item.name"></t-input>
                                            </div>
                                            <div>
                                                <t-textarea v-model="item.description"></t-textarea>
                                            </div>
                                            <div>
                                                <t-input v-model="item.name" type="number"></t-input>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </t-form-item>
                        </t-col>
                    </t-row>
                </div>
            </t-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouteParams } from '@/utils/useRouteParams'
import { SuccessContext } from 'tdesign-vue-next';
import { userStore } from '@/store/userStore';
import { FORM_RULES } from './base/constants'
const user = userStore()
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
const apiUrl = import.meta.env.VITE_API_URL
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
const computedBanners = computed(() => {
    return reserveForm.banner.map(item => {
        return {
            ...item,
            url: `${import.meta.env.VITE_IMG_BASE_URL}${item.url}`
        }
    })
})
const formatResponse = (e: any) => {
    return { name: e.data.file.split('/').pop(), url: e.data.file };
};

const successUpload = async (content: SuccessContext) => {
    const file = content.file;
    console.log(content, 'content')
    const url = file?.response?.url
    const name = file?.response?.name
    if (file) {
        reserveForm.banner.push({
            name,
            url,
            status: file.status as string
        });
    }
}

const handleChange = (value: any) => {
    console.log(value, 'value')
    reserveForm.start_time = value[0]
    reserveForm.end_time = value[1]
}

</script>
<style lang="scss" scoped></style>