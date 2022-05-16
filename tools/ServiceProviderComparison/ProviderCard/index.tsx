require('./styles.less')

import {
  BankOutlined,
  CalculatorOutlined,
  LikeOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Card, Rate, Tag } from 'antd'
import Image from 'next/image'
import { useMemo } from 'react'

import { ContentfulTagFields } from '../../../services/contentful'
import { ServiceProvider } from '..'
import { calculateProviderStats } from '../utils'

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

const TypeTags = ({ tags }: { tags?: ContentfulTagFields[] }) => {
  return (
    <div className="type-tags">
      {tags?.map(({ name }) => (
        <Tag className="type-tag" icon={MAP_ICONS(name)} key={name}>
          {name}
        </Tag>
      ))}
    </div>
  )
}

interface ProviderCardProps {
  provider: ServiceProvider
  onOpenReviews?: (provider: ServiceProvider) => void
  onOpenWebsite?: () => void
}

export const ProviderCard = ({
  onOpenReviews,
  onOpenWebsite,
  provider,
}: ProviderCardProps) => {
  const stats = useMemo(() => calculateProviderStats(provider), [provider])

  return (
    <Card bordered={false} className="provider-card">
      <div className="hero">
        <div className="wrapper">
          {provider.logo && (
            <Image
              alt={provider.name || ''}
              layout="fill"
              objectFit="contain"
              src={provider.logo?.url}
            />
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
          <Rate value={stats.avgRating} />
          <Button
            onClick={onOpenReviews ? () => onOpenReviews(provider) : undefined}
            size="small"
            type="link"
          >{`See all ${stats.total} reviews`}</Button>

          <div className="ranges">
            <Tag>{stats.ranges?.cost?.from} €</Tag> -{' '}
            <Tag>{stats.ranges?.cost?.to} €</Tag>
          </div>
        </div>
        <Button icon={<LinkOutlined />} onClick={onOpenWebsite} type="primary">
          View
        </Button>
      </div>
    </Card>
  )
}
