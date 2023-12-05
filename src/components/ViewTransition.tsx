import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'

const $className = atom<string>('')

const transitionDuration = 300

export const transitionIn = (onComplete: () => void) => {
  $className.set('is-transition-start')
  setTimeout(onComplete, transitionDuration)
}

export const transitionOut = (onComplete: () => void) => {
  $className.set('')
  setTimeout(onComplete, transitionDuration)
}

export default function ViewTransition() {
  const className = useStore($className)

  return <div className={'ae-transition ' + className}></div>
}
