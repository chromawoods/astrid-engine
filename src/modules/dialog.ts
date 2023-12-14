import type { DeepObj } from '../types'
import { getValueByKeyPath } from '../utils/helpers'
import { map } from 'nanostores'

const $dialog = map<DeepObj>({ defaults: {} })

export const setDialog = (dialogData: DeepObj) => $dialog.set(dialogData)

export function getTextByKey(key: string): string {
  return getValueByKeyPath($dialog.get(), key)
}
