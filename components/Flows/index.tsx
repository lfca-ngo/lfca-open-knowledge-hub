export interface StepProps {
  title: string
  component?: React.ReactNode
  sideComponent?: React.ReactNode
}

export interface DefaultStepProps {
  onNext?: () => void
  onPrev?: () => void
}

export interface StepPropsWithSharedState extends DefaultStepProps {
  sharedState: any
  setSharedState?: (newState: any) => void
}
