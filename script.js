// =========================
//   DATA
// =========================
const siteData = {
  fr: {
    projects: [
      { 
        title: "Enceinte connectée multi-protocoles", 
        description: "Enceinte intelligente réalisée avec une Raspberry Pi, un boîtier en bois et des éléments imprimés en 3D.", 
        details: "Ce projet consiste à concevoir une enceinte connectée pilotée par une Raspberry Pi. Le boîtier est fabriqué en bois et complété par des pièces imprimées en 3D pour intégrer les composants électroniques et améliorer l'esthétique. L'enceinte offre des fonctionnalités de lecture audio, un contrôle via le réseau et une personnalisation matérielle.",
        image: "/images/enceinte.png",
        techs: ["Raspberry Pi","Linux","Impression 3D","CAO (SolidWorks)"]
      },
      { 
        title: "Capteur de température connecté", 
        description: "Capteur de température connecté utilisant un microcontrôleur ESP32, le bus I2C et MQTT. Alimenté par batterie, ce projet s'intègre dans un système domotique global.", 
        details: `Ce projet consiste à concevoir et réaliser un capteur de température connecté, basé sur un microcontrôleur ESP32. Le dispositif mesure la température ambiante à l’aide d’un capteur numérique précis, communiquant via le bus I2C, puis transmet les données en temps réel via le protocole MQTT à un serveur central ou une application mobile. L’ESP32 est programmé en C pour assurer la gestion du capteur, la connexion Wi-Fi et la communication avec le broker MQTT. Le projet inclut la conception d’un circuit imprimé (PCB) sur mesure pour intégrer proprement les composants électroniques, ainsi que la fabrication d’un boîtier personnalisé en impression 3D pour protéger l’ensemble et faciliter l’installation dans différents environnements. Ce capteur fait partie d’un projet plus global de domotique, permettant de surveiller la température à distance, il peut a etre integrer a un serveur domotique comme Hom Assistant ou autre. Ce projet m’a permis d’approfondir la programmation embarquée, la communication IoT et la conception électronique.`,
        image: "/images/mqtt.png",
        techs: ["ESP32","MQTT","I2C","PCB","Impression 3D"]
      },
      { 
        title: "Base holonome", 
        description: "Réalisation d'une base robotique holonome équipée de capteurs et d'actionneurs, contrôlée par un microcontrôleur STM32 Nucleo et programmée en C.", 
        details: `Ce projet consiste à réaliser une base robotique holonome, capable de se déplacer de manière autonome dans un environnement donné. La base est équipée de plusieurs capteurs infrarouges pour détecter les obstacles et naviguer efficacement. Elle intègre également des actionneurs (moteurs pas à pas) pour assurer le mouvement. Le contrôle de la base est assuré par un microcontrôleur STM32 Nucleo, programmé en langage C pour gérer les capteurs, les actionneurs et les algorithmes de navigation. Ce projet m'a permis d'approfondir mes compétences en robotique, en programmation embarquée et en conception électronique. J'ai pu concevoir un PCB monocouche avec EAGLE et le réaliser avec une CNC. Il est idéal pour des applications éducatives, de recherche ou de prototypage de systèmes robotiques autonomes.`,
        image: "/images/holonome.jpg",
        techs: ["STM32","C","Capteurs infrarouges","Moteurs pas à pas","Robotique","CNC"],
        imageBorderRadius: 12
      },
      { 
        title: "Simulateur de Planètes", 
        id: "gravity-sim",
        description: "Simulation interactive du mouvement des planètes basée sur la gravité, réalisée en Python avec Pygame.", 
        details: `Ce projet est un simulateur interactif de systèmes planétaires, conçu pour illustrer les lois de la gravitation universelle. L'utilisateur peut ajouter, déplacer et configurer des planètes ou autres corps célestes, ajuster leur masse, leur vitesse initiale et observer en temps réel les trajectoires générées par les interactions gravitationnelles. L'interface graphique, développée avec Pygame, permet une visualisation dynamique et intuitive des orbites, collisions et effets de masse. Le moteur physique repose sur la programmation orientée objet, facilitant l'extension à de nouveaux types de corps ou de forces. Ce projet m'a permis d'approfondir la modélisation mathématique, la gestion des événements utilisateur, l'optimisation des calculs physiques et la création d'interfaces ergonomiques. Il constitue une base idéale pour explorer la simulation scientifique.`,
        image: "/images/galaxy.png",
        techs: ["Python","Pygame"],
        imageMaxWidth: 520,
        imageBorderRadius: 12
      }
    ],
    diplomas: [
      { title: "Diplôme d'ingénieur en mécatronique", year: "2022-2027", institution: "ENSIBS Lorient", details: "" },
      { title: "Baccalauréat Général", year: "2018-2021", institution: "Lycée Victor Hugo Hennebont", details: "Spécialités : Mathématiques, Physique-Chimie et Sciences de la Vie et de la Terre" }
    ],
    experiences: [
      { title: "Travail saisonnier en équipe et de nuit", period: "Juin 2022 à août 2024", company: "Cité Marine, Kervignac", details: "Travail saisonnier pendant trois étés consécutifs dans l'industrie agroalimentaire, impliquant la participation aux opérations de production et la découverte des exigences du secteur." },
      { title: "Mobilité internationale en Suède", period: "Juin 2025 à août 2025", company: "Manoir de Melderstein, Råneå", details: "Participation à des travaux variés de rénovation et d’entretien du manoir de Melderstein en Suède, incluant la peinture, l’entretien des extérieurs et d’autres missions polyvalentes." }
    ],
    skills: [
      { category: 'Mécanique', color: '#00b894', items: ['SolidWorks', 'Abaqus'] },
      { category: 'Informatique', color: '#6c5ce7', items: ['Python', 'C', 'Java','Ladder'] },
      { category: 'Électronique', color: '#e17055', items: ['Électrotechnique', 'Conception de PCB'] },
      { category: 'Soft skills', color: '#00cec9', items: ['Travail en équipe', 'Autonomie', 'Communication'] }
    ]
  },
  en: {
    projects: [
      { 
        title: "Multi-protocol Smart Speaker", 
        description: "Smart speaker made with a Raspberry Pi, a wooden case, and 3D printed elements.", 
        details: "This project involves designing a smart speaker controlled by a Raspberry Pi. The case is made of wood and supplemented with 3D printed parts for the integration of electronic components and for aesthetics. The speaker offers audio playback features, network control, and hardware customization.", 
        image: "/images/enceinte.png",
        techs: ["Raspberry Pi","Linux","3D Printing","CAD (SolidWorks)"]
      },
      { 
        title: "Connected Temperature Sensor", 
        description: "Connected temperature sensor using an ESP32 microcontroller, I2C bus, and MQTT. Battery-powered, this project integrates into a global home automation system.", 
        details: `This project consists of designing and building a connected temperature sensor based on an ESP32 microcontroller. The device measures the ambient temperature using a precise digital sensor, communicating via the I2C bus, then transmits the data in real-time via the MQTT protocol to a central server or a mobile application. The ESP32 is programmed in C to manage the sensor, the Wi-Fi connection, and communication with the MQTT broker. The project includes the design of a custom printed circuit board (PCB) to properly integrate the electronic components, as well as the fabrication of a custom 3D printed case to protect the assembly and facilitate installation in different environments. The system is battery-powered for flexible installation. This sensor is part of a broader home automation setup, enabling remote temperature monitoring, historical data logging, and threshold alerts. It can be integrated with a home automation server such as Home Assistant. This project allowed me to deepen my knowledge of embedded programming, IoT communication, and electronic design. It is ideal for home automation applications, environmental monitoring, or scientific experimentation.`,
        image: "/images/mqtt.png",
        techs: ["ESP32","MQTT","I2C","PCB","3D Printing"]
      },
      { 
        title: "Holonomic Base", 
        description: "Development of a holonomic robotic base equipped with sensors and actuators, controlled by an STM32 Nucleo microcontroller and programmed in C.", 
        details: `This project involves building a holonomic robotic base capable of moving autonomously in a given environment. The base is equipped with several infrared sensors to detect obstacles and navigate efficiently. It also integrates actuators (stepper motors) to ensure movement. The base is controlled by an STM32 Nucleo microcontroller, programmed in C to manage the sensors, actuators, and navigation algorithms. This project allowed me to deepen my skills in robotics, embedded programming, and electronic design. I was able to design a single-layer PCB with EAGLE and manufacture it using a CNC machine. It is ideal for educational, research, or prototyping applications for autonomous robotic systems.`,
        image: "/images/holonome.jpg",
        techs: ["STM32","C","Infrared sensors","Stepper motors","Robotics","CNC"],
        imageBorderRadius: 12
      },
      { 
        title: "Planet Simulator", 
        id: "gravity-sim",
        description: "Interactive simulation of planetary motion based on gravity, made in Python with Pygame.", 
        details: `This project is an interactive simulator of planetary systems, designed to illustrate the laws of universal gravitation. The user can add, move, and configure planets or other celestial bodies, adjust their mass, initial velocity, and observe in real-time the trajectories generated by gravitational interactions. The graphical interface, developed with Pygame, allows for a dynamic and intuitive visualization of orbits, collisions, and mass effects. The physics engine is based on object-oriented programming, making it easy to extend to new types of bodies or forces. This project allowed me to deepen my understanding of mathematical modeling, user event management, optimization of physics calculations, and the creation of ergonomic interfaces. It is an ideal basis for exploring scientific simulation, animation, and the development of educational games.`,
        image: "/images/galaxy.png",
        techs: ["Python","Pygame"],
        imageMaxWidth: 520,
        imageBorderRadius: 12
      }
    ],
    diplomas: [
      { title: "Mechatronics Engineering Degree", year: "2022-2027", institution: "ENSIBS Lorient", details: "" },
      { title: "General Baccalaureate", year: "2018-2021", institution: "Lycée Victor Hugo Hennebont", details: "Specialties: Mathematics, Physics-Chemistry, and Life and Earth Sciences" }
    ],
    experiences: [
      { title: "Seasonal night and team work", period: "June 2022 to August 2024", company: "Cité Marine, Kervignac", details: "Seasonal work over three consecutive summers in the food industry, involving participation in production operations and discovering the sector's requirements." },
      { title: "International mobility in Sweden", period: "June 2025 to August 2025", company: "Melderstein Manor, Råneå", details: "Participation in various renovation and maintenance tasks at Melderstein Manor in Sweden, including painting, exterior maintenance, and other versatile missions." }
    ],
    skills: [
      { category: 'Mechanics', color: '#00b894', items: ['SolidWorks', 'Abaqus'] },
      { category: 'IT', color: '#6c5ce7', items: ['Python', 'C', 'Java','Ladder'] },
      { category: 'Electronics', color: '#e17055', items: ['Electrotechnics', 'PCB Design'] },
      { category: 'Soft skills', color: '#00cec9', items: ['Teamwork', 'Autonomy', 'Communication'] }
    ]
  }
};

