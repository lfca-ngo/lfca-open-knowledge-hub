export const isDev = process.env.NODE_ENV === 'development'
export const isBrowser = () => typeof window !== 'undefined'
export const SM_BREAKPOINT = 767
export const MD_BREAKPOINT = 992
export const LG_BREAKPOINT = 1200
export const XL_BREAKPOINT = 1441
export const MOBILE = 'sm'
export const TABLET = 'md'
export const DESKTOP = 'lg'
export const DESKTOP_XL = 'xl'
export const SIDER = 'sider'
export const MAIN = 'main'
export const THEME_DARK = 'theme-dark'
export const MEASUREMENT_SERVICES_COMPARISON = 'measurement-services-comparison'

export function toFixedNumber(num: number, digits: number, base = 10) {
  const pow = Math.pow(base, digits)
  return Math.round(num * pow) / pow
}

export const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank')
  win?.focus()
}

export const copyTextToClipboard = (text: string, cb: any) => {
  if (!navigator.clipboard) {
    cb('Clipboard API not supported', false)
  }
  navigator.clipboard.writeText(text).then(
    () => {
      const message = `Copying text was successful`
      return cb(message, true)
    },
    (err) => {
      console.error(err)
      const message = `Could not copy text`
      return cb(message, false)
    }
  )
}

export const getScreenSizeType = (window: any, document: any) => {
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

  const isMobile = screenWidth <= SM_BREAKPOINT
  const isTablet = screenWidth >= MD_BREAKPOINT
  const isDesktop = screenWidth >= LG_BREAKPOINT
  const isDesktopXl = screenWidth >= XL_BREAKPOINT

  if (isMobile) return MOBILE
  if (isDesktopXl) return DESKTOP_XL
  if (isDesktop) return DESKTOP
  if (isTablet) return TABLET

  return DESKTOP
}

export function isValidUrl(url: string) {
  return !!String(url).match(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  )
}

export const CSS_THEME_DARK = !isBrowser()
  ? THEME_DARK
  : getComputedStyle(document.documentElement)
      ?.getPropertyValue('--THEME--DARK')
      .trim() || THEME_DARK

export const setCookie = (name: string, value: any) => {
  if (!isBrowser()) return
  window.localStorage.setItem(name, value)
}

export const getCookie = (name: string) => {
  if (!isBrowser()) return null
  return window.localStorage.getItem(name)
}

export const deleteCookie = (name: string) => {
  if (!isBrowser()) return
  window.localStorage.removeItem(name)
}

export const actionHasReviews = (action: any) => {
  return action?.customSections?.find(
    (s: any) => s.componentId === MEASUREMENT_SERVICES_COMPARISON
  )
}
