import AlertError from './AlertError'
import Portal from './Portal'
import type { Portal as PortalType, Room } from '../types'
import RoomObjects from './RoomObjects'
import { $settings } from '../utils/store'

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
          <Portal key={'portal-' + p.destination} {...p} />
        ))}
      </div>
    )
  } else {
    return <AlertError message='Could not render room' />
  }
}
