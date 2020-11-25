import { useLoader } from "react-three-fiber";
import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import { useAspect } from "drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

export default function wine() {
  const video = useState(() => {
    const vid = document.createElement("video");
    vid.src =
      "https://res.cloudinary.com/carlosvv18/video/upload/v1606165168/sybe14znrktc7efdarxt.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();

    return vid;
  });

  const meshVideo = useRef();
  const meshModel = useRef();

  const loadermodel = useLoader(
    GLTFLoader,
    "https://res.cloudinary.com/carlosvv18/image/upload/v1606175368/nv9nxaexyubx0dsr6ztz.glb"
  );
  const object = loadermodel.scene;

  useEffect(() => {
    // meshVideo.current && console.log(meshVideo);
    meshModel.current && console.log(meshModel);
  });
  const scale = useAspect(
    "cover", // Aspect ratio: cover | ... more to come, PR's welcome ;)
    720, // Pixel-width
    406, // Pixel-height
    0.25 // Optional scaling factor
  );
  return (
    <>
      <mesh scale={scale}>
        <planeBufferGeometry args={[1, 1]} />
        <meshBasicMaterial ref={meshVideo} color={0x999999}>
          <videoTexture attach="map" args={video} />
        </meshBasicMaterial>
      </mesh>
      <group>
        <mesh ref={meshModel}>
          <primitive object={object} />
        </mesh>
      </group>
    </>
  );
}

const WineWrapper = styled.div`
  .VideoWebGL {
    display: none;
  }

  .WebGL {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: all 0.5s linear;
    overflow: hidden;
    z-index: -1;
  }
`;
