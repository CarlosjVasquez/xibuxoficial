import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import * as THREE from "three/build/three.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Interaction } from "three.interaction";

function SceneTwo({ gltfs }) {
  const { API_URL } = process.env;
  const [text, setText] = useState(0);

  useEffect(() => {
    var clock = new THREE.Clock();

    var canvas;
    var renderer;
    var transition;
    var composer;
    var renderPass;
    var activeTransition = true;
    var transitionCount = 0;
    var textureval = 3;
    var first = 0;
    var second = true;
    var scenestotal = 0;

    function Transition(scenes) {
      this.scene = new THREE.Scene();

      this.cameraOrtho = new THREE.OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        -10,
        10
      );

      this.textures = [];

      var loader = new THREE.TextureLoader();

      for (var i = 0; i < 4; i++)
        this.textures[i] = loader.load(
          "textures/transition/transition" + (i + 1) + ".png"
        );

      this.quadmaterial = new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse1: {
            type: "t",
            value: null,
          },
          tDiffuse2: {
            type: "t",
            value: null,
          },
          mixRatio: {
            type: "f",
            value: 0.0,
          },
          threshold: {
            value: 0.1,
          },
          useTexture: {
            value: 1,
          },
          tMixTexture: {
            value: this.textures[textureval],
          },
        },
        vertexShader: `
  varying vec2 vUv;
  void main() {
  vUv = vec2( uv.x, uv.y );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
        fragmentShader: `
  uniform float mixRatio;
  
  uniform sampler2D tDiffuse1;
  uniform sampler2D tDiffuse2;
  uniform sampler2D tMixTexture;
  
  uniform int useTexture;
  uniform float threshold;
  
  varying vec2 vUv;
  
  void main() {
  
  vec4 texel1 = texture2D( tDiffuse1, vUv );
  vec4 texel2 = texture2D( tDiffuse2, vUv );
  
  if(useTexture==1){
    vec4 transitionTexel = texture2D( tMixTexture, vUv );
    float r = mixRatio * (1.0 + threshold * 2.0) - threshold;
    float mixf=clamp((transitionTexel.r - r)*(1.0/threshold), 0.0, 1.0);
  
    gl_FragColor = mix( texel1, texel2, mixf );
  }else{
    gl_FragColor = mix( texel2, texel1, mixRatio );
  }
  
  
  }`,
      });

      var quadgeometry = new THREE.PlaneGeometry(
        window.innerWidth,
        window.innerHeight
      );

      this.quad = new THREE.Mesh(quadgeometry, this.quadmaterial);
      this.scene.add(this.quad);

      // Link both scenes and their FBOs

      this.scenas = [];
      for (var i = 0; i < scenestotal; i++) {
        var scenea = scenes[i];
        this.scenas.push(scenea);
      }

      this.sceneA = this.scenas[first];
      this.sceneB = this.scenas[first + 1];

      this.quadmaterial.uniforms.tDiffuse1.value = this.scenas[
        first + 1
      ].fbo.texture;
      this.quadmaterial.uniforms.tDiffuse2.value = this.scenas[
        first
      ].fbo.texture;

      this.needChange = false;

      let transitionParams = {
        transition: 0,
        transitionSpeed: 1.0,
      };

      this.changeTDiffuseRight = function () {
        if (second) {
          this.sceneB = scenes[scenestotal - 1 > first ? first + 1 : 0];

          this.quadmaterial.uniforms.tDiffuse1.value =
            scenes[scenestotal - 1 > first ? first + 1 : 0].fbo.texture;
        } else {
          this.sceneA = scenes[scenestotal - 1 > first ? first + 1 : 0];

          this.quadmaterial.uniforms.tDiffuse2.value =
            scenes[scenestotal - 1 > first ? first + 1 : 0].fbo.texture;
        }
      };
      this.changeTDiffuseLeft = function () {
        if (second) {
          this.sceneB = scenes[first < 1 ? scenestotal - 1 : first - 1];

          this.quadmaterial.uniforms.tDiffuse1.value =
            scenes[first < 1 ? scenestotal - 1 : first - 1].fbo.texture;
        } else {
          this.sceneA = scenes[first < 1 ? scenestotal - 1 : first - 1];

          this.quadmaterial.uniforms.tDiffuse2.value =
            scenes[first < 1 ? scenestotal - 1 : first - 1].fbo.texture;
        }
      };

      this.change = function () {
        this.quadmaterial.uniforms.tMixTexture.value = this.textures[
          textureval
        ];
      };

      this.renderS = function (delta) {
        transitionParams.transition = THREE.Math.smoothstep(
          transitionCount,
          0,
          1
        );

        this.quadmaterial.uniforms.mixRatio.value = transitionParams.transition;

        // Prevent render both scenes when it's not necessary
        if (transitionParams.transition == 0) {
          this.sceneA.renderS(delta, false);
        } else if (transitionParams.transition == 1) {
          this.sceneB.renderS(delta, false);
        } else {
          this.sceneA.renderS(delta, true);
          this.sceneB.renderS(delta, true);
          this.sceneA.addScene();
          this.sceneB.addScene();
          renderer.setRenderTarget(null);
          renderer.clear();
          composer = new EffectComposer(renderer);
          renderPass = new RenderPass(this.scene, this.cameraOrtho);
          composer.addPass(renderPass);
          composer.render();
        }
      };
    }

    const updateObjects = gltfs.map((item) => {
      const object = new THREE.Object3D();

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

    function Scene(model) {
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 10;

      // Setup scene
      this.scene = new THREE.Scene();
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      var renderTargetParameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
      };
      this.fbo = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        renderTargetParameters
      );

      this.obj = updateObjects[model];
      this.scene.add(this.obj);

      var interaction = new Interaction(renderer, this.scene, this.camera);

      // this.obj.on("click", handleClick);

      this.clearScene = function () {
        this.scene.remove(this.obj);
      };
      this.addScene = function () {
        this.scene.add(this.obj);
      };

      this.renderS = function (delta, rtt) {
        if (rtt) {
          renderer.setRenderTarget(this.fbo); // addition
          renderer.clear();
          renderer.render(this.scene, this.camera);
        } else {
          renderer.setRenderTarget(null);
          renderer.clear();
          renderer.render(this.scene, this.camera);
        }
      };
    }

    function init() {
      canvas = document.getElementById("renderElement");

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.sortObjects = false;
      renderer.autoClear = false;

      var scenes = [];

      for (var i = 0; i < updateObjects.length; i++) {
        var sc = new Scene(i);
        scenes.push(sc);
      }

      scenestotal = updateObjects.length;

      transition = new Transition(scenes);

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);

      renderS();
    }

    function renderS() {
      transition.renderS(clock.getDelta());
    }

    function handleClick() {
      activeTransition ? (activeTransition = false) : (activeTransition = true);
      // textureval = Math.floor(Math.random() * 3);
      if (activeTransition) {
        var timeID = setInterval(() => {
          transitionCount -= 0.02;
        }, 25);
      } else {
        var timeID = setInterval(() => {
          transitionCount += 0.02;
        }, 25);
      }

      setTimeout(() => {
        clearInterval(timeID);
      }, 1500);
      transition.change();
    }

    function handleClickRight() {
      handleClick();
      setTimeout(() => {
        scenestotal - 1 > first ? (first += 1) : (first = 0);
        second ? (second = false) : (second = true);
        transition.changeTDiffuseRight();
      }, 1500);
      second ? (text = 1) : (text = 0);
    }

    function handleClickLeft() {
      handleClick();
      setTimeout(() => {
        first < 1 ? (first = scenestotal - 1) : (first -= 1);
        second ? (second = false) : (second = true);
        transition.changeTDiffuseLeft();
      }, 1500);
    }

    window.addEventListener("load", init);
    document
      .getElementById("handleClickLeft")
      .addEventListener("click", handleClickLeft);
    document
      .getElementById("handleClickRight")
      .addEventListener("click", handleClickRight);

    return () => {
      window.removeEventListener("load", init);
      document
        .getElementById("handleClickLeft")
        .removeEventListener("click", handleClickLeft);
      document
        .getElementById("handleClickRight")
        .removeEventListener("click", handleClickRight);
    };
  });

  useEffect(() => {
    const handleClick = () => {
      text == 0 ? setText(1) : setText(0);
    };

    document.getElementById("btnsss").addEventListener("click", handleClick);
  });

  return (
    <StyledScene>
      <canvas id="renderElement"></canvas>
      <div className="btns">
        <a id={"handleClickLeft"}>Left</a>
        <a id={"handleClickRight"}>Right</a>
      </div>
      <div id="btnsss" className="text">
        <h1>{text}</h1>
      </div>
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
  .btns {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: flex;
    flex-direction: row;
    a {
      cursor: pointer;
      margin: 0 10px;
    }
  }
  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default SceneTwo;
