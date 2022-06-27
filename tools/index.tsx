import { BulbOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'

import { EmptyState } from '../components/EmptyState'
import { Section } from '../components/Layout'
import { DEFAULT_SUPPORT_EMAIL } from '../utils'
import { PersonalCarbonCalculator } from './PersonalCarbonCalculator'
import { ServiceProviderComparison } from './ServiceProviderComparison'

export { PersonalCarbonCalculator, ServiceProviderComparison }

import { MEASUREMENT_SERVICES_COMPARISON } from '../utils'

interface Section {
  className?: string
  componentId?: string
}

export const renderTools = (sections: Section[], showEmptyState?: boolean) => {
  const renderTool = (section: Section) => {
    switch (section.componentId) {
      case MEASUREMENT_SERVICES_COMPARISON:
        return (
          <Section
            className={section?.className}
            key={section?.componentId}
            {...section}
          >
            <ServiceProviderComparison />
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
          <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`} key="share">
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
