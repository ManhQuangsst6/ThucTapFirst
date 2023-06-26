<template>
  <a-select
    ref="select"
    v-model:value="selectedFieldType"
    style="width: 220px"
    @change="onChange"
  >
    <a-select-option v-for="item in listType" :key="item" :value="item">{{
      item
    }}</a-select-option>
  </a-select>
</template>
<script lang="js">
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
    props: {
        fieldType: {
            type: String,
            default: null,
        },
        value: {
            type: String,
            default: null,
        },
    },
    setup(props,context) {
        const { value } = toRefs(props);
        const mapType = [
            {
                type: 'Number',
                component: ['InputNumber', 'Radio', 'CheckBox', 'Select']
            },
            {
                type: 'String',
                component: ['Input', 'TextArea', 'Radio', 'CheckBox', 'Select']
            },
            {
                type: 'DateTime',
                component: ['DatePicker']
            },
            {
                type: 'Bool',
                component: ['Radio']
            },

        ]
        const listType = computed(() => {
            const fieldType = mapType.find(x => x.type === props.fieldType)
            if (fieldType) {
                return fieldType.component;
            }
            return []
                ;
        });
        const selectedFieldType = ref(null)
        const onChange = (value) => {
            context.emit("update:value", value);
            context.emit("change", value);
        }
        return {
            mapType,
            selectedFieldType,
            listType,
            onChange,
            value
        }
    },
})
</script>

<style scoped>
.full-height {
  height: 100%;
  height: 100vh;

  background-color: #7cb305;
}
</style>
