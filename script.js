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
    discovery: '1828 (sintético francês)',
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
    discovery: '1915 (óxido de ferro calcinado)',
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
    discovery: '1991 (benzimidazolona)',
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
    discovery: '1809 (França)',
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
    discovery: 'Antiguidade (Toscana)',
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
    discovery: '1840 (parisiense)',
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
    discovery: '1958 (IG Farben)',
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
    discovery: '1860 (Rowney)',
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
    discovery: 'Século XVIII (carbonização de osso)',
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
    discovery: '1921 (DuPont)',
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
    discovery: '1838 (Guignet)',
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
    discovery: '1935 (ICI)',
    notes: 'Croma intenso; use pouco para evitar dominar misturas.'
  },
  {
    name: 'Azul Cobalto Claro',
    brand: 'Winsor & Newton Artists',
    pigment: 'PB28',
    binder: 'óleo de linhaça',
    opacity: 'semi-opaca',
    lightfastness: 'ASTM I',
    url: 'https://www.winsornewton.com/',
    color: '#5b7fc5',
    discovery: '1802 (Thenard)',
    notes: 'Azul vibrante sem verde; excelente para céus saturados.'
  },
  {
    name: 'Índigo Sintético',
    brand: 'Michael Harding',
    pigment: 'PB66',
    binder: 'óleo de linhaça',
    opacity: 'semi-transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.michaelharding.co.uk/',
    color: '#1f2f4f',
    discovery: '1878 (Baeyer)',
    notes: 'Profundo e neutro, bom para sombras e veladuras noturnas.'
  },
  {
    name: 'Azul da Prússia',
    brand: 'Talens Van Gogh',
    pigment: 'PB27',
    binder: 'óleo de linhaça',
    opacity: 'semi-transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.royaltalens.com/',
    color: '#12334a',
    discovery: '1704 (Diesbach)',
    notes: 'Tom histórico, escurece misturas sem sujar.'
  },
  {
    name: 'Vermelhão Moderno',
    brand: 'Sennelier',
    pigment: 'PR106',
    binder: 'óleo de noz',
    opacity: 'opaca',
    lightfastness: 'ASTM I',
    url: 'https://www.sennelier-colors.com/',
    color: '#c23a24',
    discovery: 'Século VIII (sulfeto de mercúrio)',
    notes: 'Vermelho saturado tradicional, hoje produzido de forma controlada.'
  },
  {
    name: 'Rosa Permanente',
    brand: 'Rembrandt',
    pigment: 'PV19',
    binder: 'óleo de linhaça',
    opacity: 'transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.royaltalens.com/en/rembrandt/',
    color: '#cf3e78',
    discovery: '1950 (quinacridona)',
    notes: 'Ideal para florais e pele fria com controle de saturação.'
  },
  {
    name: 'Amarelo Nápoles Claro',
    brand: 'Old Holland',
    pigment: 'PBr24',
    binder: 'óleo de cártamo',
    opacity: 'opaca',
    lightfastness: 'ASTM I',
    url: 'https://www.oldholland.com/',
    color: '#f1d596',
    discovery: 'Século XVII (plumbato de cálcio)',
    notes: 'Clássico de retrato, suaviza tons de pele e gesso.'
  },
  {
    name: 'Laranja de Cádmio',
    brand: 'Gamblin',
    pigment: 'PO20',
    binder: 'óleo de linhaça',
    opacity: 'opaca',
    lightfastness: 'ASTM I',
    url: 'https://gamblincolors.com/',
    color: '#f28c28',
    discovery: '1817 (Stromeyer)',
    notes: 'Vibrante e estável, ótimo para luzes quentes e paisagem.'
  },
  {
    name: 'Verde Cobalto Turquesa',
    brand: 'Maimeri Puro',
    pigment: 'PG50',
    binder: 'óleo de linhaça',
    opacity: 'semi-transparente',
    lightfastness: 'ASTM I',
    url: 'https://www.maimeri.it/',
    color: '#3aa6a2',
    discovery: '1931 (cobalto zinco)',
    notes: 'Turquesa intensa e limpa; excelente para efeitos aquáticos.'
  }
];

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('busca');
const brandSelect = document.getElementById('marca');
const pigmentSelect = document.getElementById('pigmento');
const binderSelect = document.getElementById('ligante');
const opacitySelect = document.getElementById('opacidade');
const countElement = document.getElementById('resultado-count');
const statTotal = document.getElementById('stat-total');
const statPigmentos = document.getElementById('stat-pigmentos');
const statMarcas = document.getElementById('stat-marcas');
const rgbCanvas = document.getElementById('rgb-map');
const rgbDetails = document.getElementById('rgb-details');
const rgbValueEl = document.getElementById('rgb-value');
const hexValueEl = document.getElementById('hex-value');
const closestNameEl = document.getElementById('closest-name');
const closestDateEl = document.getElementById('closest-date');

const rgbCells = [];
const rgbGridConfig = { cols: 18, rows: 10, cellW: 0, cellH: 0 };
let lastClosest = null;

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

