export type RemoveNull<T> = {
  [K in keyof T]: Exclude<T[K], null>
}
