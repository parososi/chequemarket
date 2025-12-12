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
    media: "url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80')",
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    content: [
      'Testamos feedback multimodal em ambientes simulados com agentes físicos e cenários de atendimento ao cliente.',
      'O pipeline integra anotações humanas com sinais de áudio, vídeo e texto para reforçar políticas que preservam segurança.',
      'As métricas de alinhamento melhoraram em 18% em tarefas longas, com redução de 22% em ocorrências de respostas inseguras.',
    ],
    topics: ['Reforço', 'Multimodal', 'Segurança'],
    author: 'Laboratório OpenAI',
    date: '17 de fevereiro',
  },
  {
    title: 'OpenAI Model Spec 2.1',
    category: 'produto',
    tag: 'Produto',
    time: '5 minutos',
    description: 'Governança clara para desenvolvedores que constroem com a plataforma.',
    body: 'O novo spec traz campos explícitos para auditoria, monitoração de prompts e diretrizes de privacidade. Incluímos exemplos de produção e snippets reutilizáveis para acelerar integrações.',
    media: "url('https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80')",
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    content: [
      'O spec 2.1 adiciona seções para rastreabilidade de dados sensíveis e ganchos de monitoração.',
      'Publicamos uma coleção de exemplos versionados para integrações de API, SDKs móveis e agentes em produção.',
      'Os controles foram validados com parceiros de finanças e saúde para garantir interoperabilidade e conformidade.',
    ],
    topics: ['Governança', 'Desenvolvedores', 'Confiabilidade'],
    author: 'Equipe de Produto',
    date: '14 de fevereiro',
  },
  {
    title: 'Lançamos a API de vídeo',
    category: 'produto',
    tag: 'Produto',
    time: '6 minutos',
    description: 'Streaming com geração de cenas e legendas sincronizadas.',
    body: 'A API de vídeo permite scripts estruturados, entrada de storyboards e geração de takes alternativos. Inclui detecção de segurança em tempo real e webhooks para revisão humana.',
    media: "url('https://images.unsplash.com/photo-1509099836639-18ba02e2e6ba?auto=format&fit=crop&w=800&q=80')",
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    content: [
      'Legendas são geradas em paralelo ao streaming, reduzindo latência e sincronizando áudio e texto.',
      'O console de revisão exibe indicadores de segurança e permite marcar trechos para reprocessamento.',
      'As bibliotecas cliente suportam transmissões assíncronas e webhooks idempotentes.',
    ],
    topics: ['Vídeo', 'Streaming', 'APIs'],
    author: 'Equipe Multimídia',
    date: '11 de fevereiro',
  },
  {
    title: 'Guias para finanças sensíveis',
    category: 'empresas',
    tag: 'Para Empresas',
    time: '4 minutos',
    description: 'Controles para lidar com dados regulados e fluxos críticos de decisão.',
    body: 'Propomos camadas de isolamento de dados, revisões periódicas e playbooks de incidentes. Há dashboards prontos para auditar latência, custo e segurança de maneira centralizada.',
    media: "url('https://images.unsplash.com/photo-1508387026004-75fb6506fa5b?auto=format&fit=crop&w=800&q=80')",
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    content: [
      'A arquitetura sugerida inclui zonas de isolamento e verificações de consentimento automáticas.',
      'Checklist atualizado para incidentes, cobrindo resposta, comunicação e rastreio de sessões.',
      'Painéis permitem auditar métricas de latência, custo por chamada e acurácia com filtros por região.',
    ],
    topics: ['Financeiro', 'Conformidade', 'Observabilidade'],
    author: 'Equipe de Estratégia',
    date: '8 de fevereiro',
  },
  {
    title: 'Toolkit para agentes em JS',
    category: 'desenvolvedores',
    tag: 'Para Desenvolvedores',
    time: '9 minutos',
    description: 'SDK com roteamento, memória e deploy serverless.',
    body: 'Incluímos clientes tipados, ganchos de streaming e ferramentas de teste locais. Os templates cobrem desde chatbots até assistentes de linha de comando.',
    media: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80')",
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    content: [
      'Roteamento contextual decide o melhor modelo com base em custo e latência.',
      'Templates prontos para Next.js, Cloudflare Workers e funções serverless.',
      'Memórias podem ser persistidas em KV, Postgres ou caches de vetor plugáveis.',
    ],
    topics: ['SDK', 'Node.js', 'Memória'],
    author: 'DevRel OpenAI',
    date: '5 de fevereiro',
  },
  {
    title: 'Histórias de impacto em educação',
    category: 'historias',
    tag: 'Histórias',
    time: '7 minutos',
    description: 'Professores usando GPT para personalizar currículos e avaliações.',
    body: 'Coletamos relatos de docentes que criaram tutores personalizados, rubricas dinâmicas e exercícios multimídia. O foco é manter transparência e supervisão constante.',
    media: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80')",
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    content: [
      'Os professores usam painéis de progresso para ajustar exercícios em tempo real.',
      'As rubricas são transparentes e incluem explicações geradas para cada feedback.',
      'Ferramentas multimídia permitem que alunos enviem voz, imagem e texto como resposta.',
    ],
    topics: ['Educação', 'Impacto social', 'Casos reais'],
    author: 'Equipe de Impacto',
    date: '1 de fevereiro',
  },
  {
    title: 'Boas práticas de segurança',
    category: 'seguranca',
    tag: 'Segurança',
    time: '5 minutos',
    description: 'Checklist revisado para mitigação de riscos em produção.',
    body: 'Criamos procedimentos de revisão de prompt injection, contenção de dados e testes de jailbreak. O guia inclui scripts prontos para rodar scanners automatizados.',
    media: "url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80')",
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    content: [
      'Incluímos scripts de varredura automática para identificar prompts arriscados.',
      'O guia cobre contenção de dados, isolamento de ambientes e revisão humana.',
      'Playbooks prontos facilitam auditorias trimestrais e revisões emergenciais.',
    ],
    topics: ['Segurança', 'Governança', 'Prod'],
    author: 'Equipe de Segurança',
    date: '28 de janeiro',
  },
  {
    title: 'Casos para times de marketing',
    category: 'empresas',
    tag: 'Para Empresas',
    time: '6 minutos',
    description: 'Automação de copy, geração de cena e análise de sentimento em tempo real.',
    body: 'Apresentamos playbooks para campanhas multimodais com segurança garantida e avaliação humana assistida. Inclui dashboards de impacto e checklist de governança.',
    media: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80')",
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    content: [
      'Workflows prontos para geração de roteiros, visual e narração com revisão humana.',
      'Análises de sentimento ajudam a acompanhar campanhas em tempo real com monitoramento seguro.',
      'O pacote inclui exemplos de integração com CRMs e sistemas de anúncios.',
    ],
    topics: ['Marketing', 'Automação', 'IA generativa'],
    author: 'Equipe de Estratégia',
    date: '22 de janeiro',
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
    title: 'Diretrizes de segurança comunitárias 2025',
    tag: 'Segurança · 7 minutos',
  },
  {
    title: 'Infra rápida para protótipos de voz',
    tag: 'Desenvolvedores · 3 minutos',
  },
];

