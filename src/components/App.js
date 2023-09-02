import * as THREE from "three";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

class App {
  WINDOW_WIDTH = window.innerWidth;
  WINDOW_HEIGHT = window.innerHeight;

  constructor() {
    this.fov = 75;
    this.far = 1000;
    this.near = 0.1;
    this.aspectRatio = this.WINDOW_WIDTH / this.WINDOW_HEIGHT;
    this.resolution = {
      width: this.WINDOW_WIDTH, // / 2, for better performance
      height: this.WINDOW_HEIGHT, // / 2, for better performance
    };
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.near,
      this.far
    );
    this.notResizeScreen = true;
    this.controls = new FirstPersonControls(
      this.camera,
      this.renderer.domElement
    );
  }

  start = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;
    this.controls.movementSpeed = 1;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.loop();
  };

  loop = () => {
    requestAnimationFrame(this.loop);

    this.cameraResize();
    // this.controls.update();

    this.renderer.render(this.scene, this.camera);
  };

  cameraResize = () => {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.controls.handleResize();
    });
  };
}

export default App;
