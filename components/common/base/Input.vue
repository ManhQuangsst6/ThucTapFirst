<template>
  <a-input
    v-model:value="value"
    :maxlength="componentValue[index].componentProps.maxlength"
    :placeholder="componentValue[index].componentProps.placeholder"
  />
</template>
<script>
import { component } from "~/stores/component";
import { defineComponent, ref, computed, watch } from "vue";
export default defineComponent({
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  name: "Input",
  setup(props, context) {
    const { index } = toRefs(props);
    const componentStores = component();
    const componentValue = computed(() => {
      return componentStores.$state.componentData;
    });
    return {
      componentStores,
      componentValue,
      index,
    };
  },
});
</script>
