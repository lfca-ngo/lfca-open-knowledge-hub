require('./styles.less')

import {
  BankOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  MailOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Card, Popover, Rate, Tag } from 'antd'
import Image from 'next/image'

import {
  ServiceProviderFragment,
  TagFragment,
} from '../../../services/lfca-backend'
import { formatCurrency } from '../../../utils'

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
  const priceRange =
    provider.lowestPrice === provider.highestPrice
      ? formatCurrency(provider.lowestPrice)
      : `${formatCurrency(provider.lowestPrice)} - ${formatCurrency(
          provider.highestPrice
        )}`

  return (
    <Card bordered={false} className="provider-card">
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
            <TypeTags tags={provider?.model} />
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
            {provider.services?.map((service, i: number) => (
              <Tag className="service-tag" key={`service-${i}`}>
                {service?.name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div className="actions">
        <div className="reviews">
          <Popover
            content="Take this with a grain of salt because we only have a small number of reviews so far."
            overlayClassName="popover-sm"
            placement="top"
            visible={
              provider.reviewsCount && provider.reviewsCount < 3
                ? undefined
                : false
            }
          >
            <span>
              <Rate
                allowHalf
                className={provider.reviewsCount < 3 ? 'light' : undefined}
                disabled
                value={provider.averageRating ?? undefined}
              />
            </span>
          </Popover>
          <Button
            onClick={onOpenReviews ? () => onOpenReviews(provider) : undefined}
            size="small"
            type="link"
          >
            {provider.reviewsCount
              ? `See ${provider.reviewsCount > 1 ? 'all ' : ''}${
                  provider.reviewsCount
                } review${provider.reviewsCount > 1 ? 's' : ''}`
              : 'No reviews yet, add one'}
          </Button>

          <div className="ranges">
            {(provider.highestPrice || provider.lowestPrice) &&
            provider.reviewsCount > 2 ? (
              <Popover
                content="The price range (yearly) is based on experiences shared by
               other members. The value is not necessarily indicative of the
               actual price."
                overlayClassName="popover-sm"
                placement="bottom"
              >
                <Tag icon={<InfoCircleOutlined />}>{priceRange}</Tag>
              </Popover>
            ) : null}
          </div>
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
