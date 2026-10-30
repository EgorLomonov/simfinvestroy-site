/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PROXY_URL?: string;
  readonly VITE_TG_TOKEN?: string;
  readonly VITE_TG_CHAT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}