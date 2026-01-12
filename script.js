const photoInput = document.getElementById("photoInput");
const uploadHint = document.getElementById("uploadHint");
const canvas = document.getElementById("artCanvas");
const playButton = document.getElementById("playButton");
const downloadButton = document.getElementById("downloadButton");
const caption = document.getElementById("caption");
const flowerTemplate = document.getElementById("flowerTemplate");
const ctx = canvas.getContext("2d");

let originalImage = null;
let imageAnalysis = null;
let lastEffect = "";
let activeEffect = null;
const interactiveStamps = [];

const flowerEmojis = ["🌸", "🌺", "🌼", "💐", "🌷", "🪷"];
const doodleShapes = ["heart", "flower", "wave", "rainbow", "sparkle", "cloud"];

const effects = [
  {
    name: "Colagem de giz",
    draw: (image, analysis) => {
      ctx.save();
      ctx.filter = "saturate(1.25) contrast(1.1)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      drawChalkGlow(analysis);
      drawChalkFrame(analysis, 24);
      drawDoodles(analysis, 28);
    },
  },
  {
    name: "Jardim fofinho",
    draw: (image, analysis) => {
      ctx.save();
      ctx.filter = "brightness(1.05) saturate(1.2)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      drawSoftWash("rgba(255, 204, 236, 0.25)");
      drawChalkFlowers(analysis, 16);
      drawSparkleDust(analysis, 40);
    },
  },
  {
    name: "Mar & arco-íris",
    draw: (image, analysis) => {
      ctx.save();
      ctx.filter = "saturate(1.3) contrast(1.08)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      drawSoftWash("rgba(120, 210, 255, 0.18)");
      drawWaves(analysis, 10);
      drawRainbow(analysis);
      drawDoodles(analysis, 12);
    },
  },
  {
    name: "Aurora psicodélica",
    draw: (image, analysis) => {
      ctx.save();
      ctx.filter = "hue-rotate(80deg) saturate(1.6)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      drawAuroraVeils(analysis);
      drawChalkGlow(analysis);
      drawSparkleDust(analysis, 50);
    },
  },
  {
    name: "Giz romântico",
    draw: (image, analysis) => {
      ctx.save();
      ctx.filter = "grayscale(0.05) contrast(1.05)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      drawChalkFrame(analysis, 30);
      drawDoodles(analysis, 34);
      drawSoftWash("rgba(255, 255, 255, 0.08)");
    },
  },
];

const captions = [
  "Você é arte, Raissa. 💞",
  "Cada versão é um jeitinho meu de te admirar.",
  "Feliz aniversário, meu amorzinho!",
  "Brincar com sua foto deixa meu coração quentinho.",
];

function resizeCanvas(image) {
  const maxSize = 900;
  const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  canvas.width = width;
  canvas.height = height;
}

function analyzeImage(image) {
  const sampleCanvas = document.createElement("canvas");
  const sampleSize = 40;
  sampleCanvas.width = sampleSize;
  sampleCanvas.height = sampleSize;
  const sampleCtx = sampleCanvas.getContext("2d");
  sampleCtx.drawImage(image, 0, 0, sampleSize, sampleSize);
  const { data } = sampleCtx.getImageData(0, 0, sampleSize, sampleSize);
  let r = 0;
  let g = 0;
  let b = 0;
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    total += 1;
  }
  r = Math.round(r / total);
  g = Math.round(g / total);
  b = Math.round(b / total);
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  const hueShift = brightness > 0.55 ? 220 : 320;
  return {
    baseColor: `rgb(${r}, ${g}, ${b})`,
    accent: `hsl(${hueShift}, 85%, 70%)`,
    highlight: `hsl(${(hueShift + 80) % 360}, 90%, 75%)`,
    shadow: `rgba(10, 10, 20, 0.35)`,
  };
}

function pickEffect() {
  let effect = effects[Math.floor(Math.random() * effects.length)];
  if (effects.length > 1) {
    while (effect.name === lastEffect) {
      effect = effects[Math.floor(Math.random() * effects.length)];
    }
  }
  lastEffect = effect.name;
  return effect;
}

