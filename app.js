import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById("ocean");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
camera.position.set(0, 24, 42);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2 - 0.12;
controls.minDistance = 10;
controls.maxDistance = 120;
controls.enablePan = false;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
sunLight.position.set(18, 40, 22);
scene.add(sunLight);

const surfaceColor = new THREE.Color("#6fc4ff");
const midColor = new THREE.Color("#4ea3db");
const depthColor = new THREE.Color("#2a6fa3");

const uniforms = {
  uTime: { value: 0 },
  uWaveHeight: { value: 0.85 },
  uWindSpeed: { value: 1.1 },
  uLightStrength: { value: 1 },
  uSurfaceColor: { value: surfaceColor },
  uMidColor: { value: midColor },
  uDepthColor: { value: depthColor },
  uChoppiness: { value: 0.6 },
};

const geometry = new THREE.PlaneGeometry(160, 160, 240, 240);
geometry.rotateX(-Math.PI / 2);

const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: /* glsl */ `
    precision highp float;

    uniform float uTime;
    uniform float uWaveHeight;
    uniform float uWindSpeed;
    uniform float uChoppiness;
    varying vec3 vNormal;
    varying vec3 vPos;
    varying float vHeight;

    vec3 getPosition(vec3 position) {
      vec2 p = position.xz * 0.3;
      float t = uTime * uWindSpeed;
      float wave1 = sin(p.x * 1.3 + t * 1.4);
      float wave2 = cos(p.y * 1.1 - t * 0.9);
      float diagonal = sin((p.x + p.y) * 0.9 + t * 0.7);
      float choppy = sin(p.x * 0.6 - t * 0.6) * cos(p.y * 0.5 + t * 0.8);

      float height = (wave1 * 0.5 + wave2 * 0.35 + diagonal * 0.25) * uWaveHeight;
      float chopOffset = choppy * uChoppiness * uWaveHeight * 0.15;

      return vec3(position.x + chopOffset, height, position.z + chopOffset);
    }

    void main() {
      vec3 displaced = getPosition(position);
      float eps = 0.35;
      vec3 displacedX = getPosition(position + vec3(eps, 0.0, 0.0));
      vec3 displacedZ = getPosition(position + vec3(0.0, 0.0, eps));
      vec3 normal = normalize(cross(displacedZ - displaced, displacedX - displaced));

      vNormal = normal;
      vPos = displaced;
      vHeight = displaced.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision mediump float;

    uniform float uLightStrength;
    uniform vec3 uSurfaceColor;
    uniform vec3 uMidColor;
    uniform vec3 uDepthColor;
    varying vec3 vNormal;
    varying vec3 vPos;
    varying float vHeight;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(vec3(0.6, 1.2, 0.4));
      float diffuse = max(dot(normal, lightDir), 0.0);

      float heightMask = smoothstep(-5.0, 9.0, vHeight);
      float depthMask = smoothstep(-11.0, 2.0, vHeight);
      vec3 base = mix(uDepthColor, uMidColor, depthMask);
      base = mix(base, uSurfaceColor, heightMask);

      float fresnel = pow(1.0 - max(dot(normal, normalize(-vPos)), 0.0), 3.0);
      vec3 light = base * (0.55 + diffuse * 0.9) * uLightStrength;
      light += fresnel * vec3(0.22, 0.34, 0.42) * 1.4 * uLightStrength;

      gl_FragColor = vec4(light, 1.0);
    }
  `,
  transparent: false,
  side: THREE.DoubleSide,
  flatShading: false,
});

const ocean = new THREE.Mesh(geometry, material);
scene.add(ocean);

const grid = new THREE.GridHelper(180, 40, 0x4ea3db, 0x14304b);
grid.position.y = -6;
grid.material.opacity = 0.3;
grid.material.transparent = true;
scene.add(grid);

const fogColor = new THREE.Color("#0b1b2c");
scene.fog = new THREE.Fog(fogColor, 30, 190);
renderer.setClearColor(fogColor);

const windInput = document.getElementById("wind");
const heightInput = document.getElementById("waveHeight");
const lightInput = document.getElementById("light");
const weatherSelect = document.getElementById("weather");
const windValue = document.getElementById("windValue");
const heightValue = document.getElementById("heightValue");
const lightValue = document.getElementById("lightValue");

function updateLabels() {
  windValue.textContent = `${Number(windInput.value).toFixed(0)} km/h`;
  heightValue.textContent = `${Number(heightInput.value).toFixed(0)} cm`;
  lightValue.textContent = `${Math.round(parseFloat(lightInput.value) * 100)}%`;
}

function updateSimulation() {
  const wind = parseFloat(windInput.value);
  const waveHeight = parseFloat(heightInput.value);
  const light = parseFloat(lightInput.value);

  uniforms.uWindSpeed.value = 0.5 + wind / 34;
  uniforms.uWaveHeight.value = 0.35 + waveHeight / 26;
  uniforms.uChoppiness.value = 0.3 + wind / 120;
  uniforms.uLightStrength.value = light;

  ambientLight.intensity = 0.45 * light;
  sunLight.intensity = 0.8 * light + 0.4;

  updateLabels();
}

function setWeather(theme) {
  const themes = {
    calm: {
      bg: "linear-gradient(140deg, #9ddcff, #2c5e88)",
      fog: "#0f2032",
      light: 0.95,
    },
    breeze: {
      bg: "linear-gradient(150deg, #8ec5fc, #1c3b57)",
      fog: "#0b1b2c",
      light: 1,
    },
    cloudy: {
      bg: "linear-gradient(160deg, #8fa4bf, #2c3a55)",
      fog: "#0c1625",
      light: 0.85,
    },
    storm: {
      bg: "linear-gradient(160deg, #1b2735, #0f1624)",
      fog: "#060b13",
      light: 0.65,
    },
  };

  const config = themes[theme];
  document.body.style.background = config.bg;
  scene.fog.color.set(config.fog);
  renderer.setClearColor(config.fog);

  lightInput.value = config.light;
  updateSimulation();
}

function onResize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function animate(time) {
  const seconds = time * 0.001;
  uniforms.uTime.value = seconds;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

windInput.addEventListener("input", updateSimulation);
heightInput.addEventListener("input", updateSimulation);
lightInput.addEventListener("input", updateSimulation);
weatherSelect.addEventListener("change", (e) => setWeather(e.target.value));
window.addEventListener("resize", onResize);

updateLabels();
updateSimulation();
setWeather(weatherSelect.value);
onResize();
requestAnimationFrame(animate);
