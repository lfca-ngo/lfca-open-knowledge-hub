import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Card, Carousel, Skeleton } from 'antd'
import React from 'react'

import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { LAYOUT_BREAKPOINTS } from '../../utils'
import { ActionStatusTag } from '../ActionBar/ActionStatusTag'
import { getActionStatus } from '../ActionBar/StatusButton'
import { rootTreeMetaData } from '../ActionsList/utils'
import { EmptyState } from '../EmptyState'
import { scrollToId } from '../Layout/SectionWrapper'
import { LogoGroup } from '../LogoGroup'
import { ArrowWrapper } from './ArrowWrapper'
import styles from './styles.module.less'

export interface CompanyActionListItemFragmentWithRootCategory
  extends CompanyActionListItemFragment {
  rootCategory: string
}

interface ActionsCarouselProps {
  actions: CompanyActionListItemFragmentWithRootCategory[]
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
      breakpoint:
        LAYOUT_BREAKPOINTS.find((l) => l.name === 'sm')?.minWidth || 0,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
    {
      breakpoint:
        LAYOUT_BREAKPOINTS.find((l) => l.name === 'lg')?.minWidth || 0,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToScroll: 3,
        slidesToShow: 3,
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
      className={styles['actions-carousel']}
      dots={false}
      infinite={false}
      nextArrow={<ArrowWrapper icon={<ArrowRightOutlined />} />}
      prevArrow={<ArrowWrapper icon={<ArrowLeftOutlined />} />}
      responsive={responsiveConfig}
      slidesToScroll={3}
      slidesToShow={3}
    >
      {actions.map((action, i) => {
        const actionStatus = getActionStatus(action)
        const isRequired = !!action.requiredForCompanyAchievementIds.length
        const isRecommended =
          !!action.recommendedForCompanyAchievementIds.length

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
              <ActionStatusTag
                actionStatus={actionStatus}
                isRecommended={isRecommended}
                isRequired={isRequired}
              />
              <div className="action-card-content">
                <div className="action-card-title">{action.title}</div>
                <LogoGroup
                  data={action.recentCompaniesDoing}
                  label={`${action.companiesDoingCount} working on this`}
                  size={28}
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
