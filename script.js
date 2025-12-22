const paints = [
  {
    name: 'Azul Ultramarino Profundo',
    brand: 'Winsor & Newton Artists',
    pigment: 'PB29',
    binder: 'óleo de linhaça',
    opacity: 'transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.winsornewton.com/',
    color: '#0c3c78',
    notes: 'Clássico para paisagem, excelente para glacis frios.'
  },
  {
    name: 'Vermelho Óxido Translúcido',
    brand: 'Rembrandt',
    pigment: 'PR101',
    binder: 'óleo de linhaça',
    opacity: 'semi-transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.royaltalens.com/en/rembrandt/',
    color: '#b13a2d',
    notes: 'Terroso versátil, ideal para pele e aquecimentos sutis.'
  },
  {
    name: 'Amarelo Indiano Moderno',
    brand: 'Old Holland',
    pigment: 'PY150',
    binder: 'óleo de cártamo',
    opacity: 'transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.oldholland.com/',
    color: '#e2a625',
    notes: 'Secagem um pouco mais lenta; perfeito para misturas luminosas.'
  },
  {
    name: 'Verde Óxido Crômico',
    brand: 'Michael Harding',
    pigment: 'PG17',
    binder: 'óleo de linhaça',
    opacity: 'opaca',
    lightfastness: 'ASTM I',
    url: 'https://www.michaelharding.co.uk/',
    color: '#4a6b46',
    notes: 'Opacidade alta, útil para bases e modelagem de massas.'
  },
  {
    name: 'Terra de Siena Queimada',
    brand: 'Talens Van Gogh',
    pigment: 'PBr7',
    binder: 'óleo de linhaça',
    opacity: 'semi-opaca',
    lightfastness: 'ASTM I',
    url: 'https://www.royaltalens.com/',
    color: '#8a3f2a',
    notes: 'Padrão confiável para paisagens quentes e pele.'
  },
  {
    name: 'Amarelo Cádmio Claro',
    brand: 'Gamblin',
    pigment: 'PY35',
    binder: 'óleo de linhaça',
    opacity: 'opaca',
    lightfastness: 'ASTM I',
    url: 'https://gamblincolors.com/',
    color: '#f8c73a',
    notes: 'Alta cobertura e saturação para paletas históricas.'
  },
  {
    name: 'Laca Quinacridone Magenta',
    brand: 'Sennelier',
    pigment: 'PR122',
    binder: 'óleo de noz',
    opacity: 'transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.sennelier-colors.com/',
    color: '#bb2467',
    notes: 'Excelente para misturas de violeta e glazing intenso.'
  },
  {
    name: 'Azul Cerúleo',
    brand: 'Blockx',
    pigment: 'PB35',
    binder: 'óleo de linhaça',
    opacity: 'semi-opaca',
    lightfastness: 'ASTM I',
    url: 'https://www.blockx.be/',
    color: '#4499c5',
    notes: 'Granulação leve e toque esverdeado; útil em céus frios.'
  },
  {
    name: 'Preto Marfim',
    brand: 'Schmincke Mussini',
    pigment: 'PBk9',
    binder: 'óleo de noz',
    opacity: 'opaca',
    lightfastness: 'ASTM I',
    url: 'https://www.schmincke.de/',
    color: '#0f1014',
    notes: 'Tradicional, seco moderadamente rápido com bom corpo.'
  },
  {
    name: 'Branco de Titânio',
    brand: 'Mussini',
    pigment: 'PW6',
    binder: 'óleo de cártamo',
    opacity: 'opaca',
    lightfastness: 'ASTM I',
    url: 'https://www.schmincke.de/',
    color: '#f2f2f2',
    notes: 'Ligante mais claro para minimizar amarelecimento.'
  },
  {
    name: 'Verde Viridian',
    brand: 'Maimeri Puro',
    pigment: 'PG18',
    binder: 'óleo de linhaça',
    opacity: 'semi-transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.maimeri.it/',
    color: '#1f7c6d',
    notes: 'Ideal para paisagem e misturas limpas com amarelos.'
  },
  {
    name: 'Azul Ftalo (Verde)',
    brand: 'Grumbacher',
    pigment: 'PB15:3',
    binder: 'óleo de linhaça',
    opacity: 'transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.grumbacher.art/',
    color: '#075c63',
    notes: 'Croma intenso; use pouco para evitar dominar misturas.'
  }
];

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('busca');
const brandSelect = document.getElementById('marca');
const pigmentSelect = document.getElementById('pigmento');
const binderSelect = document.getElementById('ligante');
const opacitySelect = document.getElementById('opacidade');
const countElement = document.getElementById('resultado-count');

function populateOptions() {
  const brands = Array.from(new Set(paints.map((p) => p.brand))).sort();
  const pigments = Array.from(new Set(paints.map((p) => p.pigment))).sort();

  for (const brand of brands) {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  }

  for (const pigment of pigments) {
    const option = document.createElement('option');
    option.value = pigment;
    option.textContent = pigment;
    pigmentSelect.appendChild(option);
  }
}

function renderCards(list) {
  cardsContainer.innerHTML = '';

  if (!list.length) {
    cardsContainer.innerHTML = '<p class="subtitle">Nenhum resultado. Ajuste os filtros ou tente outro pigmento.</p>';
    countElement.textContent = '0 resultados';
    return;
  }

  const fragment = document.createDocumentFragment();

  list.forEach((paint) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__swatch" style="--color:${paint.color}"></div>
      <div class="card__body">
        <div class="card__meta">
          <span class="tag">${paint.brand}</span>
          <span class="tag">${paint.pigment}</span>
          <span class="tag">${paint.opacity}</span>
        </div>
        <h4>${paint.name}</h4>
        <div class="card__tags">
          <span class="tag">Ligante: ${paint.binder}</span>
          <span class="tag">Permanência: ${paint.lightfastness}</span>
        </div>
        <p class="subtitle">${paint.notes}</p>
        <a class="tag" href="${paint.url}" target="_blank" rel="noreferrer">Abrir ficha técnica</a>
      </div>
    `;

    fragment.appendChild(card);
  });

  cardsContainer.appendChild(fragment);
  countElement.textContent = `${list.length} ${list.length === 1 ? 'resultado' : 'resultados'}`;
}

function filterPaints() {
  const query = searchInput.value.toLowerCase().trim();
  const brand = brandSelect.value;
  const pigment = pigmentSelect.value;
  const binder = binderSelect.value;
  const opacity = opacitySelect.value;

  const filtered = paints.filter((paint) => {
    const matchesQuery =
      !query ||
      paint.name.toLowerCase().includes(query) ||
      paint.brand.toLowerCase().includes(query) ||
      paint.pigment.toLowerCase().includes(query) ||
      paint.notes.toLowerCase().includes(query);

    const matchesBrand = !brand || paint.brand === brand;
    const matchesPigment = !pigment || paint.pigment === pigment;
    const matchesBinder = !binder || paint.binder === binder;
    const matchesOpacity = !opacity || paint.opacity === opacity;

    return matchesQuery && matchesBrand && matchesPigment && matchesBinder && matchesOpacity;
  });

  renderCards(filtered);
}

function init() {
  populateOptions();
  renderCards(paints);

  searchInput.addEventListener('input', filterPaints);
  brandSelect.addEventListener('change', filterPaints);
  pigmentSelect.addEventListener('change', filterPaints);
  binderSelect.addEventListener('change', filterPaints);
  opacitySelect.addEventListener('change', filterPaints);
}

init();
