import {
  BankOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CheckOutlined,
  LinkOutlined,
  MailOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Card, Popover, Tag } from 'antd'
import Image from 'next/image'

import { PaywallPopover } from '../../../components/PayWall/PaywallPopover'
import {
  ServiceProviderFragment,
  TagFragment,
} from '../../../services/lfca-backend'
import { ReviewMetaData } from './ReviewMetaData'
import styles from './styles.module.less'

const MAP_ICONS = (name: string) => {
  switch (name) {
    case 'Consulting':
      return <CalculatorOutlined />
    case 'Software':
      return <BankOutlined />
    default:
      return null
  }
}

const TypeTags = ({ tags }: { tags?: TagFragment[] }) => {
  return (
    <div className="type-tags">
      {tags?.map(({ id, name }) =>
        name ? (
          <Tag className="type-tag" icon={MAP_ICONS(name)} key={id}>
            {name}
          </Tag>
        ) : null
      )}
    </div>
  )
}

interface ProviderCardProps {
  provider: ServiceProviderFragment
  onOpenReviews?: (provider: ServiceProviderFragment) => void
  onOpenWebsite?: (provider: ServiceProviderFragment) => void
}

export const ProviderCard = ({
  onOpenReviews,
  onOpenWebsite,
  provider,
}: ProviderCardProps) => {
  return (
    <Card bordered={false} className={styles['provider-card']}>
      <div className="hero">
        <div className="wrapper">
          {provider.logo?.url && (
            <Image
              alt={provider.name || ''}
              layout="fill"
              objectFit="contain"
              src={provider.logo.url}
            />
          )}
        </div>
      </div>
      <div className="content">
        <div className="content-wrapper">
          <div className="title-wrapper">
            <div className="title">{provider.name}</div>
            {/** TODO: Find more elegant way instead of filtering for hardcoded categoryId */}
            <TypeTags
              tags={provider?.tags.filter((t) => t.categoryId === 'model')}
            />
            {provider?.memberId && provider?.email && (
              <Popover
                content={
                  <a
                    href={`mailto:${provider.email}?subject=Intro ${provider.name}&body=Hi, we are both part of the lfca community and I found you in their overview of service providers. Would love to learn more about...`}
                  >
                    <Button icon={<MailOutlined />}>Get Intro</Button>
                  </a>
                }
              >
                <Tag className="member-tag" icon={<StarOutlined />}>
                  Community Member
                </Tag>
              </Popover>
            )}
          </div>
          <div className="description">
            {documentToReactComponents(provider.description)}
          </div>
          <div className="tags">
            <Popover
              content="Company size (employees)."
              overlayClassName="popover-sm"
              placement="bottom"
            >
              <Tag color="magenta" icon={<BankOutlined />}>
                {provider?.size}
              </Tag>
            </Popover>
            <Popover
              content="Year the company was founded."
              overlayClassName="popover-sm"
              placement="bottom"
            >
              <Tag color="blue" icon={<CalendarOutlined />}>
                {provider?.year}
              </Tag>
            </Popover>
            {provider?.freeDemo && (
              <Tag color="green" icon={<CheckOutlined />}>
                Free Demo
              </Tag>
            )}
          </div>
          <div className="services">
            {provider.tags
              ?.filter((t) => t.categoryId === 'services')
              .map((service, i: number) => (
                <Tag className="service-tag" key={`service-${i}`}>
                  {service?.name}
                </Tag>
              ))}
          </div>
        </div>
      </div>
      <div className="actions">
        <div className="reviews">
          <PaywallPopover>
            <ReviewMetaData onOpenReviews={onOpenReviews} provider={provider} />
          </PaywallPopover>
        </div>
        <Button
          icon={<LinkOutlined />}
          onClick={() => onOpenWebsite?.(provider)}
          type="primary"
        >
          View
        </Button>
      </div>
    </Card>
  )
}
