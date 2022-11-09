import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { trackPageView } from '../services/analytics'
import { ACTIONS } from '../utils/routes'
import useIsClient from './useIsClient'
import { usePersistentNavigation } from './usePersistentNavigation'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { resetPosition } = usePersistentNavigation(false)
  const { events, pathname } = useRouter()

  const isClient = useIsClient(() => {
    // track initial page view: the app provider is only mounted once
    // the route change is not fired on initial mount
    trackPageView()
  })

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // track page view when user navigates
      trackPageView(url)

      // only persist the browsing state when the user goes from
      // the dashboard to the action detail page and back
      // in all other cases, reset the browsing state
      const fromDashboardToDetails =
        pathname === ACTIONS && url.startsWith('/action/')
      const fromDetailPageToDashboard =
        pathname.startsWith('/action/') && url === ACTIONS

      if (!(fromDashboardToDetails || fromDetailPageToDashboard)) {
        resetPosition()
      }
    }

    events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [pathname, events, resetPosition])

  // wait with initial render until client side
  // to avoid SSR flashing
  if (!isClient) return null

  return <>{children}</>
}
