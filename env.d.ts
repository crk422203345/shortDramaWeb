/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // 可以在此定义项目所需的其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

