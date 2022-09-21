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
  icon: any
  name: string
}

export const rootTreeMetaData: { [key: string]: MetaDataProps } = {
  'tree-impact': {
    color: 'blue',
    icon: <FallOutlined />,
    name: 'Impact',
  },
  'tree-influence': {
    color: 'yellow',
    icon: <SoundOutlined />,
    name: 'Influence',
  },
  'tree-stepup': {
    color: 'wine',
    icon: <FieldBinaryOutlined />,
    name: 'Step Up',
  },
  'tree-transform': {
    color: 'green',
    icon: <StarOutlined />,
    name: 'Transform',
  },
}
