
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import { MOBILE_BREAKPOINT } from '../utils'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false)
    const [isClient, setClient] = useState(false)
    const key = isClient ? 'client' : 'server'

    // due to SSG we only know if it's mobile
    // after first client side render
    useEffect(() => {
        const screenWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth

        setClient(true)
        setIsMobile(screenWidth <= MOBILE_BREAKPOINT)

    }, [])

    return (
        <AppContext.Provider
            value={{
                isClient,
                isMobile,
                key,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useIsMobile = () => {
    const { isMobile } = useContext(AppContext)
    return isMobile
}

export const useIsClient = () => {
    const { isClient } = useContext(AppContext)
    return isClient
}
