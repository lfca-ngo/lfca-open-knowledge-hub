/* eslint-disable @typescript-eslint/no-var-requires */
const nextContentful = require('./next-contentful')
const fs = require('fs')
const { CACHE_PATH } = require('./next-contentful')

const findCategoryChildren = (node) => {
  return node.elements?.map((e) => {
    if ('elements' in e) {
      return [...findCategoryChildren(e), e.categoryId]
    }
    return e.categoryId
  })
}

exports.findCategoryChildren = findCategoryChildren

const fetchAndSaveByKey = async (key) => {
  // we could fetch the category tree here
  const response = await nextContentful.client.getEntries({
    content_type: 'categoryTree',
    'fields.categoryId[exists]': true,
    'fields.isRootCategory': true,
    include: 4,
    locale: 'en-US',
    order: '-fields.sortWeight',
  })

  const data = nextContentful.parseResponse({
    fields: { items: response.items },
  })
  const categoryTree = data.items

  // traverse tree
  // wrapper to recursively traverse the tree
  const tree = {
    categoryId: 'root',
    elements: categoryTree,
    name: 'root',
  }

  // root category lookup to match colors to actions
  const rootCategoryLookUp = {}
  for (const rootCategoryTree of categoryTree) {
    const categoryChildren = findCategoryChildren(rootCategoryTree).flat()
    for (const child of categoryChildren) {
      rootCategoryLookUp[child] = rootCategoryTree.categoryId
    }
  }

  // helper to easily traverse tree and
  // build a lookUp object to find ancestors
  // without looping
  const lookUp = {}
  const traverseTree = (node, parentId) => {
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

  const treeData = {
    categoryTree,
    lookUp: lookUp,
    rootCategoryLookUp,
  }

  // fetch stuff here
  try {
    fs.writeFileSync(
      `${CACHE_PATH}/${key}.json`,
      JSON.stringify(treeData),
      'utf8'
    )
  } catch (e) {
    // Nothing to do here
  }
}

exports.fetchAndSaveByKey = fetchAndSaveByKey
