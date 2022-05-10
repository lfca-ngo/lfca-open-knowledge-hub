import { Layout, Steps } from 'antd'
import React from 'react'
import LogoDark from '../../public/logos/logo-dark-sm.svg'
require('./styles.less')

const { Content } = Layout
const { Step } = Steps

export const StepsLayout = ({ children, currentStep = 0, setStep, steps }: { children: any, currentStep?: any, setStep?: any, steps?: any }) => {

    return (
        <Layout className="steps-layout" style={{ minHeight: '100vh' }}>
            <Content>
                <div className='steps-layout-wrapper'>
                    <div className="logo">
                        <LogoDark />
                    </div>
                    <Steps direction="vertical" current={currentStep}>
                        {steps?.map((step: any, i: any) => (
                            <Step key={`step-${i}`} title={step.title} description={step.description} onClick={() => setStep(i)} />
                        ))}
                    </Steps>
                </div>
                <div className="content-layout-wrapper">
                    <header>
                        Exit
                    </header>
                    <main>
                        {children}
                    </main>
                    <footer>
                        {`lfca.earth © ${new Date().getFullYear()}`}
                    </footer>
                </div>
            </Content>
        </Layout>
    )
}