function drawSoftWash(color) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function drawChalkGlow(analysis) {
  ctx.save();
  const gradient = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.4,
    canvas.width * 0.1,
    canvas.width * 0.5,
    canvas.height * 0.4,
    canvas.width * 0.8
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.12)");
  gradient.addColorStop(0.45, "rgba(255, 205, 240, 0.18)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.globalCompositeOperation = "screen";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = analysis.accent;
  ctx.lineWidth = 6;
  ctx.globalAlpha = 0.5;
  ctx.shadowBlur = 25;
  ctx.shadowColor = analysis.highlight;
  ctx.beginPath();
  ctx.arc(
    canvas.width * 0.8,
    canvas.height * 0.2,
    canvas.width * 0.12,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  ctx.restore();
}

function drawChalkFrame(analysis, padding) {
  ctx.save();
  ctx.strokeStyle = analysis.highlight;
  ctx.lineWidth = 6;
  ctx.setLineDash([18, 10]);
  ctx.globalAlpha = 0.7;
  ctx.shadowBlur = 16;
  ctx.shadowColor = analysis.accent;
  ctx.strokeRect(
    padding,
    padding,
    canvas.width - padding * 2,
    canvas.height - padding * 2
  );
  ctx.restore();
}

function drawSparkleDust(analysis, count) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 1.5 + Math.random() * 3.5;
    ctx.fillStyle = i % 2 ? analysis.highlight : analysis.accent;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawWaves(analysis, rows) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = analysis.accent;
  for (let i = 0; i < rows; i += 1) {
    const y = canvas.height * 0.2 + i * (canvas.height * 0.06);
    const amplitude = 12 + Math.random() * 10;
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 20) {
      const waveY = y + Math.sin((x / canvas.width) * Math.PI * 4 + i) * amplitude;
      ctx.lineTo(x, waveY);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function drawRainbow(analysis) {
  ctx.save();
  const colors = [
    analysis.highlight,
    "#7ae2ff",
    "#7affb0",
    "#ffe66d",
    "#ff9fca",
  ];
  const centerX = canvas.width * 0.2;
  const centerY = canvas.height * 0.85;
  const radius = canvas.width * 0.35;
  colors.forEach((color, index) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - index * 12, Math.PI, Math.PI * 1.8);
    ctx.stroke();
  });
  ctx.restore();
}

function drawAuroraVeils(analysis) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(255, 122, 217, 0.35)");
  gradient.addColorStop(0.3, "rgba(77, 216, 255, 0.28)");
  gradient.addColorStop(0.65, analysis.accent.replace("hsl", "hsla").replace(")", ", 0.28)")
  );
  gradient.addColorStop(1, "rgba(140, 82, 255, 0.35)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 4; i += 1) {
    const veil = ctx.createRadialGradient(
      canvas.width * Math.random(),
      canvas.height * Math.random(),
      canvas.width * 0.1,
      canvas.width * Math.random(),
      canvas.height * Math.random(),
      canvas.width * 0.6
    );
    veil.addColorStop(0, "rgba(255, 255, 255, 0.12)");
    veil.addColorStop(0.5, "rgba(124, 255, 247, 0.18)");
    veil.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = veil;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.restore();
}

function drawChalkHeart(x, y, size, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(x - size, y - size * 0.3, x - size * 0.6, y - size, x, y - size * 0.3);
  ctx.bezierCurveTo(x + size * 0.6, y - size, x + size, y - size * 0.3, x, y + size * 0.3);
  ctx.stroke();
  ctx.restore();
}

