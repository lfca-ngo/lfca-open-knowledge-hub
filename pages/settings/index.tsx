
import type { NextPage } from 'next'

import { SiderLayout, Main, Section } from '../../components/Layout'
import { NAV } from './data'

const Settings: NextPage = (props: any) => {
    return (
        <SiderLayout nav={NAV}>
            <Main>
                <Section title='Settings' titleSize='big'>
                    Hello
                </Section>
            </Main>
        </SiderLayout>
    )
}

export default Settings
