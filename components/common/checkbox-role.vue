<template>
  <a-checkbox-group
    v-model:value="value"
    name="checkboxgroup"
    :options="options"
    @change="handleChange"
  />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

// const optionsWithDisabled = [
//   { value: 'Apple' },
//   { label: 'Pear', value: 'Pear' },
//   { label: 'Orange', value: 'Orange', disabled: false },
// ];
export default defineComponent({
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const { value } = toRefs(props);

    const plainOptions = ref([]);
    const options = ref([]);
    const { $spaFetch, $apiUrl } = useNuxtApp();
    $spaFetch($apiUrl.GET_NHOM_NGUOI_DUNG, {
      method: "GET",
    }).then((res) => {
      options.value = res.result.map((item) => {
        return {
          value: item.id,
          label: item.name,
          disable: true,
        };
      });
      plainOptions.value = options.value.map((item) => item.label);
    });

    const handleChange = (value) => {
      context.emit("update:value", value);
    };
    return {
      plainOptions,
      options,
      //  changeListRole,
      //  optionsWithDisabled,
      value,
      handleChange,
    };
  },
});
</script>