require('./styles.less')

import {
  BankOutlined,
  CalculatorOutlined,
  LikeOutlined,
  LinkOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Button, Card, Tag } from 'antd'
import Image from 'next/image'

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
  console.log(provider)
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
        <Button icon={<LinkOutlined />} type="primary">
          View
        </Button>
      </div>
    </Card>
  )
}