function drawChalkFlower(x, y, size, colors) {
  ctx.save();
  const petals = 5 + Math.floor(Math.random() * 3);
  for (let i = 0; i < petals; i += 1) {
    const angle = (Math.PI * 2 * i) / petals;
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.ellipse(
      x + Math.cos(angle) * size * 0.6,
      y + Math.sin(angle) * size * 0.6,
      size * 0.35,
      size * 0.6,
      angle,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.fillStyle = "#fff6b5";
  ctx.beginPath();
  ctx.arc(x, y, size * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCloud(x, y, size, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
  ctx.arc(x + size * 0.35, y - size * 0.2, size * 0.5, 0, Math.PI * 2);
  ctx.arc(x + size * 0.75, y, size * 0.4, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawDoodles(analysis, count) {
  ctx.save();
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 14 + Math.random() * 24;
    const shape = doodleShapes[Math.floor(Math.random() * doodleShapes.length)];
    if (shape === "heart") {
      drawChalkHeart(x, y, size, analysis.highlight);
    } else if (shape === "flower") {
      drawChalkFlower(x, y, size, [analysis.accent, analysis.highlight, "#ffd5f0"]);
    } else if (shape === "wave") {
      ctx.strokeStyle = analysis.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.quadraticCurveTo(x, y - size, x + size, y);
      ctx.stroke();
    } else if (shape === "rainbow") {
      drawRainbow(analysis);
    } else if (shape === "cloud") {
      drawCloud(x, y, size * 1.2, "rgba(255, 255, 255, 0.6)");
    } else {
      ctx.fillStyle = analysis.highlight;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.12, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawChalkFlowers(analysis, count) {
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 12 + Math.random() * 18;
    drawChalkFlower(x, y, size, [analysis.accent, "#ffb4d9", "#ffe6a5"]);
  }
}

function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

function drawInteractiveStamps() {
  interactiveStamps.forEach((stamp) => {
    if (stamp.type === "flower") {
      drawChalkFlower(stamp.x, stamp.y, stamp.size, stamp.colors);
    } else if (stamp.type === "heart") {
      drawChalkHeart(stamp.x, stamp.y, stamp.size, stamp.colors[0]);
    }
  });
}

function addInteractiveFlower(point) {
  const palette = imageAnalysis
    ? [imageAnalysis.accent, imageAnalysis.highlight, "#ffd5f0"]
    : ["#ff9bd5", "#7ae2ff", "#ffe6a5"];
  const stamp = {
    type: Math.random() > 0.2 ? "flower" : "heart",
    x: point.x,
    y: point.y,
    size: 14 + Math.random() * 20,
    colors: palette,
  };
  interactiveStamps.push(stamp);
  renderEffect();
}

function renderEffect() {
  if (!originalImage || !activeEffect) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  activeEffect.draw(originalImage, imageAnalysis);
  drawInteractiveStamps();
  caption.textContent = `${activeEffect.name} ✨ ${captions[Math.floor(Math.random() * captions.length)]}`;
}

function handleFile(file) {
  if (!file) {
    return;
  }
  const image = new Image();
  image.onload = () => {
    originalImage = image;
    resizeCanvas(image);
    imageAnalysis = analyzeImage(image);
    interactiveStamps.length = 0;
    activeEffect = pickEffect();
    renderEffect();
    playButton.disabled = false;
    downloadButton.disabled = false;
    uploadHint.textContent = `${file.name} pronta para brincar!`;
  };
  image.src = URL.createObjectURL(file);
}

photoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (event.target.files.length > 1) {
    caption.textContent = "Só uma foto por vez, combinado?";
  }
  handleFile(file);
});

playButton.addEventListener("click", () => {
  activeEffect = pickEffect();
  renderEffect();
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "raissa-amor.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

canvas.addEventListener("pointerdown", (event) => {
  if (!originalImage) {
    return;
  }
  addInteractiveFlower(getCanvasPoint(event));
});

window.addEventListener("pointerdown", (event) => {
  const flower = flowerTemplate.content.cloneNode(true);
  const node = flower.querySelector(".tap-flower");
  node.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
  node.style.left = `${event.clientX - 12}px`;
  node.style.top = `${event.clientY - 12}px`;
  document.body.appendChild(node);
  node.addEventListener("animationend", () => node.remove());
});

window.addEventListener("load", () => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "20px Poppins, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Envie uma foto para começar 💗", canvas.width / 2, canvas.height / 2);
});
