/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEALDB_API_KEY: String;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
