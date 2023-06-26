import apiUrl from '@/constants/api';
//const  config  = useRuntimeConfig();
export default defineNuxtPlugin(nuxtApp => {
    return {
      provide: {
        apiUrl:apiUrl
      }
  }
  })


