export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    debugger;
    // console.log(context);
    console.log(error);
  }
})
