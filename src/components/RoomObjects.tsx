import { $gameObjects } from '../utils/store'
import RoomObject from './GameObject'
import { useStore } from '@nanostores/react'

type RoomObjectsProps = {
  objects: string[]
}

export default function RoomObjects(props: RoomObjectsProps) {
  const allObjects = useStore($gameObjects)

  return (
    <>
      {Object.values(allObjects)
        .filter(
          (obj) =>
            props.objects.includes(obj.id) && !obj.hidden && !obj.isInInventory
        )
        .map((ro) => (
          <RoomObject key={ro.id} {...ro} />
        ))}
    </>
  )
}
