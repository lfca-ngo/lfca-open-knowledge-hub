require('../styles/global.less')

import type { AppProps } from 'next/app'

import { TopBar } from '../components/Layout/TopBar'
import { AppProvider } from '../hooks/app'
import { FirebaseProvider } from '../services/firebase'
import { LFCABackendProvider } from '../services/lfca-backend'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider
      // the full categories list is fetched during build time and made
      // accessible to all components in the app state
      categoriesList={Object.keys(pageProps?.categoryTrees?.lookUp || {})}
    >
      <FirebaseProvider>
        <LFCABackendProvider>
          <TopBar />
          <Component {...pageProps} />
        </LFCABackendProvider>
      </FirebaseProvider>
    </AppProvider>
  )
}

export default MyApp
