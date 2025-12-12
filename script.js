const heroPosts = [
  {
    title: 'Apresentamos o GPT-5.2',
    description: 'Geração nativa de áudio, vídeo e imagem, com contexto persistente e guardrails reforçados.',
    time: '12 minutos',
    category: 'Produto',
    author: 'Equipe de Pesquisa',
    date: '17 de fevereiro',
    gradient: 'radial-gradient(circle at 30% 30%, #ffc1e3, #6bb6ff)',
  },
  {
    title: '2025 Report: IA em escala',
    description: 'Como empresas líderes estruturam times, dados e governança para adoção segura.',
    time: '9 minutos',
    category: 'Empresas',
    author: 'Equipe de Estratégia',
    date: '11 de fevereiro',
    gradient: 'radial-gradient(circle at 30% 30%, #b0f3ff, #7b80ff)',
  },
  {
    title: 'Modelos pequenos de pesquisa',
    description: 'Abrimos um conjunto de modelos compactos pensados para cientistas e comunidades acadêmicas.',
    time: '7 minutos',
    category: 'Pesquisa',
    author: 'Laboratório OpenAI',
    date: '4 de fevereiro',
    gradient: 'radial-gradient(circle at 30% 30%, #b5ffbf, #4ddac0)',
  },
];

const posts = [
  {
    title: 'Pesquisa em RL com feedback multimodal',
    category: 'pesquisa',
    tag: 'Pesquisa',
    time: '8 minutos',
    description: 'Como combinamos sinais de áudio e visão para treinar políticas mais robustas.',
    body: 'Exploramos pipelines que combinam dados de voz, gestos e texto para dar feedback granular em modelos generativos. Isso resulta em maior alinhamento situacional em tarefas complexas e melhora a segurança.',
    media: 'linear-gradient(135deg, #6dd5ed, #2193b0)',
  },
  {
    title: 'OpenAI Model Spec 2.1',
    category: 'produto',
    tag: 'Produto',
    time: '5 minutos',
    description: 'Governança clara para desenvolvedores que constroem com a plataforma.',
    body: 'O novo spec traz campos explícitos para auditoria, monitoração de prompts e diretrizes de privacidade. Incluímos exemplos de produção e snippets reutilizáveis para acelerar integrações.',
    media: 'linear-gradient(135deg, #f093fb, #f5576c)',
  },
  {
    title: 'Lançamos a API de vídeo',
    category: 'produto',
    tag: 'Produto',
    time: '6 minutos',
    description: 'Streaming com geração de cenas e legendas sincronizadas.',
    body: 'A API de vídeo permite scripts estruturados, entrada de storyboards e geração de takes alternativos. Inclui detecção de segurança em tempo real e webhooks para revisão humana.',
    media: 'linear-gradient(135deg, #92fe9d, #00c9ff)',
  },
  {
    title: 'Guias para finanças sensíveis',
    category: 'empresas',
    tag: 'Para Empresas',
    time: '4 minutos',
    description: 'Controles para lidar com dados regulados e fluxos críticos de decisão.',
    body: 'Propomos camadas de isolamento de dados, revisões periódicas e playbooks de incidentes. Há dashboards prontos para auditar latência, custo e segurança de maneira centralizada.',
    media: 'linear-gradient(135deg, #f6d365, #fda085)',
  },
  {
    title: 'Toolkit para agentes em JS',
    category: 'desenvolvedores',
    tag: 'Para Desenvolvedores',
    time: '9 minutos',
    description: 'SDK com roteamento, memória e deploy serverless.',
    body: 'Incluímos clientes tipados, ganchos de streaming e ferramentas de teste locais. Os templates cobrem desde chatbots até assistentes de linha de comando.',
    media: 'linear-gradient(135deg, #8a2387, #e94057, #f27121)',
  },
  {
    title: 'Histórias de impacto em educação',
    category: 'historias',
    tag: 'Histórias',
    time: '7 minutos',
    description: 'Professores usando GPT para personalizar currículos e avaliações.',
    body: 'Coletamos relatos de docentes que criaram tutores personalizados, rubricas dinâmicas e exercícios multimídia. O foco é manter transparência e supervisão constante.',
    media: 'linear-gradient(135deg, #c2e59c, #64b3f4)',
  },
  {
    title: 'Boas práticas de segurança',
    category: 'seguranca',
    tag: 'Segurança',
    time: '5 minutos',
    description: 'Checklist revisado para mitigação de riscos em produção.',
    body: 'Criamos procedimentos de revisão de prompt injection, contenção de dados e testes de jailbreak. O guia inclui scripts prontos para rodar scanners automatizados.',
    media: 'linear-gradient(135deg, #f83600, #f9d423)',
  },
  {
    title: 'Casos para times de marketing',
    category: 'empresas',
    tag: 'Para Empresas',
    time: '6 minutos',
    description: 'Automação de copy, geração de cena e análise de sentimento em tempo real.',
    body: 'Apresentamos playbooks para campanhas multimodais com segurança garantida e avaliação humana assistida. Inclui dashboards de impacto e checklist de governança.',
    media: 'linear-gradient(135deg, #00b4db, #0083b0)',
  },
];

