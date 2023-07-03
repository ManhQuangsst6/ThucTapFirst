<template>
  <div>
    <a-form
      :model="formState"
      ref="formRef"
      v-bind="layout"
      name="nest-messages"
    >
      <a-modal
        v-model:visible="visible"
        title="Sửa đổi thông tin"
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
          >
            Lưu
          </a-button>
        </template>
        <!-- {{  formState.Id}} -->
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
            :API="$apiUrl.GET_NHOM_NGUOI_DUNG"
            v-model:value="roles"
          />
        </a-form-item>
        <a-form-item label="test">
          <common-checkbox-role v-model:value="test" />
        </a-form-item>
      </a-modal>
    </a-form>
  </div>
</template>
  <script>
import { defineComponent, ref, reactive, watch } from "vue";
export default defineComponent({
  setup(props, context) {
    // Import các plugin để dùng
    const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();
    // Định nghĩa các biến
    const wId = ref("");

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
    const test = ref([]);
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
      Roles: null,
      TwoFactorEnabled: null,
      SecurityStamp: null,
      PhoneNumber: null,
    });
    const loading = ref(false);
    const visible = ref(false);
    const roles = ref([]);
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
      console.log("test", test.value);
      return;
      loading.value = true;
      $spaFetch(`${$apiUrl.UPDATE_USER}`, {
        method: "PUT",
        body: JSON.stringify({
          user: {
            id: formState.Id,
            email: formState.Email,
            userName: formState.UserName,
            phoneNumber: formState.PhoneNumber,
          },
          roles: roles.value,
        }),
      })
        .then((res) => {
          loading.value = false;
          visible.value = false;
          $showToast("Chỉnh sửa thành công", "success", 2000);
          context.emit("lamMoiBang");
        })
        .catch(() => {
          loading.value = false;
          $showToast("Có lỗi xảy ra", "error", 2000);
        });
    };
    // WatchId
    watch(wId, (newValue, oldValue) => {
      debugger;
      if (newValue) {
        loading.value = true;
        $spaFetch(`${$apiUrl.GET_USER}?id=${newValue}`, {
          method: "GET",
        })
          .then((res) => {
            (formState.Id = res.result.user.id),
              (formState.UserName = res.result.user.userName),
              (formState.Email = res.result.user.email),
              (formState.PhoneNumber = res.result.user.phoneNumber);
            formStateRoles.value = [...res.result.roles];
            test.value = [...res.result.roles];
            // roles.value = res.result.roles.map((item) => {
            //   return item.id;
            // });
            roles.value = [...res.result.roles];
            console.log("ss", roles.value);
            loading.value = false;
          })
          .catch(() => {
            loading.value = false;
          });
      }
    });
    const changeListRole = (list) => {
      const listObjectRole = list.map((item) => {
        return {
          id: item,
        };
      });
      formStateRoles.value = listObjectRole;
    };
    return {
      loading,
      visible,
      showModal,
      handleCancel,
      formState,
      roles,
      layout,
      formRef,
      wId,
      handleOk,
      formStateRoles,
      changeListRole,
      test,
    };
  },
});
</script>
  