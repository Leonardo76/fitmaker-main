/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_SERVICE_ID: string;
  readonly VITE_TEMPLATE_ID: string;
  readonly VITE_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