// Determine current language and get the correct data
const lang = document.documentElement.lang || 'fr';
const { projects, diplomas, experiences, skills } = siteData[lang] || siteData.fr;

// =========================
//   HELPERS
// =========================
// (All expand/collapse logic removed)

// =========================
//   RENDER FUNCTIONS
// =========================
const projectsGrid = document.getElementById('projectsGrid');
const diplomasGrid = document.getElementById('diplomasGrid');
const experiencesGrid = document.getElementById('experiencesGrid');
const skillsGrid = document.getElementById('skillsGrid');

function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = '';
  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    // Structure interne très lisible et large
    const techs = Array.isArray(p.techs) && p.techs.length
      ? `<div class='project-techs'>${p.techs.map(t => `<span>${t}</span>`).join('')}</div>`
      : '';
    const imgStyles = [];
    if (p.imageMaxWidth) imgStyles.push(`max-width:${p.imageMaxWidth}px`);
    if (p.imageBorderRadius != null) imgStyles.push(`border-radius:${p.imageBorderRadius}px`);
    const imgStyle = imgStyles.length ? `style="${imgStyles.join(';')}"` : '';
    const isSim = p.id === 'gravity-sim';
    const simDesc = lang === 'fr' 
      ? "<strong>Simulateur de Planètes</strong> — Simulation interactive du mouvement des planètes basée sur la gravité."
      : "<strong>Planet Simulator</strong> — Interactive simulation of planetary motion based on gravity.";

    let detailsHtml = `
      <div class='project-structure'>
        <div class='project-desc-block'><p class='project-desc'>${isSim ? simDesc : p.details}</p></div>
        <div class='project-image-block'><img src="${p.image}" alt="${p.title}" ${imgStyle}></div>
        ${techs}
        <div class='project-actions'>${isSim ? "<button class='open-sim-btn'>Tester la simulation</button>" : ""}</div>
      </div>
    `;
    card.innerHTML = `<button class="project-close" aria-label="Fermer" title="Fermer" style="display:none">×</button><div class='project-main'><h3>${p.title}</h3><p>${p.description}</p></div><div class="details">${detailsHtml}</div>`;
    const closeBtn = card.querySelector('.project-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exitFullscreenProject(card);
    });
    // Click card to enter fullscreen (except on open-sim button)
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('open-sim-btn')) return;
      enterFullscreenProject(card);
    });
    if (isSim) {
      card.querySelector('.open-sim-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openSimModal();
      });
    }
    projectsGrid.appendChild(card);
  });
}

