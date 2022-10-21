import moment from 'moment'

import { EventFragment } from '../../services/lfca-backend'
import { removeObjectNullProps } from '../../utils'
import { parseMarkdownToValue } from '../RichTextEditor/utils'
import { FormValues } from '.'

export const parseInitialValues = (
  initialValues?: EventFragment
): FormValues | undefined => {
  if (!initialValues) return undefined
  const { description, end, start, ...values } =
    removeObjectNullProps(initialValues)

  return initialValues
    ? {
        description: parseMarkdownToValue(description),
        startEnd: [moment(start), moment(end)],
        ...values,
      }
    : undefined
}
