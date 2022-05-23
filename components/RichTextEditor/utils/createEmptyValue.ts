import { Descendant } from 'slate'

import { DEFAULT_ELEMENT_TYPE } from '../config'

export function createEmptyValue(): Descendant[] {
  return [
    {
      children: [
        {
          text: '',
        },
      ],
      type: DEFAULT_ELEMENT_TYPE,
    },
  ]
}
