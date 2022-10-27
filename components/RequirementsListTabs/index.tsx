import { Tabs } from 'antd'
import { useMemo } from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { ACTION_STATES } from '../ActionBar/StatusButton'
import { RequirementsList } from './RequirementsList'

const STEPS_OPTIONS = [
  {
    key: `${ACTION_STATES.BACKLOG.key}`,
    label: 'Plan',
  },
  {
    key: `${ACTION_STATES.PLANNED.key}`,
    label: 'Proceed',
  },
  {
    key: `${ACTION_STATES.COMPLETE.key}`,
    label: 'Share',
  },
]

interface RequirementsListTabsProps {
  action?: CompanyActionListItemFragment
  actionContent: ContentfulActionFields
  activeStatusTab: string | undefined
  setActiveStatusTab: (key: string) => void
}

export const RequirementsListTabs = ({
  action,
  actionContent,
  activeStatusTab,
  setActiveStatusTab,
}: RequirementsListTabsProps) => {
  /**
   * Definition of implementation steps
   */

  const implementationSteps = useMemo(
    () => [
      ...STEPS_OPTIONS.filter(
        (s) =>
          actionContent.requirements.findIndex((r) => r.stage === s.label) > -1
      ).map((s) => ({
        ...s,
        children: (
          <RequirementsList
            actionContentId={actionContent.actionId}
            requirements={action?.requirements}
            requirementsContent={actionContent?.requirements.filter(
              (r) => r.stage === s.label
            )}
          />
        ),
      })),
    ],
    [actionContent, action]
  )

  // @TODO: Remove after migration is complete
  // all untagged requirements land here
  if (actionContent.requirements.find((r) => !r.stage)) {
    implementationSteps.push({
      children: (
        <RequirementsList
          actionContentId={actionContent.actionId}
          requirements={action?.requirements}
          requirementsContent={actionContent?.requirements.filter(
            (r) => !r.stage
          )}
        />
      ),
      key: 'all',
      label: 'All',
    })
  }

  return (
    <Tabs
      activeKey={activeStatusTab}
      items={implementationSteps}
      onChange={(key) => setActiveStatusTab(key)}
    />
  )
}
