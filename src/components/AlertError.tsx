import { atom } from 'nanostores'
import { error as logError } from '../utils/logger'
import { useStore } from '@nanostores/react'

type ErrorProps = {
  message: string
  data?: unknown
}

const $error = atom<ErrorProps | undefined>()

export function displayError(error: ErrorProps) {
  $error.set(error)
}

export default function AlertError() {
  const error = useStore($error)

  if (error) {
    logError(error.message, error.data)
    return <div className='ae-error-message'>{error.message}</div>
  }

  return null
}
