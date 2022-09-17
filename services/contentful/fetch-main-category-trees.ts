// eslint-disable-next-line @typescript-eslint/no-var-requires
const safeJsonStringify = require('safe-json-stringify')
import { findCategoryChildren } from '../../components/ActionsList/utils'
import { getEntries } from './api'
import { ContentfulCategoryTreeFields } from './types'

export interface CategoryTreesProps {
  categoryTrees: ContentfulCategoryTreeFields[]
  lookUp: LookUpProps
  rootCategoryLookUp: RootCategoryLookUpProps
}

export interface CategoryTreeNode extends ContentfulCategoryTreeFields {
  parentId?: string | null
}

export interface LookUpProps {
  [key: string]: CategoryTreeNode
}

export interface RootCategoryLookUpProps {
  [key: string]: string
}

export const fetchMainCategoryTrees = async () => {
  const res = await getEntries({
    content_type: 'categoryTree',
    'fields.categoryId[exists]': true,
    'fields.isMainCategory': true,
    include: 4,
    locale: 'en-US',
    order: '-fields.sortWeight',
  })
  const stringifiedData = safeJsonStringify(res)
  const categoryTrees = JSON.parse(
    stringifiedData
  ) as ContentfulCategoryTreeFields[]

  // wrapper to recursively traverse the tree
  const tree = {
    categoryId: 'root',
    elements: categoryTrees,
    name: 'root',
  }

  // root category lookup to match colors to actions
  const rootCategoryLookUp: RootCategoryLookUpProps = {}
  for (const mainCategoryTree of categoryTrees) {
    const categoryChildren = findCategoryChildren(mainCategoryTree).flat()
    for (const child of categoryChildren) {
      rootCategoryLookUp[child] = mainCategoryTree.categoryId
    }
  }

  // helper to easily traverse tree and
  // build a lookUp object to find ancestors
  // without looping
  const lookUp: LookUpProps = {}
  const traverseTree = (
    node: CategoryTreeNode,
    parentId?: CategoryTreeNode['parentId']
  ) => {
    node.parentId = parentId
    lookUp[node.categoryId] = node
    if ('elements' in node && node.elements) {
      for (let i = 0; i < node.elements.length; i++) {
        const child = node.elements[i]
        traverseTree(child, node.categoryId)
      }
    }
  }

  // fill lookUp by recursively traversing the tree
  traverseTree(tree)

  const stringifiedLookup = safeJsonStringify(lookUp)
  const lookUpData = JSON.parse(stringifiedLookup) as LookUpProps

  return {
    categoryTrees,
    lookUp: lookUpData,
    rootCategoryLookUp,
  } as CategoryTreesProps
}
