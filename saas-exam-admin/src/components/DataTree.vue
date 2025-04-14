<template>
  <div v-for="item in data">
    {{ item.name }}
  </div>
</template>

<script setup lang='ts'>
interface Props {
  data: Array<Data>;
}
interface Data {
  name: string;
}
const props = defineProps<Props>()
</script>

<style></style>