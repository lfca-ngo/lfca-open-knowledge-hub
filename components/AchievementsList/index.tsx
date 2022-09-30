require('./styles.less')

import { Drawer, List, Skeleton } from 'antd'
import { useState } from 'react'

import {
  CompanyAchievementFragment,
  EMPTY_ACHIEVEMENTS,
  useCompanyAchievementsMiniQuery,
  useCompanyAchievementsQuery,
  useCompanyQuery,
} from '../../services/lfca-backend'
import { AchievementCard, AchievementCardMini } from '../AchievementCard'
import { CompanyForm, FormValues } from '../CompanyForm'
import { Section } from '../Layout/Sections'
import { MicrositeBadges } from '../MicrositeBadges'

export const AchievementsList = ({
  isParentLoading,
}: {
  isParentLoading?: boolean
}) => {
  // Queries
  const [{ data: achievementsData, fetching }] = useCompanyAchievementsQuery()
  const achievements =
    achievementsData?.company?.program.achievements || EMPTY_ACHIEVEMENTS

  // Local state
  const [activeAchievement, setActiveAchievement] =
    useState<CompanyAchievementFragment>()
  const [drawerVisible, setDrawerVisible] = useState(false)

  const [{ data, fetching: fetchingCompany }] = useCompanyQuery()
  const company = data?.company

  // Actions
  const handleEditAttributes = (achievement: CompanyAchievementFragment) => {
    setActiveAchievement(achievement)
    setDrawerVisible(true)
  }

  return (
    <div>
      <List
        className="achievements-list equal-height"
        dataSource={achievements}
        grid={{
          gutter: 16,
          lg: 3,
          md: 3,
          sm: 2,
          xl: 3,
          xs: 1,
          xxl: 3,
        }}
        renderItem={(item) => (
          <List.Item>
            <Skeleton
              active
              avatar
              loading={fetching || isParentLoading}
              paragraph={{ rows: 3 }}
            >
              <AchievementCard
                achievement={item}
                onClickEdit={handleEditAttributes}
              />
            </Skeleton>
          </List.Item>
        )}
      />

      <Drawer
        className="drawer-md"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <Section title="Edit Microsite">
          <CompanyForm
            filterByKeys={
              activeAchievement?.editableCompanyProperties as (keyof FormValues)[]
            }
            initialValues={company}
            isLoadingInitialValues={fetchingCompany}
            type="update"
          />
        </Section>

        {/* For the green pledge, show also the microsite badges */}
        {activeAchievement?.contentId === 'hasBadgeQualification' && (
          <Section title="Add badge">
            <MicrositeBadges micrositeSlug={company?.micrositeSlug} />
          </Section>
        )}
      </Drawer>
    </div>
  )
}

export const AchievementsListMini = ({
  isParentLoading,
}: {
  isParentLoading?: boolean
}) => {
  const [{ data: companyAchievementsData, fetching }] =
    useCompanyAchievementsMiniQuery()

  const achievements =
    companyAchievementsData?.company?.program.achievements || EMPTY_ACHIEVEMENTS

  return (
    <List
      className="achievements-list-mini"
      dataSource={achievements}
      renderItem={(item) => (
        <List.Item>
          <Skeleton
            active
            avatar
            loading={fetching || isParentLoading}
            paragraph={{ rows: 1 }}
          >
            <AchievementCardMini achievement={item} />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}
