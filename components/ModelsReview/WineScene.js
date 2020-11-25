import styled from "@emotion/styled";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { apply } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { Suspense } from "react";
import Wine from "./Wine";

apply({ EffectComposer, RenderPass });

export default function ScenesReviews() {
  const composer = useRef();
  useEffect(() => {
    composer.current && console.log(composer);
  });

  return (
    <StyledCanvas>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        camera={{ position: [0, 0, 25] }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <effectComposer ref={composer}>
          <renderPass attachArray="passes" />
        </effectComposer>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 4, 0]} intensity={0.2} />
        <Suspense fallback={null}>
          <group>
            <Wine />
          </group>
        </Suspense>
      </Canvas>
    </StyledCanvas>
  );
}

const StyledCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
