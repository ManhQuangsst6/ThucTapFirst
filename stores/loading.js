import { defineStore } from 'pinia'
export const load = defineStore('load',{
    state: () => {
        return {
          loading: false,
        }
      },
    getters: {
        getLoading: state => state.loading,
    },
    actions: {
      setLoading(data) {
        // const config = useRuntimeConfig();
        this.$state.loading = data;
        // localStorage.removeItem("token");
       // sessionStorage.setItem(config.public.tokenName, JSON.stringify(data))
      },
    },
  })