const sideHighlights = [
  {
    title: 'Benifit: quando 50 é maior que 2500',
    tag: 'Histórias · 5 minutos',
  },
  {
    title: 'Context API chega aos apps de iOS e Android',
    tag: 'Produto · 4 minutos',
  },
  {
    title: 'Tradução com GPT-4.1 mini está disponível em todos os idiomas',
    tag: 'Produto · 3 minutos',
  },
];

const heroTitle = document.querySelector('#hero-title');
const heroDesc = document.querySelector('#hero-desc');
const heroTime = document.querySelector('.hero-time');
const heroAuthor = document.querySelector('.hero-author');
const heroDate = document.querySelector('.hero-date');
const heroBg = document.querySelector('#hero-bg');
const searchInput = document.querySelector('#search');
const grid = document.querySelector('#post-grid');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#close-modal');
const modalCategory = document.querySelector('#modal-category');
const modalTitle = document.querySelector('#modal-title');
const modalMeta = document.querySelector('#modal-meta');
const modalBody = document.querySelector('#modal-body');

let heroIndex = 0;

function renderHero(index) {
  const item = heroPosts[index];
  heroTitle.textContent = item.title;
  heroDesc.textContent = item.description;
  heroTime.textContent = item.time;
  heroAuthor.textContent = item.author;
  heroDate.textContent = item.date;
  heroBg.style.backgroundImage = item.gradient;
}

function createCard(post) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.category = post.category;
  card.innerHTML = `
    <div class="card-media" style="background-image:${post.media}"></div>
    <div class="chip">${post.tag}</div>
    <h3 class="card-title">${post.title}</h3>
    <p class="card-desc">${post.description}</p>
    <div class="card-footer">
      <span>${post.time}</span>
      <button aria-label="Ler ${post.title}">Ler história completa</button>
    </div>
  `;

  card.querySelector('button').addEventListener('click', () => openModal(post));
  return card;
}

function renderGrid(filter = 'todos', search = '') {
  grid.innerHTML = '';
  const normalized = search.toLowerCase();
  posts
    .filter((post) => filter === 'todos' || post.category === filter)
    .filter((post) =>
      post.title.toLowerCase().includes(normalized) ||
      post.description.toLowerCase().includes(normalized)
    )
    .forEach((post) => grid.appendChild(createCard(post)));

  if (!grid.children.length) {
    grid.innerHTML = '<p class="empty">Nenhum resultado encontrado.</p>';
  }
}

function openModal(post) {
  modalCategory.textContent = post.tag;
  modalTitle.textContent = post.title;
  modalMeta.textContent = `${post.time} · ${post.category}`;
  modalBody.textContent = post.body;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModalWindow() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function renderSideList() {
  const container = document.querySelector('#side-list');
  sideHighlights.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'side-card';
    card.innerHTML = `<p class="news-meta">${item.title}</p><span class="tag">${item.tag}</span>`;
    container.appendChild(card);
  });
}

// hero controls
renderHero(heroIndex);
document.querySelector('#next-hero').addEventListener('click', () => {
  heroIndex = (heroIndex + 1) % heroPosts.length;
  renderHero(heroIndex);
});

document.querySelector('#prev-hero').addEventListener('click', () => {
  heroIndex = (heroIndex - 1 + heroPosts.length) % heroPosts.length;
  renderHero(heroIndex);
});

// grid + filters
renderGrid();

document.querySelectorAll('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.filter, searchInput.value);
  });
});

searchInput.addEventListener('input', (event) => {
  const active = document.querySelector('.nav-item.active');
  const filter = active ? active.dataset.filter : 'todos';
  renderGrid(filter, event.target.value);
});

// modal events
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModalWindow();
  }
});

closeModal.addEventListener('click', closeModalWindow);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModalWindow();
});

renderSideList();
