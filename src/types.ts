export type Dialog = {
  defaults: { [key in Interaction]?: string | string[] }
}

export type Interaction = 'none' | 'look' | 'use'

export type EventType =
  | 'transitRooms'
  | 'enterRoom'
  | 'leaveRoom'
  | 'collect'
  | 'look'
  | 'use'
  | 'useItem'
  | 'talk'
  | 'print'
  | 'hideObject'
  | 'showObject'

export type Event = {
  id: EventType
  what: string | string[]
}

export type SystemViews = 'ae_system_start'

export type View = SystemViews | string

export type ActionType = 'print'

export type Action = {
  id: ActionType
  what: string
}

export type Scenario = {
  event: EventType
  what: string
  actions: Action[]
  isCheckpoint?: string
  requiresCheckpoint?: string | string[]
  preventDefault?: boolean
  reached?: boolean
  repeat?: boolean
}

export type TextBox = {
  text: string
  duration?: boolean
}

export type GameSettings = {
  canvasHeight: number
  canvasWidth: number
  entryRoomId: string
  gameTitle: string
  imageDir: string
  interactionTypes: Interaction[]
  dataFileType?: 'yaml' | 'json'
  debug?: boolean
  defaultBackground?: string
}

export type GameObjectImage = {
  default: string
  inventory: string
}

export type GameObject = {
  id: string
  x?: number
  y?: number
  width?: number
  height?: number
  image?: GameObjectImage
  name?: string
  description?: string
  collectable?: boolean
  hidden?: boolean
  isInInventory?: boolean
}

export type GameObjects = Record<string, GameObject>

export type Room = {
  background: string
  id?: string
  name?: string
  objects?: string[]
  portals?: Portal[]
}

export type CurrentRoom = Room & {
  id: string
  gameObjects: GameObject[]
}

export type Rooms = {
  [key: string]: Room
}

export type Portal = {
  x: number
  y: number
  width: string
  height: string
  destination: string
}

export type Checkpoint = string

export type GameData = {
  objects: GameObjects
  scenarios: Scenario[]
  rooms: Rooms
  dialog: Dialog
}
