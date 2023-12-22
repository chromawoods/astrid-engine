import type { GameEvent, Scenario, UserAction } from '../types'
import { atom, map } from 'nanostores'

import { $checkpoints } from '../utils/store'
import handleUserAction from './userAction'
import { info } from '../utils/logger'
import { paramsAreEqual } from '../utils/helpers'

const $scenarios = map<Scenario[]>([])

export const $ongoingScenario = atom<boolean>(false)

export const setScenarios = (scenarios: Scenario[]) => $scenarios.set(scenarios)

function getExecutableScenario(event: GameEvent) {
  return $scenarios.get().find((s) => {
    if (
      s.event.id === event.id &&
      paramsAreEqual(s.event.data, event.data) &&
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

async function iterateScenarioActions(actions: UserAction[]) {
  const action = actions.shift()

  action && (await handleUserAction(action))

  if (actions.length) {
    iterateScenarioActions(actions)
  } else {
    $ongoingScenario.set(false)
  }
}

export default async function handleScenario(event: GameEvent) {
  const scenario = getExecutableScenario(event)

  if (scenario) {
    $ongoingScenario.set(true)

    scenario.actions &&
      scenario.actions.length &&
      (await iterateScenarioActions(scenario.actions))

    if (scenario.isCheckpoint) {
      info('checkpoint reached', scenario.isCheckpoint)
      $checkpoints.set([...$checkpoints.get(), scenario.isCheckpoint])
    }

    scenario.reached = true
    $scenarios.set([...$scenarios.get(), scenario])
  }

  return scenario || null
}
