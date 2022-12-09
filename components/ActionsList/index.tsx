import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, List, Row, Space } from 'antd'
import React, { useMemo } from 'react'

import { usePersistentNavigation } from '../../hooks/usePersistentNavigation'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { lowerCaseSearch } from '../../utils'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'
import { ActionCardSkeleton } from '../ActionCard/ActionCardSkeleton'
import { FilterBar, FilterFormItems } from './FilterBar'
import styles from './styles.module.less'

export const LS_ACTION_LIST = 'actions_list'

export interface ActionListProps {
  actions: CompanyActionListItemFragment[]
  actionListItemProps?: Omit<ActionCardProps, 'action'>
  fetching?: boolean
  mode?: 'default' | 'compact'
  pageSize?: number
}

export const ActionsList = ({
  actionListItemProps,
  actions,
  fetching,
  mode,
  pageSize = 10,
}: ActionListProps) => {
  const { persistentNavigation, resetPosition, savePosition } =
    usePersistentNavigation(true)

  // the currentPage is needed for the list component,
  // the rest for the filter form component
  const { ...formOptions } = persistentNavigation
  const currentPage = persistentNavigation?.currentPage
  const [form] = Form.useForm()

  const handleChange = (
    latestChange: FilterFormItems,
    allValues: FilterFormItems
  ) => {
    savePosition({ ...persistentNavigation, ...allValues })
    // when searching, clear out all other filters
    if (latestChange?.search) {
      resetPosition()
      savePosition({ ...persistentNavigation, search: latestChange.search })
    } else {
      // for other operations, keep the state
      savePosition({ ...persistentNavigation, ...allValues })
    }
  }

  const filteredActions = useMemo(() => {
    const activeCategories = formOptions?.categories || []
    const activeSearch = formOptions?.search || ''
    const activeSorting = formOptions?.sorting

    return (
      actions
        // the below applies the search and category filter
        .filter((action) => {
          const actionCategories = action.categories.map((c) => c.id)
          const intersectingCategories = actionCategories.filter((value) =>
            activeCategories.includes(value)
          )

          const matchesCategory = intersectingCategories.length > 0
          const matchesSearch = lowerCaseSearch(
            activeSearch,
            action.title || ''
          )
          return matchesSearch && matchesCategory
        })
        // the below applies the sorting filter
        .sort((a, b) => {
          if (activeSorting === 'impact') {
            return b.impactValue - a.impactValue
          } else {
            return b?.companiesDoingCount - a?.companiesDoingCount
          }
        })
    )
  }, [actions, formOptions])

  return (
    <div className={styles['actions-list']}>
      <Row>
        <Col
          style={{ alignItems: 'center', display: 'flex', width: '100%' }}
          xs={24}
        >
          <h2 style={{ margin: '0' }}>Browse all actions</h2>
          <Button
            icon={<PlusOutlined />}
            style={{ marginLeft: 'auto', marginRight: '0' }}
            type="primary"
          >
            Create
          </Button>
        </Col>
      </Row>
      <Divider style={{ marginBottom: '30px' }} />
      <Row gutter={40}>
        <Col lg={6} xs={24}>
          <FilterBar
            form={form}
            initialValues={formOptions}
            mode={mode}
            onValuesChange={handleChange}
          />
        </Col>
        <Col lg={18} xs={24}>
          <List
            className="no-padding"
            dataSource={filteredActions}
            pagination={{
              current: currentPage,
              defaultCurrent: currentPage,
              onChange: (page) =>
                persistentNavigation &&
                savePosition({
                  ...persistentNavigation,
                  currentPage: page,
                  scrollPosition: window.scrollY,
                }),
              pageSize: pageSize,
            }}
            renderItem={(item) => {
              return (
                <List.Item>
                  <ActionCardSkeleton fetching={fetching}>
                    <ActionCardWrapper
                      action={item}
                      onSavePosition={() => {
                        persistentNavigation &&
                          savePosition({
                            ...persistentNavigation,
                            scrollPosition: window.scrollY,
                          })
                      }}
                      {...actionListItemProps}
                    />
                  </ActionCardSkeleton>
                </List.Item>
              )
            }}
          />
        </Col>
      </Row>
    </div>
  )
}
