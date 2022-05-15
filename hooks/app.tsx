import React, { createContext, useContext, useEffect, useState } from 'react'

import { DESKTOP, getScreenSizeType } from '../utils'
import { useDarkMode } from './useDarkMode'

const CLIENT = 'client'
const SERVER = 'server'

const initialState = {
  isClient: false,
  key: SERVER,
  screenSize: DESKTOP,
}

const AppContext = createContext(initialState)

export const AppProvider = ({ children }: { children: any }) => {
  const [screenSize, setScreenSize] = useState(initialState.screenSize)
  const [isClient, setClient] = useState(initialState.isClient)
  const key = isClient ? CLIENT : SERVER

  // set dark mode
  useDarkMode()

  // due to SSG we only know if it's mobile
  // after first client side render
  useEffect(() => {
    const screenSize = getScreenSizeType(window, document)
    setClient(true)
    setScreenSize(screenSize)
  }, [])

  // wait with initial render until client side
  // to avoid SSR flashing
  if (!isClient) return null

  return (
    <AppContext.Provider
      value={{
        isClient,
        key,
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

export const useIsClient = () => {
  const { isClient } = useContext(AppContext)
  return isClient
}
