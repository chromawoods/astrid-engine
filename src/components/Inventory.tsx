import { $gameObjects } from '../utils/store'
import InventoryItem from './GameObject'
import { computed } from 'nanostores'
import { useStore } from '@nanostores/react'

const $inventoryItems = computed($gameObjects, (objects) =>
  Object.values(objects).filter((obj) => obj.isInInventory && !obj.hidden)
)

export default function Inventory() {
  const items = useStore($inventoryItems)

  return (
    <>
      <div className='ae-inventory'>
        {items.map((item) => (
          <InventoryItem key={item.id} {...item} />
        ))}
      </div>
    </>
  )
}
