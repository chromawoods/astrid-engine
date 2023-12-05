import { $settings } from './store'

type LogEntry = {
  message: string
  data?: unknown
  severity: 'info' | 'error'
}

const logs: LogEntry[] = []

const handleLog = (log: LogEntry) => {
  const settings = $settings.get()

  log.message = (log.severity === 'error' ? 'ERROR: ' : '') + log.message
  logs.push(log)

  if (settings.debug) {
    typeof log.data !== 'undefined'
      ? console[log.severity](log.message, log.data)
      : console[log.severity](log.message)
  }
}

export function info(message: string, data?: unknown) {
  handleLog({ message: message, severity: 'info', data: data })
}

export function error(message: string, data?: unknown) {
  handleLog({ message: message, severity: 'error', data: data })
}
