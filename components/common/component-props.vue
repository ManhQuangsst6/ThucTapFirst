<template>
  <component :is="componentName" :index="index"></component>
</template>
<script lang="js">
import Input from "./props/Input.vue";
// import InputNumber from "./base/InputNumber.vue";
// import DatePicker from "./base/DatePicker.vue";
// import Radio from "./base/Radio.vue";
// import CheckBox from "./base/CheckBox.vue";
// import Select from "./base/Select.vue";
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
    // components: { Input, InputNumber, DatePicker, Radio, CheckBox, Select },
    components: { Input },
    props: {
        componentName: {
            type: String,
            default: null,
        },
        index:{
            type: Number,
            default: 0
        }
    },
    setup(props) {
        const {  componentName,index } = toRefs(props);
        return {
            componentName,
            index
        }
    },
})
</script>
