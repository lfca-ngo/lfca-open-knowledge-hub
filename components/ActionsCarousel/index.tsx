require('./styles.less')

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  StarFilled,
} from '@ant-design/icons'
import { Card, Carousel, Tag } from 'antd'
import React from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { SM_BREAKPOINT } from '../../utils'
import { LogoGroup } from '../LogoGroup'
import { ArrowWrapper } from './ArrowWrapper'

interface ActionsCarouselProps {
  actions: CompanyActionListItemFragment[]
  fetching?: boolean
  onSelect: (action: CompanyActionListItemFragment) => void
}

export const ActionsCarousel = ({
  actions,
  fetching,
  onSelect,
}: ActionsCarouselProps) => {
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
      arrows={true}
      className="actions-carousel"
      dots={false}
      infinite={false}
      nextArrow={<ArrowWrapper icon={<ArrowRightOutlined />} />}
      prevArrow={<ArrowWrapper icon={<ArrowLeftOutlined />} />}
      responsive={responsiveConfig}
      slidesToScroll={3}
      slidesToShow={3}
    >
      {actions.map((action, i) => {
        return (
          <Card
            bordered={false}
            key={`action-${i}`}
            onClick={() => onSelect(action)}
          >
            <Tag icon={<StarFilled />}>
              {action.requiredForCompanyAchievementIds.length
                ? 'Required'
                : 'Recommended'}
            </Tag>
            <div className="action-card-content">
              <div className="action-card-title">{action.title}</div>
              <LogoGroup
                data={action.recentCompaniesCompleted}
                label={'doing this'}
                size="small"
              />
            </div>
          </Card>
        )
      })}
    </Carousel>
  )
}
