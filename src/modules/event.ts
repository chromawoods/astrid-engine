import type { Event } from '../types'
import { arrayify } from '../utils/helpers'
import doAction from './action'
import { info } from '../utils/logger'
import scenarioAction from './scenario'

export default function fireEvent(event: Event) {
  event.data = arrayify(event.data)

  info('fireEvent:', event)

  const scenario = scenarioAction(event)

  if (!scenario || !scenario.preventDefault) {
    doAction(event)
  }
}
