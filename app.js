const micButton = document.getElementById("micButton");
const fallbackButton = document.getElementById("fallbackButton");
const meterFill = document.getElementById("meterFill");
const message = document.getElementById("message");
const candles = Array.from(document.querySelectorAll(".candle"));
const confettiCanvas = document.getElementById("confetti");
const balloonsContainer = document.getElementById("balloons");
const animalsContainer = document.querySelector(".animals");
const sparkles = document.querySelector(".sparkles");
const modal = document.getElementById("letterModal");
const modalSender = document.getElementById("modalSender");
const modalMessage = document.getElementById("modalMessage");
const modalClose = modal.querySelector(".modal-close");
const modalBackdrop = modal.querySelector(".modal-backdrop");

const animals = [];

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
let danceSwapTimers = [];
let activeModalAnimal = null;

const activeLetters = new Map();

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const LETTER_POP_DURATION = prefersReducedMotion ? 0 : 320;

const DECK_KEY = "raissaMessageDeck";

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
      "Raissa, teu brilho deixa qualquer dia mais bonito. Que hoje seja leve, cheio de carinho e celebração.\n— Jungkook",
  },
  {
    id: "jk-2",
    artist: "Jungkook",
    body:
      "Raissa, que este novo ciclo venha com coragem, paz e muitos sorrisos verdadeiros. Você merece um ano incrível.\n— Jungkook",
  },
  {
    id: "jk-3",
    artist: "Jungkook",
    body:
      "Raissa, a energia boa que você carrega contagia. Que seu aniversário seja um show de alegria.\n— Jungkook",
  },
  {
    id: "jk-4",
    artist: "Jungkook",
    body:
      "Raissa, que cada sonho seu encontre um palco bonito para acontecer. Feliz aniversário e muito amor.\n— Jungkook",
  },
  {
    id: "v-1",
    artist: "V",
    body:
      "Raissa, sua presença tem um charme delicado que fica na memória. Que hoje seja suave e feliz.\n— V",
  },
  {
    id: "v-2",
    artist: "V",
    body:
      "Raissa, que este aniversário traga cores novas, arte e momentos especiais ao seu redor.\n— V",
  },
  {
    id: "v-3",
    artist: "V",
    body:
      "Raissa, a sua sensibilidade deixa tudo mais bonito. Que seu dia seja cheio de ternura.\n— V",
  },
  {
    id: "v-4",
    artist: "V",
    body:
      "Raissa, que a vida te entregue um buquê de lembranças doces e muita paz.\n— V",
  },
  {
    id: "jimin-1",
    artist: "Jimin",
    body:
      "Raissa, que seu aniversário dance com leveza, carinho e brilho. Você merece o melhor.\n— Jimin",
  },
  {
    id: "jimin-2",
    artist: "Jimin",
    body:
      "Raissa, que o abraço das pessoas que te amam esteja pertinho hoje. Feliz aniversário.\n— Jimin",
  },
  {
    id: "jimin-3",
    artist: "Jimin",
    body:
      "Raissa, que seu novo ciclo seja suave, forte e cheio de sorrisos verdadeiros.\n— Jimin",
  },
  {
    id: "suga-1",
    artist: "Suga",
    body:
      "Raissa, sua força tranquila é inspiradora. Que hoje seja um dia de paz e orgulho.\n— Suga",
  },
  {
    id: "suga-2",
    artist: "Suga",
    body:
      "Raissa, que cada pequena vitória do seu ano venha com alegria dobrada. Feliz aniversário.\n— Suga",
  },
  {
    id: "suga-3",
    artist: "Suga",
    body:
      "Raissa, que o seu caminho seja criativo, leve e cheio de boas vibrações.\n— Suga",
  },
  {
    id: "jin-1",
    artist: "Jin",
    body:
      "Raissa, que seu sorriso seja a trilha sonora desse dia especial. Feliz aniversário.\n— Jin",
  },
  {
    id: "jin-2",
    artist: "Jin",
    body:
      "Raissa, que hoje seja divertido, doce e cheio de abraços queridos.\n— Jin",
  },
  {
    id: "jin-3",
    artist: "Jin",
    body:
      "Raissa, que a alegria te encontre em cada detalhe do seu aniversário.\n— Jin",
  },
  {
    id: "rm-1",
    artist: "RM",
    body:
      "Raissa, que seu novo ciclo seja um capítulo bonito, cheio de propósito e carinho.\n— RM",
  },
  {
    id: "rm-2",
    artist: "RM",
    body:
      "Raissa, que sua inteligência sensível guie um ano de conquistas e paz.\n— RM",
  },
  {
    id: "rm-3",
    artist: "RM",
    body:
      "Raissa, que a curiosidade e a coragem te levem a lugares incríveis. Feliz aniversário.\n— RM",
  },
  {
    id: "jhope-1",
    artist: "J-Hope",
    body:
      "Raissa, sua energia luminosa é festa garantida. Que hoje ela brilhe ainda mais.\n— J-Hope",
  },
  {
    id: "jhope-2",
    artist: "J-Hope",
    body:
      "Raissa, que seu aniversário tenha ritmo, cor e muita alegria sincera.\n— J-Hope",
  },
  {
    id: "jhope-3",
    artist: "J-Hope",
    body:
      "Raissa, que o seu novo ano venha com sorrisos e sonhos dançando ao seu redor.\n— J-Hope",
  },
  {
    id: "dua-1",
    artist: "Dua Lipa",
    body:
      "Raissa, que seu dia tenha uma vibe elegante e cheia de brilho. Feliz aniversário.\n— Dua Lipa",
  },
  {
    id: "dua-2",
    artist: "Dua Lipa",
    body:
      "Raissa, que a confiança e o glamour te acompanhem em cada novo passo.\n— Dua Lipa",
  },
  {
    id: "dua-3",
    artist: "Dua Lipa",
    body:
      "Raissa, que este novo ciclo te faça dançar com leveza e coragem.\n— Dua Lipa",
  },
  {
    id: "jao-1",
    artist: "Jão",
    body:
      "Raissa, que seu coração seja embalado por versos bons e muito carinho hoje.\n— Jão",
  },
  {
    id: "jao-2",
    artist: "Jão",
    body:
      "Raissa, que este aniversário traga a sensação boa de recomeço.\n— Jão",
  },
  {
    id: "jao-3",
    artist: "Jão",
    body:
      "Raissa, que o seu dia seja doce, sincero e cheio de afeto.\n— Jão",
  },
  {
    id: "anitta-1",
    artist: "Anitta",
    body:
      "Raissa, que sua festa tenha atitude, brilho e muita alegria. Feliz aniversário.\n— Anitta",
  },
  {
    id: "anitta-2",
    artist: "Anitta",
    body:
      "Raissa, que hoje seja dia de se sentir poderosa e celebrar cada conquista.\n— Anitta",
  },
  {
    id: "anitta-3",
    artist: "Anitta",
    body:
      "Raissa, que seu aniversário tenha ritmo, festa e amor por todos os lados.\n— Anitta",
  },
  {
    id: "gustavo-1",
    artist: "Gustavo Mioto",
    body:
      "Raissa, que seu dia seja simples, bonito e cheio de carinho verdadeiro.\n— Gustavo Mioto",
  },
  {
    id: "gustavo-2",
    artist: "Gustavo Mioto",
    body:
      "Raissa, que o aniversário chegue com um abraço em forma de festa.\n— Gustavo Mioto",
  },
  {
    id: "gustavo-3",
    artist: "Gustavo Mioto",
    body:
      "Raissa, que você celebre com paz, sorrisos e gente boa por perto.\n— Gustavo Mioto",
  },
  {
    id: "iza-1",
    artist: "IZA",
    body:
      "Raissa, que seu aniversário seja cheio de força, beleza e amor.\n— IZA",
  },
  {
    id: "iza-2",
    artist: "IZA",
    body:
      "Raissa, que hoje você se sinta gigante, admirada e muito amada.\n— IZA",
  },
  {
    id: "iza-3",
    artist: "IZA",
    body:
      "Raissa, que este novo ciclo seja um lembrete do quanto você é incrível.\n— IZA",
  },
  {
    id: "beyonce-1",
    artist: "Beyoncé",
    body:
      "Raissa, que seu dia brilhe com confiança e alegria de palco principal.\n— Beyoncé",
  },
  {
    id: "beyonce-2",
    artist: "Beyoncé",
    body:
      "Raissa, que o seu aniversário celebre todo o poder que há em você.\n— Beyoncé",
  },
  {
    id: "beyonce-3",
    artist: "Beyoncé",
    body:
      "Raissa, que este novo ano venha com conquistas e muito amor.\n— Beyoncé",
  },
  {
    id: "lana-1",
    artist: "Lana Del Rey",
    body:
      "Raissa, que seu aniversário seja delicado, sereno e cheio de beleza.\n— Lana Del Rey",
  },
  {
    id: "lana-2",
    artist: "Lana Del Rey",
    body:
      "Raissa, que hoje você viva um dia encantado, doce e inesquecível.\n— Lana Del Rey",
  },
  {
    id: "lana-3",
    artist: "Lana Del Rey",
    body:
      "Raissa, que seu novo ciclo traga paz, poesia e ternura.\n— Lana Del Rey",
  },
  {
    id: "woosung-1",
    artist: "Kim Woo-sung",
    body:
      "Raissa, que seu aniversário tenha aquela vibração bonita que acalma o coração.\n— Kim Woo-sung",
  },
  {
    id: "woosung-2",
    artist: "Kim Woo-sung",
    body:
      "Raissa, que o seu dia seja intenso e carinhoso na medida certa.\n— Kim Woo-sung",
  },
  {
    id: "woosung-3",
    artist: "Kim Woo-sung",
    body:
      "Raissa, que você receba hoje tudo de bom que espalha por aí.\n— Kim Woo-sung",
  },
  {
    id: "taegyeom-1",
    artist: "Taegyeom",
    body:
      "Raissa, que seu aniversário tenha a leveza de um refrão feliz.\n— Taegyeom",
  },
  {
    id: "taegyeom-2",
    artist: "Taegyeom",
    body:
      "Raissa, que seu dia venha com ritmo, ternura e muitos sorrisos.\n— Taegyeom",
  },
  {
    id: "taegyeom-3",
    artist: "Taegyeom",
    body:
      "Raissa, que hoje você se sinta muito especial e celebrada.\n— Taegyeom",
  },
  {
    id: "dojoon-1",
    artist: "Dojoon",
    body:
      "Raissa, que seu aniversário seja um descanso feliz para o coração.\n— Dojoon",
  },
  {
    id: "dojoon-2",
    artist: "Dojoon",
    body:
      "Raissa, que hoje você sinta aquele conforto gostoso de estar em casa.\n— Dojoon",
  },
  {
    id: "dojoon-3",
    artist: "Dojoon",
    body:
      "Raissa, que este novo ciclo traga calma, coragem e bons momentos.\n— Dojoon",
  },
  {
    id: "hajoon-1",
    artist: "Hajoon",
    body:
      "Raissa, que seu aniversário venha com alegria sincera e energia de palco.\n— Hajoon",
  },
  {
    id: "hajoon-2",
    artist: "Hajoon",
    body:
      "Raissa, que o seu dia seja leve, vibrante e cheio de boas surpresas.\n— Hajoon",
  },
  {
    id: "hajoon-3",
    artist: "Hajoon",
    body:
      "Raissa, que hoje seja dia de celebrar sua história com orgulho.\n— Hajoon",
  },
  {
    id: "therose-1",
    artist: "Equipe The Rose",
    body:
      "Raissa, que sua gentileza seja retribuída com um dia lindo e cheio de afeto.\n— Equipe The Rose",
  },
  {
    id: "therose-2",
    artist: "Equipe The Rose",
    body:
      "Raissa, que seu aniversário seja bonito, sincero e cheio de vibrações boas.\n— Equipe The Rose",
  },
  {
    id: "therose-3",
    artist: "Equipe The Rose",
    body:
      "Raissa, que o seu novo ano traga leveza, carinho e muita alegria.\n— Equipe The Rose",
  },
  {
    id: "therose-4",
    artist: "Equipe The Rose",
    body:
      "Raissa, que sua semana inteira tenha o mesmo encanto e carinho deste aniversário.\n— Equipe The Rose",
  },
  {
    id: "sunset-1",
    artist: "Carta da Natureza",
    body:
      "Raissa, que o som do vento, das folhas e da chuva te lembre de respirar fundo e sorrir. Feliz aniversário.\n— Carta da Natureza",
  },
  {
    id: "sunset-2",
    artist: "Carta da Natureza",
    body:
      "Raissa, que seu novo ciclo floresça no tempo certo, com paz, coragem e muita luz.\n— Carta da Natureza",
  },
];

