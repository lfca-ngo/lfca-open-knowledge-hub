import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

export interface Paragraph {
  type: 'paragraph'
  children: (Leaf | Link)[]
}

export interface Link {
  type: 'link'
  url: string
  children: Leaf[]
}

export interface BulletedList {
  type: 'bulleted-list'
  children: ListItem[]
}

export interface NumberedList {
  type: 'numbered-list'
  children: ListItem[]
}

export interface ListItem {
  type: 'list-item'
  children: Leaf[]
}

export interface Leaf {
  text: string
  bold?: boolean
  italic?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: Paragraph | Link | BulletedList | NumberedList | ListItem
    Text: Leaf
  }
}
