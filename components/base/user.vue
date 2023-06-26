<template>
  <a-dropdown>
    <a
      class="ant-dropdown-link"
      @click.prevent
      style="color: white; font-size: 16px"
    >
      <user-outlined />
      {{ user.userName }}
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;" @click="ThongTinCaNhan">Thông tin cá nhân</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="DoiMatKhau()">Đổi mật khẩu</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="DangXuat">Đăng xuất</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <base-thong-tin-ca-nhan ref="xemThongTinCaNhan" />
  <base-doi-mat-khau ref="doiMatKhau" />
</template>
<script>
import { defineComponent } from "vue";
import { auth } from "../../stores/auth";

import { DownOutlined, UserOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    DownOutlined,
    UserOutlined,
  },
  setup(props, context) {
    const { $spaFetch,$apiUrl } = useNuxtApp();
    const authStore = auth();
    const config = useRuntimeConfig();
    const router = useRouter();
    const user = ref(authStore.$state.token);
    const xemThongTinCaNhan = ref(null);
    const doiMatKhau = ref(null);
    const DangXuat = () => {
      if(false) {
        localStorage.removeItem("bc_zoom");
        localStorage.removeItem("bc_loai_hinh");
        localStorage.removeItem("bc_chat_luong");
        localStorage.removeItem("bc_vung");
        localStorage.removeItem("bc_tinh");
        localStorage.removeItem("bc_huyen");
        localStorage.removeItem("bc_xa");
        localStorage.removeItem("bc_bd_nen");
        localStorage.removeItem("bc_layer_truong");
      }
      if (config.public.loginSSO) {
        var token = sessionStorage.getItem(config.public.tokenName);

        if (token) {
          var ssoToken = JSON.parse(token).ssoToken;
          sessionStorage.removeItem(config.public.tokenName);
          sessionStorage.removeItem(config.public.menuStorage);
          window.treeMenu = null;
          window.map_config = null;
          // router.push({ path: "/login" })
          const state = "fd28d491e6126c2111f111";
          window.location.href = `https://dangnhap.moet.gov.vn/oidc/logout?id_token_hint=${ssoToken}&post_logout_redirect_uri=${config.public.redirectUri}&state=${state}`;
        }
      } 
      else {
        $spaFetch($apiUrl.NHAT_KY_HE_THONG_CREATE, {
          method: "POST",
          loading: false,
          body: {
            tenNguoiDung: authStore.$state.token.userName,
            hanhDong: "Đăng xuất",
            noiDung: "Log out the system",
            module: "Hệ thống",
          },
        }).then((res) => {
        });
        sessionStorage.removeItem(config.public.tokenName);
        sessionStorage.removeItem(config.public.menuStorage);
        window.treeMenu = null;
        window.map_config = null;
        router.push({ path: "/login" });
      }
    };
    const ThongTinCaNhan = () => {
      xemThongTinCaNhan.value.visible = true;
    };
    const DoiMatKhau = () => {
      doiMatKhau.value.visible = true;
    };
    return {
      DangXuat,
      ThongTinCaNhan,
      xemThongTinCaNhan,
      user,
      authStore,
      DoiMatKhau,
      doiMatKhau,
    };
  },
});
</script>
