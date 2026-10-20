/* ==========================================================================
   Portfolio Lilian Conan — rendu et interactions
   ========================================================================== */

/* ==========================================================================
   1. Données
   ========================================================================== */
const siteData = {
  fr: {
    ui: {
      viewProject: 'Voir le projet',
      close: 'Fermer',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu'
    },
    projects: [
      {
        id: 'speaker',
        eyebrow: 'Domotique & audio',
        span: 4,
        featured: true,
        title: "Enceinte connectée multi-protocoles",
        description: "Enceinte intelligente réalisée avec une Raspberry Pi, un boîtier en bois et des éléments imprimés en 3D.",
        details: "Ce projet consiste à concevoir une enceinte connectée pilotée par une Raspberry Pi. Le boîtier est fabriqué en bois et complété par des pièces imprimées en 3D pour intégrer les composants électroniques et améliorer l'esthétique. L'enceinte offre des fonctionnalités de lecture audio, un contrôle via le réseau et une personnalisation matérielle.",
        image: "/images/enceinte.png",
        techs: ["Raspberry Pi", "Linux", "Impression 3D", "CAO (SolidWorks)"]
      },
      {
        id: 'temp-sensor',
        eyebrow: 'IoT & domotique',
        span: 2,
        title: "Capteur de température connecté",
        description: "Capteur de température sur ESP32, bus I2C et MQTT. Alimenté par batterie, il s'intègre dans un système domotique global.",
        details: `Ce projet consiste à concevoir et réaliser un capteur de température connecté, basé sur un microcontrôleur ESP32. Le dispositif mesure la température ambiante à l'aide d'un capteur numérique précis, communiquant via le bus I2C, puis transmet les données en temps réel via le protocole MQTT à un serveur central ou une application mobile. L'ESP32 est programmé en C pour assurer la gestion du capteur, la connexion Wi-Fi et la communication avec le broker MQTT. Le projet inclut la conception d'un circuit imprimé (PCB) sur mesure pour intégrer proprement les composants électroniques, ainsi que la fabrication d'un boîtier personnalisé en impression 3D pour protéger l'ensemble et faciliter l'installation dans différents environnements. Ce capteur fait partie d'un projet plus global de domotique, permettant de surveiller la température à distance ; il peut être intégré à un serveur domotique comme Home Assistant. Ce projet m'a permis d'approfondir la programmation embarquée, la communication IoT et la conception électronique.`,
        image: "/images/mqtt.png",
        techs: ["ESP32", "MQTT", "I2C", "PCB", "Impression 3D"]
      },
      {
        id: 'holonomic',
        eyebrow: 'Robotique',
        span: 2,
        title: "Base holonome",
        description: "Base robotique holonome équipée de capteurs et d'actionneurs, pilotée par un STM32 Nucleo programmé en C.",
        details: `Ce projet consiste à réaliser une base robotique holonome, capable de se déplacer de manière autonome dans un environnement donné. La base est équipée de plusieurs capteurs infrarouges pour détecter les obstacles et naviguer efficacement. Elle intègre également des actionneurs (moteurs pas à pas) pour assurer le mouvement. Le contrôle de la base est assuré par un microcontrôleur STM32 Nucleo, programmé en langage C pour gérer les capteurs, les actionneurs et les algorithmes de navigation. Ce projet m'a permis d'approfondir mes compétences en robotique, en programmation embarquée et en conception électronique. J'ai pu concevoir un PCB monocouche avec EAGLE et le réaliser avec une CNC. Il est idéal pour des applications éducatives, de recherche ou de prototypage de systèmes robotiques autonomes.`,
        image: "/images/holonome.jpg",
        techs: ["STM32", "C", "Capteurs infrarouges", "Moteurs pas à pas", "Robotique", "CNC"]
      },
      {
        id: 'gravity-sim',
        eyebrow: 'Simulation',
        span: 2,
        title: "Simulateur de planètes",
        description: "Simulation interactive du mouvement des planètes basée sur la gravité, réalisée en Python avec Pygame.",
        details: `Ce projet est un simulateur interactif de systèmes planétaires, conçu pour illustrer les lois de la gravitation universelle. L'utilisateur peut ajouter, déplacer et configurer des planètes ou autres corps célestes, ajuster leur masse, leur vitesse initiale et observer en temps réel les trajectoires générées par les interactions gravitationnelles. L'interface graphique, développée avec Pygame, permet une visualisation dynamique et intuitive des orbites, collisions et effets de masse. Le moteur physique repose sur la programmation orientée objet, facilitant l'extension à de nouveaux types de corps ou de forces. Ce projet m'a permis d'approfondir la modélisation mathématique, la gestion des événements utilisateur, l'optimisation des calculs physiques et la création d'interfaces ergonomiques. Il constitue une base idéale pour explorer la simulation scientifique.`,
        image: "/images/galaxy.png",
        techs: ["Python", "Pygame"],
        action: {
          type: "iframe-modal",
          label: "Tester la simulation",
          title: "Gravity Sim",
          url: "/projets/SolarSystem/build/web/index.html"
        }
      },
      {
        id: 'fuel-prices',
        eyebrow: 'Web & open data',
        span: 2,
        title: "Comparateur de prix carburants",
        description: "Application web qui trouve la station la moins chère autour d'une ville, d'un code postal ou de ta position, à partir de l'open data officiel.",
        details: `Cette application web interroge en direct l'API open data officielle des prix des carburants. Elle localise une ville, un code postal ou la position de l'utilisateur, recherche les stations dans un rayon réglable puis les trie par prix ou par distance. Elle affiche le coût du plein, l'économie par rapport à la moyenne locale, les horaires d'ouverture, l'ancienneté des prix et des liens d'itinéraire Google Maps et Waze.`,
        techs: ["JavaScript", "API REST", "Open Data", "Géolocalisation", "UI/UX"],
        action: {
          type: "link",
          label: "Ouvrir l'application",
          title: "Prix carburants",
          url: "/essence/",
          target: "_self"
        }
      }
    ],
    diplomas: [
      { title: "Diplôme d'ingénieur en mécatronique", year: "2022 – 2027", institution: "ENSIBS Lorient", details: "", skills: ["Mécatronique", "Gestion de projet", "Systèmes embarqués", "Programmation industrielle", "Électrotechnique", "Automatique", "Travail en équipe", "CAO", "Prototypage"] },
      { title: "CPGE PCSI", year: "2021 – 2022", institution: "Lycée Dupuy de Lôme, Lorient", details: "Physique Chimie et Sciences de l'Ingénieur", skills: ["Mathématiques", "Physique-Chimie", "Sciences de l'Ingénieur", "Thermodynamique", "Rigueur scientifique", "Solidarité"] },
      { title: "Baccalauréat Général", year: "2018 – 2021", institution: "Lycée Victor Hugo, Hennebont", details: "Spécialités : Mathématiques, Physique-Chimie et Sciences de la Vie et de la Terre", skills: ["Mathématiques", "Physique-Chimie", "SVT"] }
    ],
    experiences: [
      { title: "Mobilité internationale en Suède", period: "Juin 2025 – Août 2025", company: "Manoir de Melderstein, Råneå", details: "Participation à des travaux variés de rénovation et d'entretien du manoir de Melderstein en Suède, incluant la peinture, l'entretien des extérieurs et d'autres missions polyvalentes.", skills: ["Polyvalence", "Autonomie", "Rénovation", "Maintenance extérieure"] },
      { title: "Travail saisonnier en équipe et de nuit", period: "Juin 2022 – Août 2024", company: "Cité Marine, Kervignac", details: "Travail saisonnier pendant trois étés consécutifs dans l'industrie agroalimentaire, impliquant la participation aux opérations de production et la découverte des exigences du secteur.", skills: ["Travail en équipe", "Rigueur", "Ponctualité", "Cadence élevée"] }
    ],
    skills: [
      { category: 'Mécanique', color: '#00b894', icon: 'cog', sub: [
        { label: 'CAO', items: ['SolidWorks'] },
        { label: 'Simulation', items: ['Abaqus', 'Méca3D'] }
      ]},
      { category: 'Électronique & systèmes embarqués', color: '#e17055', icon: 'cpu', sub: [
        { label: 'Cartes & I/O', items: ['Arduino', 'STM32', 'ESP32', 'Raspberry Pi', 'FPGA'] },
        { label: 'Conception PCB', items: ['Altium', 'EAGLE', 'KiCad'] }
      ]},
      { category: 'Automatisme & industriel', color: '#fd79a8', icon: 'sliders', sub: [
        { label: 'Automates', items: ['Automates programmables (Siemens)', 'Réseaux industriels'] },
        { label: 'Langage', items: ['Ladder'] }
      ]},
      { category: 'Informatique', color: '#6c5ce7', icon: 'code', sub: [
        { label: 'Langages', items: ['Python', 'C', 'Java'] },
        { label: 'Frameworks', items: ['ROS2'] }
      ]},
      { category: 'Bureautique', color: '#0ea5e9', icon: 'doc', sub: [
        { label: 'Suite Office', items: ['Excel', 'Word', 'PowerPoint'] },
        { label: 'Autres', items: ['LaTeX'] }
      ]},
      { category: 'Soft skills', color: '#00cec9', icon: 'users', sub: [
        { label: 'Collaboration', items: ['Travail en équipe', 'Communication'] }
      ]}
    ]
  },

  en: {
    ui: {
      viewProject: 'View project',
      close: 'Close',
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    },
    projects: [
      {
        id: 'speaker',
        eyebrow: 'Home automation & audio',
        span: 4,
        featured: true,
        title: "Multi-protocol smart speaker",
        description: "Smart speaker made with a Raspberry Pi, a wooden case and 3D printed elements.",
        details: "This project involves designing a smart speaker controlled by a Raspberry Pi. The case is made of wood and supplemented with 3D printed parts for the integration of electronic components and for aesthetics. The speaker offers audio playback features, network control, and hardware customization.",
        image: "/images/enceinte.png",
        techs: ["Raspberry Pi", "Linux", "3D Printing", "CAD (SolidWorks)"]
      },
      {
        id: 'temp-sensor',
        eyebrow: 'IoT & home automation',
        span: 2,
        title: "Connected temperature sensor",
        description: "Temperature sensor built on an ESP32, I2C bus and MQTT. Battery-powered, it fits into a wider home automation system.",
        details: `This project consists of designing and building a connected temperature sensor based on an ESP32 microcontroller. The device measures the ambient temperature using a precise digital sensor, communicating via the I2C bus, then transmits the data in real-time via the MQTT protocol to a central server or a mobile application. The ESP32 is programmed in C to manage the sensor, the Wi-Fi connection, and communication with the MQTT broker. The project includes the design of a custom printed circuit board (PCB) to properly integrate the electronic components, as well as the fabrication of a custom 3D printed case to protect the assembly and facilitate installation in different environments. The system is battery-powered for flexible installation. This sensor is part of a broader home automation setup, enabling remote temperature monitoring, historical data logging, and threshold alerts. It can be integrated with a home automation server such as Home Assistant. This project allowed me to deepen my knowledge of embedded programming, IoT communication, and electronic design.`,
        image: "/images/mqtt.png",
        techs: ["ESP32", "MQTT", "I2C", "PCB", "3D Printing"]
      },
      {
        id: 'holonomic',
        eyebrow: 'Robotics',
        span: 2,
        title: "Holonomic base",
        description: "Holonomic robotic base equipped with sensors and actuators, driven by an STM32 Nucleo programmed in C.",
        details: `This project involves building a holonomic robotic base capable of moving autonomously in a given environment. The base is equipped with several infrared sensors to detect obstacles and navigate efficiently. It also integrates actuators (stepper motors) to ensure movement. The base is controlled by an STM32 Nucleo microcontroller, programmed in C to manage the sensors, actuators, and navigation algorithms. This project allowed me to deepen my skills in robotics, embedded programming, and electronic design. I was able to design a single-layer PCB with EAGLE and manufacture it using a CNC machine. It is ideal for educational, research, or prototyping applications for autonomous robotic systems.`,
        image: "/images/holonome.jpg",
        techs: ["STM32", "C", "Infrared sensors", "Stepper motors", "Robotics", "CNC"]
      },
      {
        id: 'gravity-sim',
        eyebrow: 'Simulation',
        span: 2,
        title: "Planet simulator",
        description: "Interactive simulation of planetary motion based on gravity, made in Python with Pygame.",
        details: `This project is an interactive simulator of planetary systems, designed to illustrate the laws of universal gravitation. The user can add, move, and configure planets or other celestial bodies, adjust their mass, initial velocity, and observe in real-time the trajectories generated by gravitational interactions. The graphical interface, developed with Pygame, allows for a dynamic and intuitive visualization of orbits, collisions, and mass effects. The physics engine is based on object-oriented programming, making it easy to extend to new types of bodies or forces. This project allowed me to deepen my understanding of mathematical modeling, user event management, optimization of physics calculations, and the creation of ergonomic interfaces.`,
        image: "/images/galaxy.png",
        techs: ["Python", "Pygame"],
        action: {
          type: "iframe-modal",
          label: "Try the simulation",
          title: "Gravity Sim",
          url: "/projets/SolarSystem/build/web/index.html"
        }
      },
      {
        id: 'fuel-prices',
        eyebrow: 'Web & open data',
        span: 2,
        title: "Fuel price finder",
        description: "Web app that finds the cheapest fuel station around a city, postal code or your location, using official French open data.",
        details: `This web application queries the official French fuel price open data API live in the browser. It geocodes a city, postal code or the user's location, finds stations within an adjustable radius and sorts them by price or distance. It shows the cost of a full tank, savings versus the local average, opening hours, price freshness and Google Maps / Waze directions.`,
        techs: ["JavaScript", "REST API", "Open Data", "Geolocation", "UI/UX"],
        action: {
          type: "link",
          label: "Open the app",
          title: "Fuel Prices",
          url: "/essence/",
          target: "_self"
        }
      }
    ],
    diplomas: [
      { title: "Mechatronics Engineering Degree", year: "2022 – 2027", institution: "ENSIBS Lorient", details: "", skills: ["Mechatronics", "Project management", "Embedded systems", "Industrial programming", "Electrotechnics", "Automation", "Teamwork", "CAD", "Prototyping"] },
      { title: "CPGE PCSI", year: "2021 – 2022", institution: "Lycée Dupuy de Lôme, Lorient", details: "Physics, Chemistry and Engineering Sciences", skills: ["Mathematics", "Physics-Chemistry", "Engineering Sciences", "Thermodynamics", "Scientific rigor", "Solidarity"] },
      { title: "General Baccalaureate", year: "2018 – 2021", institution: "Lycée Victor Hugo, Hennebont", details: "Specialties: Mathematics, Physics-Chemistry, and Life and Earth Sciences", skills: ["Mathematics", "Physics-Chemistry", "Life Sciences"] }
    ],
    experiences: [
      { title: "International mobility in Sweden", period: "June 2025 – August 2025", company: "Melderstein Manor, Råneå", details: "Participation in various renovation and maintenance tasks at Melderstein Manor in Sweden, including painting, exterior maintenance, and other versatile missions.", skills: ["Adaptability", "Autonomy", "Renovation", "Outdoor maintenance"] },
      { title: "Seasonal night and team work", period: "June 2022 – August 2024", company: "Cité Marine, Kervignac", details: "Seasonal work over three consecutive summers in the food industry, involving participation in production operations and discovering the sector's requirements.", skills: ["Teamwork", "Discipline", "Punctuality", "High pace"] }
    ],
    skills: [
      { category: 'Mechanics', color: '#00b894', icon: 'cog', sub: [
        { label: 'CAD', items: ['SolidWorks'] },
        { label: 'Simulation', items: ['Abaqus', 'Méca3D'] }
      ]},
      { category: 'Electronics & embedded', color: '#e17055', icon: 'cpu', sub: [
        { label: 'Boards & I/O', items: ['Arduino', 'STM32', 'ESP32', 'Raspberry Pi', 'FPGA'] },
        { label: 'PCB design', items: ['Altium', 'EAGLE', 'KiCad'] }
      ]},
      { category: 'Automation & industrial', color: '#fd79a8', icon: 'sliders', sub: [
        { label: 'PLCs', items: ['PLCs (Siemens)', 'Industrial networks'] },
        { label: 'Language', items: ['Ladder'] }
      ]},
      { category: 'Software', color: '#6c5ce7', icon: 'code', sub: [
        { label: 'Languages', items: ['Python', 'C', 'Java'] },
        { label: 'Frameworks', items: ['ROS2'] }
      ]},
      { category: 'Office', color: '#0ea5e9', icon: 'doc', sub: [
        { label: 'Productivity', items: ['Excel', 'Word', 'PowerPoint'] },
        { label: 'Typesetting', items: ['LaTeX'] }
      ]},
      { category: 'Soft skills', color: '#00cec9', icon: 'users', sub: [
        { label: 'Collaboration', items: ['Teamwork', 'Communication'] }
      ]}
    ]
  }
};

