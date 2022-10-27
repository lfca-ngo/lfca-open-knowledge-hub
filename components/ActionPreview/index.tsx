import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { ContentfulActionFields } from '../../services/contentful'
import { CompanyActionListItemFragment } from '../../services/lfca-backend'
import { DEFAULT_FONT_SIZE, DEFAULT_LINE_HEIGHT } from '../../utils'
import { options } from '../../utils/richTextOptions'
import { RequirementsList } from '../RequirementsListTabs'
import { ShowMore } from '../ShowMore'
import styles from './styles.module.less'

interface ActionPreviewProps {
  action: CompanyActionListItemFragment
  actionContent: ContentfulActionFields
}

export const ActionPreview = ({
  action,
  actionContent,
}: ActionPreviewProps) => {
  return (
    <div className={styles['action-preview']}>
      <h2>{actionContent.title}</h2>

      <ShowMore
        buttonProps={{ type: 'link' }}
        maskMode="transparent"
        maxHeight={DEFAULT_FONT_SIZE * DEFAULT_LINE_HEIGHT * 4}
        text={
          actionContent?.aboutText &&
          documentToReactComponents(actionContent?.aboutText, options)
        }
      />

      <RequirementsList
        actionContentId={actionContent.actionId}
        requirements={action.requirements}
        requirementsContent={actionContent.requirements}
      />
    </div>
  )
}
