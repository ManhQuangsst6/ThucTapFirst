<template>
  <div>
    <a-form ref="formRef" v-bind="layout" name="nest-messages">
      <a-modal v-model:visible="visible" title="Phân quyền nhóm người dùng" width="700px" :centered="true">
        <template #footer>
          <a-button key="back" @click="handleCancel">Đóng</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
            Lưu
          </a-button>
        </template>
        <a-row>
          <!-- <a-button key="submit" type="primary" @click="handleReset" style="margin-bottom: 10px">
            Đặt lại
          </a-button> -->
        </a-row>
        <a-row>
          <!-- {{ lopBanDos }} {{ lopBanDosReset }} -->
          <a-form-item name="lopBanDos" label="Lớp bản đồ" :labelCol="{ span: 4 }" :wrapperCol="{ span: 18 }"
            style="width: 80%;">
            <common-truong-admin-select-multi ref="reflopBanDos" v-model:value="lopBanDos" />
          </a-form-item>
        </a-row>
        <h3 style="margin-top: 20px;">Khối chức năng</h3>
        <div id="list-role" style="max-height: 336px; overflow: auto">
       
          <!-- {{ tree }} -->
          <!-- <a-menu mode="inline" v-model:openKeys="openKeys" :selectedKeys="null">
            <template v-for="(i, index) in menu" :key="index">
              <a-sub-menu :title="i[0].resourceTheme">
                <div v-for="item in i" :key="item.id">
                  <a-menu-item @click="item.checked = !item.checked">
                    <a-checkbox v-model:checked="item.checked" style="margin-right: 5px" />{{ item.resourceName }}
                  </a-menu-item>
                </div>
              </a-sub-menu>
            </template>
          </a-menu> -->
          <!-- {{ checkedKeys }} -->
          <a-tree  
          v-model:expandedKeys="expandedKeys"
       
            v-model:checkedKeys="checkedKeys" checkable :tree-data="tree">
          </a-tree>
        </div>
      </a-modal>
    </a-form>
  </div>
