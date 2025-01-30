export function wrapPromise<T>(
  value: T,
  flag: boolean,
): T | Promise<Awaited<T>> {
  return flag ? Promise.resolve(value) : value
}
