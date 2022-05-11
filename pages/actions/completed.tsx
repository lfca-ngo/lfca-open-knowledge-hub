
import type { NextPage } from 'next'

import { SiderLayout, Main, Section } from '../../components/Layout'
import { NAV } from '.'

const CompletedActions: NextPage = (props: any) => {
    return (
        <SiderLayout nav={NAV}>
            <Main>
                <Section title='Completed Actions' titleSize='big'>
                    Completed Actions
                </Section>
            </Main>
        </SiderLayout>
    )
}

export default CompletedActions
