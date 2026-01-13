const micButton = document.getElementById("micButton");
const fallbackButton = document.getElementById("fallbackButton");
const meterFill = document.getElementById("meterFill");
const message = document.getElementById("message");
const candles = Array.from(document.querySelectorAll(".candle"));
const confettiCanvas = document.getElementById("confetti");
const balloonsContainer = document.getElementById("balloons");
const animals = Array.from(document.querySelectorAll(".animal"));
const sparkles = document.querySelector(".sparkles");
const modal = document.getElementById("letterModal");
const modalSender = document.getElementById("modalSender");
const modalMessage = document.getElementById("modalMessage");
const modalClose = modal.querySelector(".modal-close");
const modalBackdrop = modal.querySelector(".modal-backdrop");

let candlesLit = 3;
let stage = 0;
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
let confettiTarget = 0;
let lettersAssigned = false;
let sessionMessages = [];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const STORAGE_KEY = "raissaUsedMessageIds";

const balloonColors = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#bdb2ff",
  "#ffc6ff",
];

const messagePool = [
  {
    id: "jk-1",
    artist: "Jungkook",
    body:
      "Raissa, teu brilho é aquele tipo de luz que deixa tudo mais bonito por perto. Que hoje seja um show de alegria e amor para você.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jungkook",
  },
  {
    id: "jk-2",
    artist: "Jungkook",
    body:
      "Raissa, você é a nota certa no meio de qualquer melodia do dia. Que esse novo ciclo venha com paz, coragem e muito carinho.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jungkook",
  },
  {
    id: "jk-3",
    artist: "Jungkook",
    body:
      "Raissa, quando a energia é boa, ela contagia. Que o seu aniversário seja leve, cheio de sorrisos e de pessoas que te amam.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jungkook",
  },
  {
    id: "jk-4",
    artist: "Jungkook",
    body:
      "Raissa, você tem aquela força tranquila que inspira quem chega perto. Que este ano traga novos palcos, novos sonhos e tudo de bonito que você merece.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jungkook",
  },
  {
    id: "v-1",
    artist: "V",
    body:
      "Raissa, seu jeito doce deixa o mundo mais artístico. Que hoje a vida te entregue um buquê de momentos especiais.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de V",
  },
  {
    id: "v-2",
    artist: "V",
    body:
      "Raissa, existe uma beleza calma em você que todo mundo sente. Que seu aniversário seja suave, elegante e cheio de afeto.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de V",
  },
  {
    id: "v-3",
    artist: "V",
    body:
      "Raissa, sua presença tem um charme que transforma a cena inteira. Que este novo ciclo te traga arte, amor e boas surpresas.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de V",
  },
  {
    id: "v-4",
    artist: "V",
    body:
      "Raissa, sua sensibilidade é como uma fotografia linda: fica na memória. Que seu ano seja cheio de cores novas e encontros incríveis.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de V",
  },
  {
    id: "jimin-1",
    artist: "Jimin",
    body:
      "Raissa, você dança com a vida de um jeito delicado e firme. Que o seu aniversário seja cheio de carinho e brilho.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jimin",
  },
  {
    id: "jimin-2",
    artist: "Jimin",
    body:
      "Raissa, sua luz é calma e intensa ao mesmo tempo. Que hoje você sinta o abraço de tudo que te faz bem.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jimin",
  },
  {
    id: "jimin-3",
    artist: "Jimin",
    body:
      "Raissa, que seu novo ciclo seja suave como um passo leve e forte como um coração decidido. Você merece o melhor.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jimin",
  },
  {
    id: "suga-1",
    artist: "Suga",
    body:
      "Raissa, você tem aquela força silenciosa que muda o mundo. Que o seu dia seja cheio de paz e orgulho por tudo que você é.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Suga",
  },
  {
    id: "suga-2",
    artist: "Suga",
    body:
      "Raissa, que a sua caminhada seja firme, criativa e leve. Hoje é seu dia, então celebre cada vitória pequena.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Suga",
  },
  {
    id: "suga-3",
    artist: "Suga",
    body:
      "Raissa, sua autenticidade é seu superpoder. Que este aniversário traga novos beats, novos sonhos e muito amor por perto.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Suga",
  },
  {
    id: "jin-1",
    artist: "Jin",
    body:
      "Raissa, seu sorriso tem poder de curar dias difíceis. Que hoje seja leve, divertido e cheio de doçura.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jin",
  },
  {
    id: "jin-2",
    artist: "Jin",
    body:
      "Raissa, você é aquele abraço que conforta e inspira. Que o seu aniversário seja uma coleção de momentos felizes.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jin",
  },
  {
    id: "jin-3",
    artist: "Jin",
    body:
      "Raissa, que seu dia seja tão lindo quanto seu coração. Que a alegria te encontre o tempo todo.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jin",
  },
  {
    id: "rm-1",
    artist: "RM",
    body:
      "Raissa, sua inteligência emocional é inspiração. Que este novo ciclo seja um capítulo cheio de propósito e amor.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de RM",
  },
  {
    id: "rm-2",
    artist: "RM",
    body:
      "Raissa, você sabe transformar pequenos momentos em algo grande. Que seu aniversário te lembre de como você é incrível.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de RM",
  },
  {
    id: "rm-3",
    artist: "RM",
    body:
      "Raissa, que seu coração continue curioso, corajoso e cheio de luz. Hoje é dia de celebrar você com carinho.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de RM",
  },
  {
    id: "jhope-1",
    artist: "J-Hope",
    body:
      "Raissa, sua energia positiva ilumina qualquer ambiente. Que hoje você sinta todo esse brilho de volta.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de J-Hope",
  },
  {
    id: "jhope-2",
    artist: "J-Hope",
    body:
      "Raissa, que o seu aniversário seja cheio de cores, dança e alegria. Você merece um dia com vibe de festa boa.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de J-Hope",
  },
  {
    id: "jhope-3",
    artist: "J-Hope",
    body:
      "Raissa, seu jeito otimista é um abraço em forma de luz. Que seu novo ano venha com sorrisos e muitos sonhos.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de J-Hope",
  },
  {
    id: "dua-1",
    artist: "Dua Lipa",
    body:
      "Raissa, você tem uma vibe poderosa e elegante. Que este aniversário seja uma passarela de momentos inesquecíveis.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Dua Lipa",
  },
  {
    id: "dua-2",
    artist: "Dua Lipa",
    body:
      "Raissa, sua confiança é linda de ver. Que o seu dia seja cheio de glamour, carinho e boas surpresas.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Dua Lipa",
  },
  {
    id: "dua-3",
    artist: "Dua Lipa",
    body:
      "Raissa, que este novo ciclo te faça dançar com leveza e coragem. Você merece um ano brilhante.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Dua Lipa",
  },
  {
    id: "jao-1",
    artist: "Jão",
    body:
      "Raissa, seu coração tem uma poesia bonita. Que hoje você se sinta amada em cada detalhe.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jão",
  },
  {
    id: "jao-2",
    artist: "Jão",
    body:
      "Raissa, que este aniversário tenha aquela sensação boa de recomeço. Você é especial demais.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jão",
  },
  {
    id: "jao-3",
    artist: "Jão",
    body:
      "Raissa, que o seu dia seja doce e sincero como os melhores versos. Que a vida te trate com carinho.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Jão",
  },
  {
    id: "anitta-1",
    artist: "Anitta",
    body:
      "Raissa, você é puro poder. Que seu aniversário seja cheio de atitude, brilho e alegria.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Anitta",
  },
  {
    id: "anitta-2",
    artist: "Anitta",
    body:
      "Raissa, hoje é dia de se sentir diva, do jeitinho que você merece. Celebre cada conquista.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Anitta",
  },
  {
    id: "anitta-3",
    artist: "Anitta",
    body:
      "Raissa, que seu aniversário tenha ritmo, festa e muito amor. Você merece tudo isso e mais.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Anitta",
  },
  {
    id: "gustavo-1",
    artist: "Gustavo Mioto",
    body:
      "Raissa, que seu aniversário seja cheio de carinho simples e verdadeiro. Você é muito especial.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Gustavo Mioto",
  },
  {
    id: "gustavo-2",
    artist: "Gustavo Mioto",
    body:
      "Raissa, seu jeito doce deixa qualquer dia melhor. Que hoje seja um abraço em forma de festa.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Gustavo Mioto",
  },
  {
    id: "gustavo-3",
    artist: "Gustavo Mioto",
    body:
      "Raissa, que o seu dia seja leve, cheio de sorrisos e de gente boa ao redor.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Gustavo Mioto",
  },
  {
    id: "iza-1",
    artist: "IZA",
    body:
      "Raissa, você é força e beleza em forma de pessoa. Que seu aniversário seja cheio de empoderamento e amor.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de IZA",
  },
  {
    id: "iza-2",
    artist: "IZA",
    body:
      "Raissa, sua luz própria é rara. Que hoje você se sinta gigante e muito amada.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de IZA",
  },
  {
    id: "iza-3",
    artist: "IZA",
    body:
      "Raissa, que seu aniversário seja um lembrete de como você é incrível. Você merece o mundo.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de IZA",
  },
  {
    id: "beyonce-1",
    artist: "Beyoncé",
    body:
      "Raissa, hoje é seu dia de brilhar com confiança. Que sua festa seja digna da sua grandeza.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Beyoncé",
  },
  {
    id: "beyonce-2",
    artist: "Beyoncé",
    body:
      "Raissa, que o seu aniversário te lembre de todo o poder que existe em você. Celebre sua própria luz.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Beyoncé",
  },
  {
    id: "beyonce-3",
    artist: "Beyoncé",
    body:
      "Raissa, seu brilho é de palco principal. Que este novo ciclo seja cheio de conquistas e amor verdadeiro.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Beyoncé",
  },
  {
    id: "lana-1",
    artist: "Lana Del Rey",
    body:
      "Raissa, seu coração tem uma delicadeza cinematográfica. Que seu aniversário seja cheio de beleza calma.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Lana Del Rey",
  },
  {
    id: "lana-2",
    artist: "Lana Del Rey",
    body:
      "Raissa, que hoje você se sinta vivendo um dia encantado, doce e cheio de ternura.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Lana Del Rey",
  },
  {
    id: "lana-3",
    artist: "Lana Del Rey",
    body:
      "Raissa, sua aura é suave e linda como um pôr do sol. Que seu aniversário traga paz e amor.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Lana Del Rey",
  },
  {
    id: "woosung-1",
    artist: "Kim Woo-sung",
    body:
      "Raissa, sua presença tem um charme sincero e único. Que o seu dia seja intenso e bonito.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Kim Woo-sung",
  },
  {
    id: "woosung-2",
    artist: "Kim Woo-sung",
    body:
      "Raissa, que seu aniversário venha com aquele sentimento gostoso de rock suave e carinho real.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Kim Woo-sung",
  },
  {
    id: "woosung-3",
    artist: "Kim Woo-sung",
    body:
      "Raissa, você é melodia e força ao mesmo tempo. Que seu novo ciclo traga sonhos e boas vibrações.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Kim Woo-sung",
  },
  {
    id: "taegyeom-1",
    artist: "Taegyeom",
    body:
      "Raissa, que seu aniversário tenha a leveza de um refrão feliz. Você merece um dia lindo.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Taegyeom",
  },
  {
    id: "taegyeom-2",
    artist: "Taegyeom",
    body:
      "Raissa, sua energia é contagiante. Que o seu dia seja cheio de ritmo e ternura.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Taegyeom",
  },
  {
    id: "taegyeom-3",
    artist: "Taegyeom",
    body:
      "Raissa, que você receba hoje todo o carinho que espalha por aí. Aproveite muito o seu dia.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Taegyeom",
  },
  {
    id: "dojoon-1",
    artist: "Dojoon",
    body:
      "Raissa, sua voz interior merece aplausos. Que seu aniversário seja cheio de paz e inspiração.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Dojoon",
  },
  {
    id: "dojoon-2",
    artist: "Dojoon",
    body:
      "Raissa, que hoje você sinta aquele conforto gostoso de estar em casa no coração.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Dojoon",
  },
  {
    id: "dojoon-3",
    artist: "Dojoon",
    body:
      "Raissa, que este novo ciclo traga coragem, calma e muitos momentos felizes.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Dojoon",
  },
  {
    id: "hajoon-1",
    artist: "Hajoon",
    body:
      "Raissa, que seu aniversário venha com alegria sincera e energia de banda no palco.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Hajoon",
  },
  {
    id: "hajoon-2",
    artist: "Hajoon",
    body:
      "Raissa, que o seu dia seja leve, sincero e cheio de boas surpresas.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Hajoon",
  },
  {
    id: "hajoon-3",
    artist: "Hajoon",
    body:
      "Raissa, hoje é dia de celebrar sua história com orgulho. Que venha um ano maravilhoso.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Hajoon",
  },
  {
    id: "therose-1",
    artist: "Equipe The Rose",
    body:
      "Raissa, sua gentileza é como um refrão que fica na cabeça. Que seu aniversário seja cheio de ternura.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Equipe The Rose",
  },
  {
    id: "therose-2",
    artist: "Equipe The Rose",
    body:
      "Raissa, que seu dia seja bonito, sincero e cheio de vibrações boas. Você merece o melhor.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Equipe The Rose",
  },
  {
    id: "therose-3",
    artist: "Equipe The Rose",
    body:
      "Raissa, que o seu aniversário traga leveza, carinho e um coro de gente torcendo por você.\nFeliz aniversário, Raissa! 💜\n— Homenagem no estilo de Equipe The Rose",
  },
];

