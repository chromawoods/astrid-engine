import { $nextView, $settings } from '../utils/store'
import type { Event, Interaction } from '../types'
import { clearTextBox, displayTextBox } from '../components/TextBox'
import doInteraction, { resetInteraction } from './interaction'
import { error, info } from '../utils/logger'
import { hideGameObject, showGameObject } from '../utils/storeHelpers'

import { getTextByKey } from './dialog'

export default function doAction(event: Event) {
  info('doAction', event)

  if ($settings.get().interactionTypes.includes(event.id as Interaction)) {
    doInteraction(event)
    resetInteraction()
    return
  }

  switch (event.id) {
    case 'leaveRoom':
      resetInteraction()
      clearTextBox(true)
      $nextView.set(event.data[1])
      break

    case 'enterRoom':
      break

    case 'print':
      displayTextBox({ text: event.data[0], duration: true, prioritized: true })
      break

    case 'printKey':
      displayTextBox({
        text: getTextByKey(event.data[0]),
        duration: true,
        prioritized: true,
      })
      break

    case 'useItem':
      displayTextBox({
        text: getTextByKey('defaults.useItem'),
        duration: true,
        prioritized: true,
      })
      break

    case 'hideObject':
      hideGameObject(event.data[0])
      break

    case 'showObject':
      showGameObject(event.data[0])
      break

    default:
      error('unhandled event action', event)
  }
}
