const micButton = document.getElementById("micButton");
const fallbackButton = document.getElementById("fallbackButton");
const meterFill = document.getElementById("meterFill");
const message = document.getElementById("message");
const candles = Array.from(document.querySelectorAll(".candle"));
const confettiCanvas = document.getElementById("confetti");
const balloonsContainer = document.getElementById("balloons");

let candlesLit = 5;
let celebration = false;
let audioContext;
let analyser;
let dataArray;
let baseline = 0;
let threshold = 0;
let blowStart = null;
let lastExtinguish = 0;
let animationId = null;
let confettiParticles = [];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const balloonColors = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#bdb2ff",
  "#ffc6ff",
];

function updateMeter(value) {
  const percent = Math.min(100, Math.max(0, value * 100));
  meterFill.style.width = `${percent}%`;
}

function extinguishCandle(index) {
  const candle = candles[index];
  if (!candle || !candle.classList.contains("lit")) return;
  candle.classList.remove("lit");
  candle.classList.add("smoke");
  setTimeout(() => candle.classList.remove("smoke"), 2000);
  candlesLit -= 1;
  if (candlesLit <= 0) {
    startCelebration();
  }
}

function startCelebration() {
  if (celebration) return;
  celebration = true;
  document.body.classList.add("celebration");
  message.focus?.();
  spawnBalloons();
  startConfetti();
}

function spawnBalloons() {
  const count = prefersReducedMotion ? 8 : 14;
  balloonsContainer.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.background =
      balloonColors[i % balloonColors.length] || "#ffd6a5";
    balloon.style.animationDelay = `${Math.random() * 4}s`;
    balloon.style.marginLeft = `${Math.random() * 30}px`;
    balloonsContainer.appendChild(balloon);
  }
}

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function startConfetti() {
  resizeCanvas();
  const ctx = confettiCanvas.getContext("2d");
  if (!ctx) return;
  const amount = prefersReducedMotion ? 60 : 140;
  confettiParticles = Array.from({ length: amount }, () => createConfetti());

  const animate = () => {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach((particle) => {
      particle.y += particle.speed;
      particle.x += particle.drift;
      particle.rotation += particle.spin;
      if (particle.y > confettiCanvas.height + 20) {
        particle.y = -10;
        particle.x = Math.random() * confettiCanvas.width;
      }
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();
    });
    animationId = requestAnimationFrame(animate);
  };

  if (!animationId) {
    animationId = requestAnimationFrame(animate);
  }
}

function createConfetti() {
  return {
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    size: Math.random() * 6 + 4,
    color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    speed: Math.random() * 2 + 1,
    drift: Math.random() * 1 - 0.5,
    rotation: Math.random() * Math.PI,
    spin: Math.random() * 0.1 - 0.05,
  };
}

function computeRms(buffer) {
  let sum = 0;
  for (let i = 0; i < buffer.length; i += 1) {
    const value = buffer[i];
    sum += value * value;
  }
  return Math.sqrt(sum / buffer.length);
}

function detectBlow() {
  if (!analyser) return;
  analyser.getFloatTimeDomainData(dataArray);
  const rms = computeRms(dataArray);
  const normalized = Math.min(1, rms * 4);
  updateMeter(normalized);

  const now = Date.now();
  if (rms > threshold) {
    if (!blowStart) {
      blowStart = now;
    }
    const duration = now - blowStart;
    if (duration > 450 && now - lastExtinguish > 700) {
      const nextIndex = candles.findIndex((c) => c.classList.contains("lit"));
      if (nextIndex !== -1) {
        extinguishCandle(nextIndex);
        lastExtinguish = now;
      }
      blowStart = null;
    }
  } else {
    blowStart = null;
  }

  requestAnimationFrame(detectBlow);
}

async function calibrate() {
  const samples = [];
  const start = performance.now();
  while (performance.now() - start < 1000) {
    analyser.getFloatTimeDomainData(dataArray);
    samples.push(computeRms(dataArray));
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  baseline = samples.reduce((acc, val) => acc + val, 0) / samples.length;
  threshold = baseline + Math.max(0.02, baseline * 1.8);
}

async function initMic() {
  micButton.disabled = true;
  micButton.textContent = "Ativando...";
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    dataArray = new Float32Array(analyser.fftSize);
    source.connect(analyser);
    await calibrate();
    micButton.textContent = "Microfone ativo ✅";
    detectBlow();
  } catch (error) {
    micButton.textContent = "Microfone indisponível";
    fallbackButton.classList.remove("hidden");
    console.error("Microfone indisponível", error);
  } finally {
    micButton.disabled = false;
  }
}

fallbackButton.addEventListener("click", () => {
  const nextIndex = candles.findIndex((c) => c.classList.contains("lit"));
  if (nextIndex !== -1) {
    extinguishCandle(nextIndex);
  }
});

micButton.addEventListener("click", () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    micButton.textContent = "Microfone indisponível";
    fallbackButton.classList.remove("hidden");
    return;
  }
  initMic();
});

window.addEventListener("resize", () => {
  if (celebration) {
    resizeCanvas();
  }
});
