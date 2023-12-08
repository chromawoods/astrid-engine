export function arrayify<T>(value: T | T[], sort: boolean = false): T[] {
  value = Array.isArray(value) ? value : [value]
  return sort ? value.sort() : value
}

export const hasEveryArrayValue = (a: any[], b: any[]) =>
  a.every((aItem) => b.includes(aItem))

export const paramsAreEqual = (a: string | any[], b: string | any[]) =>
  hasEveryArrayValue(arrayify(a), arrayify(b))

export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
