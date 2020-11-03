import * as THREE from "three";
import { useLoader, useFrame } from "react-three-fiber";
import lerp from "lerp";

import { useRef, useState } from "react";

import "./Fade";

export default function ShaderEffect({ url1, url2 }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [
    "images/xibux.png",
    "images/xibux-logo.png",
    "textures/transition/transition1.png",
  ]);

  useFrame(
    () =>
      (ref.current.material.dispFactor = lerp(
        ref.current.material.dispFactor,
        hovered ? 1 : 0,
        0.1
      ))
  );

  return (
    <mesh
      ref={ref}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <fade
        attach="material"
        texture={texture1}
        texture2={texture2}
        disp={dispTexture}
      />
    </mesh>
  );
}
