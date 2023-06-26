<template>
    <div>
        <a-form :model="formState" ref="formRef" v-bind="layout" name="nest-messages" :rules="rules" @finish="onFinish">
            <a-modal v-model:visible="visible" title="Thêm mới" @ok="handleOk" width="700px" :centered="true">
                <template #footer>
                    <a-button key="back" @click="handleCancel">Đóng</a-button>
                    <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Lưu</a-button>
                </template>
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
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({  
    setup(props, context) {
        // Import các plugin để dùng
        const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();
        // Định nghĩa các validate
        const rules = {
            Name: [
                {
                    required: true,
                    message: "Tên nhóm người dùng không được để trống!",
                    trigger: "blur",
                }
            ]
        }
        // Định nghĩa các biến
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
            Name: null,
            Description: null
        });
        const loading = ref(false);
        const visible = ref(false);
        // Hàm show modal
        const showModal = () => {
            visible.value = true;
        };
        // Handle các lỗi trên form
        const onFinish = values => {
        };
        // Lưu
        const handleOk = async () => {
            // loading.value = true;
            const values = await formRef.value.validateFields();
            loading.value = true;
            $spaFetch($apiUrl.CREATE_ROLE, {
                method: 'POST',
                body: values,
            }).then((res) => {
                loading.value = false;
                visible.value = false;
                formState.Name = null;
                formState.Description = null;
                $showToast("Thêm mới thành công", "success", 2000);
                context.emit('lamMoiBang');
            });
        };
        // Hủy
        const handleCancel = () => {
            
            visible.value = false;
        };
        return {
            loading,
            visible,
            showModal,
            handleOk,
            handleCancel,
            formState,
            layout,
            formRef, rules,
            onFinish
        };
    },
});
</script>