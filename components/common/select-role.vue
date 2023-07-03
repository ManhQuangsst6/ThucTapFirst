
<template>
  <a-select
    v-model:value="value"
    mode="multiple"
    style="width: 100%"
    placeholder="Chọn nhóm người dùng"
    :options="datanames"
    @change="handleChange"
    :max-tag-count="4"
  ></a-select>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    API: {
      type: String,
      default: null,
    },
  },
  setup(props, context) {
    const { value } = toRefs(props);
    const datanames = ref([]);
    const { $spaFetch, $apiUrl } = useNuxtApp();
    $spaFetch(props.API, {
      method: "GET",
    }).then((res) => {
      datanames.value = res.result.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    });
    const handleChange = (value) => {
      context.emit("update:value", value);
    };
    return {
      handleChange,
      datanames,
      value,
    };
  },
});
</script>

<style scoped>
.ant-select-selection-overflow {
  flex-wrap: wrap !important;
}
</style>
