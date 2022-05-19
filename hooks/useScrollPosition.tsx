import { useEffect } from 'react'

import { useLocalStorage } from './useLocalStorage'

export const useScrollPosition = (
  localStorageKey: string,
  trigger: any
): { savePosition: () => void } => {
  const [scrollYStorage, setScrollYStorage] = useLocalStorage(
    localStorageKey,
    0
  )

  const savePosition = () => {
    setScrollYStorage(window.scrollY)
  }

  useEffect(() => {
    window.scrollTo(0, scrollYStorage)
  }, [trigger, scrollYStorage])

  return { savePosition }
}