function enterFullscreenProject(card) {
  const section = document.querySelector('.projects'); if (!section) return;
  // Mark fullscreen state
  section.classList.add('projects-full');
  document.querySelectorAll('.project-card').forEach(c => c.classList.remove('fullscreen'));
  card.classList.add('fullscreen');
  const closeBtn = card.querySelector('.project-close'); if (closeBtn) closeBtn.style.display = 'inline-flex';
}

function exitFullscreenProject(card) {
  const section = document.querySelector('.projects'); if (!section) return;
  card.classList.remove('fullscreen');
  section.classList.remove('projects-full');
  const closeBtn = card.querySelector('.project-close'); if (closeBtn) closeBtn.style.display = 'none';
}

function renderDiplomas() {
  if (!diplomasGrid) return;
  diplomasGrid.innerHTML = '';
  diplomas.forEach(d => {
    const el = document.createElement('div'); el.className = 'diploma';
    el.innerHTML = `<h3>${d.title}</h3><span class="meta">${d.institution} • ${d.year}</span><div class="details"><p>${d.details}</p></div>`;
    diplomasGrid.appendChild(el);
  });
}

function renderExperiences() {
  if (!experiencesGrid) return;
  experiencesGrid.innerHTML = '';
  experiences.forEach(x => {
    const el = document.createElement('div'); el.className = 'experience';
    el.innerHTML = `<h3>${x.title}</h3><span class="meta">${x.company} • ${x.period}</span><div class="details"><p>${x.details}</p></div>`;
    experiencesGrid.appendChild(el);
  });
}

