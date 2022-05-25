import { BulbOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'

import { EmptyState } from '../components/EmptyState'
import { Section } from '../components/Layout'
import { PersonalCarbonCalculator } from './PersonalCarbonCalculator'
import { ServiceProviderComparison } from './ServiceProviderComparison'

export { PersonalCarbonCalculator, ServiceProviderComparison }

import { MEASUREMENT_SERVICES_COMPARISON } from '../utils'

export const renderTools = (
  sections: any,
  props: any,
  showEmptyState?: boolean
) => {
  const renderTool = (section: any) => {
    switch (section.componentId) {
      case MEASUREMENT_SERVICES_COMPARISON:
        return (
          <Section
            className={section?.className}
            key={section?.componentId}
            {...section}
          >
            <ServiceProviderComparison providers={props?.serviceProviders} />
          </Section>
        )
      default:
        return null
    }
  }

  return (
    sections?.map(renderTool) ||
    (showEmptyState ? (
      <EmptyState
        actions={[
          <a href={`mailto:info@lfca.earth`} key="share">
            <Button size="large" type="primary">
              Share idea
            </Button>
          </a>,
        ]}
        bordered
        icon={<BulbOutlined />}
        text={
          <div>
            We are gradually adding more and more community powered content to
            the platform. You can check the{' '}
            <Link href={`/action/companyPledge`}>Measurement Action</Link> as an
            example. If you have relevant content ideas for this module, please
            share them with us!
          </div>
        }
        title="There is more to come..."
      />
    ) : null)
  )
}
