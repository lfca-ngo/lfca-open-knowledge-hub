import type { GetStaticProps, NextPage } from 'next'

import { useState } from 'react'
import { StepsLayout } from '../components/Layout'
import { fetchAllActions } from '../services/contentful'
import { useRouter } from 'next/router'

import { OnboardingOfficerSteps } from '../components/Flows'


const OnboardingOfficer: NextPage = (props: any) => {
  const router = useRouter()
  const { byTags } = props.actions
  const [currentStep, setStep] = useState(0)
  const steps = OnboardingOfficerSteps({ byTags, setStep })
  const currentView = steps[currentStep].component

  return (
    <StepsLayout canClose onClose={() => router.push('/')} currentStep={currentStep} setStep={setStep} steps={steps}>
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
