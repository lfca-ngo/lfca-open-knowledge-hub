import { useEffect } from 'react'

import { SORT_OPTIONS } from '../components/ActionsList/FilterBar'
import * as categoryTreeData from '../next-fetch-during-build/data/_category-tree-data.json'
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

// if this is read from a json file that is being generated during build time
// then we are good
const initialOptions: NavigationOptions = {
  categories: Object.keys(categoryTreeData.lookUp),
  currentPage: 0,
  scrollPosition: 0,
  sorting: SORT_OPTIONS[0].key,
}

// to avoid unnecessary rerenders, we set the screen
// size outside of the react lifecycle
if (isBrowser()) {
  // set initial persistent navigation
  window.localStorage.setItem(LS_KEY, JSON.stringify(initialOptions))
}

// saves the last scroll position before navigating away
// restores the position after navigating back, allows
// to store additional data like pagination and filters
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

  // set the scroll position
  useEffect(() => {
    if (setCondition) {
      window.scrollTo(0, persistentNavigation?.scrollPosition || 0)
    }
  }, [setCondition, persistentNavigation])

  return { persistentNavigation, resetPosition, savePosition }
}
