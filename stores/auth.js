// export const state = () => ({
//     token: null,
//     user: null,
// })

// export const getters = {}

// export const mutations = {
//     SET_TOKEN(state, token) {
//         state.token = token
//         localStorage.setItem('token', state.token)
//     },
//     SET_USER(state, user) {
//         state.user = user
//         localStorage.setItem('user', JSON.stringify(user))
//     },
//     LOGOUT(state) {
//         // if (state.token) {
//         //     this.$axios
//         //         .post(this.$api.LOG_OUT)
//         //         .then((res) => {
//         //         });
//         // }
//         state.token = null
//         state.user = null
//         localStorage.removeItem('token')
//     },
// }

// export const actions = {}
import { defineStore } from 'pinia'
export const auth = defineStore('auth', {
  state: () => {
    return {
      token: {
        token: null
      },
      flatMemu: [],
      map_config: [],
    }
  },
  getters: {
    getToken: state => state.token,
    getFlatMemu: state=> state.flatMemu,
    getMap_config: state => state.map_config,
  },
  actions: {
    setToken(data) {
      const config = useRuntimeConfig();
      this.$state.token = data;
      // sessionStorage.removeItem("token");
      sessionStorage.setItem(config.public.tokenName, JSON.stringify(data))
    },
    setMenu(data) {
      const config = useRuntimeConfig();
      window.treeMenu = JSON.stringify(data); //sessionStorage.setItem(config.public.menuStorage, JSON.stringify(data))
      this.$state.flatMemu = data;
    },
    setMapconfig(data) {
      this.$state.map_config = data;
    }
  },
})
