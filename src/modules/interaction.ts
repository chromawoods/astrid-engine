import { $currentInteraction, $selectedInventoryItem } from '../utils/store'
import type { GameEvent, GameObject } from '../types'
import { getGameObject, updateGameObject } from '../utils/storeHelpers'

import { displayError } from '../components/AlertError'
import { displayTextBox } from '../components/TextBox'
import { getTextByKey } from './dialog'
import { info } from '../utils/logger'

function collect(gameObject: GameObject) {
  gameObject.isInInventory = true
  updateGameObject(gameObject)
}

export default function doInteraction(event: GameEvent) {
  info('doInteraction:', event.id)

  const gameObject = getGameObject(event.data[0])

  if (!gameObject) {
    return
  }

  switch (event.id) {
    case 'look':
      const text = gameObject.description || getTextByKey('defaults.look') || ''
      displayTextBox({
        text: [text],
        duration: true,
        prioritized: true,
      })
      break
    case 'use':
      if (gameObject.isInInventory) {
        $selectedInventoryItem.set(gameObject)
      } else if (gameObject.collectable) {
        collect(gameObject)
      } else {
        displayTextBox({
          text: [getTextByKey('defaults.use') || ''],
          duration: true,
          prioritized: true,
        })
      }
      break
    default:
      displayError({ message: 'unknown interaction: ' + event.id, data: event })
  }
}

export function resetInteraction() {
  $currentInteraction.set(null)
}
