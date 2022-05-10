require('../styles/global.less')

import type { AppProps } from 'next/app'

import { AppProvider } from '../hooks/app'
import { LFCABackendProvider } from '../services/lfca-backend'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <LFCABackendProvider>
        <Component {...pageProps} />
      </LFCABackendProvider>
    </AppProvider>
  )
}

export default MyApp
