export const isDev = process.env.NODE_ENV === 'development'
export const isBrowser = () => typeof window !== 'undefined'
export const MOBILE_BREAKPOINT = 767

export function toFixedNumber(num: number, digits: number, base: number = 10) {
    const pow = Math.pow(base, digits)
    return Math.round(num * pow) / pow
}

export const openInNewTab = (url: string) => {
    const win = window.open(url, "_blank")
    win?.focus()
}

export const copyTextToClipboard = (text: string, cb: any) => {
    if (!navigator.clipboard) {
        cb('Clipboard API not supported', false)
    }
    navigator.clipboard.writeText(text).then(
        () => {
            const message = `Copying text was successful`
            return cb(message, true)
        },
        (err) => {
            console.error(err)
            const message = `Could not copy text`
            return cb(message, false)
        }
    )
}