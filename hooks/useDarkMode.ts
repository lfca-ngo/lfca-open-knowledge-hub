import { useEffect, useState } from 'react'

import { CSS_THEME_DARK, isBrowser } from '../utils'
import { useLocalStorage } from './useLocalStorage'

const THEME_COOKIE = 'theme'
const LIGHT_THEME = 'light'

export const useDarkMode = () => {
  const [themeValue, setThemeValue] = useLocalStorage(THEME_COOKIE, LIGHT_THEME)

  const isDarkMode = themeValue === CSS_THEME_DARK
  const htmlEl: any = isBrowser() && document?.documentElement
  const [isDarkModeState, setIsDarkModeState] = useState(isDarkMode)

  const addDarkMode = () => htmlEl.classList.add(CSS_THEME_DARK)
  const removeDarkMode = () => htmlEl.classList.remove(CSS_THEME_DARK)

  const setDarkMode = (isDark: boolean) => {
    const shouldSetDark = CSS_THEME_DARK && htmlEl && isDark

    if (shouldSetDark) addDarkMode()
    else removeDarkMode()

    // persist and trigger render
    setThemeValue(shouldSetDark ? CSS_THEME_DARK : LIGHT_THEME)
    setIsDarkModeState(isDark)
  }

  // on inital mount, set the theme based on the cookie
  useEffect(() => {
    setDarkMode(isDarkMode)
    return () => removeDarkMode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [isDarkModeState, setDarkMode] as const
}