const messageById = new Map(messagePool.map((messageItem) => [messageItem.id, messageItem]));

const speciesSvgs = {
  bear: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Ursinho fofo">
      <circle cx="60" cy="60" r="38" fill="#d9a16f" />
      <circle cx="30" cy="32" r="16" fill="#d9a16f" />
      <circle cx="90" cy="32" r="16" fill="#d9a16f" />
      <circle cx="30" cy="32" r="8" fill="#f6d3b1" />
      <circle cx="90" cy="32" r="8" fill="#f6d3b1" />
      <circle cx="46" cy="60" r="6" fill="#3b2f2f" />
      <circle cx="74" cy="60" r="6" fill="#3b2f2f" />
      <circle cx="60" cy="74" r="8" fill="#f6d3b1" />
      <circle cx="58" cy="72" r="3" fill="#3b2f2f" />
      <circle cx="62" cy="72" r="3" fill="#3b2f2f" />
      <path d="M52 82 Q60 88 68 82" stroke="#3b2f2f" stroke-width="3" fill="none" />
    </svg>
  `,
  unicorn: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Unicórnio fofo">
      <circle cx="60" cy="68" r="34" fill="#cfe8ff" />
      <circle cx="40" cy="56" r="8" fill="#203040" />
      <circle cx="80" cy="56" r="8" fill="#203040" />
      <circle cx="60" cy="74" r="10" fill="#f9c7d9" />
      <path d="M52 84 Q60 90 68 84" stroke="#203040" stroke-width="3" fill="none" />
      <polygon points="60,8 52,40 68,40" fill="#f5d76b" />
      <path d="M30 40 Q60 20 90 40" fill="#f9c7d9" />
    </svg>
  `,
  dog: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Cachorrinho fofo">
      <circle cx="60" cy="68" r="34" fill="#f1c27d" />
      <circle cx="28" cy="58" r="16" fill="#e0a15a" />
      <circle cx="92" cy="58" r="16" fill="#e0a15a" />
      <circle cx="44" cy="64" r="6" fill="#2f2f2f" />
      <circle cx="76" cy="64" r="6" fill="#2f2f2f" />
      <circle cx="60" cy="78" r="10" fill="#fff" />
      <circle cx="60" cy="76" r="4" fill="#2f2f2f" />
      <path d="M52 86 Q60 92 68 86" stroke="#2f2f2f" stroke-width="3" fill="none" />
    </svg>
  `,
  cat: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Gatinho fofo">
      <circle cx="60" cy="70" r="34" fill="#ffe1a8" />
      <polygon points="30,48 20,20 44,34" fill="#ffe1a8" />
      <polygon points="90,48 100,20 76,34" fill="#ffe1a8" />
      <circle cx="46" cy="68" r="6" fill="#2b2b2b" />
      <circle cx="74" cy="68" r="6" fill="#2b2b2b" />
      <circle cx="60" cy="80" r="8" fill="#f4b2c0" />
      <path d="M54 88 Q60 92 66 88" stroke="#2b2b2b" stroke-width="3" fill="none" />
    </svg>
  `,
  lion: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Leão fofo">
      <circle cx="60" cy="62" r="36" fill="#f7c66b" />
      <circle cx="60" cy="62" r="24" fill="#ffdba3" />
      <circle cx="46" cy="60" r="6" fill="#4a2c1a" />
      <circle cx="74" cy="60" r="6" fill="#4a2c1a" />
      <circle cx="60" cy="74" r="8" fill="#f2a7b5" />
      <path d="M52 84 Q60 90 68 84" stroke="#4a2c1a" stroke-width="3" fill="none" />
    </svg>
  `,
  jaguar: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Oncinha fofa">
      <circle cx="60" cy="68" r="34" fill="#ffd37a" />
      <circle cx="44" cy="60" r="6" fill="#3b2f2f" />
      <circle cx="76" cy="60" r="6" fill="#3b2f2f" />
      <circle cx="60" cy="78" r="10" fill="#fff1c7" />
      <circle cx="52" cy="46" r="4" fill="#b86d3c" />
      <circle cx="70" cy="46" r="4" fill="#b86d3c" />
      <circle cx="38" cy="72" r="4" fill="#b86d3c" />
      <circle cx="82" cy="72" r="4" fill="#b86d3c" />
      <path d="M52 88 Q60 92 68 88" stroke="#3b2f2f" stroke-width="3" fill="none" />
    </svg>
  `,
  fox: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Raposa fofa">
      <circle cx="60" cy="68" r="32" fill="#f5a46a" />
      <polygon points="30,48 18,24 44,36" fill="#f5a46a" />
      <polygon points="90,48 102,24 76,36" fill="#f5a46a" />
      <circle cx="48" cy="64" r="6" fill="#2f2f2f" />
      <circle cx="72" cy="64" r="6" fill="#2f2f2f" />
      <circle cx="60" cy="78" r="8" fill="#fff" />
      <path d="M52 86 Q60 90 68 86" stroke="#2f2f2f" stroke-width="3" fill="none" />
    </svg>
  `,
  panda: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Panda fofo">
      <circle cx="60" cy="64" r="34" fill="#f4f4f4" />
      <circle cx="36" cy="36" r="14" fill="#2f2f2f" />
      <circle cx="84" cy="36" r="14" fill="#2f2f2f" />
      <circle cx="44" cy="62" r="10" fill="#2f2f2f" />
      <circle cx="76" cy="62" r="10" fill="#2f2f2f" />
      <circle cx="44" cy="62" r="4" fill="#f4f4f4" />
      <circle cx="76" cy="62" r="4" fill="#f4f4f4" />
      <circle cx="60" cy="78" r="8" fill="#f1b6c1" />
    </svg>
  `,
  bunny: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Coelhinho fofo">
      <circle cx="60" cy="72" r="32" fill="#fde4f2" />
      <rect x="34" y="12" width="16" height="40" rx="8" fill="#fde4f2" />
      <rect x="70" y="12" width="16" height="40" rx="8" fill="#fde4f2" />
      <circle cx="48" cy="70" r="6" fill="#3b2f2f" />
      <circle cx="72" cy="70" r="6" fill="#3b2f2f" />
      <circle cx="60" cy="82" r="8" fill="#f6b7d2" />
      <path d="M54 90 Q60 94 66 90" stroke="#3b2f2f" stroke-width="3" fill="none" />
    </svg>
  `,
  koala: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Coala fofo">
      <circle cx="60" cy="68" r="32" fill="#c7ced6" />
      <circle cx="28" cy="52" r="16" fill="#c7ced6" />
      <circle cx="92" cy="52" r="16" fill="#c7ced6" />
      <circle cx="46" cy="66" r="6" fill="#2f2f2f" />
      <circle cx="74" cy="66" r="6" fill="#2f2f2f" />
      <ellipse cx="60" cy="78" rx="8" ry="10" fill="#2f2f2f" />
      <path d="M52 88 Q60 92 68 88" stroke="#2f2f2f" stroke-width="3" fill="none" />
    </svg>
  `,
  tiger: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Tigrinho fofo">
      <circle cx="60" cy="68" r="34" fill="#f4a261" />
      <polygon points="30,48 20,24 44,36" fill="#f4a261" />
      <polygon points="90,48 100,24 76,36" fill="#f4a261" />
      <circle cx="46" cy="66" r="6" fill="#2b2b2b" />
      <circle cx="74" cy="66" r="6" fill="#2b2b2b" />
      <circle cx="60" cy="80" r="8" fill="#f6d3b1" />
      <path d="M52 88 Q60 92 68 88" stroke="#2b2b2b" stroke-width="3" fill="none" />
      <path d="M38 54 L30 48" stroke="#2b2b2b" stroke-width="3" />
      <path d="M82 54 L90 48" stroke="#2b2b2b" stroke-width="3" />
    </svg>
  `,
  owl: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Corujinha fofa">
      <circle cx="60" cy="68" r="32" fill="#caa27c" />
      <circle cx="44" cy="64" r="10" fill="#fff" />
      <circle cx="76" cy="64" r="10" fill="#fff" />
      <circle cx="44" cy="64" r="4" fill="#2b2b2b" />
      <circle cx="76" cy="64" r="4" fill="#2b2b2b" />
      <polygon points="60,74 52,88 68,88" fill="#f4b261" />
      <path d="M36 46 Q60 32 84 46" fill="#caa27c" />
    </svg>
  `,
  deer: `
    <svg viewBox="0 0 120 120" role="img" aria-label="Cervinho fofo">
      <circle cx="60" cy="70" r="32" fill="#d8b28f" />
      <circle cx="44" cy="66" r="6" fill="#2b2b2b" />
      <circle cx="76" cy="66" r="6" fill="#2b2b2b" />
      <circle cx="60" cy="80" r="8" fill="#f4d6b8" />
      <path d="M52 88 Q60 92 68 88" stroke="#2b2b2b" stroke-width="3" fill="none" />
      <path d="M30 26 Q40 12 50 22" stroke="#8c6a4e" stroke-width="4" fill="none" />
      <path d="M90 26 Q80 12 70 22" stroke="#8c6a4e" stroke-width="4" fill="none" />
    </svg>
  `,
};

