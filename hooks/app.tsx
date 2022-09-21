import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect } from 'react'

import { trackEvent } from '../services/analytics'
import { DESKTOP, getScreenSizeType, isBrowser } from '../utils'
import { ACTIONS } from '../utils/routes'
import useIsClient from './useIsClient'
import { useLocalStorage } from './useLocalStorage'
import { usePersistentNavigation } from './usePersistentNavigation'

const SCREEN_SIZE = 'screen_size'

const AppContext = createContext({
  screenSize: DESKTOP,
})

// to avoid unnecessary rerenders, we set the screen
// size outside of the react lifecycle
if (isBrowser()) {
  window.localStorage.setItem(
    SCREEN_SIZE,
    JSON.stringify(getScreenSizeType(window, document))
  )
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { resetPosition } = usePersistentNavigation(false)
  const [screenSize] = useLocalStorage(SCREEN_SIZE, DESKTOP)
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

  return (
    <AppContext.Provider
      value={{
        screenSize,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useScreenSize = () => {
  const { screenSize } = useContext(AppContext)
  return screenSize
}
