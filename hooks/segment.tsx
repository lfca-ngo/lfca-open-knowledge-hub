import { AnalyticsBrowser } from '@segment/analytics-next'
import { createContext, useContext, useMemo } from 'react'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AnalyticsContext = createContext<AnalyticsBrowser>(undefined!)

interface AnalyticsProviderProps {
  writeKey: string
  children: React.ReactNode
}

export const AnalyticsProvider = ({
  children,
  writeKey,
}: AnalyticsProviderProps) => {
  const analytics = useMemo(
    () => AnalyticsBrowser.load({ writeKey }),
    [writeKey]
  )
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

// Create an analytics hook that we can use with other components.
export const useAnalytics = () => {
  const result = useContext(AnalyticsContext)
  if (!result) {
    throw new Error('Context used outside of its Provider!')
  }
  return result
}

const PATHS_TO_CUT: Array<string> = []

export const getCleanPathName = () => {
  const pathname = window?.location.pathname

  for (const p of PATHS_TO_CUT) {
    if (pathname.includes(p)) {
      return pathname.split(p)[0].concat(p)
    }
  }

  return pathname
}

export enum ONBOARDING_STEPS {
  STARTED_ONBOARDING = 'startedOnboarding',
  COMPLETED_COMPANY_INFO_STEP = 'completedCompanyInfoStep',
  COMPLETED_USER_REGISTRATION_STEP = 'completedUserRegistrationStep',
  COMPLETED_ONBOARDING_COURSE_STEP = 'completedOnboardingCourseStep',
  COMPLETED_PERSONALIZATION_STEP = 'completedPersonalizationStep',
  COMPLETED_INVITATION_STEP = 'completedInvitationStep',
  COMPLETED_MEMBERSHIP_STEP = 'completedMembershipStep',
  COMPLETED_SLACK_STEP = 'completedSlackStep',
  COMPLETED_SHARE_STEP = 'completedShareStep',
  JOINED_SLACK_DURING_ONBOARDING = 'joinedSlackDuringOnboarding',
}

export enum EVENTS {
  RSVP_ADD_TO_CAL = 'rsvpAddToCal',
}