function updateMeter(value) {
  const percent = Math.min(100, Math.max(0, value * 100));
  meterFill.style.width = `${percent}%`;
}

function setStage(nextStage) {
  stage = Math.min(3, Math.max(0, nextStage));
  document.body.dataset.stage = String(stage);
  if (stage >= 1) {
    startConfetti();
  }
  updateConfettiIntensity(stage);
  updateBalloons(stage);
  if (stage === 3) {
    startCelebration();
  }
}

function extinguishCandle(index) {
  const candle = candles[index];
  if (!candle || !candle.classList.contains("lit")) return;
  candle.classList.remove("lit");
  candle.classList.add("smoke");
  setTimeout(() => candle.classList.remove("smoke"), 2000);
  candlesLit -= 1;
  setStage(3 - candlesLit);
}

function startCelebration() {
  if (celebration) return;
  celebration = true;
  message.focus?.();
  setStage(3);
  triggerSparkles();
  assignPartyDances();
  assignLetterCarriers();
}

function triggerSparkles() {
  if (!sparkles) return;
  sparkles.classList.remove("active");
  requestAnimationFrame(() => {
    sparkles.classList.add("active");
  });
  setTimeout(() => {
    sparkles.classList.remove("active");
  }, 2000);
}

function assignPartyDances() {
  const danceClasses = ["dance-1", "dance-2", "dance-3", "dance-4"];
  animals.forEach((animal) => {
    danceClasses.forEach((cls) => animal.classList.remove(cls));
    const randomClass = danceClasses[Math.floor(Math.random() * danceClasses.length)];
    animal.classList.add(randomClass);
  });
}

