import { Spin, Tabs } from 'antd'
import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { PayWall } from '../../components/PayWall'
import { useServiceProviderListsQuery } from '../../services/lfca-backend'
import { ServiceProviderComparison } from '../../tools/ServiceProviderComparison'
import { withAuth } from '../../utils/with-auth'

const { TabPane } = Tabs

const ServiceProviders: NextPage = () => {
  const [{ data, fetching }] = useServiceProviderListsQuery()

  return (
    <SiderLayout>
      <Main>
        <Section title="Find the right tool" titleSize="big">
          <Container>
            <PayWall>
              {fetching ? (
                <Spin />
              ) : (
                <Tabs defaultActiveKey="0">
                  {data?.serviceProviderLists.map((serviceProviderList, i) => (
                    <TabPane key={i.toString()} tab={serviceProviderList.title}>
                      <ServiceProviderComparison
                        loading={false}
                        serviceProviderList={serviceProviderList}
                      />
                    </TabPane>
                  ))}
                </Tabs>
              )}
            </PayWall>
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(ServiceProviders)