const animalRoster = [
  { species: "bear", stage: 0 },
  { species: "unicorn", stage: 0 },
  { species: "dog", stage: 0 },
  { species: "cat", stage: 0 },
  { species: "bear", stage: 0 },
  { species: "dog", stage: 0 },
  { species: "unicorn", stage: 0 },
  { species: "cat", stage: 0 },
  { species: "lion", stage: 1 },
  { species: "jaguar", stage: 1 },
  { species: "fox", stage: 1 },
  { species: "panda", stage: 1 },
  { species: "bunny", stage: 1 },
  { species: "koala", stage: 1 },
  { species: "tiger", stage: 2 },
  { species: "owl", stage: 2 },
  { species: "deer", stage: 2 },
  { species: "panda", stage: 2 },
  { species: "fox", stage: 2 },
  { species: "bunny", stage: 2 },
  { species: "dog", stage: 2 },
  { species: "cat", stage: 2 },
  { species: "lion", stage: 3 },
  { species: "unicorn", stage: 3 },
];

const ringConfigs = [
  {
    count: 10,
    radiusMin: 120,
    radiusMax: 150,
    size: "clamp(58px, 12vw, 86px)",
    depth: 4,
    jitter: 10,
  },
  {
    count: 10,
    radiusMin: 170,
    radiusMax: 210,
    size: "clamp(52px, 11vw, 78px)",
    depth: 2,
    jitter: 12,
  },
  {
    count: 4,
    radiusMin: 230,
    radiusMax: 260,
    size: "clamp(44px, 9vw, 64px)",
    depth: 1,
    jitter: 16,
  },
];

