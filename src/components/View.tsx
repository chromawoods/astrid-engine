import { $currentViewId, $nextView, getCurrentRoom } from '../utils/store'
import ViewTransition, { transitionIn, transitionOut } from './ViewTransition'

import type { View } from '../types'
import type { ReactElement } from 'react'
import Start from './views/Start'
import { atom } from 'nanostores'
import fireEvent from '../modules/event'
import { useStore } from '@nanostores/react'
import InGame from './views/InGame'

const $viewContent = atom<ReactElement | null>(null)

function isRoom(id: View) {
  return id !== 'ae_system_start'
}

function getViewContent(id: View) {
  if (isRoom(id)) {
    const room = getCurrentRoom()
    return room ? <InGame room={room} /> : null
  } else {
    return <Start />
  }
}

function switchView(id: View) {
  $currentViewId.set(id)
  id &&
    transitionIn(() => {
      $viewContent.set(getViewContent(id))
      transitionOut(() => {
        isRoom(id) && fireEvent({ id: 'enterRoom', data: [id] })
      })
    })
}

$nextView.subscribe(switchView)

export default function View() {
  const viewContent = useStore($viewContent)

  return (
    <>
      <ViewTransition />
      {viewContent}
    </>
  )
}
