import { atom } from 'nanostores'
import { type TextBox as TextBoxType } from '../types'

import { info } from '../utils/logger'
import { useStore } from '@nanostores/react'

const $textbox = atom<TextBoxType | null>(null)

const $textboxHasActiveDuration = atom<boolean>(false)

export function showTextBox(data: TextBoxType) {
  if ($textboxHasActiveDuration.get() === false) {
    $textbox.set(data)

    if (data.duration) {
      $textboxHasActiveDuration.set(true)
      setTimeout(() => {
        $textboxHasActiveDuration.set(false)
        $textbox.set(null)
      }, 2000 + data.text.length * 30)
    }
  }
}

export function hideTextBox(force: boolean = false) {
  if ($textboxHasActiveDuration.get() === false || force) {
    $textbox.set(null)
  }
}

export default function TextBox() {
  const textbox = useStore($textbox)

  if (textbox?.text) {
    info('textbox:', textbox)
    return <span className='ae-textbox'>{textbox.text}</span>
  }

  return null
}
