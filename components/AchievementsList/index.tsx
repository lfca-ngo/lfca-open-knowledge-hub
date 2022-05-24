require('./styles.less')

import { Drawer, List, message, Skeleton } from 'antd'
import { useState } from 'react'

import {
  CompanyAchievementFragment,
  CompanyAchievementMiniFragment,
  CompanyFragment,
  UpdateCompanyInput,
  useCompanyQuery,
  useUpdateCompanyMutation,
} from '../../services/lfca-backend'
import { AchievementCard, AchievementCardMini } from '../AchievementCard'
import { CompanyForm } from '../CompanyForm'

interface AchievementsListProps {
  achievements: CompanyAchievementFragment[]
  fetching?: boolean
}

export const AchievementsList = ({
  achievements,
  fetching,
}: AchievementsListProps) => {
  // Local state
  const [activeAchievement, setActiveAchievement] =
    useState<CompanyAchievementFragment>()
  const [drawerVisible, setDrawerVisible] = useState(false)

  // Mutations
  const [{ fetching: isUpdatingCompany }, updateCompany] =
    useUpdateCompanyMutation()
  const [{ data, fetching: fetchingCompany }] = useCompanyQuery()
  const company = data?.company

  // Actions
  const handleEditAttributes = (achievement: CompanyAchievementFragment) => {
    console.log(achievement.editableCompanyProperties)
    setActiveAchievement(achievement)
    setDrawerVisible(true)
  }

  const handleUpdate = (allValues: UpdateCompanyInput) => {
    updateCompany({
      input: {
        ...allValues,
      },
    }).then(({ error }) => {
      if (error) message.error(error.message)
      else message.success('Profile updated')
    })
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
            <Skeleton active avatar loading={fetching} paragraph={{ rows: 3 }}>
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
        <CompanyForm
          filterByKeys={
            activeAchievement?.editableCompanyProperties as (keyof CompanyFragment)[]
          }
          initialValues={company}
          isLoading={fetchingCompany || isUpdatingCompany}
          onUpdate={handleUpdate}
        />
      </Drawer>
    </div>
  )
}

interface AchievementsListMiniProps {
  achievements: CompanyAchievementMiniFragment[]
  fetching?: boolean
}

export const AchievementsListMini = ({
  achievements,
  fetching,
}: AchievementsListMiniProps) => {
  return (
    <List
      className="achievements-list-mini"
      dataSource={achievements}
      renderItem={(item) => (
        <List.Item>
          <Skeleton active avatar loading={fetching} paragraph={{ rows: 1 }}>
            <AchievementCardMini achievement={item} />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}
