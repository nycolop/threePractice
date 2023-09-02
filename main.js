import WebGL from "three/addons/capabilities/WebGL.js";
import App from "./src/components/App";

document.oncontextmenu = (e) => {
  e.preventDefault();
}

const app = new App();

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  app.start();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
