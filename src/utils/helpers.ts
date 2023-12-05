export function arrayify<T>(value: T | T[], sort: boolean = false): T[] {
  value = Array.isArray(value) ? value : [value]
  return sort ? value.sort() : value
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
