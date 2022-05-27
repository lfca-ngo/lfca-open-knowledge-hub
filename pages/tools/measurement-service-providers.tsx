import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { ServiceProviderComparison } from '../../tools'
import { withAuth } from '../../utils/with-auth'

const MeasurementServiceProviders: NextPage = () => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Find the right partner" titleSize="big">
          <Container>
            <ServiceProviderComparison />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(MeasurementServiceProviders)
