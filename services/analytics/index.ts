import axios from 'axios'

import { isBrowser } from '../../utils'
import { FIREBASE_UID_STORAGE_KEY } from '../firebase/config'

const DEFAULT_PAYLOAD = {
  api_key: process.env.NEXT_PUBLIC_GRAPH_JSON_API_KEY,
}

const PATHS_TO_CUT: Array<string> = []

const getCleanPathName = () => {
  const pathname = window?.location.pathname

  for (const p of PATHS_TO_CUT) {
    if (pathname.includes(p)) {
      return pathname.split(p)[0].concat(p)
    }
  }

  return pathname
}

interface EventValuesProps {
  [key: string]: string | number
}

interface TrackEventProps {
  name: string
  collection?: string
  values?: EventValuesProps
}

// helper, sending event to graphJSON collection
const track = (collection?: string, event?: EventValuesProps) => {
  if (!collection) return

  const payload = {
    ...DEFAULT_PAYLOAD,
    collection,
    json: JSON.stringify(event),
    timestamp: Math.floor(new Date().getTime() / 1000),
  }

  return axios({
    data: payload,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_GRAPH_JSON_URL}/log`,
  })
}

// track page view events
export const trackPageView = (path?: string, values?: EventValuesProps) => {
  if (!isBrowser()) return

  const userId = localStorage.getItem(FIREBASE_UID_STORAGE_KEY) || 'anonymous'

  const event = {
    Event: 'pageView',
    path: path || getCleanPathName(),
    User_ID: userId,
    ...(values || {}),
  }

  track(process.env.NEXT_PUBLIC_GRAPH_JSON_EVENTS_COLLECTION || '', event)
}

// track basic events like button clicks
export const trackEvent = ({
  collection = process.env.NEXT_PUBLIC_GRAPH_JSON_EVENTS_COLLECTION || '',
  name,
  values = {},
}: TrackEventProps) => {
  if (!isBrowser()) return

  const userId = localStorage.getItem(FIREBASE_UID_STORAGE_KEY) || 'anonymous'

  const event = {
    Event: name,
    path: getCleanPathName(),
    User_ID: userId,
    ...values,
  }

  track(collection, event)
}

// we await this call during the login step and only
// continue once the anonymous id is saved
export const identifyUser = async (uid?: string) => {
  if (!uid) return

  try {
    const anonymousUserId =
      localStorage.getItem(FIREBASE_UID_STORAGE_KEY) || 'anonymous'

    await track(process.env.NEXT_PUBLIC_GRAPH_JSON_IDENTITIES_COLLECTION, {
      anonymous_uid: anonymousUserId,
      uid: uid,
    })

    // override the stored uid in localstorage
    // eventually this happens straight in auth listener?
    return true
  } catch (error) {
    return false
  }
}

// event names
export const EXTERNAL_LINK_CLICKED = 'external_link_clicked'
export const PAGE_VISIT = 'page_visit'
export const ERROR_BOUNDARY = 'error_boundary'
