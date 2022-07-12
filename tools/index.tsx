import { BulbOutlined } from '@ant-design/icons'
import {
  InfoCircleOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import Link from 'next/link'

import { EmptyState } from '../components/EmptyState'
import { Section } from '../components/Layout'
import { PayWall } from '../components/PayWall'
import { DEFAULT_SUPPORT_EMAIL } from '../utils'
import { PersonalCarbonCalculator } from './PersonalCarbonCalculator'
import { ServiceProviderComparison } from './ServiceProviderComparison'

export { PersonalCarbonCalculator, ServiceProviderComparison }

import { MEASUREMENT_SERVICES_COMPARISON } from '../utils'
import { SETTINGS_PLAN } from '../utils/routes'

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
            <PayWall
              primer={
                <EmptyState
                  actions={[
                    <Link href={SETTINGS_PLAN} key="upgrade" passHref>
                      <Button icon={<ThunderboltOutlined />} type="primary">
                        Upgrade
                      </Button>
                    </Link>,
                    <Popover
                      content="Space for a mini video/gif showcasing the benefit and option to learn more"
                      key="info"
                      overlayClassName="popover-lg"
                      placement="top"
                      title="Something"
                    >
                      <Button icon={<InfoCircleOutlined />} />
                    </Popover>,
                  ]}
                  alignment="center"
                  bordered={false}
                  icon={<LockOutlined />}
                  size="large"
                  text="You can upgrade your plan anytime and share your climate journey on a custom microsite!"
                  title="Locked"
                  withBackground
                />
              }
            >
              <ServiceProviderComparison />
            </PayWall>
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
