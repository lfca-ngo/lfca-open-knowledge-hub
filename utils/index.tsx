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
export const ROLES = ['ADMIN', 'LEADER', 'OFFICER']
export const SLACK_INVITE_URL = `https://join.slack.com/t/lfca-co/shared_invite/zt-dc9mv47r-J0Y2JPj536x3PurMjWuNdA`
export const TERMS_OF_SERVICE_URL = `https://lfca.earth/terms/`
export const DEFAULT_COUNTRY = 'eu-DE'
export const PRODUCT_VIDEO_URL =
  'https://res.cloudinary.com/dhpk1grmy/video/upload/v1655396711/Video/lfca-community-app-share_dbwgvq.mp4'
export const DEFAULT_SUPPORT_EMAIL = 'support@lfca.earth'
export const SUPPORT_EMAIL_LINK = (
  <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>{DEFAULT_SUPPORT_EMAIL}</a>
)

export function toFixedNumber(num: number, digits: number, base = 10) {
  const pow = Math.pow(base, digits)
  return Math.round(num * pow) / pow
}

export const arrayContains = (
  selectedArray?: string[],
  searchArray?: string[]
) => {
  const isValid =
    selectedArray === undefined ||
    selectedArray.length === 0 ||
    searchArray?.some((entry) => selectedArray.includes(entry))

  return isValid
}

export const arrayContainsAll = (
  selectedArray?: string[],
  searchArray?: string[]
) => {
  const isValid =
    selectedArray === undefined ||
    selectedArray.length === 0 ||
    selectedArray?.every((entry) => searchArray?.includes(entry))

  return isValid
}

export const numberInRange = (number?: number, range?: number[]) => {
  const isValid =
    range === undefined ||
    range.length === 0 ||
    (number !== undefined && range[0] <= number && range[1] >= number)

  return isValid
}

export const lowerCaseSearch = (searchTerm: string, toSearch?: string) =>
  toSearch?.toLowerCase().includes(searchTerm.toLowerCase()) || false

export const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank')
  win?.focus()
}

export const copyTextToClipboard = (
  text: string,
  cb: (message: string, success: boolean) => void
) => {
  if (!navigator.clipboard) {
    cb('Clipboard API not supported', false)
  }
  navigator.clipboard.writeText(text).then(
    () => {
      const message = `Copied text to clipboard`
      return cb(message, true)
    },
    (err) => {
      const message = `Could not copy text. Error: ${err.toString()}`
      return cb(message, false)
    }
  )
}

export const scrollToId = (id: string) => {
  const section = document.querySelector(`#${id}`)
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const getScreenSizeType = (window: Window, document: Document) => {
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

export const actionHasReviews = (action: any) => {
  return action?.customSections?.find(
    (s: any) => s.componentId === MEASUREMENT_SERVICES_COMPARISON
  )
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

export const toReadibleDate = (ts: string) => {
  return new Date(ts).toLocaleDateString('en-us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const formatCurrency = (value: number | null | undefined) => {
  if (!value) return '€ ?'
  return `€ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
