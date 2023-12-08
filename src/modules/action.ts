import { $nextView, $settings } from '../utils/store'
import type { Event, Interaction } from '../types'
import doInteraction, { resetInteraction } from './interaction'
import { error, info } from '../utils/logger'
import { hideTextBox, showTextBox } from '../components/TextBox'

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
      hideTextBox(true)
      $nextView.set(event.what[1])
      break

    case 'enterRoom':
      break

    case 'print':
      showTextBox({ text: event.what as string, duration: true })
      break

    case 'useItem':
      showTextBox({ text: 'get correct dialog key', duration: true })
      break

    default:
      error('unhandled event action', event)
  }
}
