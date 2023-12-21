import { $nextView, $settings } from '../utils/store'
import type { GameEvent, Interaction } from '../types'
import { clearTextBox, displayTextBox } from '../components/TextBox'
import doInteraction, { resetInteraction } from './interaction'
import { error, info } from '../utils/logger'

import { getTextByKey } from './dialog'

export default function doAction(event: GameEvent) {
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
      $nextView.set(event.data[1] as string)
      break

    case 'enterRoom':
      break

    case 'useItem':
      displayTextBox({
        text: getTextByKey('defaults.useItem'),
        duration: true,
        prioritized: true,
      })
      break

    default:
      error('unhandled event id', event.id)
  }
}
