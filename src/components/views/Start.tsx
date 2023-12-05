import { $nextView, $settings } from '../../utils/store'

export default function Start() {
  $nextView.set($settings.get().entryRoomId)
  return <div>Start</div>
}
