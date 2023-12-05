import type { Dialog, Interaction } from '../types'

import { map } from 'nanostores'

const $dialog = map<Dialog>({ defaults: {} })

export const setDialog = (dialogData: Dialog) => $dialog.set(dialogData)

export function getDefaultInteractionText(interaction: Interaction) {
  const defaultText = $dialog.get().defaults[interaction]

  return Array.isArray(defaultText)
    ? defaultText[Math.floor(Math.random() * defaultText.length)]
    : defaultText
}

export function lookAt(text: string | undefined) {
  return text || getDefaultInteractionText('look') || ''
}

export function defaultUse() {
  return getDefaultInteractionText('use') || ''
}
