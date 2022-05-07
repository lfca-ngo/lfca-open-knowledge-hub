
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import { MOBILE_BREAKPOINT } from '../utils'

const CLIENT = 'client'
const SERVER = 'server'
const DEFAULT = {
    isClient: false,
    isMobile: false,
    key: SERVER
}
const AppContext = createContext(DEFAULT)

export const AppProvider = ({ children }: { children: any }) => {
    const [isMobile, setIsMobile] = useState(DEFAULT.isMobile)
    const [isClient, setClient] = useState(DEFAULT.isClient)
    const key = isClient ? CLIENT : SERVER

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
