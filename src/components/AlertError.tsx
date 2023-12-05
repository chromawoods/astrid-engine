import { error } from '../utils/logger'

type AlertErrorProps = {
  message: string
  data?: unknown
}

export default function AlertError({ message, data }: AlertErrorProps) {
  error(message, data)
  return <div className='ae-error-message'>{message}</div>
}
