export * from './CompanyInfo'
export * from './Groups'
export * from './Invite'
export * from './Membership'
export * from './PersonalInfo'
export * from './Personalize'
export * from './Share'
export * from './Slack'

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
}
