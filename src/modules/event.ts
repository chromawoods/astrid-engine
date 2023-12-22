import type { GameEvent } from '../types'
import doAction from './gameAction'
import handleScenario from './scenario'
import { info } from '../utils/logger'

export default async function fireEvent(event: GameEvent) {
  if (typeof event.data === 'string') {
    event.data = [event.data]
  }

  info('fireEvent:', event)

  const scenario = await handleScenario(event)

  if (!scenario || !scenario.preventDefault) {
    doAction(event)
  }
}
