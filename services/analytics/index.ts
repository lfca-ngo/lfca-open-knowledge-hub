import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { isBrowser } from '../../utils'
import { FIREBASE_UID_STORAGE_KEY } from '../firebase/config'

interface EventValuesProps {
  [key: string]: string | number
}

interface TrackEventProps {
  name: string
  collection?: string
  values?: EventValuesProps
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

// gets & sets uid in window variable
const getWindowUid = () => {
  if (!isBrowser()) return 'server'
  if (window.ui) return window.ui
  const newUid = uuidv4()
  window.ui = newUid
  return newUid
}

const getUserId = () =>
  localStorage.getItem(FIREBASE_UID_STORAGE_KEY) || getWindowUid()

// helper, sending event to graphJSON collection
const track = (collection?: string, event?: EventValuesProps) => {
  if (!collection) return

  const payload = {
    api_key: process.env.NEXT_PUBLIC_GRAPH_JSON_API_KEY,
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

  const userId = getUserId()

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

  const userId = getUserId()

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
    const anonymousUserId = getUserId()

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
export const ERROR_BOUNDARY = 'error_boundary'
