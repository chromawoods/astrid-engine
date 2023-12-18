import {
  $currentInteraction,
  $gameObjects,
  $selectedInventoryItem,
} from '../utils/store'
import type { Event, GameObject } from '../types'
import { error, info } from '../utils/logger'

import { displayTextBox } from '../components/TextBox'
import fireEvent from './event'
import { getGameObject } from '../utils/storeHelpers'
import { getTextByKey } from './dialog'

export function collect(gameObject: GameObject) {
  gameObject.isInInventory = true

  $gameObjects.set({
    ...$gameObjects.get(),
    ...{ [gameObject.id]: gameObject },
  })
}

export default function doInteraction(event: Event) {
  info('doInteraction:', event.id)

  const gameObject = getGameObject(event.data[0])

  switch (event.id) {
    case 'look':
      if (gameObject.description) {
        fireEvent({
          id: 'print',
          data: [gameObject.description || getTextByKey('defaults.look') || ''],
        })
      } else {
        displayTextBox({
          text: [getTextByKey('defaults.look') || ''],
          duration: true,
          prioritized: true,
        })
      }
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
      error('unknown interaction', event.id)
  }
}

export function resetInteraction() {
  $currentInteraction.set('none')
}
