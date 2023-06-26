<template>
    <a-space direction="vertical">
      <a-date-picker v-model:value="value1" />
    </a-space>
  </template>
  <script>
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      return {
        value1: ref(),
      };
    },
  });
  </script>