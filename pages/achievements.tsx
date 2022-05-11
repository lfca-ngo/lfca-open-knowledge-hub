
import type { NextPage } from 'next'

import { SiderLayout, Main, Section } from '../components/Layout'

const Achievements: NextPage = (props: any) => {
    return (
        <SiderLayout>
            <Main>
                <Section title='Achievements' titleSize='big'>
                    Hello
                </Section>
            </Main>
        </SiderLayout>
    )
}

export default Achievements
