import { displayError } from './AlertError'
import type { Portal as PortalType, Room } from '../types'
import { $gameObjects, $settings } from '../utils/store'
import GameObject from './GameObject'
import { useStore } from '@nanostores/react'

export default function Room({ room }: { room: Room }) {
  if (room) {
    const allObjects = useStore($gameObjects)
    const roomObjects = Object.values(allObjects).filter(
      (obj) => obj.room === room.id && !obj.hidden && !obj.isInInventory
    )

    return (
      <div
        className={`ae-room ${room.id}`}
        style={{
          backgroundImage:
            'url(' + $settings.get().imageDir + room.background + ')',
        }}
      >
        {roomObjects.map((ro) => (
          <GameObject key={ro.id} {...ro} />
        ))}
        {room.portals?.map((p: PortalType) => (
          <GameObject
            key={'portal-' + p.destination}
            id={p.destination}
            portalDestination={p.destination}
            {...p}
          />
        ))}
      </div>
    )
  } else {
    displayError({ message: 'invalid room data' })
  }
}
