
import type { NextPage } from 'next'

import { SiderLayout, Main, Section } from '../../components/Layout'
import { NAV } from './data'

const CompanySettings: NextPage = (props: any) => {
    return (
        <SiderLayout nav={NAV}>
            <Main>
                <Section title='Company' titleSize='big'>
                    Hello
                </Section>
            </Main>
        </SiderLayout>
    )
}

export default CompanySettings