</template>
<script>
import menus from "@/constants/menu";
import { defineComponent, ref, watch } from "vue";
import {
  MailOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },

  setup(props, context) {
    // Import các plugin để dùng
    const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();

    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const expandedKeys = ref([]);
    const selectedKeys = ref([]);
    const checkedKeys = ref([]);
    const menuTree = () => {
      // debugger;
      tree.value = menus.map(element => {
        return {
          title: element.title,
          key: element.permissions && element.permissions.length > 1 ? element.url : element.permissions[0],
          checkable: true,
          children: element.subMenus && element.subMenus.length > 0 ?
            mapingChild(element.subMenus) : []
        }
      })
    }
    const mapingChild = (listChild) => {
      return listChild.map(element => {
        return {
          title: element.title,
          key:  element.permissions && element.permissions.length > 1 ? element.url : element.permissions[0],
          checkable: true,
          children: element.subMenus && element.subMenus.length > 0 ?
            mapingChild(element.subMenus) : []
        }
      })
    }
    const tree = ref([]);
    // Định nghĩa các biến
    const wId = ref("");
    const rolesName = ref([]);
    const rolesNameReset = ref([]);
    const formRef = ref(null);
    const loading = ref(false);
    const visible = ref(false);
    const openKeys = ref([]);
    const menu = ref([]);
    const lopBanDos = ref([]);
    const lopBanDosReset = ref([]);
    const reflopBanDos = ref();
    // Hàm show modal
    const showModal = () => {
      visible.value = true;
    };

    // Hủy
    const handleCancel = () => {
      visible.value = false;
    };

    const handleOk = async () => {
      let resourceId = [];
      menu.value.forEach((i) => {
        resourceId = [
          ...resourceId,
          ...i.filter((x) => x.checked).map((o) => o.id),
        ];
      });

      loading.value = true;

      $spaFetch(`${$apiUrl.UPDATE_PHAN_QUYEN_TREE}`, {
        method: "POST",
        body: {
          roleId: wId.value,
          resourceCode: checkedKeys.value,
          lopBanDos: lopBanDos.value
        },
      })
        .then(() => {
          loading.value = false;
          visible.value = false;
          lopBanDosReset.value = lopBanDos.value;
          $showToast("Chỉnh sửa thành công", "success");
          context.emit("lamMoiBang");
        })
        .catch((error) => {
          loading.value = false;
          if (
            error &&
            error.response &&
            error.response._data &&
            error.response._data.detail
          ) {
            $showToast(error.response._data.detail, "error");
          } else {
            $showToast("Có lỗi xảy ra", "error");
          }
        });
    };

    const handleReset = () => {
      lopBanDos.value = lopBanDosReset.value;
      menu.value = JSON.parse(JSON.stringify(rolesNameReset.value));
    };
    watch(wId, (newValue, oldValue) => {
      if (newValue) {
        // $spaFetch($apiUrl.PHAN_QUYEN, {
        //   method: "GET",
        // }).then((res) => {
        //   rolesName.value = res.result.map((item) => {
        //     return {
        //       id: item.id,
        //       resourceName: item.resourceName,
        //       resourceTheme: item.resourceTheme,
        //     };
        //   });

        //   $spaFetch(`${$apiUrl.GET_QUYEN_BY_ROLEID}?roleId=${newValue}`, {
        //     method: "GET",
        //   }).then((res1) => {
        //     lopBanDos.value = res1.lopBanDos
        //     lopBanDosReset.value = res1.lopBanDos;
        //     rolesName.value = rolesName.value.map((item) => {
        //       return {
        //         ...item,
        //         checked: res1.result.find((j) => j.resouceId === item.id)
        //           ? true
        //           : false,
        //       };
        //     });

        //     let map = new Map();
        //     for (let obj of rolesName.value) {
        //       if (map.has(obj.resourceTheme.toUpperCase())) {
        //         map.get(obj.resourceTheme.toUpperCase()).push(obj);
        //       } else {
        //         map.set(obj.resourceTheme.toUpperCase(), [obj]);
        //       }
        //     }
        //     menu.value = Array.from(map.values());

        //     openKeys.value = [
        //       ...new Set(
        //         menu.value
        //           .map((i, index) => {
        //             if (i.find((x) => x.checked)) {
        //               return index;
        //             }
        //           })
        //           .filter((i) => i || i === 0)
        //       ),
        //     ];

        //     rolesNameReset.value = JSON.parse(JSON.stringify(menu.value));
        //   });
        // });
        $spaFetch(`${$apiUrl.GET_MENU_QUYEN_BY_ROLEID}?roleId=${newValue}`, {
            method: "GET",
          }).then((res1) => {
            lopBanDos.value = res1.lopBanDos
            lopBanDosReset.value = res1.lopBanDos;
            expandedKeys.value = res1.result;
            checkedKeys.value = res1.result;
          });
      }
    });

    watch(
      visible,
      (newValue, oldValue) => {
        if (!newValue) {
          menuTree()
          // setTimeout(() => {
          //   handleReset();
          //   openKeys.value = [
          //     ...new Set(
          //       menu.value
          //         .map((i, index) => {
          //           if (i.find((x) => x.checked)) {
          //             return index;
          //           }
          //         })
          //         .filter((i) => i || i === 0)
          //     ),
          //   ];
          //   if (document.getElementById("list-role"))
          //     document.getElementById("list-role").scrollTop = 0;
          // }, 100);
        }
      },
      {
        immediate: true,
      }
    );

    return {
      loading,
      visible,
      layout,
      formRef,
      wId,
      menu,
      openKeys,
      rolesName,
      rolesNameReset,
      showModal,
      handleCancel,
      handleOk,
      handleReset,
      lopBanDos,
      lopBanDosReset,
      menuTree,
      mapingChild,
      tree,
      expandedKeys,
      selectedKeys,
      checkedKeys,reflopBanDos
    };
  },
});
</script>
