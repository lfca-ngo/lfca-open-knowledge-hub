import { RuleObject } from 'antd/lib/form'

export const passwordValidator = (_: RuleObject, value: string) => {
  const regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  return regEx.test(value)
    ? Promise.resolve()
    : Promise.reject(
        new Error(
          'A minimum of 8 characters with at least 1 upper case, numeric, and special character'
        )
      )
}
