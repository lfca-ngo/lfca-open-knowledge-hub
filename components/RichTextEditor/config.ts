import { Text } from 'slate'

export const DEFAULT_ELEMENT_TYPE = 'paragraph'

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const HOTKEYS: Record<string, keyof Omit<Text, 'text'>> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
}
