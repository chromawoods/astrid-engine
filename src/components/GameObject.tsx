import type { GameEventId, GameObject } from '../types'
import {
  $currentInteraction,
  $currentViewId,
  $selectedInventoryItem,
} from '../utils/store'
import { useStore } from '@nanostores/react'
import fireEvent from '../modules/event'
import { handleLook, resetInteraction } from '../modules/interaction'
import { getTextByKey } from '../modules/dialog'
import { displayTextBox } from './TextBox'

export default function GameObject(props: GameObject) {
  const { id, name, textLook, image, ghost, portalDestination, isInInventory } =
    props
  const currentInteraction = useStore($currentInteraction)
  const selectedInventoryItem = useStore($selectedInventoryItem)

  function handlePortalInteraction() {
    if (selectedInventoryItem) {
      displayTextBox({
        text: [(getTextByKey('defaults.useItem') as string) || ''],
        duration: true,
        prioritized: true,
      })
      $selectedInventoryItem.set(null)
    } else {
      switch (currentInteraction) {
        case 'look':
          handleLook(textLook)
          break
        default:
          fireEvent({
            id: 'leaveRoom',
            data: [$currentViewId.get(), portalDestination as string],
          })
      }
      resetInteraction()
    }
  }

  function handleClick() {
    if (ghost) {
      return
    }

    if (portalDestination) {
      handlePortalInteraction()
      return
    }

    if (selectedInventoryItem) {
      fireEvent({
        id: 'useItem',
        data: [selectedInventoryItem.id, id],
      })
      $selectedInventoryItem.set(null)
    } else if (isInInventory && !currentInteraction) {
      fireEvent({
        id: 'use',
        data: [id],
      })
    } else if (currentInteraction) {
      fireEvent({
        id: currentInteraction as GameEventId,
        data: [id],
      })
    } else {
      fireEvent({
        id: 'nonInteractiveClick',
        data: [id],
      })
    }

    resetInteraction()
  }

  return (
    <div
      className={`ae-game-object ${id} ${ghost ? 'is-ghost' : ''} ${
        portalDestination ? 'is-portal' : ''
      }`}
      style={{
        width: props.width,
        height: props.height || 'auto',
        top: props.y,
        left: props.x,
      }}
      onMouseOver={() => {
        !ghost && name && fireEvent({ id: 'hoverObject', data: [name] })
      }}
      onMouseOut={() => {
        !ghost && name && fireEvent({ id: 'hoverObjectOut', data: [] })
      }}
      onClick={handleClick}
    >
      <span className='ae-debug-elem'>{id}</span>
      {image && (
        <img
          className='ae-game-object-image'
          src={isInInventory ? image.inventory : image.default}
        />
      )}
    </div>
  )
}
