import unescape from 'lodash.unescape'
import { marked } from 'marked'

import { DEFAULT_ELEMENT_TYPE } from '../config'

export function parseMarkdownToValue(md = '') {
  const tokens = marked.lexer(md, {
    breaks: false,
  })
  const parsed = deserialize(tokens)
  return parsed
}

function deserialize(tokens, options) {
  return tokens.reduce((acc, t) => {
    switch (t.type) {
      case 'space': {
        return acc
      }

      case 'text': {
        return [
          ...acc,
          ...(t.tokens
            ? deserialize(t.tokens, options)
            : [
                {
                  text: unescape(t.text || t.raw),
                  ...options,
                },
              ]),
        ]
      }

      case 'em': {
        return [...acc, ...deserialize(t.tokens, { ...options, italic: true })]
      }

      case 'strong': {
        return [...acc, ...deserialize(t.tokens, { ...options, bold: true })]
      }

      case 'link':
      case 'list':
      case 'list_item':
      case 'paragraph': {
        const node = {
          children: t.tokens
            ? deserialize(t.tokens, options)
            : t.items
            ? deserialize(t.items, options)
            : [
                {
                  text: t.text || t.raw,
                },
              ],
          type: getTypeFromMarkdownToken(t),
        }
        if (t.type === 'link') {
          node.url = t.href || ''
        }
        return [...acc, node]
      }

      default:
        return acc
    }
  }, [])
}

function getTypeFromMarkdownToken(t) {
  switch (t.type) {
    case 'list':
      return t.ordered ? 'numbered-list' : 'bulleted-list'

    case 'list_item':
      return 'list-item'

    case 'link':
      return 'link'

    case 'paragraph':
    default:
      return DEFAULT_ELEMENT_TYPE
  }
}
