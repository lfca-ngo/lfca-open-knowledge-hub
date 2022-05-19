require('./styles.less')

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HeartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Card, Carousel, Skeleton, Tag } from 'antd'
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
        const isRequired = action.requiredForCompanyAchievementIds.length
        return (
          <Skeleton
            active
            key={`action-${i}`}
            loading={fetching}
            paragraph={false}
            title={{ width: '100%' }}
          >
            <Card bordered={false} onClick={() => onSelect(action)}>
              {isRequired ? (
                <Tag icon={<StarOutlined />}>Required</Tag>
              ) : (
                <Tag icon={<HeartOutlined />}>Recommended</Tag>
              )}

              <div className="action-card-content">
                <div className="action-card-title">{action.title}</div>
                <LogoGroup
                  data={action.recentCompaniesCompleted}
                  label={'doing this'}
                  size="small"
                />
              </div>
            </Card>
          </Skeleton>
        )
      })}
    </Carousel>
  )
}
