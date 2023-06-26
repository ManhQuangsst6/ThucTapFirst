<template>
    <a-space direction="vertical">
      <a-radio-group v-model:value="value1" :options="options" />
    </a-space>
  </template>
  <script>
  import { defineComponent, ref } from 'vue';
  const options = [{
    label: 'Apple',
    value: 'Apple',
  }, {
    label: 'Pear',
    value: 'Pear',
  }, {
    label: 'Orange',
    value: 'Orange',
  }];
  export default defineComponent({
    data() {
      const value1 = ref('Apple');
      return {
        options,
        value1,
      };
    },
  });
  </script>
  