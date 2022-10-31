import 'antd/dist/antd.less'
import '../styles/global.less'

import type { AppProps } from 'next/app'

import { MembershipBar, VerifyEmailBar } from '../components/Layout/TopBar'
import { AppProvider } from '../hooks/app'
import { FirebaseProvider } from '../services/firebase'
import { LFCABackendProvider } from '../services/lfca-backend'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <FirebaseProvider>
        <LFCABackendProvider>
          <VerifyEmailBar hideOnPaths={[]} />
          <MembershipBar hideOnPaths={['onboarding']} />
          <Component {...pageProps} />
        </LFCABackendProvider>
      </FirebaseProvider>
    </AppProvider>
  )
}

export default MyApp
