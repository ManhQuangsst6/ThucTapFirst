import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "D:/Branch_QLLT/src/WebApp/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}