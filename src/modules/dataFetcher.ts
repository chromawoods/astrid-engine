import type { GameData, GameSettings } from '../types'

import { $settings } from '../utils/store'
import { load } from 'js-yaml'

async function fetchJson(file: string) {
  const response = await fetch(file)
  return await response.json()
}

async function fetchYaml(file: string) {
  const yamlData = await fetch(file).then((response) => response.text())

  return load(yamlData)
}

export async function getGameData(): Promise<GameData> {
  return await ($settings.get().dataFileType === 'yaml'
    ? fetchYaml('/data.yaml')
    : fetchJson('/data.json'))
}

export async function getSettings(): Promise<GameSettings> {
  return await ($settings.get().dataFileType === 'yaml'
    ? fetchYaml('/settings.yaml')
    : fetchJson('/settings.json'))
}
