
import type { NextPage } from 'next'

import { SiderLayout, Main, Section } from '../../components/Layout'
import { NAV } from './data'

const Invite: NextPage = (props: any) => {
    return (
        <SiderLayout nav={NAV}>
            <Main>
                <Section title='Invite' titleSize='big'>
                    Hello
                </Section>
            </Main>
        </SiderLayout>
    )
}

export default Invite
