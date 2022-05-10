declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CF_ACCESS_TOKEN: string
      NEXT_PUBLIC_CF_PREVIEW_ACCESS_TOKEN: string
      NEXT_PUBLIC_CF_SPACE_ID: string
      NEXT_PUBLIC_FIREBASE_API_KEY: string
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_EMULATOR: string
      NEXT_PUBLIC_LFCA_BACKED_URL: string
    }
  }
}

export {}
