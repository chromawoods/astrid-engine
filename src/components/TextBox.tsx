import { arrayify } from '../utils/helpers'
import { atom } from 'nanostores'
import { info } from '../utils/logger'
import { useStore } from '@nanostores/react'

type TextBoxProps = {
  text: string | string[]
  duration?: boolean
  prioritized?: boolean
}

const $textbox = atom<TextBoxProps | null>(null)

export let timer: number

export function displayTextBox(data: TextBoxProps) {
  data.text = arrayify(data.text)
    .map((item) => item.split('//'))
    .flat()

  if ($textbox.get()) {
    if (data.prioritized) {
      clearTextBox(true)
      displayTextBox(data)
    }
  } else {
    const currentText = data.text.shift() || ''

    $textbox.set({ ...data, text: currentText })

    if (data.duration) {
      timer = setTimeout(() => {
        clearTextBox(true)

        if (data.text.length) {
          displayTextBox(data)
        }
      }, 2000 + (currentText.length || 0) * 28)
    }
  }
}

export function clearTextBox(force: boolean = false) {
  const textbox = $textbox.get()

  if ((textbox && !textbox.duration) || force) {
    $textbox.set(null)
    timer && clearTimeout(timer)
  }
}

export default function TextBox() {
  const textbox = useStore($textbox)

  if (textbox?.text?.length) {
    info('textbox:', textbox)
    return <span className='ae-textbox'>{textbox.text}</span>
  }

  return null
}
