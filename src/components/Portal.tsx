import fireEvent from '../modules/event'
import { type Portal as PortalType } from '../types'
import { $currentViewId } from '../utils/store'

export default function Portal({
  x,
  y,
  width,
  height,
  destination,
}: PortalType) {
  return (
    <div
      className='ae-portal'
      style={{ top: y, left: x, width: width, height: height }}
      onClick={() => {
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
