import type { EventType, GameObject } from '../types'
import { $currentInteraction } from '../utils/store'
import { useStore } from '@nanostores/react'
import { hideTextBox, showTextBox } from './TextBox'
import fireEvent from '../modules/event'

export default function GameObject(props: GameObject) {
  const { id, name, width, x, y, image } = props
  const currentInteraction = useStore($currentInteraction)

  return (
    <img
      src={`images/${image}`}
      width={width}
      className={`ae-game-object ${id}`}
      style={{
        top: y,
        left: x,
      }}
      onMouseOver={() => {
        currentInteraction === 'none' && name && showTextBox({ text: name })
      }}
      onMouseOut={() => {
        currentInteraction === 'none' && name && hideTextBox()
      }}
      onClick={() => {
        fireEvent({
          id: currentInteraction as EventType,
          what: id,
        })
      }}
    />
  )
}
