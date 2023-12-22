import { $nextView, $settings } from '../utils/store'
import type { GameEvent, Interaction } from '../types'
import { clearTextBox, displayTextBox } from '../components/TextBox'
import doInteraction, { resetInteraction } from './interaction'

import { displayError } from '../components/AlertError'
import { getTextByKey } from './dialog'
import { info } from '../utils/logger'

export default function handleGameAction(event: GameEvent) {
  info('handleGameAction', event)

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

    case 'hoverObject':
      displayTextBox({ text: event.data[0] })
      break

    case 'hoverObjectOut':
      clearTextBox()
      break

    default:
      displayError({
        message: 'unhandled GameEventId: ' + event.id,
        data: event,
      })
  }
}
