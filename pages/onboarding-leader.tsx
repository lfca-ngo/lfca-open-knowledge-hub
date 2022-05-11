import type { NextPage, GetStaticProps } from 'next'

import { useState, cloneElement } from 'react'
import { StepsLayout } from '../components/Layout'
import { useRouter } from 'next/router'
import { fetchAllQuestionnaires } from '../services/contentful'
import { OnboardingLeaderSteps } from '../components/Flows'


const OnboardingLeader: NextPage = (props: any) => {
    const router = useRouter()
    const [currentStep, setStep] = useState(0)
    const steps = OnboardingLeaderSteps({ setStep })
    const currentView = steps[currentStep].component

    return (
        <StepsLayout canClose onClose={() => router.push('/')} currentStep={currentStep} setStep={setStep} steps={steps}>
            {cloneElement(currentView, {
                questionnaire: props?.questionnaires['oc-AU'],
            })}
        </StepsLayout>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const questionnaires = await fetchAllQuestionnaires()

    return {
        props: {
            questionnaires,
        },
    }
}


export default OnboardingLeader
