import { Component } from 'react'
import styled from '@emotion/styled'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Water } from 'three/examples/jsm/objects/Water'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

export default class Fragrance extends Component {
  componentDidMount() {
    this.mouseX = 0
    this.mouseY = 0
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2

    // add scene
    this.scene = new THREE.Scene()

    // add animation
    this.clock = new THREE.Clock()
    this.mixers = []

    // add camera
    this.camera = new THREE.PerspectiveCamera(
      34,
      window.innerWidth / window.innerHeight,
      1,
      500
    )
    this.camera.position.z = 25

    // add videotexture
    const vid = document.createElement('video')
    vid.src =
      'https://res.cloudinary.com/carlosvv18/video/upload/v1606189264/nui4ncdmpbbkwaioqvoi.mp4'
    vid.crossOrigin = 'Anonymous'
    vid.loop = true
    vid.muted = true
    vid.play()

    const aud = document.createElement('audio')
    aud.src =
      'https://res.cloudinary.com/carlosvv18/video/upload/v1607962054/u6xp5gtvgoh95b25lyh6.mp3'
    aud.crossOrigin = 'Anonymous'
    aud.loop = true

    this.videoTexture = new THREE.VideoTexture(vid)
    this.videoTexture.format = THREE.RGBFormat
    this.videoTexture.generateMipmaps = false

    // add video geometry
    this.planeGeometry = new THREE.PlaneBufferGeometry(10, 5.6)
    this.planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x898989,
      map: this.videoTexture,
    })
    this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial)
    this.scene.add(this.plane)

    // add hdr texture
    this.sphereGeometry = new THREE.SphereBufferGeometry(100, 100, 60)
    this.sphereGeometry.scale(-1, 1, 1)
    this.sphereTexture = new THREE.TextureLoader().load(
      'https://res.cloudinary.com/carlosvv18/image/upload/v1606875679/w80b873x9lw25ydaurhl.jpg',
      () => {
        this.addHdr = true
      }
    )
    this.sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: this.sphereTexture,
    })
    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
    this.sphere.position.y = -3
    this.sphere.rotation.y = Math.PI * -0.12
    this.scene.add(this.sphere)

    // add renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 0.5
    this.renderer.outputEncoding = THREE.sRGBEncoding

    // get viewport
    this.viewport = document.getElementById('WebGL')
    this.viewport.appendChild(this.renderer.domElement)

    // add postprocess
    this.renderPost = new RenderPass(this.scene, this.camera)
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    )
    this.bloomPass.threshold = 0
    this.bloomPass.strength = 0.4
    this.bloomPass.radius = 1

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(this.renderPost)
    this.composer.addPass(this.bloomPass)

    // add water
    this.waterGeometry = new THREE.PlaneBufferGeometry(1000, 1000)
    this.water = new Water(this.waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        'https://res.cloudinary.com/carlosvv18/image/upload/v1606190145/hwbszds2kbsj3siqp1wd.jpg',
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }
      ),
      alpha: 1.0,
      waterColor: 0x003e3f,
      distortionScale: 4.7,
      fog: this.scene.fog !== undefined,
    })
    this.water.position.y = -2.8
    this.water.rotation.x = Math.PI * -0.5
    this.scene.add(this.water)

    // add GLTF
    this.gltfloader = new GLTFLoader()
    this.gltfloader.load(
      'https://res.cloudinary.com/carlosvv18/image/upload/v1606190545/blp7wsrtsixfyvvv7n82.glb',
      (gltf) => {
        this.model = gltf.scene
        this.model.position.y = -3
        this.model.position.x = -11
        this.model.position.z = -3
        this.model.rotation.y = Math.PI * -0.3
        this.scene.add(this.model)

        this.clip = gltf.animations[0]
        this.mixer = new THREE.AnimationMixer(this.model)
        this.mixer.timeScale = 0.3
        this.mixer.clipAction(this.clip.optimize()).play()
        this.mixers.push(this.mixer)
      }
    )
    this.gltfloader = new GLTFLoader()
    this.gltfloader.load(
      'https://res.cloudinary.com/carlosvv18/image/upload/v1606190544/zizfctna482gfhi03dtz.glb',
      (gltf) => {
        this.model = gltf.scene
        this.model.position.y = -3.5
        this.model.position.x = -40
        this.model.position.z = -70
        this.model.rotation.y = Math.PI * -0.7
        this.scene.add(this.model)

        this.clip = gltf.animations[0]
        this.mixer = new THREE.AnimationMixer(this.model)
        this.mixer.timeScale = 0.3
        this.mixer.clipAction(this.clip.optimize()).play()
        this.mixers.push(this.mixer)
      }
    )
    this.gltfloader = new GLTFLoader()
    this.gltfloader.load(
      'https://res.cloudinary.com/carlosvv18/image/upload/v1606190545/wc3yhvvp7ixryjtnyhee.glb',
      (gltf) => {
        this.model = gltf.scene
        this.model.position.y = -3.5
        this.model.position.x = 11
        this.model.position.z = 6
        this.scene.add(this.model)

        this.clip = gltf.animations[0]
        this.mixer = new THREE.AnimationMixer(this.model)
        this.mixer.clipAction(this.clip.optimize()).play()
        this.mixers.push(this.mixer)
      }
    )
    this.gltfloader = new GLTFLoader()
    this.gltfloader.load(
      'https://res.cloudinary.com/carlosvv18/image/upload/v1606190545/dza3uyglrx3mq2pk3tad.glb',
      (gltf) => {
        this.model = gltf.scene
        this.model.scale.x = 1 / 3
        this.model.scale.y = 1 / 3
        this.model.scale.z = 1 / 3
        this.model.position.y = -3
        this.model.position.x = 30
        this.model.position.z = -50
        this.scene.add(this.model)

        this.clip = gltf.animations[0]
        this.mixer = new THREE.AnimationMixer(this.model)
        this.mixer.clipAction(this.clip.optimize()).play()
        this.mixers.push(this.mixer)
      }
    )

    // add lights
    this.lightAmbient = new THREE.AmbientLight({ color: 0xffffff }, 0.3)
    this.lightDirectional = new THREE.DirectionalLight({ color: 0xffffff }, 0.2)
    this.scene.add(this.lightAmbient)
    this.scene.add(this.lightDirectional)

    this.renderer.autoClear = false

    // run function
    this.start()

    window.addEventListener('resize', this.onWindowResize, false)
    document.addEventListener('mousemove', this.onDocumentMouseMove, false)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize, false)
    document.removeEventListener('mousemove', this.onDocumentMouseMove, false)

    this.viewport.removeChild(this.renderer.domElement)
    this.stop()
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }
  onDocumentMouseMove = (e) => {
    this.mouseX = (e.clientX - this.windowHalfX) * 0.009
    this.mouseY = (e.clientY - this.windowHalfY) * 0.004
  }
  onWindowResize = (e) => {
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.composer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
  animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate)
    this.renderScene()

    const delta = this.clock.getDelta()
    for (let i = 0; i < this.mixers.length; i++) {
      this.mixers[i].update(delta)
    }
  }
  renderScene = () => {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.09
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.09

    this.camera.lookAt(this.scene.position)
    this.composer.render(this.scene, this.camera)

    this.water.material.uniforms['time'].value += 0.05 / 60.0

    if (this.video) {
      if (this.video.paused) return
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        this.videoTexture.needsUpdate = true
      }
    }
  }

  render() {
    return (
      <FragranceWrapper>
        <div id="WebGL" className="WebGL"></div>
      </FragranceWrapper>
    )
  }
}

const FragranceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`
