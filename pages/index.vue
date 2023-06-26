<template>
  <div>
    <a-row>
      <a-col :span="12">
        Thiết lập form
        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
          <a-form-item label="Chọn bảng" name="selectedTable">
            <a-select
              ref="select"
              v-model:value="selectedTable"
              style="width: 220px"
              @change="handleChange"
              allowClear
            >
              <a-select-option
                v-for="item in listModule"
                :key="item.tableName"
                :value="item.tableName"
                >{{ item.tableName }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <!-- {{ dragOption }} -->
          <draggable
            :list="dragOption"
            @change="onEnd"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group type="transition" name="flip-list">
              <a-form-item
                v-for="(item, index) in listField"
                :key="item.fieldName"
                :label="item.fieldDescription"
              >
                <common-select-field
                  :fieldType="item.fieldType"
                  v-model:value="item.selectedComponent"
                ></common-select-field>
                <common-component-props
                  v-if="item.selectedComponent"
                  :componentName="item.selectedComponent"
                  :index="index"
                ></common-component-props>
              </a-form-item>
            </transition-group>
          </draggable>
        </a-form>
      </a-col>

      <a-divider type="vertical" class="full-height" />
      <a-col :span="11">
        Kết quả

        <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-form-item
            v-for="(item, index) in listField"
            :key="item.fieldName"
            :label="item.fieldDescription"
          >
            <!-- {{ item.selectedComponent }} -->
            <common-dynamic-component
              v-if="item.selectedComponent"
              :componentName="item.selectedComponent"
              :index="index"
            ></common-dynamic-component>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="js">
import { VueDraggableNext } from 'vue-draggable-next'
import { component } from "~/stores/component";
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  components: {
      draggable: VueDraggableNext,
    },
   
  setup() {
    const componentStores = component();
    const selectedTable = ref(null);
    const dragOption = ref([]);
    const drag  =false;
    const listModule = [{
      tableName: 'bangTest',
      value: [
        {
          fieldDescription: 'Số thứ tự',
          fieldName: 'SoTT',
          fieldType: 'Number',
          fieldLength: 5,
        },
        {
          fieldDescription: 'Tiêu đề',
          fieldName: 'TieuDe',
          fieldType: 'String',
          fieldLength: 100,
        },
        {
          fieldDescription: 'Ngày tạo',
          fieldName: 'NgayTao',
          fieldType: 'DateTime',
        },
        {
          fieldDescription: 'Là admin',
          fieldName: 'LaAdmin',
          fieldType: 'Bool',

        },
        {
          fieldDescription: 'Nhóm',
          fieldName: 'Nhom',
          fieldType: 'Number',

        }]
    }

    ]
    const handleChange = (value, option) => {
      if(value)
      {
        const selectedTableData = listModule.find(x => x.tableName === value);
      if (selectedTableData) {
        componentStores.setComponent(selectedTableData.value);
        dragOption.value = selectedTableData.value;
      }
      }
      else
      {
        componentStores.setComponent([]);
        dragOption.value = []
      }

    }

    const listField = computed(() => componentStores.$state.componentData);
    const onEnd = () => {
      componentStores.setComponent(dragOption.value);
    }

    return {
      listModule,
      selectedTable,
      handleChange,
      componentStores,
      listField,
      dragOption,
      onEnd,
      drag
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
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
