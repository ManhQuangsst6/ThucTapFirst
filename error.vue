<template>
  <a-result
    status="404"
    title="404"
    sub-title="Xin lỗi, trang này không tồn tại"
    v-if="error.statusCode === 404"
  >
    <template #extra>
      <a-button type="primary" @click="handleError">Về trang chủ</a-button>
    </template>
  </a-result>
</template>
<script setup>
definePageMeta({
  layout: "login",
});
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>
