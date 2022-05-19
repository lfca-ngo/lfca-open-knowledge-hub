import { useEffect } from 'react'

import { useLocalStorage } from './useLocalStorage'

interface ScrollPositionOptions {
  // extend if needed
  currentPage?: number
  selectedTags?: string[]
}

interface UseScrollPositionProps {
  options?: ScrollPositionOptions
  savePosition: (options?: object) => void
}

export const useScrollPosition = (
  localStorageKey: string,
  setCondition: boolean
): UseScrollPositionProps => {
  const [scrollYStorage, setScrollYStorage] = useLocalStorage(
    localStorageKey,
    0
  )
  // space to persist things like pagination and filters
  const [options, setOptions] = useLocalStorage(
    `${localStorageKey}_options`,
    {}
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
