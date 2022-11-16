import { DefaultOptionType } from 'antd/lib/select'

import { CompanyActionListItemFragment } from '../services/lfca-backend'
import { RemoveNull } from '../types'

export const isDev = process.env.NODE_ENV === 'development'
export const isBrowser = () => typeof window !== 'undefined'

export const COPY_BTN_WIDTH = '60'

export const LAYOUT_BREAKPOINTS = [
  { maxWidth: 575, name: 'xs' },
  { minWidth: 576, name: 'sm' },
  { minWidth: 768, name: 'md' },
  { minWidth: 992, name: 'lg' },
  { minWidth: 1200, name: 'xl' },
  { minWidth: 1600, name: 'xxl' },
]

export const OPEN_SLACK_LINK = 'https://lfca-co.slack.com/ssb/redirect'
export const DEFAULT_FONT_SIZE = 17
export const DEFAULT_LINE_HEIGHT = 1.5
export const SIDER = 'sider'
export const MAIN = 'main'
export const THEME_DARK = 'theme-dark'
export const ROLES = ['ADMIN', 'LEADER', 'OFFICER']
export const SLACK_INVITE_URL = `https://join.slack.com/t/lfca-co/shared_invite/zt-dc9mv47r-J0Y2JPj536x3PurMjWuNdA`
export const TERMS_OF_SERVICE_URL = `https://lfca.earth/terms/`
export const PRIVACY_URL = `https://lfca.earth/privacy/`
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

export const getBreakpoints = () => {
  const screenWidth =
    typeof window !== 'undefined'
      ? window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      : 0

  return LAYOUT_BREAKPOINTS.reduce((acc, val) => {
    acc[val.name] = val?.maxWidth
      ? screenWidth <= val?.maxWidth
      : screenWidth > (val?.minWidth || 0)
    return acc
  }, {} as { [key: string]: boolean })
}

export const arrayContains = (
  selectedArray?: (number | string)[],
  searchArray?: (number | string)[]
) => {
  const isValid =
    selectedArray === undefined ||
    selectedArray.length === 0 ||
    searchArray?.some((entry) => selectedArray.includes(entry))

  return isValid
}

export const arrayContainsAll = (
  selectedArray?: (number | string)[],
  searchArray?: (number | string)[]
) => {
  const isValid =
    selectedArray === undefined ||
    selectedArray.length === 0 ||
    selectedArray?.every((entry) => searchArray?.includes(entry))

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

export function isValidUrl(string: string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const isVentureCapitalCompany = (tags?: string[]) => {
  if (!tags) return false
  return tags?.indexOf('vc') > -1
}

export const CSS_THEME_DARK = !isBrowser()
  ? THEME_DARK
  : getComputedStyle(document.documentElement)
      ?.getPropertyValue('--THEME--DARK')
      .trim() || THEME_DARK

export const actionHasReviews = (action?: CompanyActionListItemFragment) => {
  return !!action?.serviceProviderList?.id
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
  if (typeof value !== 'number') return '€ ?'
  return `€ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export function removeObjectNullProps<T extends object>(obj: T): RemoveNull<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null)
  ) as RemoveNull<T>
}

export const getMailToLink = ({
  body,
  cc,
  subject,
  to,
}: {
  body?: string
  cc?: string
  subject?: string
  to: string
}) => {
  const args = []
  if (typeof subject !== 'undefined') {
    args.push('subject=' + encodeURIComponent(subject))
  }
  if (typeof body !== 'undefined') {
    args.push('body=' + encodeURIComponent(body))
  }
  if (typeof cc !== 'undefined') {
    args.push('cc=' + encodeURIComponent(cc))
  }
  let url = 'mailto:' + encodeURIComponent(to)
  if (args.length > 0) {
    url += '?' + args.join('&')
  }
  return url
}

export function getTextFromOptionChildren(
  elem: React.ReactElement | string | DefaultOptionType['children']
): string {
  if (!elem) {
    return ''
  }
  if (typeof elem === 'string') {
    return elem
  }

  const children = 'props' in elem && elem.props && elem.props.children
  if (children instanceof Array) {
    return children.map(getTextFromOptionChildren).join('')
  }
  return getTextFromOptionChildren(children)
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const capitalizeEveryWord = (words: string) => {
  const wordsArray = words.split(' ')

  for (let i = 0; i < wordsArray.length; i++) {
    wordsArray[i] = capitalizeFirstLetter(wordsArray[i])
  }

  return wordsArray.join(' ')
}
