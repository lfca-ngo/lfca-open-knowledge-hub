require('./styles.less')

import {
  BankOutlined,
  CalculatorOutlined,
  LikeOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Card, Tag, Rate } from 'antd'
import Image from 'next/image'
import { useMemo } from 'react'

const calculateProviderStats = (provider: any) => {
  // calculate cost range
  const ranges = provider.reviews?.reduce(
    (acc: any, review: any) => {
      // cost range
      if (review.pricing.cost <= acc.cost.from || acc.cost.from < 0) {
        acc.cost.from = review.pricing.cost
      }
      if (review.pricing.cost > acc.cost.to || acc.cost.from < 0) {
        acc.cost.to = review.pricing.cost
      }
      // companySize range
      if (
        review.pricing.companySize <= acc.companySize.from ||
        acc.companySize.from < 0
      ) {
        acc.companySize.from = review.pricing.companySize
      }
      if (
        review.pricing.companySize > acc.companySize.to ||
        acc.companySize.from < 0
      ) {
        acc.companySize.to = review.pricing.companySize
      }
      return acc
    },
    {
      companySize: {
        from: -1,
        to: -1,
      },
      cost: {
        from: -1,
        to: -1,
      },
    }
  )

  // calculate average review rating only once or when reviews change
  const ratings = provider?.reviews?.map(
    ({ rating }: { rating: number }) => rating
  )

  const avgRating =
    ratings?.reduce((acc: number, rating: number) => acc + rating, 0) /
    ratings?.length

  return {
    avgRating,
    ranges,
    total: ratings?.length || 0,
  }
}

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

const TypeTags = ({ tags }: { tags: any }) => {
  return tags?.map(({ name }: { name: string }) => (
    <Tag className="type-tag" icon={MAP_ICONS(name)} key={name}>
      {name}
    </Tag>
  ))
}

export const ProviderCard = ({
  onClick,
  provider,
}: {
  provider: any
  onClick?: any
}) => {
  const stats = useMemo(() => calculateProviderStats(provider), [provider])

  console.log(stats)
  return (
    <Card bordered={false} className="provider-card" onClick={onClick}>
      <div className="hero">
        <div className="wrapper">
          {provider.logo && (
            <Image layout="fill" objectFit="contain" src={provider.logo?.url} />
          )}
        </div>
      </div>
      <div className="content">
        <div className="content-wrapper">
          <div className="title-wrapper">
            <div className="title">{provider.name}</div>
            <TypeTags tags={provider?.model} />
          </div>
          <div className="description">
            {documentToReactComponents(provider.description)}
          </div>
          <div className="tags">
            <Tag color="magenta" icon={<BankOutlined />}>
              {provider?.size}
            </Tag>
            <Tag color="blue" icon={<LikeOutlined />}>
              {provider?.year}
            </Tag>
          </div>
          <div className="services">
            {provider?.services?.map((service: any, i: any) => (
              <Tag className="service-tag" key={`service-${i}`}>
                {service?.name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div className="actions">
        <div className="reviews">
          <Rate value={stats.avgRating} />
          <Button
            size="small"
            type="link"
          >{`See all ${stats.total} reviews`}</Button>

          <div className="ranges">
            <Tag>{stats.ranges?.cost?.from} €</Tag> -{' '}
            <Tag>{stats.ranges?.cost?.to} €</Tag>
          </div>
        </div>
        <Button icon={<LinkOutlined />} type="primary">
          View
        </Button>
      </div>
    </Card>
  )
}
