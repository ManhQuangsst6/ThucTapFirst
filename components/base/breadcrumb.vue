<template>
  <div style="margin-bottom: 6px">
    <a-breadcrumb>
      <a-breadcrumb-item
        ><nuxt-link :to="'/'"> Trang chủ </nuxt-link></a-breadcrumb-item
      >
      <a-breadcrumb-item v-for="(item, i) in crumbs" :key="i">
        <nuxt-link
          :to="item.to"
          class="title"
          v-if="!item.disabled && item.title + '' != ''"
          >{{ item.title }}</nuxt-link
        >
        <span v-else>{{ item.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <hr />
  </div>
</template>
<script>
import breadCrumb from "@/constants/breadCrumb";
export default {
  name: "Breadcrumb",
  computed: {
    crumbs() {
      var vm = this;
      const pathArray = this.$route.path.split("/");
      pathArray.shift();
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        if (breadcrumbArray[idx - 1] && breadcrumbArray[idx - 1].to) {
          if (breadcrumbArray[idx - 1].to === "/") {
            breadcrumbArray.push({
              to: "/" + path,
              disabled: vm.getBreadCrumb(path)
                ? vm.getBreadCrumb(path).disabled
                : true,
              title: vm.getBreadCrumb(path)
                ? vm.getBreadCrumb(path).title + ""
                : "",
            });
          } else {
            breadcrumbArray.push({
              to: breadcrumbArray[idx - 1].to + "/" + path,
              disabled: vm.getBreadCrumb(path)
                ? vm.getBreadCrumb(path).disabled
                : true,
              title: vm.getBreadCrumb(path)
                ? vm.getBreadCrumb(path).title + ""
                : "",
            });
          }
        } else {
          breadcrumbArray.push({
            to: "/" + path,
            disabled: vm.getBreadCrumb(path)
              ? vm.getBreadCrumb(path).disabled
              : true,
            title: vm.getBreadCrumb(path)
              ? vm.getBreadCrumb(path).title + ""
              : "",
          });
        }
        return breadcrumbArray;
      }, []);
      console.log(breadcrumbs);
      let a = breadcrumbs.filter((x) => x.title + "" != "");
      console.log(a);
      return a;
    },
  },
  methods: {
    getBreadCrumb(path) {
      var mergedCrumb = Object.assign(
        breadCrumb,
        window.map_config != null ? window.map_config.BREADCRUM ?? {} : {}
      );

      if (mergedCrumb[path + this.$route.params.code])
        return mergedCrumb[path + this.$route.params.code];
      if (!mergedCrumb[path]) {
        var key = Object.keys(this.$route.params).find(
          (key) => this.$route.params[key] === path
        );
        return mergedCrumb[key];
      }
      return mergedCrumb[path];
    },
  },
};
</script>
<style lang="scss" scoped></style>
