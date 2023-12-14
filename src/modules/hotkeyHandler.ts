import type { HotkeyAction, HotkeyActionId } from '../types'

import { atom } from 'nanostores'

export const $hotkeyAction = atom<HotkeyActionId | undefined>()

const hotkeyActions: Record<string, HotkeyAction> = {
  d: { id: 'debugView', toggle: true },
}

function onKeyDown(event: KeyboardEvent) {
  const action = hotkeyActions[event.key]

  if (action) {
    if (action.toggle && action.id === $hotkeyAction.get()) {
      $hotkeyAction.set(undefined)
    } else {
      $hotkeyAction.set(action.id)
    }
  }
}

export default function listenForHotkeys() {
  window.addEventListener('keydown', onKeyDown)
}
