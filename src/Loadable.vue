<template>
  <div v-if="isLoading != null">
    <div v-if="isLoading">
      <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
    </div>
    <div v-if="!isLoading">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isLoading' ]
}
</script>

<style>

</style>
