import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef } from 'react'
import { useSpring, a } from 'react-spring/three'

export default function Model({ category, animated, project }) {
  const loader = useLoader(GLTFLoader, `${category.modelo[0].url}`)
  const object = loader.scene
  const ref = useRef()
  const props = useSpring({
    scale: animated ? 0 : 1,
    rotation: animated ? 6.6 : 0.3,
    scalemodel: project ? [1.1, 1.1, 1.1] : [1, 1, 1],
  })

  return (
    <group>
      <a.mesh
        ref={ref}
        scale-x={props.scale.interpolate({
          range: [0, 0.1, 0.3, 0.5, 1],
          output: [0.8, 0.8, 0.9, 0, 0],
        })}
        scale-y={props.scale.interpolate({
          range: [0, 0.1, 0.3, 0.5, 1],
          output: [0.8, 0.8, 0.9, 0, 0],
        })}
        scale-z={props.scale.interpolate({
          range: [0, 0.1, 0.3, 0.5, 1],
          output: [0.8, 0.8, 0.9, 0, 0],
        })}
      >
        <a.primitive
          scale={props.scalemodel}
          rotation-y={props.rotation}
          object={object}
        />
      </a.mesh>
    </group>
  )
}
