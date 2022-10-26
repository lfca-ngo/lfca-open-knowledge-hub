import 'antd/dist/antd.less'
import '../styles/global.less'

import type { AppProps } from 'next/app'

import { TopBar } from '../components/Layout/TopBar'
import { AppProvider } from '../hooks/app'
import { FirebaseProvider } from '../services/firebase'
import { LFCABackendProvider } from '../services/lfca-backend'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <FirebaseProvider>
        <LFCABackendProvider>
          <TopBar hideOnPaths={['onboarding']} />
          <Component {...pageProps} />
        </LFCABackendProvider>
      </FirebaseProvider>
    </AppProvider>
  )
}

export default MyApp
