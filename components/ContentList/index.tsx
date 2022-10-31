import { ContentfulContentCollectionFields } from '../../services/contentful'
import { ContentAccordion } from './ContentAccordion'
import { ContentListDefault } from './ContentListDefault'
import { ContentListMini } from './ContentListMini'

export type ContentListTypes = 'mini-list' | 'list' | 'accordion'
export type ContentIds = 'community' | 'faq'

export interface ContentListDefaultProps {
  content?: ContentfulContentCollectionFields
  type: ContentListTypes
}

export const ContentList = (props: ContentListDefaultProps) => {
  switch (props.type) {
    case 'mini-list':
      return <ContentListMini {...props} />
    case 'list':
      return <ContentListDefault {...props} />
    case 'accordion':
      return <ContentAccordion {...props} />
    default:
      return null
  }
}
