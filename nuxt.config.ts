// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
const isDev = process.env.NODE_ENV === 'development'
import app_config from './constants/config'
const apiUrl = isDev ? app_config.API_LOCAL1 : app_config.API_SERVER
export default defineNuxtConfig({
  vite: {
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver()],
      }),

    ],
    ssr: {
      noExternal: ['ant-design-vue'],
    },

  },
  ssr: false,
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  runtimeConfig: {
    public: {
      baseURL: apiUrl,
      treeMenu: 'G8treeMenuRDStorage',
      tokenName: 'G8tokenRD',
      menuStorage: 'G8menuRDStorage',
      themeStorage: 'G8RDTheme',
      checkPermission: false,
      loginSSO: isDev ? false : true,
      clientId: isDev ? app_config.CLIENT_ID_LOCAL : app_config.CLIENT_ID_SEVER,
      clientSecret: isDev ? app_config.CLIENT_SECRET_LOCAL : app_config.CLIENT_SECRET_SEVER,
      redirectUri: isDev ? app_config.CALL_BACK_URL_LOCAL : app_config.CALL_BACK_URL_SEVER,
      isDev: isDev,
      env: process.env.NODE_ENV
    }
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'BDS',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'HỆ THỐNG QUẢN LÝ LƯU TRỮ' }
      ],
    }
  },
  css: ['~/assets/custom.css', '~/assets/css/login.css', '~/assets/antd.less'],
  // plugins:['@/plugins/antd']
})
