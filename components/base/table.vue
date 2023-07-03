<template>
  <a-table
    class="ant-table-striped"
    :columns="columns"
    :row-key="(record) => record.Id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
    :locale="locale"
    bordered
    :scroll="scrollTable"
    :showSorterTooltip="false"
    :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
    :customRow="customRow"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </a-table>
</template>
<script>
import moment from "moment";
import { usePagination } from "vue-request";
import { computed, defineComponent, ref } from "vue";
import { CheckableTag } from "ant-design-vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "there",
    },
    columns: {
      type: Array,
      default: () => [],
    },
    apiUrl: {
      type: String,
      default: null,
    },
    advanceSearch: {
      type: Object,
      default: () => {},
    },
    selectable: {
      type: Boolean,
      default() {
        return false;
      },
    },
    selectMode: {
      type: String,
      default() {
        return "multi";
      },
    },
    keySearch: {
      type: String,
      default() {
        return "";
      },
    },
    scroll: {
      type: Object,
      default: {},
    },
  },

  setup(props, context) {
    const visible = ref(false);
    const locale = { emptyText: "Không có dữ liệu" };
    const listChecked = ref([1]);
    const onChange = ref(1);
    const currentPage = ref(1);
    const totalCurrentPage = ref(10);
    //var dataSource = [];
    //  var totalPage = 0;
    const { columns, apiUrl } = props;

    const scrollTable = computed(() => {
      if (props.scroll) {
        return {
          ...props.scroll,
        };
      }
      return {};
    });

    if (columns[0].dataIndex !== "STT") {
      columns.unshift({
        title: "STT",
        dataIndex: "STT",
        width: "5%",
        sorter: false,
      });
    }
    const { $spaFetch } = useNuxtApp();
    const queryData = (params) => {
      let pagingParams = {
        PageSize: params.PageSize ? params.PageSize : 10,
        PageNumber: params.Page ? params.Page : 1,
        // SortExpression: params.SortExpression
        //   ? params.SortExpression
        //   : "",
        // KeyWord: props.keySearch ? props.keySearch : "",
        // predicate: {},
      };
      if (props.keySearch) {
        pagingParams = {
          KeyWord: props.keySearch,
        };
      }
      if (Object.keys(props.advanceSearch).length > 0) {
        for (const [key, value] of Object.entries(props.advanceSearch)) {
          if (value) {
            if (typeof value === "object" && value.$d) {
              pagingParams = {
                ...pagingParams,
                [key]: moment(value.$d).format("MM/DD/YYYY"),
              };
            } else {
              pagingParams = {
                ...pagingParams,
                [key]: value,
              };
            }
          }
        }
      }

      //columns.log(props.apiUrl);
      if (params.SortExpression) {
        pagingParams = {
          ...pagingParams,
          SortExpression: params.SortExpression,
        };
      }
      // set advancesearch

      return $spaFetch(props.apiUrl, {
        method: "GET",
        params: pagingParams,
        // body: pagingParams,
      });
    };
    const { data, run, loading, current, pageSize, total } = usePagination(
      queryData,
      {
        formatResult: (res) => {
          return res.result;
        },
        pagination: {
          currentKey: "Page",
          pageSizeKey: "PageSize",
          totalKey: "totalCount",
        },
      }
    );
    const dataSource = computed(() => {
      context.emit("change", data);
      //
      return data.value
        ? data.value.items.map((e, index) => {
            return {
              ...e,
              STT: pageSize.value * (current.value - 1) + (index + 1),
            };
          })
        : [];
    });
    const pagination = computed(() => {
      return {
        total: total.value,
        current: current.value,
        pageSize: pageSize.value,
        showTotal: (total) => `Tổng ${total} bản ghi`,
        showSizeChanger: false,
        onChange: (val) => (current.value = val),
      };
    });
    const handleTableChange = (pag, filters, sorter) => {
      run({
        PageSize: pag ? pag.pageSize : pageSize.value,
        Page: pag ? pag.current : current.value,
        SortExpression:
          sorter && Object.keys(sorter).length > 0
            ? sorter.field +
              " " +
              (sorter.order
                ? sorter.order === "descend"
                  ? "asc"
                  : "desc"
                : "desc")
            : null,
        ...filters,
      });
      // isChecked.value = !isChecked.value
      listChecked.value = [
        ...listChecked.value,
        pag ? pag.current : current.value,
      ];
      const set = new Set(listChecked.value);
      listChecked.value = [...set];
      onChange.value = pag ? pag.current : current.value;
      currentPage.value = pag ? pag.current : current.value;
      totalCurrentPage.value = pag ? pag.pageSize : pageSize.value;
    };
    const handleTableSearch = () => {
      run({
        PageSize: pageSize.value,
        Page: 1,
        SortExpression: null,
      });
    };
    const customRow = (record) => {
      return {
        onclick: () => context.emit("onClickRow", record),
      };
    };

    return {
      totalCurrentPage,
      currentPage,
      data,
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      handleTableSearch,
      visible,
      apiUrl,
      //check,
      total,
      locale,
      listChecked,
      onChange,
      scrollTable,
      customRow,
    };
  },
});
</script>
<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
