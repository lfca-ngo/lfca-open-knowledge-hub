
import type { NextPage } from 'next'

import { SiderLayout, Main, Section } from '../../components/Layout'
import { NAV } from '.'

const PlannedActions: NextPage = (props: any) => {
    return (
        <SiderLayout nav={NAV}>
            <Main>
                <Section title='Planned Actions' titleSize='big'>
                    Planned Actions
                </Section>
            </Main>
        </SiderLayout>
    )
}

export default PlannedActions
