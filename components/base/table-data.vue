<template>
  <a-table class="ant-table-striped" :columns="columns" :row-key="(record) => record.Id" :data-source="dataSource"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
    @change="handleTableChange"
    :pagination="pagination" :scroll="scrollTable" bordered 
    :showSorterTooltip="false" 
    >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </a-table>
</template>
<script>
import moment from 'moment';
import { usePagination } from "vue-request";
import { computed, defineComponent,ref } from "vue";
import { CheckableTag } from 'ant-design-vue';
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
      default: () => { },
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
      default: {}
    },
    pagination: {
      type:Boolean,
      default:true
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, context) {
    const visible = ref(false);
    const locale = { emptyText: "Không có dữ liệu" };
    const listChecked = ref([1]);
    const onChange = ref(1);
    //var dataSource = [];
    //  var totalPage = 0;
    const { columns } = props;
    const { dataSource } = toRefs(props);
    const currentPage = ref(1);
    const totalCurrentPage = ref(10);

    const scrollTable = computed(() => {
        if (props.scroll) {
            return {
                ...props.scroll
            }
        }
        return {};
    })

    if (columns[0].dataIndex !== "STT") {
      columns.unshift(
        {
          title: "STT",
          dataIndex: "STT",
          width: "5%",
          sorter: false
        },
      );
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
      if(props.advanceSearch) {
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
      }
      if (params.SortExpression) {
        pagingParams = {
          ...pagingParams,
          SortExpression: params.SortExpression,
        };
        
        var field = params.SortExpression.replace(' asc', '').replace(' desc', '');
        var asc = params.SortExpression.indexOf('desc') < 0;
        dataSource.value.sort(function(a, b) {
          let x = a[field].toLowerCase();
          let y = b[field].toLowerCase();
          if(asc) {
            if (x < y) {return -1;}
            if (x > y) {return 1;}
          }
          else {
            if (x > y) {return -1;}
            if (x < y) {return 1;}
          }
          return 0;
        });
      }
      return pagingParams
    };
    const { data, run, loading, current, pageSize, total } = usePagination(
      queryData,
      {
        formatResult: (res) => {
          return null;
        },
        pagination: {
          currentKey: "Page",
          pageSizeKey: "PageSize",
          totalKey: "totalCount",
        },
      }
    );
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
    return {
      totalCurrentPage,
      currentPage,
      dataSource,
      columns,
      visible,
      listChecked,
      onChange,
      scrollTable,handleTableChange
    };
  },
});
</script>
<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
