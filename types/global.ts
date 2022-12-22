declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      CF_ACCESS_TOKEN: string
      CF_PREVIEW_ACCESS_TOKEN: string
      CF_SPACE_ID: string
      DISABLE_CONTENTFUL_SERVICE_CACHE: string
      GOOGLE_CLIENT_SECRET: string
      JWT_SHARE_TOKEN_PRIVATE_KEY: string
      MAINTENANCE: string
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
      NEXT_PUBLIC_URL: string
    }
  }
  // Global window variables
  interface Window {
    ui?: string
  }
}

export {}
