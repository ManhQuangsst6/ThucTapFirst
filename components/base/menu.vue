<template>
  <a-menu
    mode="inline"
    :theme="`light`"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
  >
    <div v-for="parentMenu in menus" :key="parentMenu.url">
      <a-sub-menu
        :key="parentMenu.name"
        v-if="
          parentMenu.subMenus &&
          parentMenu.subMenus.length > 0 &&
          checkPermission(parentMenu.permissions)
        "
      >
        <template #icon>
          <img width="24" height="24" :src="useAsset(parentMenu.icon)" />
        </template>
        <template #title>
          <span :title="parentMenu.title">
            {{ parentMenu.title }}
          </span>
        </template>
        <div v-for="(childMenu, index) in parentMenu.subMenus" :key="index">
          <a-sub-menu
            :key="childMenu.name"
            v-if="
              childMenu.subMenus &&
              childMenu.subMenus.length > 0 &&
              checkPermission(parentMenu.permissions) &&
              checkPermission(childMenu.permissions)
            "
          >
            <template
              ><img width="24" height="24" :src="useAsset('dot.svg')" />
              <span :title="childMenu.title">
                <!-- <font-awesome-icon :icon="['fas', 'user-secret']" /> -->
                {{ childMenu.title }}
              </span>
            </template>
            <div v-for="(grandChild, index) in childMenu.subMenus" :key="index">
              <a-menu-item
                :key="grandChild.name"
                v-if="checkPermission(grandChild.permissions)"
              >
                <nuxt-link :to="grandChild.url" :title="grandChild.title"
                  ><span>{{ grandChild.title }}</span></nuxt-link
                ></a-menu-item
              >
            </div>
          </a-sub-menu>
          <a-menu-item
            :key="childMenu.name"
            style="padding-left: 24px"
            v-if="
              (!childMenu.subMenus || childMenu.subMenus.length === 0) &&
              checkPermission(parentMenu.permissions) &&
              checkPermission(childMenu.permissions)
            "
          >
            <nuxt-link :to="childMenu.url" :title="childMenu.title">
              <img width="24" height="24" :src="useAsset('dot.svg')" /><span>{{
                childMenu.title
              }}</span></nuxt-link
            ></a-menu-item
          >
        </div>
      </a-sub-menu>
      <a-menu-item
        :key="parentMenu.name"
        v-if="
          (!parentMenu.subMenus || parentMenu.subMenus.length === 0) &&
          checkPermission(parentMenu.permissions)
        "
      >
        <template #icon>
          <img width="24" height="24" :src="useAsset(parentMenu.icon)" />
        </template>
        <nuxt-link :to="parentMenu.url" :title="parentMenu.title">
          <span>{{ parentMenu.title }}</span>
        </nuxt-link>
      </a-menu-item>
    </div>
  </a-menu>
</template>
<script>
import menus from "@/constants/menu";
import { auth } from "~/stores/auth";
const authStores = auth();
import { defineComponent, ref, computed } from "vue";
function useAsset(path) {
  const assets = import.meta.glob("~/assets/images/icons/**/*", {
    eager: true,
    import: "default",
  });
  // @ts-expect-error: wrong type info
  return assets["/assets/images/icons/" + path];
}
export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const config = useRuntimeConfig();
    const { $decodeToken, $treeMenu, $apiUrl } = useNuxtApp();
    const route = useRoute();
    const selectedKeys = ref([]);
    const openKeys = ref([]);
    const collapsedMenu = computed(() => props.collapsed);
    const activeMenu = computed(() => {
      if (authStores.$state.flatMemu) {
        return authStores.$state.flatMemu.filter((x) =>
          route.fullPath.includes(x.url)
        );
      }
      return [];
    });
    watch(activeMenu, (newValue) => {
      if (newValue) {
        if (activeMenu && activeMenu.length > 0) {
          activeMenu.forEach((element) => {
            if (element.isParent) {
              openKeys.value.push(element.name);
            } else {
              selectedKeys.value.push(element.name);
            }
          });
          return;
        }
      }
    });
    const claim = computed(() => authStores.$state.token);
    const checkPermission = (permission) => {
      if (config.checkPermission) {
        var decodeToken = $decodeToken(claim.value.token);
        if (decodeToken.Permissions && decodeToken.Permissions.length > 0) {
          if (permission && permission.length > 0) {
            if (permission.some((r) => decodeToken.Permissions.includes(r))) {
              return true;
            }
          } else {
            return true;
          }
          return false;
        } else {
          return false;
        }
      } else {
        return true;
      }
    };
    return {
      selectedKeys: selectedKeys,
      openKeys: openKeys,
      collapsedMenu,
      menus,
      useAsset,
      authStores,
      checkPermission,
      claim,
    };
  },
});
</script>
