<template>
    <div>
        <a-form :model="formState" ref="formRef" v-bind="layout" name="nest-messages">
            <a-modal v-model:visible="visible" title="Sửa đổi thông tin" width="700px" :centered="true">
                <template #footer>
                    <a-button key="back" @click="handleCancel">Đóng</a-button>
                    <a-button
                              key="submit"
                              type="primary"
                              :loading="loading"
                              @click="handleOk">
                          Lưu
                      </a-button>
                </template>
                <!-- {{  formState.Id}} -->
                <a-form-item :name="['Name']" label="Tên nhóm người dùng">
                    <a-input v-model:value="formState.Name" />
                </a-form-item>
                <a-form-item :name="['Description']" label="Mô tả">
                    <a-input v-model:value="formState.Description" />
                </a-form-item>
  
            </a-modal>
        </a-form>
    </div>
  </template>
  <script>
  import { defineComponent, ref, reactive, watch } from 'vue';
  export default defineComponent({
    setup(props, context) {
        // Import các plugin để dùng
        const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();
        // Định nghĩa các biến
        const wId = ref('');
  
        const formRef = ref(null)
        const layout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const formState = reactive({
           Id:null,
           Name:null,
           Description:null
        });
        const loading = ref(false);
        const visible = ref(false);
  
        // Hàm show modal
        const showModal = () => {
            visible.value = true;
        };
        // Hủy
        const handleCancel = () => {
            visible.value = false;
        };
        const handleOk = async () => {
        // loading.value = true;
        const values = await formRef.value.validateFields();
        loading.value = true;
  
        $spaFetch(`${$apiUrl.UPDATE_ROLE}`, {
          method: "PUT",
          body:{
              Id: formState.Id,
              Name:formState.Name,
              Description:formState.Description
            },
        }).then((res) => {
          loading.value = false;
          visible.value = false;
          $showToast("Chỉnh sửa thành công", "success", 2000);
          context.emit("lamMoiBang");
        }).catch(() => {
            loading.value = false;
            $showToast("Có lỗi xảy ra", "error", 2000);
        });
      };
        // WatchId
  watch(wId, (newValue, oldValue) => {
    debugger;
    if (newValue) {
        loading.value = true;
        $spaFetch(`${$apiUrl.GET_ROLE}?id=${newValue}`, {
          method: 'GET',
        }).then((res) => {
            formState.Id = res.result.id,
            formState.Name = res.result.name,
            formState.Description = res.result.description
            loading.value = false;
        }).catch(() => {
          loading.value = false;
        })
  
      }
        })
        return {
            loading,
            visible,
            showModal,
            handleCancel,
            formState,
            layout,
            formRef,
            wId,
            handleOk  
        };
    },
  });
  </script>
  