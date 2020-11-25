import styled from "@emotion/styled";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

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
      34,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.z = 25;
    scene.add(camera);

    // //add videotexture

    var vid = document.createElement("video");
    vid.src =
      "https://res.cloudinary.com/carlosvv18/video/upload/v1606165168/sybe14znrktc7efdarxt.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();

    var videoTexture = new THREE.VideoTexture(vid);
    videoTexture.format = THREE.RGBFormat;
    videoTexture.generateMipmaps = false;

    //add video geometry
    var planeGeometry = new THREE.PlaneBufferGeometry(10, 5.6);
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
    renderer.toneMappingExposure = 0.4;
    renderer.outputEncoding = THREE.sRGBEncoding;

    //get viewport
    var viewport = document.getElementById("WebGL");
    viewport.appendChild(renderer.domElement);

    //add postprocess
    var renderPost = new RenderPass(scene, camera);
    var bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 0.2;
    bloomPass.radius = 2;

    var composer = new EffectComposer(renderer);
    composer.addPass(renderPost);
    composer.addPass(bloomPass);

    //add GLTF

    var gltfloader = new GLTFLoader();
    gltfloader.load(
      "https://res.cloudinary.com/carlosvv18/image/upload/v1606175368/nv9nxaexyubx0dsr6ztz.glb",
      (gltf) => {
        var model = gltf.scene;
        scene.add(model);
      }
    );
    // gltfloader = new GLTFLoader();
    // gltfloader.load("./GLTF/particulas.gltf", (gltf) => {
    //   var model = gltf.scene;
    //   model.position.y = -4;
    //   model.position.x = 0;
    //   model.position.z = 0;
    //   model.rotation.y = Math.PI * -0.5;

    //   var clip = gltf.animations[0];
    //   mixer = new THREE.AnimationMixer(model);
    //   mixer.clipAction(clip.optimize()).play();
    //   mixers.push(mixer);

    //  scene.add(model);
    // });
    // gltfloader = new GLTFLoader();
    // gltfloader.load("./GLTF/wine2.gltf", (gltf) => {
    //   var model = gltf.scene;
    //   model.position.y = -4;
    //   model.position.x = 0;
    //   model.position.z = 0;
    //   model.rotation.y = Math.PI * -0.5;

    //   scene.add(model);
    // });
    //add lights
    var lightAmbient = new THREE.AmbientLight({ color: 0xffffff }, 0.4);
    var lightDirectional = new THREE.DirectionalLight({ color: 0xffffff }, 0.2);
    scene.add(lightAmbient);
    scene.add(lightDirectional);

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
      //   const delta = clock.getDelta();
      //   for (let i = 0; i < mixers.length; i++) {
      //     mixers[i].update(delta);
      //   }
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
