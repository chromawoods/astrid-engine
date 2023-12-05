import type { Event } from '../types'
import doAction from './action'
import { info } from '../utils/logger'
import scenarioAction from './scenario'

export default function fireEvent(event: Event) {
  info('fireEvent:', event)

  const scenario = scenarioAction(event)

  if (!scenario || !scenario.preventDefault) {
    doAction(event)
  }
}
