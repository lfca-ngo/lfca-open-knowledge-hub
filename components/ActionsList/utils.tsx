import {
  FallOutlined,
  FieldBinaryOutlined,
  SoundOutlined,
  StarOutlined,
} from '@ant-design/icons'

import { CategoryTreeNode, LookUpProps } from '../../services/contentful'

export const findCategoryParents = (lookUp: LookUpProps, nodeId?: string) => {
  if (!nodeId) return []

  const parents: string[] = []

  let parentId = lookUp[nodeId] && lookUp[nodeId].parentId
  while (parentId !== undefined) {
    parents.unshift(parentId || '')
    parentId = parentId && lookUp[parentId] && lookUp[parentId].parentId
  }
  return parents
}

export const findCategoryChildren = (node: CategoryTreeNode): string[] => {
  return node.elements?.map((e) => {
    if ('elements' in e) {
      return [...findCategoryChildren(e), e.categoryId]
    }
    return e.categoryId
  }) as string[]
}

interface MetaDataProps {
  color: string
  description: string
  icon: React.ReactNode
  name: string
}

export const rootTreeMetaData: { [key: string]: MetaDataProps } = {
  'tree-impact': {
    color: 'blue',
    description:
      'Take immediate action to reduce emissions in your own operations and value chain to “zero” – or as close as you can get.',
    icon: <FallOutlined />,
    name: 'Impact',
  },
  'tree-influence': {
    color: 'yellow',
    description:
      'Use your social, financial, and political power to become an active agent of change.',
    icon: <SoundOutlined />,
    name: 'Influence',
  },
  'tree-stepup': {
    color: 'wine',
    description:
      'Assume climate leadership by publicly commiting to the 1.5°C ambition and make an assessment of your emissions, full resources, and influence.',
    icon: <FieldBinaryOutlined />,
    name: 'Step Up',
  },
  'tree-transform': {
    color: 'green',
    description:
      'Embed climate considerations into every part of your business, from products and services to long-term strategy.',
    icon: <StarOutlined />,
    name: 'Transform',
  },
}
