import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { OnboardingOfficerSteps } from '../components/Flows'
import { StepsLayout } from '../components/Layout'
import { fetchAllActions } from '../services/contentful'

const OnboardingOfficer: NextPage = (props: any) => {
  const router = useRouter()
  const { byTags } = props.actions
  const [currentStep, setStep] = useState(0)
  const steps = OnboardingOfficerSteps({ byTags, setStep })
  const currentView = steps[currentStep].component

  return (
    <StepsLayout
      canClose
      currentStep={currentStep}
      onClose={() => router.push('/')}
      setStep={setStep}
      steps={steps}
    >
      {currentView}
    </StepsLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const actions = await fetchAllActions()

  return {
    props: {
      actions,
    },
  }
}

export default OnboardingOfficer
