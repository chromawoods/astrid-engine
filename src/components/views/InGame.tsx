import CursorHint from '../CursorHint'
import InteractionPanel from '../InteractionPanel'
import Inventory from '../Inventory'
import Room from '../Room'
import type { Room as RoomType } from '../../types'
import TextBox from '../TextBox'
import { useRef } from 'react'

export default function InGame(props: { room: RoomType }) {
  const gameContainer = useRef(null)

  return (
    <div ref={gameContainer} style={{ height: '100%' }}>
      <InteractionPanel />
      <TextBox />
      <Inventory />
      <Room room={props.room} />
      <CursorHint containerRef={gameContainer} />
    </div>
  )
}
