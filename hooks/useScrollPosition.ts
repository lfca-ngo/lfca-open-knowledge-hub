import { useEffect } from 'react'

import { SORT_OPTIONS } from '../components/ActionsList/FilterBar'
import { useLocalStorage } from './useLocalStorage'

const INITIAL_VALUES: ScrollPositionOptions = {
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
  initialOptions?: ScrollPositionOptions
): UseScrollPositionProps => {
  const [scrollYStorage, setScrollYStorage] = useLocalStorage(
    localStorageKey,
    0
  )
  // space to persist things like pagination and filters
  const [options, setOptions] = useLocalStorage(
    `${localStorageKey}_options`,
    initialOptions
  )

  const savePosition = (options = INITIAL_VALUES) => {
    setScrollYStorage(window.scrollY)
    options && setOptions(options)
  }

  const resetPosition = (initialValues = INITIAL_VALUES) => {
    setScrollYStorage(0)
    setOptions(initialValues)
  }

  // set the initial options
  useEffect(() => {
    if (initialOptions) {
      const newOptions = { ...INITIAL_VALUES, ...initialOptions }
      // only set options if something changed
      if (JSON.stringify(newOptions) !== JSON.stringify(options)) {
        setOptions(newOptions)
      }
    }
  }, [initialOptions, setOptions, options])

  // set the scroll position
  useEffect(() => {
    if (setCondition) {
      window.scrollTo(0, scrollYStorage)
    }
  }, [setCondition, scrollYStorage])

  return { options, resetPosition, savePosition }
}
