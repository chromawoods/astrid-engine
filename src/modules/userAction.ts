import { hideGameObject, showGameObject } from '../utils/storeHelpers'

import type { UserAction } from '../types'
import { displayError } from '../components/AlertError'
import { displayTextBox } from '../components/TextBox'
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
      displayError({ message: 'invalid event id: ' + action.id, data: action })
  }
}
