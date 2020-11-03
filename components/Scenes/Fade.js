import * as THREE from "three";
import { extend } from "react-three-fiber";

export default class Fade extends THREE.ShaderMaterial {
  constructor() {
    super({
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
          value: 0,
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
  }

  get texture() {
    return this.uniforms.tDiffuse1.value;
  }
  set texture(v) {
    this.uniforms.tDiffuse1.value = v;
  }
  get texture2() {
    return this.uniforms.tDiffuse2.value;
  }
  set texture2(v) {
    this.uniforms.tDiffuse2.value = v;
  }
  get disp() {
    return this.uniforms.tMixTexture.value;
  }
  set disp(v) {
    this.uniforms.tMixTexture.value = v;
  }
  get dispFactor() {
    return this.uniforms.mixRatio.value;
  }
  set dispFactor(v) {
    this.uniforms.mixRatio.value = v;
  }
}

// register element in r3f (<fade />)
extend({ Fade });
