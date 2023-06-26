<template>
    <a-checkbox-group v-model:value="value" :options="options" />
  </template>
  <script>
  import { defineComponent, reactive, toRefs } from 'vue';
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
    setup() {
      const state = reactive({
        value: [],
      });
      return {
        options,
        ...toRefs(state),
      };
    },
  });
  </script>