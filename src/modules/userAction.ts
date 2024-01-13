import type { GameObject, UserAction } from '../types'
import {
  getGameObject,
  goToAnotherRoom,
  hideGameObject,
  showGameObject,
  updateGameObject,
} from '../utils/storeHelpers'
import { getRandomElement, sleep } from '../utils/helpers'

import { collect } from './interaction'
import { displayError } from '../components/AlertError'
import { displayTextBox } from '../components/TextBox'
import { getTextByKey } from './dialog'

export default async function handleUserAction(action: UserAction) {
  switch (action.id) {
    case 'print':
      displayTextBox({
        text: action.data[0],
        duration: true,
        prioritized: true,
      })
      break

    case 'printKey':
      displayTextBox({
        text: getTextByKey(action.data[0] as string),
        duration: true,
        prioritized: true,
      })
      break

    case 'printRandomKey':
      displayTextBox({
        text: getRandomElement(
          getTextByKey(action.data[0] as string) as string[]
        ),
        duration: true,
        prioritized: true,
      })
      break

    case 'hideObject':
      hideGameObject(action.data[0] as string)
      break

    case 'showObject':
      showGameObject(action.data[0] as string)
      break

    case 'delay':
      await sleep(parseInt(action.data[0] as string))
      break

    case 'ghost':
      const toGhost = getGameObject(action.data[0] as string)
      if (toGhost) {
        toGhost.ghost = true
        updateGameObject(toGhost)
      }
      break

    case 'unghost':
      const toUnghost = getGameObject(action.data[0] as string)
      if (toUnghost) {
        toUnghost.ghost = false
        updateGameObject(toUnghost)
      }
      break

    case 'goToRoom':
      goToAnotherRoom(action.data[0] as string)
      break

    case 'collect':
      const toCollect = getGameObject(action.data[0] as string)
      toCollect && collect(toCollect)
      break

    default:
      displayError({ message: 'invalid event id: ' + action.id, data: action })
  }
}
