import { Switch } from 'antd'
import React from 'react'

import { useDarkMode } from '../../hooks/useDarkMode'

export const DarkModeSelector = () => {
  const [isDarkMode, setDarkMode] = useDarkMode()
  const toggleDarkMode = () => setDarkMode(!isDarkMode)

  return <Switch checked={isDarkMode} onChange={toggleDarkMode} />
}
