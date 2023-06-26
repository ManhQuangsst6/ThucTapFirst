<!-- 
	This is the default layout, used in sign-in and sign-up pages.
 -->

 <template>
  <div>
    <!-- Default Layout -->
    <h1>Layout log in</h1>
    <a-layout
      class="layout-default layout-sign-up-illustration"
      id="layout-default"
    >
      <!-- Page Content -->
      <a-layout-content>
        <slot />
      </a-layout-content>
      <!-- / Page Content -->
    </a-layout>
    <!-- / Default Layout -->
  </div>
</template>
<script>
export default {};
</script>


<style>
body {
  background: #fff;
}
@media (min-width: 992px) {
  .layout-sign-up-illustration {
    overflow: hidden !important;
  }
}
.layout-sign-up-illustration {
  background-color: #fff;
}
.layout-sign-up-illustration .col-img {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
  padding-right: 0;
  text-align: center;
  background: #f7f7f7;
}
.layout-sign-up-illustration .row-main {
  height: calc(100vh + 20px);
  min-height: 650px;
  background: white;
  overflow: auto;
}
.logo {
  padding-bottom: 20px;
}
</style>