function updateMeter(value) {
  const percent = Math.min(100, Math.max(0, value * 100));
  meterFill.style.width = `${percent}%`;
}

function setStage(nextStage) {
  stage = Math.min(3, Math.max(0, nextStage));
  document.body.dataset.stage = String(stage);
  updateAnimalVisibility();
  assignDancesForStage(stage);
  updateConfettiIntensity(stage);
  updateBalloons(stage);
  if (stage >= 1) {
    startConfetti();
  }
  if (stage === 3 && !celebration) {
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
  triggerSparkles();
  assignDancesForStage(3);
  ensureLetters();
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

function updateAnimalVisibility() {
  animals.forEach((animal) => {
    const minStage = Number(animal.dataset.stage);
    animal.classList.toggle("is-active", stage >= minStage);
  });
}

function assignDancesForStage(currentStage) {
  const stageDanceMap = {
    1: ["bounce", "sway"],
    2: ["bounce", "sway", "shimmy", "hop", "spin"],
    3: ["bounce", "sway", "shimmy", "hop", "spin"],
  };
  const available = stageDanceMap[currentStage] || [];
  if (available.length === 0) return;
  animals.forEach((animal) => {
    const pick = available[Math.floor(Math.random() * available.length)];
    animal.dataset.dance = pick;
  });
  handleDanceCombos(currentStage, available);
}

function handleDanceCombos(currentStage, available) {
  danceSwapTimers.forEach((timer) => clearTimeout(timer));
  danceSwapTimers = [];
  if (currentStage !== 3 || prefersReducedMotion) return;
  animals.forEach((animal) => {
    if (Math.random() < 0.35) {
      const scheduleSwap = () => {
        const nextDance =
          available[Math.floor(Math.random() * available.length)];
        animal.dataset.dance = nextDance;
        const delay = 2000 + Math.random() * 2000;
        const timer = setTimeout(scheduleSwap, delay);
        danceSwapTimers.push(timer);
      };
      const delay = 2000 + Math.random() * 2000;
      const timer = setTimeout(scheduleSwap, delay);
      danceSwapTimers.push(timer);
    }
  });
}

function updateBalloons(currentStage) {
  if (currentStage < 2) {
    balloonsContainer.innerHTML = "";
    return;
  }
  const count = prefersReducedMotion
    ? currentStage === 2
      ? 5
      : 7
    : currentStage === 2
      ? 14
      : 22;
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
    confettiTarget = currentStage === 1 ? 10 : currentStage === 2 ? 16 : 22;
  } else {
    confettiTarget = currentStage === 1 ? 80 : currentStage === 2 ? 140 : 220;
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

function mulberry32(seed) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(items, seed) {
  const random = mulberry32(seed);
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const deckState = {
  queue: [],
};

function createNewDeck() {
  const seed = Date.now();
  deckState.queue = seededShuffle(
    messagePool.map((messageItem) => messageItem.id),
    seed
  );
  syncDeck();
}

function syncDeck() {
  try {
    localStorage.setItem(DECK_KEY, JSON.stringify(deckState.queue));
  } catch (error) {
    console.warn("Falha ao salvar baralho", error);
  }
}

function drawMessage(avoidArtists) {
  if (deckState.queue.length === 0) {
    createNewDeck();
  }
  let attempts = deckState.queue.length;
  while (attempts > 0) {
    const id = deckState.queue.shift();
    const messageItem = messageById.get(id);
    if (!messageItem) {
      attempts -= 1;
      continue;
    }
    if (avoidArtists.has(messageItem.artist)) {
      deckState.queue.push(id);
      attempts -= 1;
      continue;
    }
    syncDeck();
    return messageItem;
  }
  syncDeck();
  return null;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
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

function assignLetterToAnimal(animal, messageItem) {
  if (!animal || !messageItem) return;
  const button = createLetterButton();
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openModal(messageItem, animal);
  });
  animal.classList.add("letter-carrier", "letter-pop");
  animal.dataset.messageId = messageItem.id;
  animal.appendChild(button);
  activeLetters.set(animal, messageItem);
  setTimeout(() => {
    animal.classList.remove("letter-pop");
  }, LETTER_POP_DURATION);
}

function removeLetterFromAnimal(animal) {
  if (!animal) return;
  const button = animal.querySelector(".letter-icon");
  if (button) button.remove();
  animal.classList.remove("letter-carrier", "letter-pop");
  animal.dataset.messageId = "";
  activeLetters.delete(animal);
}

function ensureLetters() {
  if (stage !== 3) return;
  const activeArtists = new Set(
    Array.from(activeLetters.values()).map((item) => item.artist)
  );
  const eligibleAnimals = animals.filter(
    (animal) => animal.classList.contains("is-active") && !activeLetters.has(animal)
  );
  const maxActive = Math.min(3, animals.length);
  let needed = Math.min(maxActive - activeLetters.size, eligibleAnimals.length);
  if (needed <= 0) return;
  const shuffledEligible = shuffle(eligibleAnimals);
  while (needed > 0 && shuffledEligible.length > 0) {
    const animal = shuffledEligible.shift();
    const messageItem = drawMessage(activeArtists);
    if (!messageItem) {
      needed = 0;
      break;
    }
    assignLetterToAnimal(animal, messageItem);
    activeArtists.add(messageItem.artist);
    needed -= 1;
  }
}

function openModal(messageItem, animal) {
  modalSender.textContent = messageItem.artist;
  modalMessage.textContent = messageItem.body;
  modal.classList.remove("hidden");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  activeModalAnimal = animal;
}

function closeModal() {
  if (modal.classList.contains("hidden")) return;
  modal.classList.remove("open");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (activeModalAnimal) {
    removeLetterFromAnimal(activeModalAnimal);
    const delay = 400 + Math.random() * 500;
    setTimeout(() => {
      ensureLetters();
    }, delay);
  }
  activeModalAnimal = null;
}

function spawnAnimals() {
  animalsContainer.innerHTML = "";
  animals.length = 0;
  const hueOptions = [-18, -10, -4, 0, 6, 12, 18, 24];
  const ringSlots = ringConfigs.map((ring) => ({
    config: ring,
    index: 0,
  }));

  animalRoster.forEach((animalData, index) => {
    const ringIndex = index < 10 ? 0 : index < 20 ? 1 : 2;
    const ring = ringConfigs[ringIndex];
    const slot = ringSlots[ringIndex];
    const angleStep = 360 / ring.count;
    const jitter = (Math.random() * 2 - 1) * ring.jitter;
    const angle = slot.index * angleStep + jitter;
    const radius =
      ring.radiusMin + Math.random() * (ring.radiusMax - ring.radiusMin);
    slot.index += 1;

    const animal = document.createElement("div");
    animal.className = "animal";
    animal.dataset.stage = String(animalData.stage);
    animal.dataset.species = animalData.species;
    animal.style.setProperty("--angle", `${angle}deg`);
    animal.style.setProperty("--radius", `${radius}px`);
    animal.style.setProperty("--scale", ringIndex === 2 ? "0.92" : "1");
    animal.style.setProperty("--depth", String(ring.depth));
    animal.style.setProperty("--size", ring.size);
    animal.style.setProperty(
      "--hue",
      `${hueOptions[Math.floor(Math.random() * hueOptions.length)]}deg`
    );

    const inner = document.createElement("div");
    inner.className = "animal-inner";
    inner.innerHTML = speciesSvgs[animalData.species] || speciesSvgs.bear;
    animal.appendChild(inner);
    animalsContainer.appendChild(animal);
    animals.push(animal);
  });
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

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

spawnAnimals();
createNewDeck();
setStage(0);
