<template>
    <div class="flex p-3">
        <t-button @click="() => (visible = true)">创建预约</t-button>
    </div>
    <div class="p-2">
        <DataTable :action="action" :query="{}" :columns="columns" :page-size="5" :bordered="false" :hover="true"
            :table-layout="'auto'" size="medium"></DataTable>
    </div>
    <t-dialog v-model:visible="visible" header="预约" width="40%" :confirm-on-enter="true" :on-close="close"
        @confirm="handleRadioChange">
        <t-radio-group v-model="type" allow-uncheck name="city" :options="options"></t-radio-group>
    </t-dialog>
</template>
<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import { useRouter } from 'vue-router'
const router = useRouter();
const visible = ref<Boolean>(false)
const type = ref<string>('common')
const action = ref<string>('http://localhost:5000/admin/reserve')
const options = [
    {
        value: 'COMMON',
        label: '通用预约',
    }, {
        value: 'SEAT',
        label: '座位预约',
    },
]

const columns = [
    {
        align: 'center',
        width: 100,
        colKey: '_id',
        title: '头图',
    },
    {
        align: 'center',
        width: 100,
        colKey: 'description',
        title: '描述',
    },
    {
        align: 'center',
        colKey: 'type',
        width: 200,
        title: '预约类型',
    },
    {
        align: 'center',
        colKey: 'time',
        width: 200,
        title: '预约类型',
    },
    {
        title: '操作',
        colKey: 'action',
    }
]

const close = () => {
    visible.value = false;
}
const handleRadioChange = (context: { e: MouseEvent | KeyboardEvent }) => {
    router.push({ path: `/reserve/edit/${type.value}` })
}

</script>
<style lang="sass">

</style>