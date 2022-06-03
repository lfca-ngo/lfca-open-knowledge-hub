require('./styles.less')

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  HeartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Card, Carousel, Skeleton, Tag } from 'antd'
import React from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { LG_BREAKPOINT, SM_BREAKPOINT } from '../../utils'
import { LogoGroup } from '../LogoGroup'
import { ArrowWrapper } from './ArrowWrapper'

interface ActionsCarouselProps {
  actions: CompanyActionListItemFragment[]
  fetching?: boolean
  onSelect: (action: CompanyActionListItemFragment) => void
}

export const ActionStatusTag = ({
  action,
}: {
  action: CompanyActionListItemFragment
}) => {
  const isPlanned = !!action?.plannedAt
  const isRequired = !!action.requiredForCompanyAchievementIds.length
  const isRecommended = !!action.recommendedForCompanyAchievementIds.length

  if (isPlanned) return <Tag icon={<CalendarOutlined />}>Planned</Tag>
  if (isRequired) return <Tag icon={<StarOutlined />}>Required</Tag>
  if (isRecommended) return <Tag icon={<HeartOutlined />}>Recommended</Tag>
  else return null
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
    {
      breakpoint: LG_BREAKPOINT,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 2,
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
          <Skeleton
            active
            key={`action-${i}`}
            loading={fetching}
            paragraph={false}
            title={{ width: '100%' }}
          >
            <Card bordered={false} onClick={() => onSelect(action)}>
              <ActionStatusTag action={action} />
              <div className="action-card-content">
                <div className="action-card-title">{action.title}</div>
                <LogoGroup
                  data={action.recentCompaniesCompleted}
                  label={`${action.companiesCompletedCount} did this`}
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