function updateBalloons(currentStage) {
  if (currentStage < 2) {
    balloonsContainer.innerHTML = "";
    return;
  }
  const count = prefersReducedMotion
    ? currentStage === 2
      ? 6
      : 8
    : currentStage === 2
      ? 12
      : 18;
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

function updateConfettiIntensity(currentStage) {
  if (currentStage < 1) {
    confettiTarget = 0;
    return;
  }
  if (prefersReducedMotion) {
    confettiTarget = currentStage === 1 ? 12 : currentStage === 2 ? 18 : 24;
  } else {
    confettiTarget = currentStage === 1 ? 60 : currentStage === 2 ? 120 : 180;
  }
}

function startConfetti() {
  resizeCanvas();
  const ctx = confettiCanvas.getContext("2d");
  if (!ctx) return;
  if (animationId) return;
  confettiParticles = [];

  const animate = () => {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    while (confettiParticles.length < confettiTarget) {
      confettiParticles.push(createConfetti());
    }
    if (confettiParticles.length > confettiTarget) {
      confettiParticles.splice(confettiTarget);
    }
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
      ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
      );
      ctx.restore();
    });
    animationId = requestAnimationFrame(animate);
  };

  animationId = requestAnimationFrame(animate);
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
    if (duration > 420 && now - lastExtinguish > 550) {
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
  threshold = baseline + Math.max(0.02, baseline * 1.6);
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

function getUsedMessageIds() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Falha ao ler mensagens usadas", error);
    return [];
  }
}

function setUsedMessageIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.warn("Falha ao salvar mensagens usadas", error);
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickSessionMessages() {
  const usedIds = new Set(getUsedMessageIds());
  let available = messagePool.filter((message) => !usedIds.has(message.id));
  if (available.length < 3) {
    usedIds.clear();
    available = [...messagePool];
  }
  const shuffled = shuffle(available);
  const selected = [];
  const usedArtists = new Set();
  shuffled.forEach((message) => {
    if (selected.length >= 3) return;
    if (usedArtists.has(message.artist)) return;
    selected.push(message);
    usedArtists.add(message.artist);
  });
  const finalIds = [...usedIds, ...selected.map((message) => message.id)];
  setUsedMessageIds(finalIds);
  return selected;
}

function createLetterButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "letter-icon";
  button.setAttribute("aria-label", "Abrir cartinha");
  button.innerHTML = `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="18" width="48" height="28" rx="6" fill="#ffd6e8" />
      <path d="M8 20 L32 38 L56 20" stroke="#c05b8f" stroke-width="4" fill="none" />
    </svg>
  `;
  return button;
}

function assignLetterCarriers() {
  if (lettersAssigned) return;
  lettersAssigned = true;
  sessionMessages = pickSessionMessages();
  const count = Math.min(
    sessionMessages.length,
    Math.max(1, Math.floor(Math.random() * 3) + 1)
  );
  const candidates = shuffle(animals);
  candidates.slice(0, count).forEach((animal, index) => {
    const message = sessionMessages[index];
    if (!message) return;
    const delay = 300 + Math.random() * 1200;
    const button = createLetterButton();
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openModal(message);
    });
    setTimeout(() => {
      animal.style.setProperty("--blur", "2px");
      animal.classList.add("letter-carrier");
      animal.dataset.messageId = message.id;
      animal.appendChild(button);
      requestAnimationFrame(() => {
        animal.style.setProperty("--blur", "0px");
      });
    }, delay);
  });
}

function openModal(messageData) {
  modalSender.textContent = `No estilo de: ${messageData.artist} (homenagem)`;
  modalMessage.textContent = messageData.body;
  modal.classList.remove("hidden");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

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
  if (stage >= 1) {
    resizeCanvas();
  }
});

setStage(0);
