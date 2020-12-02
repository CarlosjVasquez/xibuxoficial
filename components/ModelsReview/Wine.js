import { Component } from "react";
import styled from "@emotion/styled";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

export default class wine extends Component {
  componentDidMount() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    //add scene
    this.scene = new THREE.Scene();

    //add animation
    this.clock = new THREE.Clock();
    this.mixers = [];

    //add camera
    this.camera = new THREE.PerspectiveCamera(
      34,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    this.camera.position.z = 25;

    //add videotexture
    var vid = document.createElement("video");
    vid.src =
      "https://res.cloudinary.com/carlosvv18/video/upload/v1606165168/sybe14znrktc7efdarxt.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();

    this.videoTexture = new THREE.VideoTexture(vid);
    this.videoTexture.format = THREE.RGBFormat;
    this.videoTexture.generateMipmaps = false;

    //add video geometry
    this.planeGeometry = new THREE.PlaneBufferGeometry(10, 5.6);
    this.planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x898989,
      map: this.videoTexture,
    });
    this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
    this.scene.add(this.plane);

    //add renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.4;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    //get viewport
    this.viewport = document.getElementById("WebGL");
    this.viewport.appendChild(this.renderer.domElement);

    //add postprocess
    this.renderPost = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 0.2;
    this.bloomPass.radius = 2;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(this.renderPost);
    this.composer.addPass(this.bloomPass);

    //add GLTF
    this.gltfloader = new GLTFLoader();
    this.gltfloader.load(
      "https://res.cloudinary.com/carlosvv18/image/upload/v1606175368/nv9nxaexyubx0dsr6ztz.glb",
      (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
      }
    );
    this.gltfloader = new GLTFLoader();
    this.gltfloader.load(
      "https://res.cloudinary.com/carlosvv18/image/upload/v1606879759/mqat78cpn8hh5npy6t0j.glb",
      (gltf) => {
        this.model = gltf.scene;
        this.model.position.y = -4;
        this.model.position.x = 0;
        this.model.position.z = 0;
        this.model.rotation.y = Math.PI * -0.5;
        this.scene.add(this.model);

        this.clip = gltf.animations[0];
        this.mixer = new THREE.AnimationMixer(this.model);
        this.mixer.clipAction(this.clip.optimize()).play();
        this.mixers.push(this.mixer);
      }
    );
    //add lights
    this.lightAmbient = new THREE.AmbientLight({ color: 0xffffff }, 0.4);
    this.lightDirectional = new THREE.DirectionalLight(
      { color: 0xffffff },
      0.2
    );
    this.scene.add(this.lightAmbient);
    this.scene.add(this.lightDirectional);

    this.renderer.autoClear = false;

    //run function
    this.start();

    window.addEventListener("resize", this.onWindowResize, false);
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize, false);
    document.removeEventListener("mousemove", this.onDocumentMouseMove, false);

    this.viewport.removeChild(this.renderer.domElement);
    this.stop();
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  onDocumentMouseMove = (e) => {
    this.mouseX = (e.clientX - this.windowHalfX) * 0.009;
    this.mouseY = (e.clientY - this.windowHalfY) * 0.004;
  };
  onWindowResize = (e) => {
    e.stopPropagation();
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
  animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.renderScene();
    const delta = this.clock.getDelta();
    for (let i = 0; i < this.mixers.length; i++) {
      this.mixers[i].update(delta);
    }
  };
  renderScene = () => {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.09;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.09;

    this.camera.lookAt(this.scene.position);
    this.composer.render(this.scene, this.camera);

    if (this.video) {
      if (this.video.paused) return;
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        this.videoTexture.needsUpdate = true;
      }
    }
  };

  render() {
    return (
      <WineWrapper>
        <div id="WebGL" className="WebGL"></div>
      </WineWrapper>
    );
  }
}

const WineWrapper = styled.div`
  width: 100%;
  position: relative;
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
    z-index: 3;
  }
`;
