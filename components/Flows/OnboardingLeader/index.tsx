import { Button, Tag, Drawer } from 'antd'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Pledge } from '../../Pledge'
import { CarbonCalculator } from '../../../tools/PersonalCarbonCalculator'

const Commit = (props: any) => {
    return (
        <div>
            <Tag className='super-text'>Pledge</Tag>
            <h1>Welcome Timo, let's get you started!</h1>
            <p>We started LFCA with the goal to accelerate the transition towards a sustainable economy. To make this happen, we need to leverage our influence on a personal, business and political level. Please start by signing our Green Pledge as a leader of LFCA.</p>
            <Pledge onFinish={() => props.setStep(1)} />
        </div>
    )
}

const Invite = (props: any) => {
    return (
        <div>
            <Tag className='super-text'>Intro</Tag>
            <h1>Invite at least one team member as a Climate Officer</h1>
            <p>The lfca platform is the place where we collect and share our community's knowledge. It's the place where we inspire you to realize the full climate action potential of your organization.</p>
            <Button type='primary' size='large' onClick={() => props.setStep(2)}>Continue</Button>
        </div>
    )
}

const Footprint = (props: any) => {
    const [drawerVisible, setDrawerVisible] = useState(false)

    const saveAndContinue = (val: any) => {
        // @TODO: save to database
        // show loading spinner
        setDrawerVisible(false)
        props.setStep(3)
    }

    return (
        <div>
            <Tag className='super-text'>Intro</Tag>
            <h1>Welcome Timo, let's get you started!</h1>
            <p>The lfca platform is the place where we collect and share our community's knowledge. It's the place where we inspire you to realize the full climate action potential of your organization.</p>
            <Button type='primary' size='large' onClick={() => setDrawerVisible(true)}>Start</Button>

            <Drawer className='fullscreen-drawer-bottom' height={'100%'} placement='bottom' visible={drawerVisible} onClose={() => setDrawerVisible(false)}>
                <CarbonCalculator
                    questionnaire={props.questionnaire}
                    saveResult={saveAndContinue}
                />
            </Drawer>
        </div>
    )
}

const Share = (props: any) => {
    const router = useRouter()
    return (
        <div>
            <Tag className='super-text'>Intro</Tag>
            <h1>Welcome Timo, let's get you started!</h1>
            <p>The lfca platform is the place where we collect and share our community's knowledge. It's the place where we inspire you to realize the full climate action potential of your organization.</p>
            <Button type='primary' size='large' onClick={() => props.setStep(1)}>Continue</Button>
        </div>
    )
}

export const OnboardingLeaderSteps = (props: any) => [
    { title: 'Pledge', description: 'Commit to action', component: <Commit {...props} /> },
    { title: 'Invite', description: 'Get to know the platform', component: <Invite {...props} /> },
    { title: 'Footprint', description: 'Understand your emissions', component: <Footprint {...props} /> },
    { title: 'Share the news', description: 'Use your influence', component: <Share {...props} /> }
]