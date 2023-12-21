import type { GameEvent } from '../types'
import doAction from './gameAction'
import handleScenario from './scenario'
import { info } from '../utils/logger'

export default function fireEvent(event: GameEvent) {
  if (typeof event.data === 'string') {
    event.data = [event.data]
  }

  info('fireEvent:', event)

  const scenario = handleScenario(event) //scenarioAction(event)

  if (!scenario || !scenario.preventDefault) {
    doAction(event)
  }
}
