export type DeepObj = {
  [key: string]: any | DeepObj
}

export type HotkeyActionId = 'debugView'

export type HotkeyAction = {
  id: HotkeyActionId
  toggle?: boolean
}

export type Interaction = 'none' | 'look' | 'use'

export type GameEventId =
  | 'transitRooms'
  | 'enterRoom'
  | 'leaveRoom'
  | 'collect'
  | 'look'
  | 'use'
  | 'useItem'
  | 'talk'
  | 'hoverObject'
  | 'hoverObjectOut'

export type GameEvent = {
  id: GameEventId
  data: string[]
}

export type UserActionId =
  | 'print'
  | 'printKey'
  | 'hideObject'
  | 'showObject'
  | 'delay'
  | 'goToRoom'

export type UserAction = {
  id: UserActionId
  data: string[] | string[][]
}

type SystemViews = 'ae_system_start'

export type View = SystemViews | string

export type Scenario = {
  event: GameEvent
  actions: UserAction[]
  isCheckpoint?: string
  requiresCheckpoint?: string | string[]
  preventDefault?: boolean
  reached?: boolean
  repeat?: boolean
}

export type ScenarioData = Omit<Scenario, 'event' | 'actions'> & {
  event: string
  actions: string[]
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

type GameObjectImage = {
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
  dialog: DeepObj
}

export type GameDataRaw = Omit<GameData, 'scenarios'> & {
  scenarios: ScenarioData[]
}
