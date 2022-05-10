import type { NextPage } from 'next'

import { useState } from 'react'
import { StepsLayout } from '../components/Layout'
import { useRouter } from 'next/router'

import { OnboardingLeaderSteps } from '../components/Flows'


const OnboardingLeader: NextPage = (props: any) => {
    const router = useRouter()
    const [currentStep, setStep] = useState(0)
    const steps = OnboardingLeaderSteps({ setStep })
    const currentView = steps[currentStep].component

    return (
        <StepsLayout canClose onClose={() => router.push('/')} currentStep={currentStep} setStep={setStep} steps={steps}>
            {currentView}
        </StepsLayout>
    )
}


export default OnboardingLeader
