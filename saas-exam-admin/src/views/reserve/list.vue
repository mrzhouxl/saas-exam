<template>
    <div class="flex p-3">
        <t-button @click="() => (visible = true)">创建预约</t-button>
    </div>
    <div>
        <DataTable></DataTable>
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
const options = [
    {
        value: 'common',
        label: '通用预约',
    }, {
        value: 'seat',
        label: '座位预约',
    },
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