/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  // readonly VITE_APP_TITLE: string;
  // more env variables...
  readonly SERVICE_ID: string;
  readonly TEMPLATE_ID: string;
  readonly PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
