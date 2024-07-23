/// <reference types="vite/client" />

declare const APP_BUILD_DATE: string;

interface ImportMetaEnv {
  readonly VITE_KV_REST_API_URL: string
  // 更多环境变量...
  readonly VITE_KV_REST_API_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
