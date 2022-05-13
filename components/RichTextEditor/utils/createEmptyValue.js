import { DEFAULT_ELEMENT_TYPE } from "../config"

export function createEmptyValue() {
  return [
    {
      type: DEFAULT_ELEMENT_TYPE,
      children: [
        {
          text: "",
        },
      ],
    },
  ]
}
