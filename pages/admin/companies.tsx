
import type { NextPage } from 'next'

import { SiderLayout, Main, Section } from '../../components/Layout'
import { NAV } from './data'

const AdminCompanies: NextPage = (props: any) => {

    return (
        <SiderLayout nav={NAV}>
            <Main>
                <Section title='Users' titleSize='big'>
                    Something
                </Section>
            </Main>
        </SiderLayout>
    )
}


export default AdminCompanies
