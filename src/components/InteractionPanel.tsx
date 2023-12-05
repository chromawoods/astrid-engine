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
          style={{
            backgroundImage: `url(images/interactions/${i}.png)`,
          }}
          onClick={() => {
            info('interaction selected:', i)
            $currentInteraction.set(i)
          }}
        ></div>
      ))}
    </div>
  )
}
