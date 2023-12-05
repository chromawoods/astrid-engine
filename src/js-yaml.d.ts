declare module 'js-yaml' {
  export function loadAll(text: string): { [key: string]: any }[]

  export function load(text: string): { [key: string]: any }
}
