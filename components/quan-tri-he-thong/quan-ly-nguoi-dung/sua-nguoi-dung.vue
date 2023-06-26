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

      $spaFetch(`${$apiUrl.UPDATE_USER}`, {
        method: "PUT",
        body: {
          Id: formState.Id,
          UserName: formState.UserName,
          Email: formState.Email,
          PhoneNumber: formState.PhoneNumber,
          AccessFailedCount: formState.AccessFailedCount,
          ConcurrencyStamp: formState.ConcurrencyStamp,
          EmailConfirmed: formState.EmailConfirmed,
          LockoutEnabled: formState.LockoutEnabled,
          LockoutEnd: formState.LockoutEnd,
          NormalizedEmail: formState.NormalizedEmail,
          NormalizedUserName: formState.NormalizedUserName,
          PhoneNumberConfirmed: formState.PhoneNumberConfirmed,
          Roles: formState.Roles,
          TwoFactorEnabled: formState.TwoFactorEnabled,
          SecurityStamp: formState.SecurityStamp,
        },
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
            (formState.Id = res.result.id),
              (formState.UserName = res.result.userName),
              (formState.Email = res.result.email),
              (formState.PhoneNumber = res.result.phoneNumber),
              (formState.AccessFailedCount = res.result.accessFailedCount),
              (formState.ConcurrencyStamp = res.result.concurrencyStamp),
              (formState.EmailConfirmed = res.result.emailConfirmed),
              (formState.LockoutEnabled = res.result.lockoutEnabled),
              (formState.LockoutEnd = res.result.lockoutEnd),
              (formState.NormalizedEmail = res.result.normalizedEmail),
              (formState.NormalizedUserName = res.result.normalizedUserName),
              (formState.PhoneNumberConfirmed =
                res.result.phoneNumberConfirmed),
              (formState.Roles = res.result.roles),
              (formState.TwoFactorEnabled = res.result.twoFactorEnabled),
              (formState.SecurityStamp = res.result.securityStamp);
            console.log(formState.PhoneNumber);
            loading.value = false;
          })
          .catch(() => {
            loading.value = false;
          });
      }
    });
    return {
      loading,
      visible,
      showModal,
      handleCancel,
      formState,
      layout,
      formRef,
      wId,
      handleOk,
    };
  },
});
</script>
  