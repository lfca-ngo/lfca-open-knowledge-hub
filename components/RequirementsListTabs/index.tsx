import { Tabs } from 'antd'
import { useMemo } from 'react'

import { ContentfulActionFields } from '../../services/contentful'
import { RequirementsList } from './RequirementsList'

const STEPS_OPTIONS = [
  {
    key: `Backlog`,
    label: 'Plan',
  },
  {
    key: `Planned`,
    label: 'Proceed',
  },
  {
    key: `Complete`,
    label: 'Share',
  },
]

interface RequirementsListTabsProps {
  actionContent: ContentfulActionFields
  activeStatusTab: string | undefined
  setActiveStatusTab: (key: string) => void
}

export const RequirementsListTabs = ({
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
            requirementsContent={actionContent?.requirements.filter(
              (r) => r.stage === s.label
            )}
          />
        ),
      })),
    ],
    [actionContent]
  )

  // @TODO: Remove after migration is complete
  // all untagged requirements land here
  if (actionContent.requirements.find((r) => !r.stage)) {
    implementationSteps.push({
      children: (
        <RequirementsList
          actionContentId={actionContent.actionId}
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
