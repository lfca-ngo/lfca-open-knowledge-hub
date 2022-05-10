export const isDev = process.env.NODE_ENV === 'development'
export const isBrowser = () => typeof window !== 'undefined'
export const MOBILE_BREAKPOINT = 767

export function toFixedNumber(num: number, digits: number, base: number = 10) {
    const pow = Math.pow(base, digits)
    return Math.round(num * pow) / pow
}