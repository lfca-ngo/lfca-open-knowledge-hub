import { Layout, Steps, Button, Popconfirm } from 'antd'
import React from 'react'
import LogoDark from '../../../public/logos/logo-dark-sm.svg'
import { CloseOutlined } from '@ant-design/icons'
require('./styles.less')

const { Content } = Layout
const { Step } = Steps

export const StepsLayout = ({ children, currentStep = 0, setStep, steps, canClose, onClose }: { children: any, canClose: Boolean, onClose: any, currentStep?: any, setStep?: any, steps?: any }) => {

    return (
        <Layout className="steps-layout" style={{ minHeight: '100vh' }}>
            <Content>
                <div className='steps-layout-wrapper'>
                    <div className="logo">
                        <LogoDark />
                    </div>
                    <Steps direction="vertical" current={currentStep}>
                        {steps?.map((step: any, i: any) => (
                            <Step key={`step-${i}`} title={step.title} description={step.description} />
                        ))}
                    </Steps>
                </div>
                <div className="content-layout-wrapper">
                    <header>
                        {canClose && <Popconfirm placement='left' onConfirm={onClose} title="Are you sure?">
                            <Button type='link' icon={<CloseOutlined />} />
                        </Popconfirm>}
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
