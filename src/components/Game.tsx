import listenForHotkeys, { $hotkeyAction } from '../modules/hotkeyHandler'

import { $settings } from '../utils/store'
import View from './View'
import { info } from '../utils/logger'
import { useEffect } from 'react'
import { useStore } from '@nanostores/react'

export default function Game() {
  const settings = $settings.get()
  const hotKeyAction = useStore($hotkeyAction)

  info('rendering game', settings)

  useEffect(() => {
    listenForHotkeys()
  }, [])

  return (
    <div
      className={`ae-game ${settings.debug && 'ae-debug'} ${
        hotKeyAction === 'debugView' && 'ae-debug-view'
      }`}
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
