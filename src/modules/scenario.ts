import type { GameEvent, Scenario, UserAction } from '../types'
import { arrayify, paramsAreEqual } from '../utils/helpers'
import { atom, map } from 'nanostores'

import { $checkpoints } from '../utils/store'
import handleUserAction from './userAction'
import { info } from '../utils/logger'

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
      const reachedCheckpoints = $checkpoints.get()

      if (s.requiresCheckpoint.length) {
        return arrayify(s.requiresCheckpoint).every((ch) =>
          reachedCheckpoints.includes(ch)
        )
      }

      if (s.anyCheckpoint.length) {
        return arrayify(s.anyCheckpoint).some((ch) =>
          reachedCheckpoints.includes(ch)
        )
      }

      return true
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