function updateStats() {
  statTotal.textContent = paints.length;
  statPigmentos.textContent = new Set(paints.map((p) => p.pigment)).size;
  statMarcas.textContent = new Set(paints.map((p) => p.brand)).size;
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
          <span class="tag">Descoberta: ${paint.discovery}</span>
        </div>
        <p class="subtitle">${paint.notes}</p>
        <div class="card__footer">
          <span class="tag">RGB: ${paint.color.toUpperCase()}</span>
          <a class="tag tag--link" href="${paint.url}" target="_blank" rel="noreferrer">Abrir ficha técnica</a>
        </div>
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
      paint.notes.toLowerCase().includes(query) ||
      paint.discovery.toLowerCase().includes(query);

    const matchesBrand = !brand || paint.brand === brand;
    const matchesPigment = !pigment || paint.pigment === pigment;
    const matchesBinder = !binder || paint.binder === binder;
    const matchesOpacity = !opacity || paint.opacity === opacity;

    return matchesQuery && matchesBrand && matchesPigment && matchesBinder && matchesOpacity;
  });

  renderCards(filtered);
}

function hexToRgb(hex) {
  const parsed = hex.replace('#', '');
  const bigint = parseInt(parsed, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}`;
}

function hslToRgb(h, s, l) {
  const _s = s / 100;
  const _l = l / 100;
  const c = (1 - Math.abs(2 * _l - 1)) * _s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = _l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
  } else if (h >= 120 && h < 180) {
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

function colorDistance(hexA, hexB) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

function findClosestPaint(hex) {
  let best = paints[0];
  let distance = colorDistance(hex, paints[0].color);

  for (const paint of paints.slice(1)) {
    const current = colorDistance(hex, paint.color);
    if (current < distance) {
      distance = current;
      best = paint;
    }
  }

  return { paint: best, distance };
}

function buildRGBGrid() {
  if (!rgbCanvas) return;

  const ctx = rgbCanvas.getContext('2d');
  rgbCells.length = 0;
  rgbGridConfig.cellW = rgbCanvas.width / rgbGridConfig.cols;
  rgbGridConfig.cellH = rgbCanvas.height / rgbGridConfig.rows;

  for (let row = 0; row < rgbGridConfig.rows; row++) {
    for (let col = 0; col < rgbGridConfig.cols; col++) {
      const hue = (col / rgbGridConfig.cols) * 360;
      const lightness = 18 + (row / rgbGridConfig.rows) * 70;
      const saturation = 72;
      const { r, g, b } = hslToRgb(hue, saturation, lightness);
      const hex = rgbToHex(r, g, b);

      ctx.fillStyle = hex;
      ctx.fillRect(col * rgbGridConfig.cellW, row * rgbGridConfig.cellH, rgbGridConfig.cellW, rgbGridConfig.cellH);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.strokeRect(col * rgbGridConfig.cellW, row * rgbGridConfig.cellH, rgbGridConfig.cellW, rgbGridConfig.cellH);

      rgbCells.push({
        x: col * rgbGridConfig.cellW,
        y: row * rgbGridConfig.cellH,
        w: rgbGridConfig.cellW,
        h: rgbGridConfig.cellH,
        hex,
        rgb: `RGB(${r}, ${g}, ${b})`
      });
    }
  }
}

function updateRGBDisplays(cell) {
  if (!cell) return;

  const closest = findClosestPaint(cell.hex);
  lastClosest = closest;

  rgbValueEl.textContent = cell.rgb;
  hexValueEl.textContent = cell.hex.toUpperCase();
  closestNameEl.textContent = `${closest.paint.name} • ${closest.paint.brand}`;
  closestDateEl.textContent = `Descoberta: ${closest.paint.discovery}`;
  rgbDetails.innerHTML = `
    <strong>${closest.paint.name}</strong> (${closest.paint.brand})<br />
    Pigmento ${closest.paint.pigment} • Opacidade ${closest.paint.opacity}<br />
    ${closest.paint.notes}
  `;
}

function handleRGBMove(event) {
  if (!rgbCanvas) return;
  const rect = rgbCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const col = Math.min(rgbGridConfig.cols - 1, Math.max(0, Math.floor((x / rect.width) * rgbGridConfig.cols)));
  const row = Math.min(rgbGridConfig.rows - 1, Math.max(0, Math.floor((y / rect.height) * rgbGridConfig.rows)));
  const index = row * rgbGridConfig.cols + col;
  updateRGBDisplays(rgbCells[index]);
}

function handleRGBLeave() {
  rgbValueEl.textContent = '-';
  hexValueEl.textContent = '-';
  closestNameEl.textContent = '-';
  closestDateEl.textContent = '';
  rgbDetails.textContent = 'Passe o mouse para ver detalhes.';
  lastClosest = null;
}

function handleRGBClick() {
  if (!lastClosest) return;
  searchInput.value = lastClosest.paint.pigment;
  filterPaints();
}

function setupRGBPanel() {
  if (!rgbCanvas) return;
  buildRGBGrid();
  rgbCanvas.addEventListener('mousemove', handleRGBMove);
  rgbCanvas.addEventListener('mouseleave', handleRGBLeave);
  rgbCanvas.addEventListener('click', handleRGBClick);
}

function init() {
  populateOptions();
  renderCards(paints);
  updateStats();
  setupRGBPanel();

  searchInput.addEventListener('input', filterPaints);
  brandSelect.addEventListener('change', filterPaints);
  pigmentSelect.addEventListener('change', filterPaints);
  binderSelect.addEventListener('change', filterPaints);
  opacitySelect.addEventListener('change', filterPaints);
}

init();
