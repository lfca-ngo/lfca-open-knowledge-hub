import type { GetStaticProps, NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import {
  ContentfulServiceProviderFields,
  fetchAllServiceProviders,
} from '../../services/contentful'
import { ServiceProviderComparison } from '../../tools'
import { withAuth } from '../../utils/with-auth'

interface MeasurementServiceProvidersProps {
  serviceProviders: ContentfulServiceProviderFields[]
}

const MeasurementServiceProviders: NextPage<
  MeasurementServiceProvidersProps
> = ({ serviceProviders }) => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Find the right partner" titleSize="big">
          <Container>
            <ServiceProviderComparison providers={serviceProviders} />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const serviceProviders = await fetchAllServiceProviders()

  return {
    props: {
      serviceProviders,
    },
  }
}

export default withAuth(MeasurementServiceProviders)
