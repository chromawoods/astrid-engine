import GlobalLoadingState, { setLoadingState } from './GlobalLoadingState'
import { getGameData, getSettings } from '../modules/dataFetcher'
import { useEffect, useState } from 'react'

import { $settings } from '../utils/store'
import Game from './Game'
import { info } from '../utils/logger'
import { setGameData } from '../utils/storeHelpers'

setLoadingState(true)

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
          objects: gameData.objects,
          rooms: gameData.rooms,
          dialog: gameData.dialog,
          scenarios: gameData.scenarios,
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
