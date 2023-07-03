<template>
  <div>
    <a-form
      :model="formState"
      ref="formRef"
      v-bind="layout"
      name="nest-messages"
      :rules="rules"
      @finish="onFinish"
    >
      <a-modal
        v-model:visible="visible"
        title="Thêm mới"
        @ok="handleOk"
        width="700px"
        :centered="true"
      >
        <template #footer>
          <a-button key="back" @click="handleCancel">Đóng</a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >Lưu</a-button
          >
        </template>
        <a-form-item :name="['UserName']" label="Tên  người dùng">
          <a-input v-model:value="formState.UserName" />
        </a-form-item>
        <a-form-item :name="['Email']" label="Email">
          <a-input v-model:value="formState.Email" />
        </a-form-item>
        <a-form-item :name="['PhoneNumber']" label="PhoneNumber">
          <a-input v-model:value="formState.PhoneNumber" />
        </a-form-item>
        <a-form-item label="Roles">
          <common-select-role
            v-model:value="formStateRoles"
            :API="$apiUrl.GET_NHOM_NGUOI_DUNG"
            @changeListRole="changeListRole"
          />
        </a-form-item>
      </a-modal>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  setup(props, context) {
    // Import các plugin để dùng
    const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();
    // Định nghĩa các validate
    const rules = {
      Name: [
        {
          required: true,
          message: "Tên người dùng không được để trống!",
          trigger: "blur",
        },
      ],
    };
    // Định nghĩa các biến
    const formRef = ref(null);
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const formStateRoles = ref([]);
    const formState = reactive({
      Id: null,
      UserName: null,
      Email: null,
      AccessFailedCount: null,
      ConcurrencyStamp: null,
      EmailConfirmed: null,
      LockoutEnabled: null,
      LockoutEnd: null,
      NormalizedEmail: null,
      NormalizedUserName: null,
      PhoneNumberConfirmed: null,
      Roles: [],
      TwoFactorEnabled: null,
      SecurityStamp: null,
      PhoneNumber: null,
    });
    const loading = ref(false);
    const visible = ref(false);
    // Hàm show modal
    const showModal = () => {
      visible.value = true;
    };
    // Handle các lỗi trên form
    const onFinish = (values) => {};
    // Lưu
    const handleOk = async () => {
      // loading.value = true;
      const values = await formRef.value.validateFields();
      loading.value = true;
      console.log("aa", formStateRoles.value);
      $spaFetch($apiUrl.CREATE_USER, {
        method: "POST",
        body: JSON.stringify({ user: values, Roles: formStateRoles.value }),
      }).then((res) => {
        loading.value = false;
        visible.value = false;
        formState.UserName = null;
        formState.Email = null;
        formState.PhoneNumber = null;
        $showToast("Thêm mới thành công", "success", 2000);
        context.emit("lamMoiBang");
      });
    };
    // Hủy
    const handleCancel = () => {
      visible.value = false;
    };
    const changeListRole = (list) => {
      const listObjectRole = list.map((item) => {
        return {
          id: item,
        };
      });
      formStateRoles.value = listObjectRole;
      console.log(listObjectRole);
    };
    return {
      loading,
      visible,
      showModal,
      handleOk,
      handleCancel,
      formState,
      layout,
      formRef,
      rules,
      onFinish,
      changeListRole,
      formStateRoles,
    };
  },
});
</script>