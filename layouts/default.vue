<template>
  <!-- {{ loading }} -->
  <!-- mau{{ themeStores.$state.themeSetting }} -->
  <a-spin :spinning="loading" wrapperClassName="spining-modal">
    <a-layout id="components-layout-demo-custom-trigger">
      <!-- {{ themeStores.$state.themeSetting }} {{themeValue.MauMenu}} -->
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        width="250px"
        :theme="`light`"
      >
        <div class="logo" style="margin-bottom: 50px" v-if="screenWidth > 1680">
          <nuxt-link to="/">
            <a-row>
              <a-col style="margin-left: auto; margin-right: auto">
                <img
                  src="~/assets/images/logo.png"
                  width="60"
                  height="60"
                  style="display: block"
                />
              </a-col>
            </a-row>
          </nuxt-link>
        </div>
        <div class="logo" style="margin-bottom: 80px" v-else>
          <a-row>
            <img
              src="~/assets/images/logo.png"
              width="60"
              height="60"
              style="display: block; margin-left: auto; margin-right: auto"
            />
          </a-row>
        </div>
        <base-menu :collapsed="collapsed"></base-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: rgb(0 114 255); padding: 0">
          <div class="header-left">
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
          </div>
          <div class="header-left">HỆ THỐNG QUẢN LÝ LƯU TRỮ</div>
          <div class="header-right">
            <base-user />
          </div>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '1px 1px',
            padding: '10px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <base-breadcrumb />
          <slot />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <a-row>
            <a-col :span="8" style="text-align: left">
              Copyright © 2023 G-Connect
              <span style="display: none">{{
                "dev " + config.public.isDev + " - " + config.public.env
              }}</span>
            </a-col>
            <a-col :span="8"></a-col>
            <a-col :span="7" style="text-align: right">Version 1.0.0</a-col>
          </a-row>
          <a-row>
            <a-col :span="8" style="text-align: left">
              Email hỗ trợ: gconnect@gmail.com</a-col
            >
            <a-col :span="8"></a-col>
            <a-col :span="8"></a-col>
          </a-row>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-spin>
</template>
<script>
import { load } from "~/stores/loading";
definePageMeta({
  middleware: ["auth"],
});
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
const loadStores = load();
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup(props) {
    const config = useRuntimeConfig();
    const selectedKeys = ref(["1"]);
    const collapsed = ref(false);
    const screenWidth = screen.width;
    const loading = computed(() => loadStores.$state.loading);

    // const { loading } = storeToRefs(loadStores)
    const visibleSetting = ref(false);

    return {
      selectedKeys,
      collapsed,
      screenWidth,
      loading,
      visibleSetting,
      config,
    };
  },
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;

  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.header-right {
  float: right;
  margin-right: 50px;
}

.ant-layout-sider {
  flex: initial;
  max-width: 280px;
  min-width: 12%;
}

/* .ant-layout-sider {
    position: relative;
    min-width: 0;
    background: #0000002b !important;
    transition: all 0.2s;
}
.ant-menu.ant-menu-dark
{
    color: rgba(255, 255, 255, 0.65);
        background: #0000002b !important;
} */
.header-left {
  float: left;
  margin-right: 50px;
  color: rgb(255 255 255);
  font-weight: bold;
  font-size: 24px;
}

.logo-span {
  font-weight: bold;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

.logo-span-small {
  font-weight: bold;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}

.ant-layout-sider {
  max-height: v-bind(height);
  overflow: auto;
}
</style>
