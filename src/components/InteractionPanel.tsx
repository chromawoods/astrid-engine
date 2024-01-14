import { $currentInteraction, $settings } from '../utils/store'

import { info } from '../utils/logger'

const interactionTypes = $settings.get().interactionTypes

export default function InteractionPanel() {
  return (
    <div className='ae-interaction-panel'>
      {interactionTypes.map((i) => (
        <div
          key={'interaction-' + i}
          className='ae-interaction'
          onClick={() => {
            info('interaction selected:', i)
            $currentInteraction.set(i)
          }}
        >
          <img
            className='ae-interaction-image'
            src={`${$settings.get().imageDir}interactions/${i}.png`}
          />
        </div>
      ))}
    </div>
  )
}
