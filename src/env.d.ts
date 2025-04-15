interface ImportMetaEnv {
  readonly PUBLIC_API: string;
  readonly PUBLIC_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}