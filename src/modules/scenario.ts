import type { Event, Scenario } from '../types'

import { $checkpoints } from '../utils/store'
import doAction from './action'
import { info } from '../utils/logger'
import { map } from 'nanostores'

const $scenarios = map<Scenario[]>([])

export const setScenarios = (scenarios: Scenario[]) => $scenarios.set(scenarios)

function getExecutableScenario(event: Event) {
  return $scenarios.get().find((s) => {
    if (
      s.event === event.id &&
      s.what === event.what &&
      (!s.reached || s.repeat)
    ) {
      if (s.requiresCheckpoint) {
        const reachedCheckpoints = $checkpoints.get()

        const cpts =
          typeof s.requiresCheckpoint === 'string'
            ? [s.requiresCheckpoint]
            : s.requiresCheckpoint

        return cpts.every((ch) => reachedCheckpoints.includes(ch))
      } else {
        return true
      }
    }
  })
}

export default function scenarioAction(event: Event) {
  const scenario = getExecutableScenario(event)

  if (scenario && (scenario.actions || scenario.isCheckpoint)) {
    scenario.actions?.forEach(doAction)

    if (scenario.isCheckpoint) {
      info('checkpoint reached', scenario.isCheckpoint)
      $checkpoints.set([...$checkpoints.get(), scenario.isCheckpoint])
    }

    scenario.reached = true
    $scenarios.set([...$scenarios.get(), scenario])
  }

  return scenario || null
}
