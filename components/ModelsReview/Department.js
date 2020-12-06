import { Component } from "react";
import styled from "@emotion/styled";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

export default class Department extends Component {
  componentDidMount() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    //add scene
    this.scene = new THREE.Scene();

    //add animation
    this.clock = new THREE.Clock();

    //add camera
    this.camera = new THREE.PerspectiveCamera(
      44,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    this.camera.position.z = 23;
    this.scene.add(this.camera);

    //add videotexture
    var vid = document.createElement("video");
    vid.src =
      "https://res.cloudinary.com/carlosvv18/video/upload/v1606188743/tbn6dodx3dhglhvihrwy.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();

    this.videoTexture = new THREE.VideoTexture(vid);
    this.videoTexture.format = THREE.RGBFormat;
    this.videoTexture.generateMipmaps = false;

    //add video geometry
    this.planeGeometry = new THREE.PlaneBufferGeometry(10.71, 6);
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
    this.renderer.toneMappingExposure = 0.8;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    //get viewport
    this.viewport = document.getElementById("WebGL");
    this.viewport.appendChild(this.renderer.domElement);

    //add postprocess
    this.renderPost = new RenderPass(this.scene, this.camera);
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(this.renderPost);

    //add GLTF
    this.gltfloader = new GLTFLoader();
    this.gltfloader.load(
      "https://res.cloudinary.com/carlosvv18/image/upload/v1606188629/q3xx9pjhfksdrxotrq7v.glb",
      (gltf) => {
        this.model = gltf.scene;
        this.model.scale.x = 1 / 20;
        this.model.scale.y = 1 / 20;
        this.model.scale.z = 1 / 20;
        this.model.rotation.y = Math.PI * 0.5;
        this.model.position.x = 4.31;
        this.model.position.y = -7.85;
        this.model.position.z = -6.4;

        this.scene.add(this.model);
      }
    );
    //add HDRI
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load(
        "https://res.cloudinary.com/carlosvv18/raw/upload/v1606188430/upgsgy680qhacxjwnggg.hdr",
        (texture) => {
          this.envMap = this.pmremGenerator.fromEquirectangular(
            texture
          ).texture;
          this.scene.background = this.envMap;
          this.scene.environment = this.envMap;
          texture.dispose();
          this.pmremGenerator.dispose();
        }
      );

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();
    this.scene.rotation.y = Math.PI * -0.7;

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
      <DepartmentWrapper>
        <div id="WebGL" className="WebGL"></div>
      </DepartmentWrapper>
    );
  }
}

const DepartmentWrapper = styled.div`
  position: relative;
  width: 100%;
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
