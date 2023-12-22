import handleScenario, { $ongoingScenario } from './scenario'

import type { GameEvent } from '../types'
import handleGameAction from './gameAction'
import { info } from '../utils/logger'

export default async function fireEvent(event: GameEvent) {
  if ($ongoingScenario.get()) {
    return
  }

  if (typeof event.data === 'string') {
    event.data = [event.data]
  }

  info('fireEvent:', event)

  const scenario = await handleScenario(event)

  if (!scenario || !scenario.preventDefault) {
    handleGameAction(event)
  }
}
