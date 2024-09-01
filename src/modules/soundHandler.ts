import { $settings } from '../utils/store'
import { info } from '../utils/logger'

const sfxChannels = [new Audio(), new Audio(), new Audio()]
const soundDir = $settings.get().soundDir

export function playSound(sound: string) {
  if ($settings.get().useSfx === false) {
    return
  }

  info('playSound', sound)

  const channel = sfxChannels.find(
    (audio) => audio.readyState === 0 || audio.ended
  )

  if (channel) {
    channel.src = `${soundDir}/${sound}`
    channel.play()
  }
}
