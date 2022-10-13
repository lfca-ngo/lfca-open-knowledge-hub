import { CreateEventInput, UpdateEventInput } from '../../services/lfca-backend'
import { FormValues } from '.'

export const convertFormValues = (
  values: FormValues
): CreateEventInput | UpdateEventInput => {
  const { startEnd, ...rest } = values

  const [start, end] = startEnd

  return {
    ...rest,
    end: end.set('second', 0).toDate(),
    start: start.set('second', 0).toDate(),
  }
}