function renderSkills() {
  if (!skillsGrid) return;
  skillsGrid.innerHTML = '';
  skills.forEach(group => {
    const card = document.createElement('div');
    card.className = 'skill-group';
    card.style.setProperty('--accent', group.color);
    const header = document.createElement('div');
    header.className = 'skill-group-header';
    header.innerHTML = `<span class="skill-accent-dot" aria-hidden="true"></span><span>${group.category}</span>`;
    const chips = document.createElement('div'); chips.className = 'skill-chips';
    group.items.forEach(it => {
      const chip = document.createElement('span'); chip.className = 'chip'; chip.textContent = it; chips.appendChild(chip);
    });
    card.appendChild(header); card.appendChild(chips);
    skillsGrid.appendChild(card);
  });
}

// =========================
//   MODALE GRAVITY SIM
// =========================
function openSimModal() {
  let modal = document.querySelector('.sim-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'sim-modal';
    modal.innerHTML = `
      <div class='sim-modal-content'>
        <button class='sim-modal-close' aria-label='Fermer'>&times;</button>
        <h2>Gravity Sim</h2>
        <iframe src="/projets/SolarSystem/build/web/index.html" scrolling="no" style="border:0;width:100%;max-width:1000px;aspect-ratio: 16 / 9; height: auto; display:block; background: transparent;"></iframe>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.sim-modal-close').addEventListener('click', closeSimModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeSimModal();
    });
  }
  modal.style.display = 'flex';
  setTimeout(() => { modal.classList.add('open'); }, 10);
}

function closeSimModal() {
  const modal = document.querySelector('.sim-modal');
  if (modal) {
    modal.classList.remove('open');
    setTimeout(() => { modal.style.display = 'none'; }, 220);
  }
}

// =========================
//   INIT
// =========================
renderProjects();
renderDiplomas();
renderExperiences();
renderSkills();

/* theme toggle */
function initThemeToggle() {
  const desktop = document.getElementById('darkToggle');
  const mobile = document.getElementById('darkToggleMobile');
  if (!desktop && !mobile) return;
  const saved = localStorage.getItem('theme'); if (saved === 'dark') document.body.classList.add('dark');
  function refreshButton(btn) {
    if (!btn) return;
    const isDark = document.body.classList.contains('dark');
    // Use SVG icons for consistent rendering
    const sunSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
    const moonSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.innerHTML = isDark ? moonSvg : sunSvg;
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    btn.setAttribute('aria-label', isDark ? 'Activer le thème clair' : 'Activer le thème sombre');
    btn.tabIndex = 0;
  }
  function refreshBoth(){ refreshButton(desktop); refreshButton(mobile); }
  function onClick(e){ e.stopPropagation(); document.body.classList.toggle('dark'); localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light'); refreshBoth(); }
  // Remove existing listeners by cloning (to avoid duplicate handlers)
  if (desktop) {
    const dClone = desktop.cloneNode(true);
    desktop.parentNode.replaceChild(dClone, desktop);
    dClone.addEventListener('click', onClick);
  }
  if (mobile) {
    const mClone = mobile.cloneNode(true);
    mobile.parentNode.replaceChild(mClone, mobile);
    mClone.addEventListener('click', onClick);
  }
  refreshBoth();
}
initThemeToggle();

/* simple section toggles (sections only) */
function initSectionToggles() {
  const sections = [
    { sel: '.about', grid: '.about-content', title: 'À propos' },
    { sel: '.projects', grid: '.projects-grid', title: 'Mes Projets' },
    { sel: '.experiences', grid: '.experiences-grid', title: 'Expériences professionnelles' },
    { sel: '.diplomas', grid: '.diplomas-grid', title: 'Diplômes et Formations' },
    { sel: '.skills', grid: '.skills-grid', title: 'Compétences' },
    { sel: '.contact', grid: '.contact-grid', title: 'Contact' }
  ];
  sections.forEach(s => {
    const section = document.querySelector(s.sel);
    if (!section) return;
    const header = section.querySelector('h2');
    const content = section.querySelector(s.grid);
    if (!header || !content) return;
    // Accessible attributes
    header.setAttribute('role','button');
    header.setAttribute('tabindex','0');
    // Start collapsed by default
    header.setAttribute('aria-expanded','false');
    section.classList.add('collapsed');
    // Click handler
    header.addEventListener('click', () => {
      const collapsed = section.classList.toggle('collapsed');
      header.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });
    // Keyboard support
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
    });
  });
}
initSectionToggles();

/* theme toggle */
function initHeaderNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const links = nav ? Array.from(nav.querySelectorAll('a')) : [];
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Close mobile menu when clicking a link
  links.forEach(a => a.addEventListener('click', (e) => {
    // let browser handle the anchor scrolling, then close menu on small screens
    document.body.classList.remove('nav-open');
    const t = document.querySelector('.nav-toggle'); if (t) t.setAttribute('aria-expanded', 'false');
  }));

  // Active link highlighting on scroll
  const sectionMap = links.map(a => {
    const id = a.getAttribute('href') && a.getAttribute('href').replace('#', '');
    return { link: a, id };
  }).filter(x => x.id);

  function refreshActive() {
    const positions = sectionMap.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return { id, top: Infinity };
      const rect = el.getBoundingClientRect();
      return { id, top: Math.abs(rect.top) };
    });
    // choose the section closest to the top
    positions.sort((a,b) => a.top - b.top);
    const activeId = positions.length ? positions[0].id : null;
    sectionMap.forEach(({ link, id }) => {
      link.classList.toggle('active', id === activeId);
    });
  }
  window.addEventListener('scroll', refreshActive, { passive: true });
  window.addEventListener('resize', refreshActive);
  // initial
  setTimeout(refreshActive, 120);
}
initHeaderNav();

// Exclusive open via header menu: open target section, collapse others
function initExclusiveSectionControl() {
  const nav = document.querySelector('.main-nav'); if (!nav) return;
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = [
    { id: 'about-me', el: document.getElementById('about-me'), gridSel: '.about-content' },
    { id: 'projects', el: document.querySelector('.projects'), gridSel: '.projects-grid' },
    { id: 'experiences', el: document.querySelector('.experiences'), gridSel: '.experiences-grid' },
    { id: 'diplomas', el: document.querySelector('.diplomas'), gridSel: '.diplomas-grid' },
    { id: 'skills', el: document.querySelector('.skills'), gridSel: '.skills-grid' }
  ];
  function setOpenWithoutClosingOthers(targetId) {
    const target = sections.find(s => s.id === targetId);
    if (target && target.el) {
      const header = target.el.querySelector('h2');
      target.el.classList.remove('collapsed');
      if (header) header.setAttribute('aria-expanded','true');
    }
  }
  links.forEach(a => {
    a.addEventListener('click', () => {
      const id = a.getAttribute('href').replace('#','');
      setOpenWithoutClosingOthers(id);
    });
  });
}
initExclusiveSectionControl();

// =========================
//   DYNAMIC NAV FROM PAGE ORDER
// =========================
function initDynamicNav() {
  const nav = document.querySelector('.main-nav'); if (!nav) return;
  const ul = nav.querySelector('ul'); if (!ul) return;
  // Find sections in page order
  const map = [];
  const mainEl = document.querySelector('main');
  const allowed = new Set(['about-me','projects','experiences','diplomas','skills','contact']);
  const orderedSections = mainEl ? Array.from(mainEl.querySelectorAll('section[id]')) : [];
  orderedSections.forEach(sec => {
    if (!allowed.has(sec.id)) return;
    const h2 = sec.querySelector('h2');
    const label = (h2 && h2.textContent && h2.textContent.trim()) || (sec.id === 'contact' ? 'Contact' : sec.id);
    map.push({ id: sec.id, label });
  });

  // Capture dark toggle before clearing UL (to avoid losing it)
  let toggleBtn = document.getElementById('darkToggle');
  // Rebuild UL links in the same order
  ul.innerHTML = '';
  map.forEach(({ id, label }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`; a.dataset.target = id; a.textContent = label;
    li.appendChild(a); ul.appendChild(li);
  });
  // Append dark mode toggle at the end (recreate if missing)
  const liToggle = document.createElement('li');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'darkToggle';
    toggleBtn.className = 'dark-toggle';
    toggleBtn.setAttribute('aria-pressed','false');
    toggleBtn.setAttribute('aria-label','Activer le thème sombre');
    // Icon will be set by initThemeToggle()
  }
  liToggle.appendChild(toggleBtn);
  ul.appendChild(liToggle);

  // Ensure a mobile-visible toggle exists outside nav (clone)
  const header = document.querySelector('.site-header');
  if (header && toggleBtn) {
    let mobileClone = document.getElementById('darkToggleMobile');
    if (!mobileClone) {
      mobileClone = toggleBtn.cloneNode(true);
      mobileClone.id = 'darkToggleMobile';
      header.appendChild(mobileClone);
      // Re-attach same behavior
      mobileClone.addEventListener('click', () => toggleBtn.click());
    }
  }

  // Re-wire header nav behaviors on the new links
  initHeaderNav();
  // Re-wire exclusive section control on the new links
  initExclusiveSectionControl();
  // Ensure theme toggle behavior is bound on (re)created button
  initThemeToggle();
}

// Observe changes to headings/order and update nav automatically
function observePageForNavChanges() {
  const main = document.querySelector('main'); if (!main) return;
  let timer = null;
  const refresh = () => { clearTimeout(timer); timer = setTimeout(initDynamicNav, 120); };
  const observer = new MutationObserver(refresh);
  observer.observe(main, { childList: true, subtree: true, characterData: true });
  // Initial build
  initDynamicNav();
}
observePageForNavChanges();