const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
const { ui, projects, diplomas, experiences, skills } = siteData[lang];

/* ==========================================================================
   2. Icônes (SVG inline, style Lucide)
   ========================================================================== */
const ICONS = {
  cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>'
};

function icon(name, cls = '') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* Échappe le texte injecté dans les gabarits HTML */
function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

function tagRow(items) {
  if (!Array.isArray(items) || !items.length) return '';
  return `<div class="tag-row">${items.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;
}

/* ==========================================================================
   3. Rendu — projets (grille bento)
   ========================================================================== */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => {
    const media = p.image
      ? `<div class="project-media"><img src="${esc(p.image)}" alt="" loading="lazy" decoding="async"></div>`
      : '';
    return `
      <article class="project-card${p.featured ? ' featured' : ''}" style="--span:${Number(p.span) || 2}">
        ${media}
        <div class="project-body">
          <p class="project-eyebrow">${esc(p.eyebrow)}</p>
          <h3><button class="project-trigger" type="button" data-project="${esc(p.id)}">${esc(p.title)}</button></h3>
          <p>${esc(p.description)}</p>
          ${tagRow(p.techs)}
          <span class="project-foot">${esc(ui.viewProject)}${icon('arrow')}</span>
        </div>
      </article>`;
  }).join('');

  grid.querySelectorAll('.project-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const project = projects.find(p => p.id === btn.dataset.project);
      if (project) openProjectModal(project);
    });
  });
}

/* ==========================================================================
   4. Rendu — parcours
   ========================================================================== */
function timelineItem(entry) {
  const meta = entry.year || entry.period || '';
  const org = entry.institution || entry.company || '';
  const text = entry.details ? `<p>${esc(entry.details)}</p>` : '';
  const chips = Array.isArray(entry.skills) && entry.skills.length
    ? `<div class="chip-row">${entry.skills.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>`
    : '';
  return `
    <div class="timeline-item">
      <p class="timeline-period">${esc(meta)}</p>
      <h4>${esc(entry.title)}</h4>
      <p class="timeline-org">${esc(org)}</p>
      ${text}
      ${chips}
    </div>`;
}

function renderTimelines() {
  const dip = document.getElementById('diplomasTimeline');
  const exp = document.getElementById('experiencesTimeline');
  if (dip) dip.innerHTML = diplomas.map(timelineItem).join('');
  if (exp) exp.innerHTML = experiences.map(timelineItem).join('');
}

/* ==========================================================================
   5. Rendu — compétences
   ========================================================================== */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = skills.map(group => {
    const blocks = (group.sub || []).map(sub => `
      <div class="skill-block">
        ${sub.label ? `<p class="skill-label">${esc(sub.label)}</p>` : ''}
        <div class="skill-items">${(sub.items || []).map(i => `<span class="chip">${esc(i)}</span>`).join('')}</div>
      </div>`).join('');

    return `
      <div class="skill-group" style="--accent-group:${esc(group.color)}">
        <h3 class="skill-head">${icon(group.icon)}${esc(group.category)}</h3>
        ${blocks}
      </div>`;
  }).join('');
}

/* ==========================================================================
   6. Modale (détail projet + simulation en iframe)
   ========================================================================== */
let modalEl = null;
let lastFocused = null;
let modalToken = 0;

function ensureModal() {
  if (modalEl) return modalEl;
  modalEl = document.createElement('div');
  modalEl.className = 'modal';
  modalEl.setAttribute('role', 'dialog');
  modalEl.setAttribute('aria-modal', 'true');
  document.body.appendChild(modalEl);

  modalEl.addEventListener('click', e => {
    if (e.target === modalEl) closeModal();
  });
  modalEl.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.stopPropagation(); closeModal(); return; }
    if (e.key !== 'Tab') return;
    const focusables = modalEl.querySelectorAll('button, a[href], iframe, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Filet de sécurité : le focus peut sortir de la modale (iframe, clic ailleurs)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
  return modalEl;
}

/* L'iframe étant de même origine, on y écoute aussi Échap : sans cela, une fois
   le focus pris par la simulation, la touche n'atteint jamais la page parente. */
function bindFrameEscape(iframe) {
  const attach = () => {
    try {
      iframe.contentDocument?.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
      }, true);
    } catch { /* origine différente : le bouton de fermeture reste disponible */ }
  };
  iframe.addEventListener('load', attach);
  attach();
}

function showModal(html, labelledBy) {
  const modal = ensureModal();
  modalToken++;
  modal.innerHTML = html;
  modal.setAttribute('aria-labelledby', labelledBy);
  lastFocused = document.activeElement;

  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  const frame = modal.querySelector('iframe');
  if (frame) bindFrameEscape(frame);

  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    modal.classList.add('open');
    modal.querySelector('.modal-close').focus();
  });
}

function closeModal() {
  if (!modalEl || !modalEl.classList.contains('visible')) return;
  const token = ++modalToken;
  modalEl.classList.remove('open');
  document.body.style.overflow = '';

  setTimeout(() => {
    if (token !== modalToken) return; // une nouvelle modale a été ouverte entre-temps
    // Neutralise le beforeunload de la simulation avant de détacher l'iframe
    modalEl.querySelectorAll('iframe').forEach(f => {
      try { f.contentWindow.onbeforeunload = null; } catch { /* ignore */ }
    });
    modalEl.classList.remove('visible');
    modalEl.innerHTML = '';
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
    lastFocused = null;
  }, 240);
}

function openProjectModal(project) {
  const hero = project.image
    ? `<div class="modal-hero"><img src="${esc(project.image)}" alt=""></div>`
    : '';
  const action = project.action
    ? `<div class="modal-actions">
         <button class="btn btn-primary" type="button" data-run-action>
           ${icon(project.action.type === 'iframe-modal' ? 'play' : 'external')}
           ${esc(project.action.label)}
         </button>
       </div>`
    : '';

  showModal(`
    <div class="modal-panel">
      <button class="modal-close" type="button" aria-label="${esc(ui.close)}">${icon('close')}</button>
      <div class="modal-scroll">
        ${hero}
        <div class="modal-content">
          <p class="project-eyebrow">${esc(project.eyebrow)}</p>
          <h2 id="modal-title">${esc(project.title)}</h2>
          <p class="modal-lead">${esc(project.details)}</p>
          ${tagRow(project.techs)}
          ${action}
        </div>
      </div>
    </div>`, 'modal-title');

  const runBtn = modalEl.querySelector('[data-run-action]');
  if (runBtn) runBtn.addEventListener('click', () => runProjectAction(project));
}

function runProjectAction(project) {
  const action = project.action;
  if (!action) return;

  if (action.type === 'iframe-modal') {
    const origin = lastFocused; // la carte projet, pour y revenir à la fermeture
    closeModal();
    setTimeout(() => {
      openFrameModal(action);
      lastFocused = origin;
    }, 260);
    return;
  }
  if (action.type === 'link' && action.url) {
    window.open(action.url, action.target || '_blank', 'noopener');
  }
}

function openFrameModal(action) {
  showModal(`
    <div class="modal-panel frame">
      <button class="modal-close" type="button" aria-label="${esc(ui.close)}">${icon('close')}</button>
      <div class="modal-head"><h2 id="modal-title">${esc(action.title)}</h2></div>
      <iframe src="${esc(action.url)}" title="${esc(action.title)}" scrolling="no"></iframe>
    </div>`, 'modal-title');
}

/* ==========================================================================
   7. Thème (suit la préférence système)
   ========================================================================== */
function initTheme() {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = matches => document.body.classList.toggle('dark', matches);
  apply(mq.matches);
  mq.addEventListener('change', e => apply(e.matches));
}

/* ==========================================================================
   8. En-tête : menu mobile, ombre au défilement, lien actif
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const links = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];

  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? ui.closeMenu : ui.openMenu);
    });
  }

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', ui.openMenu);
    }
  };
  links.forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Lien actif : la section visible la plus haute l'emporte
  const sections = links
    .map(a => ({ link: a, el: document.getElementById(a.getAttribute('href').slice(1)) }))
    .filter(s => s.el);
  if (!sections.length) return;

  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id));
    const current = sections.find(s => visible.has(s.el.id));
    sections.forEach(s => s.link.classList.toggle('active', s === current));
  }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s.el));
}

/* ==========================================================================
   9. Révélation au défilement (désactivée si mouvement réduit)
   ========================================================================== */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const groups = [
    document.querySelectorAll('.hero-text, .hero-portrait, .hero-facts'),
    document.querySelectorAll('.section-head, .project-card, .path-grid > div, .skill-group, .contact-pitch, .contact-card')
  ];

  const targets = [];
  groups.forEach(list => list.forEach(el => targets.push(el)));
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries, obs) => {
    // Décale les éléments qui entrent ensemble pour obtenir un effet de vague
    const shown = entries.filter(e => e.isIntersecting);
    shown.forEach((e, i) => {
      e.target.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 60}ms`);
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* ==========================================================================
   10. Init
   ========================================================================== */
document.body.classList.add('no-anim');

renderProjects();
renderTimelines();
renderSkills();
initTheme();
initHeader();

requestAnimationFrame(() => {
  document.body.classList.remove('no-anim');
  initReveal();
});
