export * from './Onboarding'
export * from './OnboardingLeader'
export * from './OnboardingOfficer'

export interface StepProps {
  title: string
  component?: React.ReactNode
  sideComponent?: React.ReactNode
}
