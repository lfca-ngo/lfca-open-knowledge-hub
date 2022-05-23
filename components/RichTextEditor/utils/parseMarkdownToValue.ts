import unescape from 'lodash.unescape'
import { marked } from 'marked'
import { Descendant, Element, Text } from 'slate'

import { DEFAULT_ELEMENT_TYPE } from '../config'

export function parseMarkdownToValue(md = '') {
  const tokens = marked.lexer(md, {
    breaks: false,
  })
  const parsed = deserialize(tokens)
  return parsed
}

function deserialize(
  tokens: marked.TokensList | marked.Token[] | undefined = [],
  options?: Omit<Text, 'text'>
): Descendant[] {
  return tokens.reduce((acc, t) => {
    switch (t.type) {
      case 'space': {
        return acc
      }

      case 'text': {
        return [
          ...acc,

          ...('tokens' in t
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
          children:
            'tokens' in t
              ? deserialize(t.tokens, options)
              : deserialize(t.items, options),
          type: getTypeFromMarkdownToken(t),
        } as Element

        if (node.type === 'link') {
          node.url = 'href' in t ? t.href : ''
        }

        return [...acc, node]
      }

      default:
        return acc
    }
  }, [] as Descendant[])
}

function getTypeFromMarkdownToken(t: marked.Token): Element['type'] {
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
