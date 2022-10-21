import { convertValueToMarkdown } from '../RichTextEditor/utils'
import { FormValues } from '.'

export const convertFormValues = (
  values: FormValues
): Omit<FormValues, 'description' | 'startEnd'> & {
  description?: string
  end: Date
  start: Date
} => {
  const { description, startEnd, ...rest } = values

  const [start, end] = startEnd

  return {
    ...rest,
    description: description?.length
      ? convertValueToMarkdown(description)
      : undefined,
    end: end.set('second', 0).toDate(),
    start: start.set('second', 0).toDate(),
  }
}
