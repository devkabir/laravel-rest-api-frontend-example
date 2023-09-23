// <reference types="vite/client" />
interface Env {
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: Env;
}
