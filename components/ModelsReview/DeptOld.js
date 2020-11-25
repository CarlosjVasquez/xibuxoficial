import styled from "@emotion/styled";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

export default function WineReviews() {
  useEffect(() => {
    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var frameId;

    //add scene
    var scene = new THREE.Scene();

    //add animation
    var clock = new THREE.Clock();

    var mixers = [];

    //add camera
    var camera = new THREE.PerspectiveCamera(
      44,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.z = 23;
    scene.add(camera);

    // //add videotexture

    var vid = document.createElement("video");
    vid.src =
      "https://res.cloudinary.com/carlosvv18/video/upload/v1606188743/tbn6dodx3dhglhvihrwy.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();

    var videoTexture = new THREE.VideoTexture(vid);
    videoTexture.format = THREE.RGBFormat;
    videoTexture.generateMipmaps = false;

    //add video geometry
    var planeGeometry = new THREE.PlaneBufferGeometry(10.71, 6);
    var planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x898989,
      map: videoTexture,
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    scene.add(plane);

    //add renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("#000000");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = THREE.sRGBEncoding;

    //get viewport
    var viewport = document.getElementById("WebGL");
    viewport.appendChild(renderer.domElement);

    //add postprocess
    var renderPost = new RenderPass(scene, camera);

    var composer = new EffectComposer(renderer);
    composer.addPass(renderPost);

    //add GLTF

    var gltfloader = new GLTFLoader();
    gltfloader.load(
      "https://res.cloudinary.com/carlosvv18/image/upload/v1606188629/q3xx9pjhfksdrxotrq7v.glb",
      (gltf) => {
        var model = gltf.scene;
        model.scale.x = 1 / 20;
        model.scale.y = 1 / 20;
        model.scale.z = 1 / 20;
        model.rotation.y = Math.PI * 0.5;
        model.position.x = 4.31;
        model.position.y = -7.85;
        model.position.z = -6.4;
        scene.add(model);
      }
    );

    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load(
        "https://res.cloudinary.com/carlosvv18/raw/upload/v1606188430/upgsgy680qhacxjwnggg.hdr",
        (texture) => {
          var envMap = pmremGenerator.fromEquirectangular(texture).texture;
          scene.background = envMap;
          scene.environment = envMap;
          texture.dispose();
        }
      );

    scene.rotation.y = Math.PI * -0.7;

    renderer.autoClear = false;

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);

    function start() {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    }
    function stop() {
      cancelAnimationFrame(frameId);
    }
    function onDocumentMouseMove(e) {
      mouseX = (e.clientX - windowHalfX) * 0.009;
      mouseY = (e.clientY - windowHalfY) * 0.004;
    }
    function onWindowResize(e) {
      e.stopPropagation();
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      composer.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      frameId = window.requestAnimationFrame(animate);
      renderScene();
    }

    function renderScene() {
      camera.position.x += (mouseX - camera.position.x) * 0.09;
      camera.position.y += (-mouseY - camera.position.y) * 0.09;

      camera.lookAt(scene.position);
      composer.render(scene, camera);

      if (vid) {
        if (vid.paused) return;
        if (vid.readyState === vid.HAVE_ENOUGH_DATA) {
          vid.needsUpdate = true;
        }
      }
    }

    window.addEventListener("load", start);

    return () => {
      window.removeEventListener("resize", onWindowResize, false);
      document.removeEventListener("mousemove", onDocumentMouseMove, false);

      stop();
    };
  });

  return (
    <StyledCanvas>
      <div id="WebGL"></div>
    </StyledCanvas>
  );
}

const StyledCanvas = styled.div`
  #WebGL {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`;
