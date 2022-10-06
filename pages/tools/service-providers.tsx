import { Skeleton, Tabs } from 'antd'
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
        <Section title="Compare climate tools" titleSize="big">
          <Container>
            <PayWall>
              <>
                {fetching ? (
                  <Skeleton
                    active
                    className={'service-providers-skeleton'}
                    paragraph={{ rows: 10 }}
                  />
                ) : (
                  <Tabs defaultActiveKey="0">
                    {data?.serviceProviderLists.map(
                      (serviceProviderList, i) => (
                        <TabPane
                          key={i.toString()}
                          tab={serviceProviderList.title}
                        >
                          <ServiceProviderComparison
                            serviceProviderList={serviceProviderList}
                          />
                        </TabPane>
                      )
                    )}
                  </Tabs>
                )}
              </>
            </PayWall>
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(ServiceProviders)
