require('./styles.less')

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  HeartOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Button, Card, Carousel, Skeleton, Tag } from 'antd'
import React from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { LG_BREAKPOINT, scrollToId, SM_BREAKPOINT } from '../../utils'
import { rootTreeMetaData } from '../ActionsList/utils'
import { EmptyState } from '../EmptyState'
import { LogoGroup } from '../LogoGroup'
import { ArrowWrapper } from './ArrowWrapper'

export interface CompanyActionListItemFragmentWithRootCategory
  extends CompanyActionListItemFragment {
  rootCategory: string
}

interface ActionsCarouselProps {
  actions: CompanyActionListItemFragmentWithRootCategory[]
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

  if (actions.length === 0)
    return (
      <EmptyState
        actions={[
          <Button
            icon={<SearchOutlined />}
            key="explore"
            onClick={() => scrollToId('browse-actions')}
            type="primary"
          >
            Explore actions
          </Button>,
        ]}
        text="Expired, recommended and planned actions will automatically appear here. Browse our collection and plan an action to get started."
        title="You're all caught up"
        withBackground
      />
    )

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
            <Card
              bordered={false}
              className={
                rootTreeMetaData[action.rootCategory]?.color || 'black'
              }
              onClick={() => onSelect(action)}
            >
              <ActionStatusTag action={action} />
              <div className="action-card-content">
                <div className="action-card-title">{action.title}</div>
                <LogoGroup
                  data={action.recentCompaniesDoing}
                  label={`${action.companiesDoingCount} working on this`}
                  size="small"
                />
              </div>
            </Card>
          </Skeleton>
        )
      })}
      <Card
        bordered={false}
        className="placeholder"
        onClick={() => scrollToId('browse-actions')}
      >
        <div className="wrapper">
          <PlusCircleOutlined />
          Plan more actions
        </div>
      </Card>
    </Carousel>
  )
}
