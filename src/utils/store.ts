import {
  type Interaction,
  type Checkpoint,
  type GameSettings,
  type Rooms,
  type GameObjects,
  type View,
  type Room,
} from '../types'
import { atom, deepMap, map } from 'nanostores'

export const $settings = map<GameSettings>({
  dataFileType: 'yaml',
  canvasWidth: 800,
  canvasHeight: 512,
  gameTitle: '',
  entryRoomId: '',
  defaultBackground: '#333333',
  interactionTypes: ['look', 'use'],
})

export const $gameObjects = deepMap<GameObjects>({})

export const $currentViewId = atom<View>('ae_system_start')

export const $rooms = atom<Rooms>({})

export const $nextView = atom<string>('')

/*
export const $currentRoom = computed(
  [$currentViewId, $gameObjects],
  (): CurrentRoom | null => {
    const id = $currentViewId.get()
    const room = $rooms.get()[id]

    if (id && room) {
      const roomGameObjects =
        Object.values($gameObjects.get()).filter((go) => {
          return room && room.objects?.includes(go.id) && !go.hidden
        }) || []

      return { ...room, id: id, gameObjects: roomGameObjects }
    }

    return null
  }
)
*/

export function getCurrentRoom(): Room | null {
  const id = $currentViewId.get()
  const room = $rooms.get()[id]

  return id && room ? { ...room, id: id } : null
}

export const $currentInteraction = atom<Interaction>('none')

export const $checkpoints = atom<Checkpoint[]>([])
