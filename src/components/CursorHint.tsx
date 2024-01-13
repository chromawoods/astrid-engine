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

const setCursorImage = (image: string) => $cursorImage.set(image)

$currentInteraction.listen((ci) => {
  if (!$selectedInventoryItem.get()) {
    setCursorImage(
      !ci ? '' : `${$settings.get().imageDir}interactions/${ci}.png`
    )
  }
})

$selectedInventoryItem.listen((item) => {
  setCursorImage((item && !item.hidden && item.image?.inventory) || '')
})

export default function CursorHint(props: CursorProps) {
  const cursorImage = useStore($cursorImage)
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  useEffect(() => {
    info('setup mousemove listener')

    props.containerRef?.current?.addEventListener(
      'mousemove',
      (event: MouseEvent) => {
        if (cursorImage || $settings.get().debug) {
          const containerRect =
            props.containerRef?.current?.getBoundingClientRect() || {
              top: 0,
              left: 0,
            }
          setCoords({
            top: event.clientY - parseInt(containerRect.top.toString()),
            left: event.clientX - containerRect.left,
          })
        }
      }
    )
  }, [])

  return (
    <div
      className='ae-cursor-hint'
      style={{
        top: coords.top,
        left: coords.left,
        backgroundImage: cursorImage ? 'url(' + cursorImage + ')' : '',
      }}
    >
      <span className='ae-debug-elem'>
        {`x: ${coords.left}`}
        <br />
        {`y: ${coords.top}`}
      </span>
    </div>
  )
}
