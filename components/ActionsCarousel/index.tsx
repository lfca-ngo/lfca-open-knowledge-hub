require('./styles.less')

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Card, Carousel, Tag } from 'antd'
import React from 'react'

import { SM_BREAKPOINT } from '../../utils'
import { LogoGroup } from '../LogoGroup'

export const FAKE_LOGOS = [
  { logoUrl: 'https://via.placeholder.com/150' },
  { logoUrl: 'https://via.placeholder.com/150' },
  { logoUrl: 'https://via.placeholder.com/150' },
  { logoUrl: 'https://via.placeholder.com/150' },
]

export const ActionsCarousel = ({
  actions,
  onSelect,
}: {
  actions: any
  onSelect?: any
}) => {
  const responsiveConfig = [
    {
      breakpoint: SM_BREAKPOINT,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
  ]

  return (
    <Carousel
      className="actions-carousel"
      dots={false}
      nextArrow={<ArrowRightOutlined />}
      prevArrow={<ArrowLeftOutlined />}
      responsive={responsiveConfig}
      slidesToScroll={3}
      slidesToShow={3}
    >
      {actions.map((action: any, i: any) => {
        return (
          <Card hoverable key={`action-${i}`} onClick={onSelect}  >
            <Tag>Required</Tag>
            <div className="action-card-content">
              <div className="action-card-title">{action.title}</div>
              <LogoGroup data={FAKE_LOGOS} label={'doing this'} size="small" />
            </div>
          </Card>
        )
      })}
    </Carousel>
  )
}
