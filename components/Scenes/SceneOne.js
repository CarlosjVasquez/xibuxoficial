import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  ACESFilmicToneMapping,
  sRGBEncoding,
  Object3D,
  BoxBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  Vector3,
  AmbientLight,
  MeshPhongMaterial,
  LinearFilter,
  RGBFormat,
  WebGLRenderTarget,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "./glitch";

import useGetWindowSize from "../hooks/useGetWindowSize";

function SceneOne({ gltfs }) {
  const [sceneActive, setSceneActive] = useState(1);
  const { API_URL } = process.env;

  const { width, height } = useGetWindowSize();
  const onCanvasLoaded = (canvas) => {
    if (!canvas) {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.outputEncoding = sRGBEncoding;

    const ambientLight = new AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    Objects.map((object, index) => {
      if (index == sceneActive) {
        scene.add(object);
      }
    });

    const geometry = new BoxBufferGeometry(5, 5, 5);
    const material = new MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    cube.position.set(0, 0, 0);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const glitch = new GlitchPass();
    composer.addPass(glitch);

    animate({ composer });

    window.addEventListener("resize", handleResize({ camera, composer }));
  };

  const Objects = gltfs.map((item) => {
    const object = new Object3D();

    const gltfloader = new GLTFLoader();
    gltfloader.load(`${API_URL + item.gltf.url}`, (gltf) => {
      let model = gltf.scene;
      model.position.set(0, 0, 0);
      model.rotation.y = 2;
      object.add(model);
    });
    object.position.set(3, 0, 0);
    object.rotation.y = -0.2;
    return object;
  });

  const animate = ({ composer }) => {
    window.requestAnimationFrame(() => animate({ composer }));

    composer.render();
  };

  const handleResize = ({ camera, composer }) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    composer.render();
  };

  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize);
  });

  const onClickHandle = () => {
    sceneActive == 0 ? setSceneActive(1) : setSceneActive(0);
  };

  return (
    <StyledScene>
      <canvas ref={onCanvasLoaded}></canvas>
      <a onClick={onClickHandle}>Click</a>
    </StyledScene>
  );
}

const StyledScene = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  canvas div {
    position: absolute;
    z-index: 500;
  }
  a {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    cursor: pointer;
  }
`;

export default SceneOne;
