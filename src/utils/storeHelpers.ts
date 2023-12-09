import {
  $gameObjects,
  $nextView,
  $rooms,
  $selectedInventoryItem,
} from './store'
import type { GameData, GameObject } from '../types'

import { info } from './logger'
import { setDialog } from '../modules/dialog'
import { setScenarios } from '../modules/scenario'

function setGameObjectIds(obj: { [key: string]: Omit<GameObject, 'id'> }) {
  const objWithIds: { [key: string]: GameObject } = {}

  Object.entries(obj).forEach((entry) => {
    objWithIds[entry[0]] = { id: entry[0], ...entry[1] }
  })

  return objWithIds
}

export function setGameData(data: GameData) {
  setDialog(data.dialog)
  $gameObjects.set(setGameObjectIds(data.objects))
  setScenarios(data.scenarios)
  $rooms.set(data.rooms)
  $nextView.set('ae_system_start')

  info('game data has been stored')
}

export function getGameObject(id: string) {
  return $gameObjects.get()[id]
}

export function hideGameObject(id: string) {
  const gameObject = getGameObject(id)
  gameObject.hidden = true
  $gameObjects.set({ gameObject, ...$gameObjects.get() })

  if ($selectedInventoryItem.get()?.id === id) {
    $selectedInventoryItem.set(null)
  }
}

export function showGameObject(id: string) {
  const gameObject = getGameObject(id)
  gameObject.hidden = false
  $gameObjects.set({ gameObject, ...$gameObjects.get() })
}
