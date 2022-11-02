import { RuleObject } from 'antd/lib/form'

export const passwordValidator = (_: RuleObject, value: string) => {
  const regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  return regEx.test(value)
    ? Promise.resolve()
    : Promise.reject(
        new Error(
          'min. 8 chars incl. a number, a special and upper/lowercase char'
        )
      )
}
