import { hideGameObject, showGameObject } from '../utils/storeHelpers'

import type { UserAction } from '../types'
import { displayTextBox } from '../components/TextBox'
import { error } from '../utils/logger'
import { getTextByKey } from './dialog'

export default function handleUserAction(action: UserAction) {
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

    case 'hideObject':
      hideGameObject(action.data[0] as string)
      break

    case 'showObject':
      showGameObject(action.data[0] as string)
      break

    default:
      error('invalid event id', action.id)
  }
}
