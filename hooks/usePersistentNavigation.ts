import { useEffect } from 'react'

import { SORT_OPTIONS } from '../components/ActionsList/FilterBar'
import { lookUp } from '../next-fetch-during-build/data/_category-tree-data.json'
import { isBrowser } from '../utils'
import { useLocalStorage } from './useLocalStorage'

interface NavigationOptions {
  scrollPosition?: number
  currentPage?: number
  search?: string
  categories?: string[]
  sorting?: string
}

interface UsePersistentNavigationProps {
  persistentNavigation?: NavigationOptions
  resetPosition: (initialValues?: NavigationOptions) => void
  savePosition: (options: NavigationOptions) => void
}

const LS_KEY = 'persistent_navigation'

const initialOptions: NavigationOptions = {
  categories: Object.keys(lookUp),
  currentPage: 1,
  scrollPosition: 0,
  sorting: SORT_OPTIONS[0].key,
}

// set initial persistent navigation outside of react lifecycle
if (isBrowser()) {
  window.localStorage.setItem(LS_KEY, JSON.stringify(initialOptions))
}

// saves the last scroll position and other navigation items
// before leaving a page and restores the state afterwards
export const usePersistentNavigation = (
  setCondition: boolean
): UsePersistentNavigationProps => {
  const [persistentNavigation, setPersistentNavigation] = useLocalStorage(
    LS_KEY,
    initialOptions
  )

  const savePosition = (options: NavigationOptions) => {
    setPersistentNavigation(options)
  }

  const resetPosition = () => {
    setPersistentNavigation(initialOptions)
  }

  // reset set the scroll position
  useEffect(() => {
    if (setCondition && persistentNavigation?.scrollPosition) {
      window.scrollTo(0, persistentNavigation?.scrollPosition)
    }
  }, [setCondition, persistentNavigation?.scrollPosition])

  return { persistentNavigation, resetPosition, savePosition }
}
