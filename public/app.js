const MODALITIES = [
  {
    id: "megasena",
    name: "Mega-Sena",
    price: 5.0,
    pick: { min: 6, max: 6, universe: 60 },
    rules: "Escolha 6 números entre 1 e 60. Prêmios para sena, quina e quadra.",
    supportsCheck: true,
  },
  {
    id: "mega-virada",
    name: "Mega da Virada",
    price: 5.0,
    pick: { min: 6, max: 6, universe: 60 },
    rules: "Concurso especial de 31/12 com o maior prêmio do ano. Não acumula e segue as mesmas apostas da Mega-Sena.",
    supportsCheck: false,
    note: "Próximo concurso previsto para 31/12. Use os números oficiais daquele ano para conferir.",
  },
  {
    id: "quina",
    name: "Quina",
    price: 2.5,
    pick: { min: 5, max: 5, universe: 80 },
    rules: "Selecione 5 números entre 1 e 80. Prêmios para quina, quadra, terno e duque.",
    supportsCheck: true,
  },
  {
    id: "lotofacil",
    name: "Lotofácil",
    price: 3.0,
    pick: { min: 15, max: 15, universe: 25 },
    rules: "Escolha 15 números entre 1 e 25. Premiações da 11 até 15 dezenas acertadas.",
    supportsCheck: true,
  },
  {
    id: "lotomania",
    name: "Lotomania",
    price: 3.0,
    pick: { min: 50, max: 50, universe: 100 },
    rules: "Marque 50 números de 1 a 100. Premiação de 15 a 20 acertos e também para 0 acertos.",
    supportsCheck: true,
  },
  {
    id: "timemania",
    name: "Timemania",
    price: 3.5,
    pick: { min: 10, max: 10, universe: 80 },
    rules: "Escolha 10 dezenas (1 a 80) e um Time do Coração. Premiação de 3 a 7 acertos + bônus por acertar o time.",
    supportsCheck: true,
  },
  {
    id: "diadesorte",
    name: "Dia de Sorte",
    price: 2.5,
    pick: { min: 7, max: 7, universe: 31 },
    rules: "Escolha 7 números de 1 a 31 e um mês da sorte. Premiação de 4 a 7 acertos e para o mês sorteado.",
    supportsCheck: true,
  },
  {
    id: "duplasena",
    name: "Dupla Sena",
    price: 2.5,
    pick: { min: 6, max: 6, universe: 50 },
    rules: "Dois sorteios por concurso. Aposta mínima de 6 dezenas entre 1 e 50; paga sena, quina, quadra e terno em cada sorteio.",
    supportsCheck: true,
  },
  {
    id: "supersete",
    name: "Super Sete",
    price: 2.5,
    pick: { min: 7, max: 7, universe: 9 },
    rules: "Escolha 1 número em cada uma das 7 colunas (0 a 9). Premiação de 3 a 7 acertos na posição.",
    supportsCheck: true,
  },
  {
    id: "maismilionaria",
    name: "+Milionária",
    price: 6.0,
    pick: { min: 6, max: 6, universe: 50 },
    rules: "6 dezenas de 1 a 50 e 2 trevos de 1 a 6. Faixa principal requer 6 dezenas + 2 trevos.",
    supportsCheck: true,
    needsTrevos: true,
  },
];

const contestData = {};
let selectedModality = MODALITIES[0];
const modalitySelect = document.getElementById("modality");
const rulesContainer = document.getElementById("rules");
const contestDetails = document.getElementById("contestDetails");
const resultBox = document.getElementById("result");
const numbersInput = document.getElementById("numbers");
const trevosInput = document.getElementById("trevos");
const trevosGroup = document.getElementById("trevosGroup");

