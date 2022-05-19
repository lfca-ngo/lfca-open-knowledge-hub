import { useEffect } from 'react'

import { useLocalStorage } from './useLocalStorage'

export const useScrollPosition = (
  localStorageKey: string,
  trigger: any
): { options: object; savePosition: (options?: object) => void } => {
  const [scrollYStorage, setScrollYStorage] = useLocalStorage(
    localStorageKey,
    0
  )
  const [options, setOptions] = useLocalStorage(
    `${localStorageKey}_options`,
    {}
  )

  const savePosition = (options?: object) => {
    setScrollYStorage(window.scrollY)
    options && setOptions(options)
  }

  useEffect(() => {
    window.scrollTo(0, scrollYStorage)
  }, [trigger, scrollYStorage])

  return { options, savePosition }
}
