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
    <>
      {settings.dialogFont && (
        <link
          rel='preload'
          href={`./fonts/${settings.dialogFont}`}
          as='font'
          crossOrigin='anonymous'
        />
      )}
      {settings.headingFont && (
        <link
          rel='preload'
          href={`./fonts/${settings.headingFont}`}
          as='font'
          crossOrigin='anonymous'
        />
      )}

      <style>
        {settings.dialogFont &&
          `@font-face {
          font-family: "dialog";
          src: url("./fonts/${settings.dialogFont}");
        }`}
        {settings.headingFont &&
          `@font-face {
          font-family: "heading";
          src: url("./fonts/${settings.headingFont}");
        }`}
      </style>

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
    </>
  )
}
