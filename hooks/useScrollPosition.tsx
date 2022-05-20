import { useEffect } from 'react'

import { useLocalStorage } from './useLocalStorage'

interface ScrollPositionOptions {
  // extend if needed
  currentPage?: number
  search?: string
  tags?: string[]
  sorting?: string
}

interface UseScrollPositionProps {
  options?: ScrollPositionOptions
  savePosition: (options?: object) => void
}

// saves the last scroll position before navigating away
// restores the position after navigating back, allows
// to store additional data like pagination and filters
export const useScrollPosition = (
  localStorageKey: string,
  setCondition: boolean,
  initialValues: ScrollPositionOptions = {}
): UseScrollPositionProps => {
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

  useEffect(() => {
    if (setCondition) {
      window.scrollTo(0, scrollYStorage)
    }
  }, [setCondition, scrollYStorage])

  return { options, savePosition }
}
