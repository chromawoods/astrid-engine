import { useState, type MutableRefObject, useEffect } from 'react'
import { info } from '../utils/logger'
import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'
import {
  $currentInteraction,
  $selectedInventoryItem,
  $settings,
} from '../utils/store'

type CursorProps = {
  containerRef: MutableRefObject<HTMLElement | null>
}

const $cursorImage = atom<string>('')

export const setCursorImage = (image: string) => $cursorImage.set(image)

$currentInteraction.listen((ci) => {
  if (!$selectedInventoryItem.get()) {
    setCursorImage(
      ci === 'none' ? '' : `${$settings.get().imageDir}interactions/${ci}.png`
    )
  }
})

$selectedInventoryItem.listen((item) => {
  item && setCursorImage(item.image.inventory)
})

export default function CursorHint(props: CursorProps) {
  const cursorImage = useStore($cursorImage)
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  useEffect(() => {
    info('setting up mousemove listener')

    props.containerRef?.current?.addEventListener(
      'mousemove',
      (event: MouseEvent) => {
        setCoords({
          top: event.y,
          left: event.x,
        })
      }
    )
  }, [])

  return cursorImage ? (
    <div
      className='ae-cursor-hint'
      style={{
        top: coords.top,
        left: coords.left,
        backgroundImage: 'url(' + cursorImage + ')',
      }}
    ></div>
  ) : null
}
