import {
  type Interaction,
  type Checkpoint,
  type GameSettings,
  type Rooms,
  type GameObjects,
  type View,
  type GameObject,
} from '../types'
import { atom, deepMap, map } from 'nanostores'

export const $settings = map<GameSettings>({
  dataFileType: 'yaml',
  canvasWidth: 960,
  canvasHeight: 540,
  gameTitle: '',
  entryRoomId: '',
  defaultBackground: '#333333',
  interactionTypes: ['look', 'use'],
  imageDir: 'images/',
  soundDir: 'sounds/',
  useSfx: true,
})

export const $gameObjects = deepMap<GameObjects>({})

export const $currentViewId = atom<View>('ae_system_start')

export const $selectedInventoryItem = atom<GameObject | null>(null)

export const $rooms = atom<Rooms>({})

export const $nextView = atom<string>('')

export const $currentInteraction = atom<Interaction | null>(null)

export const $checkpoints = atom<Checkpoint[]>([])