function buildRules(modality) {
  rulesContainer.innerHTML = "";
  const priceCard = document.createElement("div");
  priceCard.className = "rule-card";
  priceCard.innerHTML = `<h3>Valor mínimo</h3><p>R$ ${modality.price.toFixed(2)} por aposta básica.</p>`;

  const pickCard = document.createElement("div");
  pickCard.className = "rule-card";
  pickCard.innerHTML = `<h3>Escolha de dezenas</h3><p>${modality.pick.min === modality.pick.max ? "Exatamente" : "De"} ${modality.pick.min}${
    modality.pick.max !== modality.pick.min ? ` a ${modality.pick.max}` : ""
  } números até ${modality.pick.universe.toString().padStart(2, "0")}.</p>`;

  const rulesCard = document.createElement("div");
  rulesCard.className = "rule-card";
  rulesCard.innerHTML = `<h3>Regras principais</h3><p>${modality.rules}</p>`;

  rulesContainer.append(priceCard, pickCard, rulesCard);

  if (modality.note) {
    const noteCard = document.createElement("div");
    noteCard.className = "rule-card";
    noteCard.innerHTML = `<h3>Observação</h3><p>${modality.note}</p>`;
    rulesContainer.append(noteCard);
  }
}

function formatNumbers(list) {
  if (!list) return "—";
  return list
    .map((n) => n.toString().padStart(2, "0"))
    .map((n) => `<span class="number-chip">${n}</span>`) // ok
    .join(" ");
}

function updateContestCard(modality) {
  const data = contestData[modality.id];
  if (!modality.supportsCheck) {
    contestDetails.innerHTML = `<h3>${modality.name}</h3><p class="small">Modalidade especial. Consulte o site oficial para o resultado mais recente da Virada.</p>`;
    return;
  }
  if (!data) {
    contestDetails.innerHTML = `<h3>${modality.name}</h3><p class="small">Sem dados de concurso no momento.</p>`;
    return;
  }

  const second = data.secondDraw
    ? `<div><p class="small">2º sorteio</p><div class="numbers">${formatNumbers(data.secondDraw)}</div></div>`
    : "";

  const trevos = data.trevos
    ? `<div class="small">Trevos sorteados: ${data.trevos.map((t) => `<span class="badge">${t}</span>`).join(" ")}</div>`
    : "";

  contestDetails.innerHTML = `
    <div class="contest-card__header">
      <h3>${data.name}</h3>
      <p class="small">Concurso ${data.contest} • ${data.drawDate || "data não informada"}</p>
    </div>
    <div class="numbers">${formatNumbers(data.numbers)}</div>
    ${second}
    ${trevos}
  `;
}

function parseInputList(text) {
  return text
    .split(/[^0-9]+/)
    .map((n) => n.trim())
    .filter(Boolean);
}

function scoreMatch(modality, userNumbers) {
  const data = contestData[modality.id];
  if (!data || !modality.supportsCheck) {
    return { message: "Sem dados para verificar." };
  }

  if (modality.id === "supersete") {
    const drawn = data.numbers || [];
    const user = userNumbers.slice(0, 7);
    const matches = user.reduce((acc, n, idx) => acc + (n === drawn[idx] ? 1 : 0), 0);
    return { message: `${matches} acertos na posição (${matches >= 3 ? "premiado" : "abaixo da faixa mínima"}).` };
  }

  const drawn = new Set((data.numbers || []).map((n) => n.toString().padStart(2, "0")));
  const hits = userNumbers.filter((n) => drawn.has(n)).length;

  let extraTrevos = 0;
  if (modality.needsTrevos) {
    const drawnTrevos = new Set((data.trevos || []).map((t) => t.toString()));
    const userTrevos = parseInputList(trevosInput.value);
    extraTrevos = userTrevos.filter((t) => drawnTrevos.has(t)).length;
  }

  const label = describeHits(modality.id, hits, extraTrevos);
  return { message: `Você acertou ${hits} ${hits === 1 ? "dezena" : "dezenas"}${
    extraTrevos ? ` e ${extraTrevos} trevo(s)` : ""
  } — ${label}.` };
}

