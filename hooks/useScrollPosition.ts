import { useEffect } from 'react'

import { SORT_OPTIONS } from '../components/ActionsList/FilterBar'
import { useLocalStorage } from './useLocalStorage'

const INITIAL_VALUES = {
  categories: [],
  currentPage: 1,
  search: '',
  sorting: SORT_OPTIONS[0].key,
}

interface ScrollPositionOptions {
  // extend if needed
  currentPage?: number
  search?: string
  categories?: string[]
  sorting?: string
}

interface UseScrollPositionProps {
  options?: ScrollPositionOptions
  resetPosition: (initialValues?: ScrollPositionOptions) => void
  savePosition: (options?: object) => void
}

// saves the last scroll position before navigating away
// restores the position after navigating back, allows
// to store additional data like pagination and filters
export const useScrollPosition = (
  localStorageKey: string,
  setCondition: boolean,
  initialValues: ScrollPositionOptions = INITIAL_VALUES
): UseScrollPositionProps => {
  // get all available tags here to set as default

  const [scrollYStorage, setScrollYStorage] = useLocalStorage(
    localStorageKey,
    0
  )
  // space to persist things like pagination and filters
  const [options, setOptions] = useLocalStorage(
    `${localStorageKey}_options`,
    initialValues
  )

  const savePosition = (options?: ScrollPositionOptions) => {
    setScrollYStorage(window.scrollY)
    options && setOptions(options)
  }

  const resetPosition = () => {
    setScrollYStorage(0)
    setOptions(initialValues)
  }

  useEffect(() => {
    if (setCondition) {
      window.scrollTo(0, scrollYStorage)
    }
  }, [setCondition, scrollYStorage])

  return { options, resetPosition, savePosition }
}
