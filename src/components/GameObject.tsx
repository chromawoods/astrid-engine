import type { EventType, GameObject } from '../types'
import { $currentInteraction, $selectedInventoryItem } from '../utils/store'
import { useStore } from '@nanostores/react'
import { hideTextBox, showTextBox } from './TextBox'
import fireEvent from '../modules/event'

export default function GameObject(props: GameObject) {
  const { id, name, image } = props
  const currentInteraction = useStore($currentInteraction)
  const selectedInventoryItem = useStore($selectedInventoryItem)

  function handleClick() {
    if (selectedInventoryItem) {
      fireEvent({
        id: 'useItem',
        what: [selectedInventoryItem.id, id],
      })
    } else {
      fireEvent({
        id: currentInteraction as EventType,
        what: id,
      })
    }
  }

  return (
    <img
      src={props.isInInventory ? image.inventory : image.default}
      width={props.width}
      className={`ae-game-object ${id}`}
      style={{
        top: props.y,
        left: props.x,
      }}
      onMouseOver={() => {
        currentInteraction === 'none' && name && showTextBox({ text: name })
      }}
      onMouseOut={() => {
        currentInteraction === 'none' && name && hideTextBox()
      }}
      onClick={handleClick}
    />
  )
}
