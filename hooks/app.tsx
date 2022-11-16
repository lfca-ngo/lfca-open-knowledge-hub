import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { ACTIONS } from '../utils/routes'
import { getCleanPathName, useAnalytics } from './segment'
import useIsClient from './useIsClient'
import { usePersistentNavigation } from './usePersistentNavigation'
import { useUser } from './user'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { company, user } = useUser()
  const { resetPosition } = usePersistentNavigation(false)
  const { events, pathname } = useRouter()
  const analytics = useAnalytics()

  const isClient = useIsClient(() => {
    // log initial page view on mount
    analytics.page(getCleanPathName())
  })

  // identify the user and group by company id
  useEffect(() => {
    if (company?.id && user?.id) {
      analytics.identify(user?.id, { ['Company ID']: company?.id })
    }
  }, [company?.id, user?.id, analytics])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // track page view when user navigates
      analytics.page(getCleanPathName(url))

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
  }, [analytics, pathname, events, resetPosition])

  // wait with initial render until client side
  // to avoid SSR flashing
  if (!isClient) return null

  return <>{children}</>
}
