<script setup lang="ts">

</script>

<template>
    <router-view></router-view>
</template>

<style lang="less">
@import '@/assets/css/style.css';

.content {
  // min-height: calc(100vh -80px);
  width: 100%;
}

.t-table th,
.t-table td {
  position: relative;
  padding: 13px 24px 12px 24px;
  border-bottom: 1px solid #ECEFF6 !important;
  color: #606266 !important;
  line-height: 22px;
  font-weight: normal;
  overflow-wrap: break-word;
  background-color: inherit;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.t-table .t-table__header tr{
  background: #F6F8FA !important;
}

.status {
  position: relative;
  color: #00a870;
  margin-left: 10px;
  &::before {
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    content: '';
    background-color: #00a870;
    width: 6px;
    height: 6px;
    margin-left: -10px;
    border-radius: 50%;
  }
}
.status.unhealth {
  color: #e34d59;
  &::before {
    background-color: #e34d59;
  }
}
</style>
