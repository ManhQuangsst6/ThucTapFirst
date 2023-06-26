<template>
  <div>
    <a-form :model="formState" ref="formRef" v-bind="layout" name="nest-messages" :rule="rules" >
      <a-modal  v-model:visible="visible" title="Đổi mật khẩu" width="700px" :centered="true">
        <template #footer>
          <a-button key="back" type="primary" @click="handleOk">Đổi mật khẩu</a-button>
         
          <a-button key="submit"  :loading="loading" @click="handleCancel">Đóng</a-button>
        </template>
        <!-- {{  formState.Id}} -->
        <div class="thongtincanhan" >
        <a-form-item name="userName" label="Tên người dùng" >
          <a-input disabled="true"  name="userName" v-model:value="formState.userName"/>
        </a-form-item>
        <a-form-item name="MatKhauCu" label="Mật khẩu cũ" >
          <a-input type="password"  name="MatKhauCu" v-model:value="formState.MatKhauCu"/>
        </a-form-item>
        <a-form-item name="MatKhauMoi" label="Mật khẩu mới" >
          <a-input  name="MatKhauMoi" v-model:value="formState.MatKhauMoi"/>
        </a-form-item>
        <a-form-item name="NhapLaiMatKhauMoi" label="Nhập lại mật khẩu mới " >
          <a-input  name="NhapLaiMatKhauMoi" v-model:value="formState.NhapLaiMatKhauMoi"/>
        </a-form-item>
        </div>
      </a-modal>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, watch } from "vue";
import {auth} from "~/stores/auth";

import dayjs from "dayjs";
export default defineComponent({

  setup(props, context) {
    // Import các plugin để dùng
    const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();
    // Định nghĩa các biến
    const id = ref(0);
    const authStore = auth();

    const formRef = ref(null);
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const rules = {
      MatKhauMoi: [
        {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      ],
      NhapLaiMatKhauMoi: [
        {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      ],
    };
    const formState = reactive({
    
      MatKhauCu: null,
      MatKhauMoi: null,
      userName: null,
      id:authStore.$state.token.id,
    });
    const loading = ref(false);
    const visible = ref(false);
    const errorMsg = ref(null);
    // Hủy
    const handleCancel = () => {
      visible.value = false;
    };
    // Hàm đổi mật khẩu
    const handleOk = async () => {
      
    
    // loading.value = true;
    const values = await formRef.value.validateFields();
    loading.value = true;
      $spaFetch(`${$apiUrl.DOI_MAT_KHAU}?id=${authStore.$state.token.id}`, {
        method: "PUT",
        body: {
          matKhauCu: formState.MatKhauCu,
          matKhauMoi: formState.MatKhauMoi,
         userName: formState.userName,
          id:authStore.$state.token.id,
        }, 
      }).then((res) => {
        loading.value = false;
        visible.value = false;
        $showToast("Chỉnh sửa thành công", "success");
        context.emit("lamMoiBang");
      }).catch(e => {
        loading.value = false;
         if(formState.NhapLaiMatKhauMoi !== formState.MatKhauMoi){
          $showToast("Mật khẩu mới nhập lại không khớp", "error");
         }else{
          $showToast("Mật khẩu cũ không đúng", "error");
         }
         
      });
  };
    // Hàm theme
    const Theme = () => {
      
    }
    // WatchId
    // watch(id, (newValue, oldValue) => {
       
     //  if (newValue) {
         
        // $spaFetch(`${$apiUrl.GET_USER_BY_ID_DEMO}?id=${newValue}`, {
        //     method: 'GET',
        // }).then((res) => {
        //     formState.FullName = res.Data.FullName
        //     formState.Email = res.Data.Email
        //     formState.Id = res.Data.Id
        //     formState.DateOfBirth = dayjs(res.Data.DateOfBirth).format('DD/MM/YYYY');
        //     formState.SoCanCuocCongDan = res.Data.SoCanCuocCongDan
        //     formState.Username = res.Data.Username
        //     formState.DonViTrucThuoc = res.Data.DonViTrucThuoc
        //     formState.DonViLamViec = res.Data.DonViLamViec
        //     formState.GioiTinh = res.Data.GioiTinh
        //     formState.ListRoleId = res.Data.ListRoleId
        // });
        // Fake data
        formState.userName = authStore.$state.token.userName;
        // formState.TenDangNhap = "nguyenvana";
        // formState.DonVi = "Sở GD";
        // formState.DiaChi = "Đường ..., Thôn A";
        // formState.Email = "nguyenvana@email.com";
        // formState.SoDienThoai = "0962836980";
      // }
     //});
    return {
      loading,
      visible,
      handleCancel,
      formState,
      layout,
      formRef,
      id,
      authStore,
      handleOk,
      errorMsg,
      rules
    };
  },
});
</script>
<style scoped>
.thongtincanhan{
  margin-left: 10%;
}
</style>