const newsItems = [
  {
    title: 'Nova linha de vozes multilíngues',
    time: 'Leitura de 3 minutos',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Estudo: o estado da IA em 300 empresas',
    time: 'Leitura de 6 minutos',
    image: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Futuro da pesquisa aberta',
    time: 'Leitura de 4 minutos',
    image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Adeus, RDWhisper',
    time: 'Leitura de 2 minutos',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
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
const postView = document.querySelector('#post-view');
const closePost = document.querySelector('#close-post');
const postTag = document.querySelector('#post-tag');
const postTitle = document.querySelector('#post-title');
const postMeta = document.querySelector('#post-meta');
const postDescription = document.querySelector('#post-description');
const postContent = document.querySelector('#post-content');
const postCover = document.querySelector('#post-cover');
const postVideo = document.querySelector('#post-video');
const postAudio = document.querySelector('#post-audio');
const postTopics = document.querySelector('#post-topics');

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

  card.querySelector('button').addEventListener('click', () => openPostPage(post));
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

function openPostPage(post) {
  postTag.textContent = post.tag;
  postTitle.textContent = post.title;
  postMeta.textContent = `${post.time} · ${post.author} · ${post.date}`;
  postDescription.textContent = post.body;
  postCover.src = post.image;
  postVideo.src = post.video;
  postAudio.src = post.audio;

  postContent.innerHTML = '';
  post.content.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    postContent.appendChild(p);
  });

  postTopics.innerHTML = '';
  post.topics.forEach((topic) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = topic;
    postTopics.appendChild(chip);
  });

  postView.classList.remove('hidden');
  requestAnimationFrame(() => postView.classList.add('visible'));
}

function closePostPage() {
  postView.classList.remove('visible');
  setTimeout(() => postView.classList.add('hidden'), 200);
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

function renderNews() {
  const container = document.querySelector('#news-list');
  container.innerHTML = '';
  newsItems.forEach((news) => {
    const item = document.createElement('div');
    item.className = 'news-item';
    item.innerHTML = `
      <img class="news-media" src="${news.image}" alt="${news.title}" loading="lazy" />
      <div>
        <p class="news-meta">${news.title}</p>
        <p class="news-time">${news.time}</p>
      </div>
    `;
    container.appendChild(item);
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

closePost.addEventListener('click', closePostPage);
postView.addEventListener('click', (event) => {
  if (event.target === postView) closePostPage();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePostPage();
});

renderSideList();
renderNews();
