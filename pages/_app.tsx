import 'antd/dist/antd.less'
import '../styles/global.less'

import type { AppProps } from 'next/app'

import { MembershipBar, VerifyEmailBar } from '../components/Layout/TopBar'
import { AppProvider } from '../hooks/app'
import { AnalyticsProvider } from '../hooks/segment'
import { FirebaseProvider } from '../services/firebase'
import { LFCABackendProvider } from '../services/lfca-backend'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnalyticsProvider writeKey={process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY}>
      <AppProvider>
        <FirebaseProvider>
          <LFCABackendProvider>
            <VerifyEmailBar hideOnPaths={['onboarding']} />
            <MembershipBar hideOnPaths={['onboarding']} />
            <Component {...pageProps} />
          </LFCABackendProvider>
        </FirebaseProvider>
      </AppProvider>
    </AnalyticsProvider>
  )
}

export default MyApp
