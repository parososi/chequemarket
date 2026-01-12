const photoInput = document.getElementById("photoInput");
const uploadHint = document.getElementById("uploadHint");
const canvas = document.getElementById("artCanvas");
const playButton = document.getElementById("playButton");
const downloadButton = document.getElementById("downloadButton");
const caption = document.getElementById("caption");
const heartTemplate = document.getElementById("heartTemplate");
const ctx = canvas.getContext("2d");

let originalImage = null;
let lastEffect = "";

const effects = [
  {
    name: "Carinho neon",
    draw: (image) => {
      ctx.save();
      ctx.filter = "saturate(1.4) contrast(1.15)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
      for (let i = 0; i < 6; i += 1) {
        ctx.globalCompositeOperation = "screen";
        ctx.shadowBlur = 25 + i * 4;
        ctx.shadowColor = i % 2 ? "#ff7ad9" : "#4dd8ff";
        ctx.drawImage(
          image,
          -6 + i * 2,
          6 - i * 2,
          canvas.width,
          canvas.height
        );
      }
      ctx.restore();
    },
  },
  {
    name: "Rabisquinhos", 
    draw: (image) => {
      ctx.save();
      ctx.filter = "brightness(1.05) contrast(1.1)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
      const doodles = 24;
      for (let i = 0; i < doodles; i += 1) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 18 + Math.random() * 30;
        ctx.strokeStyle = `hsla(${Math.random() * 360}, 90%, 70%, 0.7)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - size / 2, y);
        ctx.quadraticCurveTo(x, y - size, x + size / 2, y);
        ctx.quadraticCurveTo(x, y + size, x - size / 2, y);
        ctx.stroke();
      }
      ctx.restore();
    },
  },
  {
    name: "Sonho pastel",
    draw: (image) => {
      ctx.save();
      ctx.filter = "blur(0.6px) saturate(1.3) brightness(1.1)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = "rgba(255, 192, 231, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    },
  },
  {
    name: "Lápis romântico",
    draw: (image) => {
      ctx.save();
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;
      for (let i = 0; i < data.length; i += 4) {
        const gray =
          data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        const edge = i + 4 < data.length ? Math.abs(gray - data[i + 4]) : 0;
        const value = 255 - Math.min(255, gray + edge * 2.2);
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }
      ctx.putImageData(imageData, 0, 0);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "rgba(255, 171, 217, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    },
  },
  {
    name: "Aurora psicodélica",
    draw: (image) => {
      ctx.save();
      ctx.filter = "hue-rotate(40deg) saturate(1.4)";
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(255, 122, 217, 0.25)");
      gradient.addColorStop(0.5, "rgba(77, 216, 255, 0.25)");
      gradient.addColorStop(1, "rgba(140, 82, 255, 0.25)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
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

function renderEffect() {
  if (!originalImage) {
    return;
  }
  const effect = pickEffect();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.draw(originalImage);
  caption.textContent = `${effect.name} ✨ ${captions[Math.floor(Math.random() * captions.length)]}`;
}

function handleFile(file) {
  if (!file) {
    return;
  }
  const image = new Image();
  image.onload = () => {
    originalImage = image;
    resizeCanvas(image);
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
  renderEffect();
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "raissa-amor.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

window.addEventListener("pointerdown", (event) => {
  const heart = heartTemplate.content.cloneNode(true);
  const node = heart.querySelector(".tap-heart");
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
