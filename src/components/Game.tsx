import { $settings } from '../utils/store'
import View from './View'
import { info } from '../utils/logger'

export default function Game() {
  const settings = $settings.get()

  info('rendering game', settings)

  return (
    <div
      className={`ae-game ${settings.debug && 'ae-debug'}`}
      style={{
        width: settings.canvasWidth,
        height: settings.canvasHeight,
        backgroundColor: settings.defaultBackground,
      }}
    >
      <View />
    </div>
  )
}
