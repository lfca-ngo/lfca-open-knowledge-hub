require('./styles.less')

import { Divider, Form, List } from 'antd'
import React, { useMemo } from 'react'

import { useScrollPosition } from '../../hooks/useScrollPosition'
import { ContentfulCategoryTreeFields } from '../../services/contentful'
import { ALL_ACTIONS_LABEL } from '../../services/lfca-backend'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { lowerCaseSearch } from '../../utils'
import { ActionCardProps, ActionCardWrapper } from '../ActionCard'
import { ActionCardSkeleton } from '../ActionCard/ActionCardSkeleton'
import { FilterBar, SORT_OPTIONS } from './FilterBar'
import { FilterFormItems } from './FilterBar'
import { CategoryTree } from './CategoryTree'

export const LS_ACTION_LIST = 'actions_list'

export const INITIAL_VALUES = {
  categories: [ALL_ACTIONS_LABEL],
  currentPage: 1,
  search: '',
  sorting: SORT_OPTIONS[0].key,
}

export interface ActionListProps {
  actionsByCategories: Record<string, CompanyActionListItemFragment[]>
  actionListItemProps?: Omit<ActionCardProps, 'action'>
  fetching?: boolean
  mainCategoryTrees: ContentfulCategoryTreeFields[]
}

export const ActionsList = ({
  actionListItemProps,
  actionsByCategories,
  fetching,
  mainCategoryTrees,
}: ActionListProps) => {
  // persist the scroll position, filters, search, sorting in LS to prevent
  // unnecessary rerenders (LS is available on initial render)
  const { options, savePosition } = useScrollPosition(
    LS_ACTION_LIST,
    true,
    INITIAL_VALUES
  )

  // the currentPage is needed for the list component,
  // the rest for the filter form component
  const { currentPage = 0, ...formOptions } = options || {}
  const [form] = Form.useForm()

  // called on every form item change
  const handleChange = (
    latestChange: FilterFormItems,
    allValues: FilterFormItems
  ) => {
    // when searching, clear out all other filters
    if (latestChange?.search) {
      form.setFieldsValue({
        tags: [ALL_ACTIONS_LABEL],
      })
      savePosition({ search: latestChange.search })
    } else {
      // for other operations, keep the state
      savePosition({ ...options, ...allValues })
    }
  }

  // when a value in the form (LS) changes, we update
  // the list data by applying filter, search and sorting
  // by applying the actions directly on the list instead
  // of saving to a local list state we can prevent re-renders
  const actions = useMemo(() => {
    const [activeCategory] = formOptions?.categories || []
    const activeSearch = formOptions?.search || ''
    const activeSorting = formOptions?.sorting
    // the below applies the tag filter
    const actions =
      actionsByCategories[activeCategory] ||
      actionsByCategories[ALL_ACTIONS_LABEL]

    return (
      actions
        // the below applies the search filter
        .filter((action) => {
          return lowerCaseSearch(activeSearch, action.title || '')
        })
        // the below applies the sorting filter
        .sort((a, b) => {
          if (activeSorting === 'impact') {
            return b.impactValue - a.impactValue
          } else {
            return b?.companiesCompletedCount - a?.companiesCompletedCount
          }
        })
    )
  }, [actionsByCategories, formOptions])

  return (
    <div className="actions-list">
      <CategoryTree categoryTrees={mainCategoryTrees} />

      {/* <FilterBar
        categories={Object.keys(actionsByCategories)}
        form={form}
        initialValues={formOptions}
        onValuesChange={handleChange}
      /> */}
      <Divider />
      <List
        className="no-padding"
        dataSource={actions}
        pagination={{
          current: currentPage,
          defaultCurrent: currentPage,
          onChange: (page) => savePosition({ ...options, currentPage: page }),
          pageSize: 10,
        }}
        renderItem={(item) => {
          return (
            <List.Item>
              <ActionCardSkeleton fetching={fetching}>
                <ActionCardWrapper
                  action={item}
                  onSavePosition={() => {
                    savePosition(options)
                  }}
                  {...actionListItemProps}
                />
              </ActionCardSkeleton>
            </List.Item>
          )
        }}
      />
    </div>
  )
}
