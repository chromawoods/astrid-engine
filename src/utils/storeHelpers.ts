import {
  $checkpoints,
  $currentViewId,
  $gameObjects,
  $nextView,
  $rooms,
  $selectedInventoryItem,
} from './store'
import type { GameData, GameObject, Room } from '../types'

import { clearTextBox } from '../components/TextBox'
import { displayError } from '../components/AlertError'
import { info } from './logger'
import { resetInteraction } from '../modules/interaction'
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
  $checkpoints.set(data.checkpoints || [])
  $gameObjects.set(setGameObjectIds(data.objects))
  setScenarios(data.scenarios)
  $rooms.set(data.rooms)
  $nextView.set('ae_system_start')

  info('game data has been stored')
}

export function getGameObject(id: string) {
  const gameObjects = $gameObjects.get()

  if (gameObjects[id]) {
    return gameObjects[id]
  }

  displayError({ message: 'game object does not exist: ' + id })
}

export function hideGameObject(id: string) {
  const gameObject = getGameObject(id)

  if (gameObject) {
    gameObject.hidden = true
    updateGameObject(gameObject)

    if ($selectedInventoryItem.get()?.id === id) {
      $selectedInventoryItem.set(null)
    }
  }
}

export function showGameObject(id: string) {
  const gameObject = getGameObject(id)

  if (gameObject) {
    gameObject.hidden = false
    updateGameObject(gameObject)
  }
}

export function getCurrentRoom(): Room | null {
  const id = $currentViewId.get()
  const room = $rooms.get()[id]

  return id && room ? { ...room, id: id } : null
}

export function updateGameObject(gameObject: GameObject) {
  $gameObjects.set({
    ...$gameObjects.get(),
    ...{ [gameObject.id]: gameObject },
  })
}

export function goToAnotherRoom(roomId: string) {
  info('go to another room', roomId)
  resetInteraction()
  clearTextBox(true)
  $nextView.set(roomId)
}

export function getRoomObjects(roomId: string) {
  const objects = $gameObjects.get()
  return Object.values(objects).filter((o) => o.room === roomId)
}
