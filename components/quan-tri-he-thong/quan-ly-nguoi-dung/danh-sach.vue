<template>
  <a-form
    ref="formRef"
    name="role_advanced_search"
    class="ant-advanced-search-form"
    :model="formState"
    @finish="SearchTable"
  >
    <a-card>
      <template #title>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item :name="['KeySearch']" label="Từ khóa">
              <a-input
                v-model:value="formState.KeySearch"
                placeholder="Nhập tên người dùng"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template #extra>
        <a-button type="primary" @click="SearchTable" :loading="loading">
          <search-outlined />
          Tìm kiếm</a-button
        >
        <a-button style="margin: 0 8px" @click="ResetTable">
          <undo-outlined />
          Làm mới</a-button
        >
      </template>
    </a-card>
  </a-form>
  <a-card title="Danh sách">
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="themUser"
      >Thêm mới
    </a-button>
    <base-table
      :columns="columns"
      :apiUrl="$apiUrl.GET_All_NGUOI_DUNG"
      :keySearch="formState.keySearch"
      :advanceSearch="formState"
      ref="tableRef"
    >
      <template v-slot:bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a href="javascript:void(0)" @click="XemUser(record.Id)"
            ><eye-outlined title="Xem"
          /></a>
          <a-divider type="vertical" />
          <a href="javascript:void(0)" @click="suaUser(record.id)"
            ><edit-outlined title="Sửa"
          /></a>
          <a-divider type="vertical" />
          <!-- <a href="javascript:void(0)" @click="phanQuyenNguoiDung(record.id)"
            ><form-outlined title="Phân quyền người dùng"
          /></a>  -->
          <!-- <a-divider type="vertical" /> -->

          <a-popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            ok-text="Xóa"
            cancel-text="Không"
            @confirm="xoaUser(record.id)"
          >
            <a> <delete-outlined title="Xóa" /></a>
          </a-popconfirm>
        </template>
      </template>
    </base-table>
  </a-card>
  <quan-tri-he-thong-quan-ly-nguoi-dung-sua-nguoi-dung
    ref="suaref"
    @lamMoiBang="ResetTable"
  />
  <quan-tri-he-thong-quan-ly-nguoi-dung-them-nguoi-dung
    ref="themmoiref"
    @lamMoiBang="ResetTable"
  />
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import {
  DownOutlined,
  UpOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  SearchOutlined,
  UndoOutlined,
  CloseOutlined,
  LockOutlined,
  UnlockOutlined,
  FormOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    DownOutlined,
    UpOutlined,
    DeleteOutlined,
    EyeOutlined,
    EditOutlined,
    SearchOutlined,
    UndoOutlined,
    CloseOutlined,
    LockOutlined,
    UnlockOutlined,
    FormOutlined,
  },
  setup(props) {
    // import các plugin
    const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();
    // Định nghĩa columns
    const columns = [
      {
        title: "Tên người dùng",
        dataIndex: "userName",
        sorter: true,
        width: "10%",
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "20%",
        sorter: true,
      },
      {
        title: "PhoneNumber",
        dataIndex: "phoneNumber",
        width: "20%",
        sorter: true,
      },
      {
        title: "Tác vụ",
        dataIndex: "action",
        width: "20%",
      },
    ];
    // Định nghĩa các biến
    const loading = ref(false);
    const tableRef = ref(null);
    const formRef = ref();
    const phanquyenref = ref(null);
    const formState = reactive({
      keySearch: "",
    });
    const themmoiref = ref(null);
    const suaref = ref(null);
    // Function
    // Bật modal thêm user
    const themUser = () => {
      // alert("Them role");
      themmoiref.value.visible = true;
      themmoiref.value.resetFields();
    };

    // Bật modal sửa user
    const suaUser = (id) => {
      suaref.value.visible = true;
      suaref.value.wId = id;
    };
    // Bật modal xem chi tiết
    const xemUser = (id) => {
      alert("Xem ");
    };

    // Xóa user
    const xoaUser = (id) => {
      $spaFetch(`${$apiUrl.DELETE_USER}?userId=${id}`, {
        method: "DELETE",
        body: {
          id: id,
        },
      })
        .then((res) => {
          $showToast("Xóa thành công", "success", 2000);
          tableRef.value.handleTableSearch();
        })
        .catch((e) => {
          console.log("error: ", e);
          $showToast(
            "Người dùng này đã có dữ liệu liên quan, không thể xóa",
            "error"
          );
        });
    };

    // Search
    const SearchTable = () => {
      tableRef.value.handleTableSearch();
    };

    // reset form search
    const ResetTable = () => {
      formRef.value.resetFields();
      tableRef.value.handleTableSearch();
    };
    return {
      themUser,
      suaUser,
      xemUser,
      xoaUser,
      columns,
      loading,
      tableRef,
      formState,
      formRef,
      SearchTable,
      ResetTable,
      themmoiref,
      suaref,
      phanQuyenNguoiDung,
      phanquyenref,
    };
  },
  mounted() {},
});
</script>
<style>
</style>