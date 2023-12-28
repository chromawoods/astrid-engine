import type { DeepObj } from '../types'
import { displayError } from '../components/AlertError'
import { getValueByKeyPath } from '../utils/helpers'
import { map } from 'nanostores'

type TextFormatter = 'color'

const $dialog = map<DeepObj>({ defaults: {} })

export const setDialog = (dialogData: DeepObj) => $dialog.set(dialogData)

export function getTextByKey(key: string): string {
  return getValueByKeyPath($dialog.get(), key)
}

export function getFormattedText(text: string) {
  const regex = /\/([a-z]+)[:]*([a-z0-9#]*)\//gi
  const matches = [...text.matchAll(regex)]

  // Will only assume one (1) missing closing tag
  let tagDiff = 0

  matches.forEach(([match, key, value]) => {
    if (value) {
      tagDiff++
      switch (key as TextFormatter) {
        case 'color':
          text = text.replace(match, `<span style="color:${value}">`)
          break
        default:
          displayError({
            message: 'invalid text formatter: ' + key,
            data: { match, key, value },
          })
      }
    } else {
      tagDiff--
      text = text.replace(match, '</span>')
    }
  })

  if (tagDiff) {
    text = text + '</span>'
  }

  return text
}
