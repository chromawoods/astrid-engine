import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'

const $globalLoadingState = atom<boolean>(false)

export const setLoadingState = (load: boolean) => $globalLoadingState.set(load)

export default function GlobalLoadingState() {
  const isLoading = useStore($globalLoadingState)

  return isLoading ? <div>Loading...</div> : null
}
