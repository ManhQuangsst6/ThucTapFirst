<template>
    <div>
      <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" />
    </div>
  </template>
  <script>
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const value = ref(3);
      return {
        value,
      };
    },
  });
  </script>