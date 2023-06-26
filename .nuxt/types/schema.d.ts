import { NuxtModule } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
  }
  interface RuntimeConfig {
     app: {
        baseURL: string,

        buildAssetsDir: string,

        cdnURL: string,
    },
  }
  interface PublicRuntimeConfig {
     baseURL: string,

    treeMenu: string,

    tokenName: string,

    menuStorage: string,

    themeStorage: string,

    checkPermission: boolean,

    loginSSO: boolean,

    clientId: string,

    clientSecret: string,

    redirectUri: string,

    isDev: boolean,

    env: string,
  }
}