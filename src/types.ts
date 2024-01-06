export type DeepObj = {
  [key: string]: any | DeepObj
}

export type HotkeyActionId = 'debugView'

export type HotkeyAction = {
  id: HotkeyActionId
  toggle?: boolean
}

export type Interaction = 'look' | 'use'

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
  | 'printRandomKey'
  | 'hideObject'
  | 'showObject'
  | 'delay'
  | 'goToRoom'
  | 'ghost'
  | 'unghost'

export type UserAction = {
  id: UserActionId
  data: string[] | string[][]
}

type SystemViews = 'ae_system_start'

export type View = SystemViews | string

export type Scenario = {
  actions: UserAction[]
  anyCheckpoint: string[]
  event: GameEvent
  preventDefault: boolean
  reached: boolean
  repeat: boolean
  requiresCheckpoint: string[]
  untilCheckpoint: string[]
  isCheckpoint?: string
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
  dialogFont?: string
  headingFont?: string
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
  ghost?: boolean
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

export type Portal = Pick<
  GameObject,
  'name' | 'x' | 'y' | 'width' | 'height'
> & {
  destination: string
}

export type Checkpoint = string

export type GameData = {
  objects: GameObjects
  scenarios: Scenario[]
  rooms: Rooms
  dialog: DeepObj
  checkpoints?: Checkpoint[]
}

export type GameDataRaw = Omit<GameData, 'scenarios'> & {
  scenarios: ScenarioData[]
}
