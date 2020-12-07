import styled from '@emotion/styled'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from 'drei'

import { Suspense } from 'react'
import Model from './Model'

export default function SceneThree({ category, active, project }) {
  return (
    <StyledCanvas>
      <div className={project ? 'active scene' : 'inactive scene'}>
        <Canvas
          pixelRatio={window.devicePixelRatio}
          camera={{ position: [0, 0, 20] }}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.outputEncoding = THREE.sRGBEncoding
          }}
        >
          <OrbitControls enablePan={false} enableZoom={false} />
          <ambientLight intensity={0.5} />
          <pointLight position={[-10, 20, 20]} />
          <Suspense fallback={null}>
            <group>
              {category &&
                category.map((item, key) => {
                  if (item.active) {
                    return (
                      <Model
                        key={key}
                        category={item}
                        animated={key === active}
                        project={project}
                      />
                    )
                  }
                })}
            </group>
          </Suspense>
        </Canvas>
      </div>
    </StyledCanvas>
  )
}

const StyledCanvas = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  overflow: hidden;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 40%,
    rgba(149, 217, 246, 1) 100%
  );
  canvas {
    outline: none;
  }
  .scene {
    position: absolute;
    width: 100%;
    height: 50%;
    top: 0;
    transition: all 0.5s linear;
  }
  .active {
    z-index: 0;
    opacity: 0;
  }
  .inactive {
    z-index: 2;
    left: 0;
    transform: translateY(25%);
  }
  @media screen and (min-width: 400px) and (orientation: landscape) {
    .scene {
      width: 60%;
      height: 100%;
    }
    .active {
      z-index: 8;
      left: 0;
      opacity: 1;
    }
    .inactive {
      z-index: 2;
      left: 100%;
      transform: translateX(-95%);
    }
  }
  @media screen and (min-width: 900px) {
    .active {
      transform: translateX(15%);
    }
  }
`
