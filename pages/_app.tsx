require('../styles/global.less')

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { INITIAL_VALUES, LS_ACTION_LIST } from '../components/ActionsList'
import { AppProvider } from '../hooks/app'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { FirebaseProvider } from '../services/firebase'
import { LFCABackendProvider } from '../services/lfca-backend'
import { ACTIONS } from '../utils/routes'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { resetPosition } = useScrollPosition(LS_ACTION_LIST, false)

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // only persist the browsing state when the user goes from
      // the dashboard to the action detail page and back
      // in all other cases, reset the browsing state
      const fromDashboardToDetails =
        router.pathname === ACTIONS && url.startsWith('/action/')
      const fromDetailPageToDashboard =
        router.pathname.startsWith('/action/') && url === ACTIONS

      if (!(fromDashboardToDetails || fromDetailPageToDashboard)) {
        resetPosition(INITIAL_VALUES)
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.pathname, resetPosition, router.events])

  return (
    <AppProvider>
      <FirebaseProvider>
        <LFCABackendProvider>
          <Component {...pageProps} />
        </LFCABackendProvider>
      </FirebaseProvider>
    </AppProvider>
  )
}

export default MyApp
