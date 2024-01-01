import { useStore } from '@nanostores/react'
import fireEvent from '../modules/event'
import { type Portal as PortalType } from '../types'
import { $currentInteraction, $currentViewId } from '../utils/store'

export default function Portal({
  name,
  x,
  y,
  width,
  height,
  destination,
}: PortalType) {
  const currentInteraction = useStore($currentInteraction)

  return (
    <div
      className='ae-portal'
      style={{ top: y, left: x, width: width, height: height }}
      onMouseOver={() => {
        name && fireEvent({ id: 'hoverObject', data: [name] })
      }}
      onMouseOut={() => {
        name && fireEvent({ id: 'hoverObjectOut', data: [] })
      }}
      onClick={() => {
        !currentInteraction &&
          fireEvent({
            id: 'leaveRoom',
            data: [$currentViewId.get(), destination],
          })
      }}
    >
      <span className='ae-debug-elem'>{destination}</span>
    </div>
  )
}
