<template>
  <component :is="componentName" :index="index" style=""></component>
</template>
<script lang="js">
import Input from "./base/Input.vue";
import InputNumber from "./base/InputNumber.vue";
import DatePicker from "./base/DatePicker.vue";
import Radio from "./base/Radio.vue";
import CheckBox from "./base/CheckBox.vue";
import Select from "./base/Select.vue";
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
    components: { Input, InputNumber, DatePicker, Radio, CheckBox, Select },
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

<style scoped>
.full-height {
  height: 100%;
  height: 100vh;

  background-color: #7cb305;
}
</style>
