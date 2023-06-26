<template>
  <a-form
    :model="componentProps"
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
  >
    <a-form-item label="Tối đa ký tự" name="maxlength">
      <a-input-number
        v-model:value="componentProps.maxlength"
        @change="handleChange"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="Độ rộng" name="span">
      <a-select
        ref="select"
        v-model:value="componentProps.span"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option :value="12">1/2</a-select-option>
        <a-select-option :value="24">2/2</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Placeholder" name="placeholder">
      <a-input
        v-model:value="componentProps.placeholder"
        @change="handleChange"
      ></a-input>
    </a-form-item>
  </a-form>
</template>
<script>
import { component } from "~/stores/component";
import { defineComponent, ref, onMounted, computed } from "vue";
export default defineComponent({
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const { index } = toRefs(props);
    const componentStores = component();
    const componentProps = reactive({
      maxlength: 500,
      span: 24,
      placeholder: null,
    });
    const handleChange = () => {
      const obj = {
        index: index.value,
        data: componentProps,
      };
      componentStores.setField(obj);
      // context.emit("update:value", componentProps);
      //   context.emit("change", componentProps);
    };
    onMounted(() => {
      const obj = {
        index: index.value,
        data: componentProps,
      };
      componentStores.setField(obj);
    });
    return {
      handleChange,
      componentProps,
      componentStores,
      index,
    };
  },
});
</script>
