import { displayError } from './AlertError'
import type { Portal as PortalType, Room } from '../types'
import RoomObjects from './RoomObjects'
import { $settings } from '../utils/store'
import GameObject from './GameObject'

export default function Room({ room }: { room: Room }) {
  if (room) {
    return (
      <div
        className={`ae-room ${room.id}`}
        style={{
          backgroundImage:
            'url(' + $settings.get().imageDir + room.background + ')',
        }}
      >
        {room.objects && <RoomObjects objects={room.objects} />}
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
