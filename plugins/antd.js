 import 'ant-design-vue/dist/antd.css';
//import 'ant-design-vue/dist/antd.less';
import Antd from 'ant-design-vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Antd)
})