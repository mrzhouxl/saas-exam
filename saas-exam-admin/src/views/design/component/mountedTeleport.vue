<template>
  <Teleport :to="to" :disabled="show" v-if="isMounted">
    <div v-if="$attrs.active">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script lang="ts">
export default {
  name: "MountedTeleport",
  props: ['to', 'show'],
  data() {
    return { isMounted: false }
  },
  mounted() {
    this.isMounted = true;
  }
}
</script>