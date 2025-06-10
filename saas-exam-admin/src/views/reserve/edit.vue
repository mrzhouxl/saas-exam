<template>
    {{ params }}
</template>
<script setup lang="ts">
import { useRouteParams } from '@/utils/useRouteParams'

const { params, query, fullPath } = useRouteParams()

</script>
<style lang="scss" scoped>

</style>