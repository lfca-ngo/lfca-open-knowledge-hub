import { Select } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'

import categoryTreeData from '../../public/data/_category-tree-data.json'
import {
  ContentfulCategoryTreeFields,
  LookUpProps,
} from '../../services/contentful'
import { findCategoryChildren, rootTreeMetaData } from './utils'

export interface RootCategorySelectorProps {
  value?: string[]
  onChange?: (value: string[]) => void
}

const ALL = 'all'

export const RootCategorySelector = ({
  onChange,
}: RootCategorySelectorProps) => {
  const lookUp: LookUpProps = categoryTreeData.lookUp
  const categoryTree: ContentfulCategoryTreeFields[] =
    categoryTreeData.categoryTree

  const rootCategories = categoryTree.map((tree) => ({
    ...tree,
    elements: null,
  }))

  const getAllChildren = (categoryId: string) => {
    const childrenArrays = findCategoryChildren(lookUp[categoryId])
    const children = childrenArrays?.flat()
    const withChildren = [...children, categoryId]

    return withChildren
  }

  const handleChange = (option: DefaultOptionType) => {
    if (!option.key) return

    // select all
    if (option.key === ALL) {
      let all: string[] = []
      for (const rootCategory of rootCategories) {
        const withChildren = getAllChildren(rootCategory.categoryId)
        all = [...all, ...withChildren]
      }
      return onChange?.(all)
    } else {
      // select single
      const withChildren = getAllChildren(option.key)
      return onChange?.(withChildren)
    }
  }

  return (
    <div className="root-category-selector">
      <Select
        onChange={(_, o) => !Array.isArray(o) && handleChange(o)}
        placeholder="Select an action pillar"
        size="large"
      >
        {rootCategories.map((tree) => {
          const treeMetaData = rootTreeMetaData[tree.categoryId]
          return (
            <Select.Option key={tree.categoryId}>
              <span style={{ marginRight: '8px' }}>{treeMetaData?.icon}</span>
              {tree.name}
            </Select.Option>
          )
        })}
        <Select.Option key={ALL}>Select all</Select.Option>
      </Select>
    </div>
  )
}
