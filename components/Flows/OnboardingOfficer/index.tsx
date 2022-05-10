import { InfoCarousel } from '../../InfoCarousel'
import { ActionsList } from '../../ActionsList'
import { ArrowRightOutlined } from '@ant-design/icons'
import Explore from '../../../public/img/explore.jpg'
import Communicate from '../../../public/img/communicate.jpg'
import Mastermind from '../../../public/img/mastermind.jpg'
import { Button, Tag, Drawer } from 'antd'
import { useState } from 'react'
import { CompleteActionForm } from '../../CompleteActionForm'
import { useRouter } from 'next/router'

const ELEMENTS = [
    {
        title: "Measure, plan, reduce & contribute",
        description:
            "We are with you all the way: From kickstarting your carbon accounting, over reduction measures towards participation in meaningful campaigns.",
        icon: <ArrowRightOutlined />,
        image: Explore,
    },
    {
        title: "Collaborate and co-create knowledge",
        description:
            "See who else is working on your actions and get in touch using our Slack channel (check your emails for the invite link)",
        icon: <ArrowRightOutlined />,
        image: Communicate,
    },
    {
        title: "Share your progress with the world",
        description:
            "Once you implemented all required actions from your program, you will be rewarded with a custom microsite for your company.",
        icon: <ArrowRightOutlined />,
        image: Mastermind,
    },
]

const Intro = (props: any) => {
    return (
        <div>
            <Tag className='super-text'>Intro</Tag>
            <h1>Welcome Timo, let's get you started!</h1>
            <p>The lfca platform is the place where we collect and share our community's knowledge. It's the place where we inspire you to realize the full climate action potential of your organization.</p>
            <InfoCarousel elements={ELEMENTS} />
            <Button type='primary' size='large' onClick={() => props.setStep(1)}>Continue</Button>
        </div>
    )
}

const Personalize = (props: any) => {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const onSelect = (e: any) => {
        e.preventDefault();
        setDrawerVisible(true);
    }

    return (
        <div>
            <Tag className='super-text'>Personalize</Tag>
            <h1>Great! Now, please select all actions that you have already taken at LFCA</h1>
            <ActionsList onSelect={onSelect} actionsByTags={props.byTags} />
            <Drawer visible={drawerVisible} onClose={() => setDrawerVisible(false)}>
                <CompleteActionForm />
            </Drawer>
        </div>
    )
}

const Start = (props: any) => {
    const router = useRouter()
    return (
        <div>
            <Tag className='super-text'>Let's go!</Tag>
            <h1>You are all set! Find the next steps on your personal dashboard</h1>
            <p>
                The lfca platform is the place where we collect and share our community's knowledge. It's the place where we inspire you to realize the full climate action potential of your organization.
            </p>
            <Button type='primary' icon={<ArrowRightOutlined />} size='large' onClick={() => router.push('/')}>Continue</Button>
        </div>
    )
}

export const OnboardingOfficerSteps = (props: any) => [
    { title: 'Intro', description: 'Get to know the platform', component: <Intro {...props} /> },
    { title: 'Personalize', description: 'What’s your status quo', component: <Personalize {...props} /> },
    { title: 'Let’s go!', description: 'Get started', component: <Start {...props} /> }
]