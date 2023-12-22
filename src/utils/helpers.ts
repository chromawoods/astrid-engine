import type { DeepObj } from '../types'

export function arrayify<T>(value: T | T[], sort: boolean = false): T[] {
  value = Array.isArray(value) ? value : [value]
  return sort ? value.sort() : value
}

export const hasEveryArrayValue = (a: any[], b: any[]) =>
  a.every((aItem) => b.includes(aItem))

export const paramsAreEqual = (a: string | any[], b: string | any[]) =>
  hasEveryArrayValue(arrayify(a), arrayify(b))

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export function getValueByKeyPath(obj: DeepObj, path: string): any {
  const elems = path.split('.')
  const currentKey = elems.shift()

  if (
    currentKey &&
    elems.length === 0 &&
    obj.hasOwnProperty(currentKey) &&
    typeof obj[currentKey] === 'string'
  ) {
    return obj[currentKey]
  }

  if (currentKey && elems.length && obj.hasOwnProperty(currentKey)) {
    return getValueByKeyPath(obj[currentKey] as DeepObj, elems.join('.'))
  }

  return ''
}
