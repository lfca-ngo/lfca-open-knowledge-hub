import { DEFAULT_ELEMENT_TYPE } from '../config'

export function createEmptyValue() {
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
