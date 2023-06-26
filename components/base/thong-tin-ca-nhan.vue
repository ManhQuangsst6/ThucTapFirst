<template>
  <div>
    <a-form :model="formState" ref="formRef" v-bind="layout" name="nest-messages" >
      <a-modal  v-model:visible="visible" title="Thông tin cá nhân" width="700px" :centered="true">
        <template #footer>
          <a-button key="back" type="primary" @click="DoiMatKhau">Đổi mật khẩu</a-button>
          <a-button key="back" type="primary" @click="Theme" v-if="false">Theme</a-button>
          <a-button key="submit"  :loading="loading" @click="handleCancel">Đóng</a-button>
        </template>
        <!-- {{  formState.Id}} -->
        <div class="thongtincanhan" >
        <a-form-item :name="['TenNguoiDung']" label="Tên người dùng" >
          <span> {{formState.TenNguoiDung}}</span>
        </a-form-item>
        <a-form-item :name="['TenDangNhap']" label="Tên đăng nhập">
          <span> {{formState.TenDangNhap}}</span>
        </a-form-item>
        <a-form-item :name="['DonVi']" label="Đơn vị">
          <span> {{formState.DonVi}}</span>
        </a-form-item>
        <a-form-item :name="['DiaChi']" label="Địa chỉ">
          <span> {{formState.DiaChi}}</span>
        </a-form-item>
        <a-form-item :name="['Email']" label="Email">
          <span> {{formState.Email}} </span>
        </a-form-item>
        <a-form-item :name="['SoDienThoai']" label="Số điện thoại">
          <span> {{formState.SoDienThoai}} </span>
        </a-form-item>
        </div>
      </a-modal>
    </a-form>
  </div>

  <base-doi-mat-khau ref="doiMatKhau" />
</template>
<script>
import { defineComponent, ref, reactive, watch } from "vue";

import dayjs from "dayjs";
export default defineComponent({

  setup(props, context) {
    // Import các plugin để dùng
    const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();
    // Định nghĩa các biến
    const id = ref(0);
    const doiMatKhau=ref(null);

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
      TenNguoiDung: null,
      TenDangNhap: null,
      DonVi: null,
      DiaChi: null,
      Email: null,
      SoDienThoai:null,
    });
    const loading = ref(false);
    const visible = ref(false);
    // Hủy
    const handleCancel = () => {
      visible.value = false;
    };
    // Hàm đổi mật khẩu
    const DoiMatKhau =()=>{
      doiMatKhau.value.visible = true;
    }
    // Hàm theme
    const Theme = () => {
      
    }
    // WatchId
    // watch(id, (newValue, oldValue) => {
    //   
    //   if (newValue) {
    //     
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
        formState.TenNguoiDung = "Nguyễn Văn A";
        formState.TenDangNhap = "nguyenvana";
        formState.DonVi = "Sở GD";
        formState.DiaChi = "Đường ..., Thôn A";
        formState.Email = "nguyenvana@email.com";
        formState.SoDienThoai = "0962836980";
    //   }
    // });
    return {
      loading,
      visible,
      handleCancel,
      formState,
      layout,
      formRef,
      id,
      DoiMatKhau,
      doiMatKhau
    };
  },
});
</script>
<style scoped>
.thongtincanhan{
  margin-left: 10%;
}
</style>