function describeHits(modalityId, hits, trevos) {
  switch (modalityId) {
    case "megasena":
      if (hits === 6) return "Sena";
      if (hits === 5) return "Quina";
      if (hits === 4) return "Quadra";
      return "Sem faixa premiada";
    case "quina":
      if (hits === 5) return "Quina";
      if (hits === 4) return "Quadra";
      if (hits === 3) return "Terno";
      if (hits === 2) return "Duque";
      return "Sem faixa premiada";
    case "lotofacil":
      if (hits >= 15) return "Faixa principal (15 acertos)";
      if (hits === 14) return "14 acertos";
      if (hits === 13) return "13 acertos";
      if (hits === 12) return "12 acertos";
      if (hits === 11) return "11 acertos";
      return "Abaixo da faixa mínima";
    case "lotomania":
      if (hits === 20) return "Faixa principal (20 acertos)";
      if (hits >= 15) return `${hits} acertos premiados`;
      if (hits === 0) return "Premiação por zero acertos";
      return "Abaixo da faixa mínima";
    case "timemania":
      if (hits === 7) return "7 acertos";
      if (hits === 6) return "6 acertos";
      if (hits === 5) return "5 acertos";
      if (hits === 4) return "4 acertos";
      if (hits === 3) return "3 acertos";
      return "Abaixo da faixa mínima (considere o Time do Coração à parte)";
    case "diadesorte":
      if (hits === 7) return "7 acertos";
      if (hits === 6) return "6 acertos";
      if (hits === 5) return "5 acertos";
      if (hits === 4) return "4 acertos";
      return "Abaixo da faixa mínima";
    case "duplasena":
      if (hits === 6) return "Sena";
      if (hits === 5) return "Quina";
      if (hits === 4) return "Quadra";
      if (hits === 3) return "Terno";
      return "Abaixo da faixa mínima";
    case "supersete":
      return `${hits} acertos posicionais`;
    case "maismilionaria":
      if (hits === 6 && trevos === 2) return "Faixa principal (6 + 2 trevos)";
      if (hits === 6 && trevos === 1) return "6 acertos + 1 trevo";
      if (hits === 5 && trevos === 2) return "5 acertos + 2 trevos";
      if (hits === 5 && trevos === 1) return "5 acertos + 1 trevo";
      if (hits === 4 && trevos >= 1) return "4 dezenas + trevos";
      if (hits === 4) return "4 dezenas";
      if (hits === 3 && trevos >= 1) return "3 dezenas + trevos";
      return "Abaixo das faixas pagas";
    default:
      return "Faixa não mapeada";
  }
}

function handleSelectionChange() {
  const id = modalitySelect.value;
  selectedModality = MODALITIES.find((m) => m.id === id) || MODALITIES[0];
  buildRules(selectedModality);
  updateContestCard(selectedModality);
  trevosGroup.hidden = !selectedModality.needsTrevos;
  resultBox.textContent = "";
}

function renderSelect() {
  modalitySelect.innerHTML = MODALITIES.map((m) => `<option value="${m.id}">${m.name}</option>`).join("");
}

function renderGeneratedAt(timestamp) {
  const target = document.getElementById("generatedAt");
  if (timestamp) {
    target.textContent = `Base atualizada em ${new Date(timestamp).toLocaleString()}`;
  }
}

async function loadContests() {
  const response = await fetch("contests.json");
  const data = await response.json();
  renderGeneratedAt(data.generatedAt);
  Object.assign(contestData, data.modalities);
  // Ajusta Mega da Virada para reutilizar a última Mega-Sena como referência base
  contestData["mega-virada"] = contestData["megasena"];
  updateContestCard(selectedModality);
}

function normalizeUserInput(text, min, max) {
  const list = parseInputList(text).map((n) => n.padStart(2, "0"));
  if (list.length < min || list.length > max) {
    return { error: `Informe entre ${min} e ${max} dezenas.` };
  }
  return { values: list };
}

function attachListeners() {
  modalitySelect.addEventListener("change", handleSelectionChange);
  document.getElementById("checkBtn").addEventListener("click", () => {
    const { min, max } = selectedModality.pick;
    const user = normalizeUserInput(numbersInput.value, min, max);
    if (user.error) {
      resultBox.textContent = user.error;
      return;
    }
    const outcome = scoreMatch(selectedModality, user.values);
    resultBox.textContent = outcome.message;
  });
}

async function bootstrap() {
  renderSelect();
  attachListeners();
  handleSelectionChange();
  await loadContests();
}

bootstrap();
