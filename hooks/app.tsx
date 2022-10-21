import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { trackEvent } from '../services/analytics'
import { ACTIONS } from '../utils/routes'
import useIsClient from './useIsClient'
import { usePersistentNavigation } from './usePersistentNavigation'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { resetPosition } = usePersistentNavigation(false)

  const isClient = useIsClient()
  const router = useRouter()

  // on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackEvent({
        name: 'pageView',
        values: {
          to: url,
        },
      })
      // only persist the browsing state when the user goes from
      // the dashboard to the action detail page and back
      // in all other cases, reset the browsing state
      const fromDashboardToDetails =
        router.pathname === ACTIONS && url.startsWith('/action/')
      const fromDetailPageToDashboard =
        router.pathname.startsWith('/action/') && url === ACTIONS

      if (!(fromDashboardToDetails || fromDetailPageToDashboard)) {
        resetPosition()
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.pathname, router.events, resetPosition])

  // wait with initial render until client side
  // to avoid SSR flashing
  if (!isClient) return null

  return <>{children}</>
}
