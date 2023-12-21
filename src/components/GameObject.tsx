import type { GameEventId, GameObject } from '../types'
import { $currentInteraction, $selectedInventoryItem } from '../utils/store'
import { useStore } from '@nanostores/react'
import { clearTextBox, displayTextBox } from './TextBox'
import fireEvent from '../modules/event'
import { resetInteraction } from '../modules/interaction'

export default function GameObject(props: GameObject) {
  const { id, name, image } = props
  const currentInteraction = useStore($currentInteraction)
  const selectedInventoryItem = useStore($selectedInventoryItem)

  function handleClick() {
    if (selectedInventoryItem) {
      fireEvent({
        id: 'useItem',
        data: [selectedInventoryItem.id, id],
      })
      $selectedInventoryItem.set(null)
    } else {
      fireEvent({
        id:
          props.isInInventory && currentInteraction === 'none'
            ? 'use'
            : (currentInteraction as GameEventId),
        data: [id],
      })
    }

    resetInteraction()
  }

  return (
    <div
      className={`ae-game-object ${id}`}
      style={{
        width: props.width,
        height: props.height || 'auto',
        top: props.y,
        left: props.x,
      }}
      onMouseOver={() => {
        currentInteraction === 'none' && name && displayTextBox({ text: name })
      }}
      onMouseOut={() => {
        currentInteraction === 'none' && name && clearTextBox()
      }}
      onClick={handleClick}
    >
      <span className='ae-debug-elem'>{id}</span>
      {image && (
        <img
          className='ae-game-object-image'
          src={props.isInInventory ? image.inventory : image.default}
        />
      )}
    </div>
  )
}
