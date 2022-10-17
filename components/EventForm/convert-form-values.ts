import { FormValues } from '.'

export const convertFormValues = (
  values: FormValues
): Omit<FormValues, 'startEnd'> & {
  end: Date
  start: Date
} => {
  const { startEnd, ...rest } = values

  const [start, end] = startEnd

  return {
    ...rest,
    end: end.set('second', 0).toDate(),
    start: start.set('second', 0).toDate(),
  }
}
