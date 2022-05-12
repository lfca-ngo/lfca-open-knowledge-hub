import React, { createContext, useContext, useEffect, useState } from 'react'

import { getScreenSizeType, DESKTOP } from '../utils'

const CLIENT = 'client'
const SERVER = 'server'

const initialState = {
  isClient: false,
  screenSize: DESKTOP,
  key: SERVER,
}

const AppContext = createContext(initialState)

export const AppProvider = ({ children }: { children: any }) => {
  const [screenSize, setScreenSize] = useState(initialState.screenSize)
  const [isClient, setClient] = useState(initialState.isClient)
  const key = isClient ? CLIENT : SERVER

  // due to SSG we only know if it's mobile
  // after first client side render
  useEffect(() => {
    const screenSize = getScreenSizeType(window, document)
    setClient(true)
    setScreenSize(screenSize)
  }, [])

  return (
    <AppContext.Provider
      value={{
        isClient,
        screenSize,
        key,
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
