import type { Action, GameObjects, Scenario, ScenarioData } from '../types'
import GlobalLoadingState, { setLoadingState } from './GlobalLoadingState'
import { getGameData, getSettings } from '../modules/dataFetcher'
import { useEffect, useState } from 'react'

import { $settings } from '../utils/store'
import Game from './Game'
import { info } from '../utils/logger'
import { setGameData } from '../utils/storeHelpers'

setLoadingState(true)

function normalizeGameObjects(obj: GameObjects) {
  const imageDir = $settings.get().imageDir

  for (const prop in obj) {
    const gameObject = obj[prop]

    if (gameObject.image) {
      if (typeof gameObject.image === 'string') {
        gameObject.image = {
          default: imageDir + gameObject.image,
          inventory: imageDir + gameObject.image,
        }
      } else {
        gameObject.image.default = imageDir + gameObject.image.default
        gameObject.image.inventory =
          imageDir +
          (gameObject.image.inventory
            ? gameObject.image.inventory
            : gameObject.image.default)
      }
    }
  }

  return obj
}

function normalizeScenarioData(obj: ScenarioData[]): Scenario[] {
  return obj.map((s) => {
    const eventParams = s.event.split(' ')
    const eventId = eventParams.shift() || ''

    const actions: Action[] = s.actions
      ? s.actions.map((a) => {
          const actionParams = a.split(' ')
          const actionId = actionParams.shift()
          if (actionId === 'print') {
            return { id: actionId, what: [actionParams.join(' ')] } as Action
          } else {
            return { id: actionId, what: actionParams } as Action
          }
        })
      : []

    return {
      ...s,
      event: { id: eventId, what: eventParams },
      actions: actions,
    } as Scenario
  })
}

export default function GameLoader() {
  const [isGameLoaded, setIsGameLoaded] = useState(false)

  useEffect(() => {
    getSettings().then((userSettings) => {
      const settings = { ...$settings.get(), ...userSettings }

      $settings.set(settings)
      info('settings set', settings)

      getGameData().then((gameData) => {
        // @TODO validate game data here!

        setGameData({
          objects: normalizeGameObjects(gameData.objects),
          rooms: gameData.rooms,
          dialog: gameData.dialog,
          scenarios: normalizeScenarioData(gameData.scenarios),
        })

        setLoadingState(false)
        setIsGameLoaded(true)
      })
    })
  }, [])

  return (
    <>
      {isGameLoaded && <Game />}
      <GlobalLoadingState />
    </>
  )
}
