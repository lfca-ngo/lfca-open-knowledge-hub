import moment from 'moment'

import { EventFragment } from '../../services/lfca-backend'
import { removeObjectNullProps } from '../../utils'
import { FormValues } from '.'

export const parseInitialValues = (
  initialValues?: EventFragment
): FormValues | undefined => {
  if (!initialValues) return undefined
  const { end, start, ...values } = removeObjectNullProps(initialValues)

  return initialValues
    ? {
        startEnd: [moment(start), moment(end)],
        ...values,
      }
    : undefined
}
