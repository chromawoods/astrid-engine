import { atom } from 'nanostores'
import { type TextBox as TextBoxType } from '../types'

import { info } from '../utils/logger'
import { useStore } from '@nanostores/react'

const $textbox = atom<TextBoxType | null>(null)

export let timer: number

export function showTextBox(data: TextBoxType) {
  if ($textbox.get()) {
    if (data.prioritized) {
      $textbox.set(null)
      timer && clearTimeout(timer)
      showTextBox(data)
    }
  } else {
    $textbox.set(data)

    if (data.duration) {
      timer = setTimeout(() => {
        hideTextBox(true)
      }, 2000 + data.text.length * 30)
    }
  }
}

export function hideTextBox(force: boolean = false) {
  const textbox = $textbox.get()

  if ((textbox && !textbox.duration) || force) {
    $textbox.set(null)
    timer && clearTimeout(timer)
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
