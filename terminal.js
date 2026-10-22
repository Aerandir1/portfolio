/* ==========================================================================
   Portfolio Lilian Conan — terminal Linux simulé
   Dépend de script.js (siteData, lang, esc, closeModal)
   ========================================================================== */

/* ==========================================================================
   1. Textes
   ========================================================================== */
const TERM_I18N = {
  fr: {
    title: 'Terminal',
    open: 'Ouvrir le terminal',
    close: 'Fermer le terminal',
    minimize: 'Réduire le terminal',
    maximize: 'Agrandir le terminal',
    restore: 'Restaurer la taille',
    inputLabel: 'Commande',
    welcome: [
      "Bienvenue sur le terminal de Lilian Conan.",
      "Tape <cmd>help</cmd> pour voir les commandes disponibles."
    ],
    help: [
      ['help', 'affiche cette aide'],
      ['ls [-a] [dossier]', 'liste le contenu d\'un dossier'],
      ['cd <dossier>', 'change de dossier'],
      ['pwd', 'affiche le dossier courant'],
      ['cat <fichier>', 'affiche le contenu d\'un fichier'],
      ['tree', 'affiche l\'arborescence'],
      ['open <fichier>', 'ouvre un projet, le CV…'],
      ['whoami', 'qui suis-je ?'],
      ['neofetch', 'infos système'],
      ['echo <texte>', 'affiche un texte'],
      ['date', 'date et heure'],
      ['uname [-a]', 'nom du système'],
      ['history', 'historique des commandes'],
      ['theme <light|dark>', 'change le thème'],
      ['lang <fr|en>', 'change la langue du site'],
      ['clear', 'efface l\'écran (Ctrl+L)'],
      ['exit', 'ferme le terminal']
    ],
    helpFoot: 'Astuces : Tab pour compléter, ↑/↓ pour l\'historique, Ctrl+C pour annuler.',
    notFound: cmd => `${cmd}: commande introuvable. Tape « help ».`,
    noSuchFile: p => `${p}: aucun fichier ou dossier de ce nom`,
    notDir: p => `${p}: n'est pas un dossier`,
    isDir: p => `${p}: est un dossier`,
    missing: cmd => `${cmd}: opérande manquant`,
    cannotOpen: p => `${p}: rien à ouvrir pour ce fichier`,
    opening: p => `Ouverture de ${p}…`,
    sudo: "lilian n'est pas dans le fichier sudoers. Cet incident sera signalé. 🙂",
    rm: "Bien essayé. Ce portfolio est en lecture seule.",
    themeSet: t => `Thème : ${t}`,
    themeUsage: 'usage : theme <light|dark>',
    langUsage: 'usage : lang <fr|en>',
    whoami: 'lilian — étudiant ingénieur en mécatronique (ENSIBS Lorient)',
    dirs: { projects: 'projets', path: 'parcours' },
    files: {
      about: 'a_propos.txt', contact: 'contact.txt', skills: 'competences.txt',
      diplomas: 'diplomes.txt', experiences: 'experiences.txt', cv: 'cv.pdf', secret: '.secret'
    },
    techs: 'Technos',
    skillsLabel: 'Compétences',
    secret: "Tu as trouvé le fichier caché ! Tape « sudo » pour voir si tu as les droits…",
    contactLines: ['Email    : lilian.conan.2@gmail.com', 'LinkedIn : linkedin.com/in/lilian-conan', 'GitHub   : github.com/Aerandir1', 'Lieu     : Lorient, France'],
    cvUrl: '/attach/cv_lilian_conan_fr.pdf'
  },
  en: {
    title: 'Terminal',
    open: 'Open terminal',
    close: 'Close terminal',
    minimize: 'Minimize terminal',
    maximize: 'Maximize terminal',
    restore: 'Restore size',
    inputLabel: 'Command',
    welcome: [
      "Welcome to Lilian Conan's terminal.",
      "Type <cmd>help</cmd> to list the available commands."
    ],
    help: [
      ['help', 'show this help'],
      ['ls [-a] [dir]', 'list directory contents'],
      ['cd <dir>', 'change directory'],
      ['pwd', 'print working directory'],
      ['cat <file>', 'print a file'],
      ['tree', 'show the directory tree'],
      ['open <file>', 'open a project, the resume…'],
      ['whoami', 'who am I?'],
      ['neofetch', 'system info'],
      ['echo <text>', 'print some text'],
      ['date', 'current date and time'],
      ['uname [-a]', 'system name'],
      ['history', 'command history'],
      ['theme <light|dark>', 'switch theme'],
      ['lang <fr|en>', 'switch site language'],
      ['clear', 'clear the screen (Ctrl+L)'],
      ['exit', 'close the terminal']
    ],
    helpFoot: 'Tips: Tab to complete, ↑/↓ for history, Ctrl+C to cancel.',
    notFound: cmd => `${cmd}: command not found. Type "help".`,
    noSuchFile: p => `${p}: no such file or directory`,
    notDir: p => `${p}: not a directory`,
    isDir: p => `${p}: is a directory`,
    missing: cmd => `${cmd}: missing operand`,
    cannotOpen: p => `${p}: nothing to open for this file`,
    opening: p => `Opening ${p}…`,
    sudo: "lilian is not in the sudoers file. This incident will be reported. 🙂",
    rm: "Nice try. This portfolio is read-only.",
    themeSet: t => `Theme: ${t}`,
    themeUsage: 'usage: theme <light|dark>',
    langUsage: 'usage: lang <fr|en>',
    whoami: 'lilian — mechatronics engineering student (ENSIBS Lorient)',
    dirs: { projects: 'projects', path: 'path' },
    files: {
      about: 'about.txt', contact: 'contact.txt', skills: 'skills.txt',
      diplomas: 'diplomas.txt', experiences: 'experiences.txt', cv: 'resume.pdf', secret: '.secret'
    },
    techs: 'Tech',
    skillsLabel: 'Skills',
    secret: 'You found the hidden file! Try "sudo" to see if you have the rights…',
    contactLines: ['Email    : lilian.conan.2@gmail.com', 'LinkedIn : linkedin.com/in/lilian-conan', 'GitHub   : github.com/Aerandir1', 'Location : Lorient, France'],
    cvUrl: '/attach/cv_lilian_conan_en.pdf'
  }
};

const T = TERM_I18N[lang];
const HOME = '/home/lilian';

/* ==========================================================================
   2. Système de fichiers virtuel (construit depuis siteData)
   ========================================================================== */
function buildFs() {
  const data = siteData[lang];
  const text = lines => ({ type: 'file', content: () => lines });
  const entry = e => [
    `${e.title}`,
    `  ${e.year || e.period || ''} — ${e.institution || e.company || ''}`,
    ...(e.details ? [`  ${e.details}`] : []),
    ...(e.skills && e.skills.length ? [`  ${T.skillsLabel} : ${e.skills.join(', ')}`] : []),
    ''
  ];

  const projectsDir = {};
  data.projects.forEach(p => {
    projectsDir[`${p.id}.md`] = {
      type: 'file',
      project: p,
      content: () => [
        `# ${p.title}`,
        `> ${p.eyebrow}`,
        '',
        p.details || p.description,
        '',
        `${T.techs} : ${(p.techs || []).join(', ')}`
      ]
    };
  });

  const heroLead = document.querySelector('.hero-lead');
  const about = [
    'Lilian Conan',
    document.querySelector('.hero-kicker')?.textContent.trim() || '',
    '',
    (heroLead ? heroLead.textContent : '').replace(/\s+/g, ' ').trim()
  ];

  const skillsLines = data.skills.flatMap(g => [
    `[${g.category}]`,
    ...g.sub.map(s => `  ${s.label.padEnd(16)} ${s.items.join(', ')}`),
    ''
  ]);

  return {
    type: 'dir',
    children: {
      home: { type: 'dir', children: {
        lilian: { type: 'dir', children: {
          [T.files.about]: text(about),
          [T.files.contact]: text(T.contactLines),
          [T.files.skills]: text(skillsLines),
          [T.files.cv]: { type: 'file', url: T.cvUrl, content: () => ['%PDF-1.7 … (open ' + T.files.cv + ')'] },
          [T.files.secret]: text([T.secret]),
          [T.dirs.projects]: { type: 'dir', children: projectsDir },
          [T.dirs.path]: { type: 'dir', children: {
            [T.files.diplomas]: text(data.diplomas.flatMap(entry)),
            [T.files.experiences]: text(data.experiences.flatMap(entry))
          }}
        }}
      }}
    }
  };
}

const FS = buildFs();

function resolvePath(cwd, input = '') {
  let path = input.trim() || '~';
  if (path === '~' || path.startsWith('~/')) path = HOME + path.slice(1);
  const parts = (path.startsWith('/') ? path : `${cwd}/${path}`).split('/');
  const stack = [];
  parts.forEach(part => {
    if (!part || part === '.') return;
    if (part === '..') stack.pop();
    else stack.push(part);
  });
  return '/' + stack.join('/');
}

function getNode(absPath) {
  let node = FS;
  for (const part of absPath.split('/').filter(Boolean)) {
    if (node.type !== 'dir' || !node.children[part]) return null;
    node = node.children[part];
  }
  return node;
}

function prettyPath(absPath) {
  if (absPath === HOME) return '~';
  return absPath.startsWith(HOME + '/') ? '~' + absPath.slice(HOME.length) : absPath;
}

/* ==========================================================================
   3. Interface
   ========================================================================== */
let termEl = null;
let termOut = null;
let termInput = null;
let termPrompt = null;
let termLastFocused = null;

const termState = { open: false, cwd: HOME, history: [], histIndex: 0, draft: '' };

function promptHtml() {
  return `<span class="t-user">lilian@portfolio</span>:<span class="t-path">${esc(prettyPath(termState.cwd))}</span>$`;
}

function print(html = '', cls = '') {
  const line = document.createElement('div');
  line.className = 't-line' + (cls ? ' ' + cls : '');
  line.innerHTML = html || '&nbsp;';
  termOut.appendChild(line);
}

function printText(lines, cls = '') {
  [].concat(lines).forEach(l => print(esc(l), cls));
}

function ensureTerminal() {
  if (termEl) return termEl;

  termEl = document.createElement('div');
  termEl.className = 'terminal';
  termEl.setAttribute('role', 'dialog');
  termEl.setAttribute('aria-label', T.title);
  termEl.innerHTML = `
    <div class="terminal-bar">
      <span class="terminal-dots">
        <button class="t-dot t-dot-close" type="button" aria-label="${esc(T.close)}" title="${esc(T.close)}"></button>
        <button class="t-dot t-dot-min" type="button" aria-label="${esc(T.minimize)}" title="${esc(T.minimize)}"></button>
        <button class="t-dot t-dot-max" type="button" aria-label="${esc(T.maximize)}" title="${esc(T.maximize)}"></button>
      </span>
      <span class="terminal-title">lilian@portfolio: ~</span>
    </div>
    <div class="terminal-body">
      <div class="terminal-out" aria-live="polite"></div>
      <form class="terminal-form" autocomplete="off">
        <label class="t-prompt" for="terminal-input"></label>
        <input id="terminal-input" class="terminal-input" type="text" spellcheck="false"
               autocapitalize="off" autocorrect="off" aria-label="${esc(T.inputLabel)}">
      </form>
    </div>`;
  document.body.appendChild(termEl);

  termOut = termEl.querySelector('.terminal-out');
  termInput = termEl.querySelector('.terminal-input');
  termPrompt = termEl.querySelector('.t-prompt');
  termPrompt.innerHTML = promptHtml();

  termEl.querySelector('.t-dot-close').addEventListener('click', closeTerminal);
  termEl.querySelector('.t-dot-min').addEventListener('click', closeTerminal);
  termEl.querySelector('.t-dot-max').addEventListener('click', toggleMaximize);
  initDrag(termEl.querySelector('.terminal-bar'));
  termEl.querySelector('.terminal-body').addEventListener('click', () => {
    if (!window.getSelection().toString()) termInput.focus();
  });
  termEl.querySelector('.terminal-form').addEventListener('submit', e => {
    e.preventDefault();
    submitCommand(termInput.value);
  });
  termInput.addEventListener('keydown', onTermKey);
  termEl.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.stopPropagation(); closeTerminal(); }
  });

  T.welcome.forEach(l => print(esc(l).replace(/&lt;cmd&gt;(.*?)&lt;\/cmd&gt;/g, '<span class="t-cmd">$1</span>')));
  print();
  return termEl;
}

function openTerminal() {
  if (typeof closeModal === 'function' && modalEl?.classList.contains('visible')) closeModal();
  const el = ensureTerminal();
  termLastFocused = document.activeElement;
  termState.open = true;
  el.classList.add('visible');
  requestAnimationFrame(() => { if (termState.open) el.classList.add('open'); });
  document.querySelectorAll('.terminal-toggle').forEach(b => b.setAttribute('aria-expanded', 'true'));
  termInput.focus();
}

function closeTerminal() {
  if (!termEl) return;
  termState.open = false;
  termEl.classList.remove('open');
  document.querySelectorAll('.terminal-toggle').forEach(b => b.setAttribute('aria-expanded', 'false'));
  setTimeout(() => { if (!termState.open) termEl.classList.remove('visible'); }, 240);
  if (termLastFocused && document.contains(termLastFocused)) termLastFocused.focus();
}

/* Agrandissement plein écran (pastille verte ou double-clic sur la barre) */
function toggleMaximize() {
  const max = termEl.classList.toggle('maximized');
  const btn = termEl.querySelector('.t-dot-max');
  btn.setAttribute('aria-label', max ? T.restore : T.maximize);
  btn.title = max ? T.restore : T.maximize;
  termInput.focus();
}

/* Déplacement de la fenêtre par sa barre de titre, borné à l'écran */
function clampPosition(left, top) {
  const maxLeft = window.innerWidth - termEl.offsetWidth;
  const maxTop = window.innerHeight - termEl.offsetHeight;
  return [Math.max(0, Math.min(left, maxLeft)), Math.max(0, Math.min(top, maxTop))];
}

function placeTerminal(left, top) {
  [left, top] = clampPosition(left, top);
  Object.assign(termEl.style, { left: `${left}px`, top: `${top}px`, right: 'auto', bottom: 'auto' });
}

function initDrag(bar) {
  let start = null;

  bar.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('button')) return;
    if (termEl.classList.contains('maximized') || window.matchMedia('(max-width: 680px)').matches) return;
    const rect = termEl.getBoundingClientRect();
    start = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    bar.setPointerCapture(e.pointerId);
    termEl.classList.add('dragging');
  });
  bar.addEventListener('pointermove', e => {
    if (start) placeTerminal(e.clientX - start.x, e.clientY - start.y);
  });
  const stop = () => {
    if (!start) return;
    start = null;
    termEl.classList.remove('dragging');
  };
  bar.addEventListener('pointerup', stop);
  bar.addEventListener('pointercancel', stop);
  bar.addEventListener('dblclick', e => { if (!e.target.closest('button')) toggleMaximize(); });

  // Garde la fenêtre visible si l'écran rétrécit
  window.addEventListener('resize', () => {
    if (termEl.style.left) placeTerminal(parseFloat(termEl.style.left), parseFloat(termEl.style.top));
  });
}

function toggleTerminal() {
  termState.open ? closeTerminal() : openTerminal();
}

function scrollToEnd() {
  const body = termEl.querySelector('.terminal-body');
  body.scrollTop = body.scrollHeight;
}

/* ==========================================================================
   4. Clavier : historique, complétion, raccourcis
   ========================================================================== */
function onTermKey(e) {
  const { history } = termState;

  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    if (!history.length) return;
    e.preventDefault();
    if (termState.histIndex === history.length) termState.draft = termInput.value;
    termState.histIndex = Math.max(0, Math.min(history.length,
      termState.histIndex + (e.key === 'ArrowUp' ? -1 : 1)));
    termInput.value = termState.histIndex === history.length ? termState.draft : history[termState.histIndex];
    requestAnimationFrame(() => termInput.setSelectionRange(termInput.value.length, termInput.value.length));
    return;
  }
  if (e.key === 'Tab') { e.preventDefault(); complete(); return; }
  if (e.ctrlKey && e.key.toLowerCase() === 'l') { e.preventDefault(); termOut.innerHTML = ''; return; }
  if (e.ctrlKey && e.key.toLowerCase() === 'c') {
    if (termInput.selectionStart !== termInput.selectionEnd) return; // laisse copier
    e.preventDefault();
    print(`${promptHtml()} ${esc(termInput.value)}^C`);
    termInput.value = '';
    scrollToEnd();
  }
}

function complete() {
  const value = termInput.value;
  const tokens = value.split(/\s+/);

  // Complétion du nom de commande
  if (tokens.length === 1) {
    const matches = Object.keys(COMMANDS).filter(c => c.startsWith(tokens[0]));
    if (matches.length === 1) termInput.value = matches[0] + ' ';
    else if (matches.length > 1) showMatches(matches);
    return;
  }

  // Complétion d'un chemin
  const partial = tokens[tokens.length - 1];
  const slash = partial.lastIndexOf('/');
  const dirPart = slash >= 0 ? partial.slice(0, slash + 1) : '';
  const base = slash >= 0 ? partial.slice(slash + 1) : partial;
  const dir = getNode(resolvePath(termState.cwd, dirPart || '.'));
  if (!dir || dir.type !== 'dir') return;

  const names = Object.keys(dir.children)
    .filter(n => n.startsWith(base) && (base.startsWith('.') || !n.startsWith('.')));
  if (!names.length) return;

  if (names.length === 1) {
    const node = dir.children[names[0]];
    tokens[tokens.length - 1] = dirPart + names[0] + (node.type === 'dir' ? '/' : ' ');
    termInput.value = tokens.join(' ');
    return;
  }
  // Préfixe commun
  let common = names[0];
  names.forEach(n => { while (!n.startsWith(common)) common = common.slice(0, -1); });
  if (common.length > base.length) {
    tokens[tokens.length - 1] = dirPart + common;
    termInput.value = tokens.join(' ');
  } else {
    showMatches(names.map(n => dir.children[n].type === 'dir' ? n + '/' : n));
  }
}

function showMatches(list) {
  print(`${promptHtml()} ${esc(termInput.value)}`);
  print(list.map(esc).join('&nbsp;&nbsp;'));
  scrollToEnd();
}

/* ==========================================================================
   5. Commandes
   ========================================================================== */
function submitCommand(raw) {
  const line = raw.trim();
  print(`${promptHtml()} ${esc(raw)}`);
  termInput.value = '';

  if (line) {
    if (termState.history[termState.history.length - 1] !== line) termState.history.push(line);
    const [cmd, ...args] = line.split(/\s+/);
    const handler = COMMANDS[cmd];
    if (handler) handler(args, line.slice(cmd.length).trim());
    else printText(T.notFound(cmd), 't-err');
  }
  termState.histIndex = termState.history.length;
  termState.draft = '';
  if (termPrompt) termPrompt.innerHTML = promptHtml();
  if (termEl) {
    termEl.querySelector('.terminal-title').textContent = `lilian@portfolio: ${prettyPath(termState.cwd)}`;
    scrollToEnd();
  }
}

function listDir(node, showHidden) {
  return Object.keys(node.children)
    .filter(n => showHidden || !n.startsWith('.'))
    .sort()
    .map(n => node.children[n].type === 'dir'
      ? `<span class="t-dir">${esc(n)}/</span>`
      : `<span class="${node.children[n].url || node.children[n].project ? 't-exec' : ''}">${esc(n)}</span>`);
}

function treeLines(node, prefix = '') {
  const names = Object.keys(node.children).filter(n => !n.startsWith('.')).sort();
  return names.flatMap((n, i) => {
    const last = i === names.length - 1;
    const child = node.children[n];
    const label = child.type === 'dir' ? `<span class="t-dir">${esc(n)}/</span>` : esc(n);
    const line = `${prefix}${last ? '└── ' : '├── '}${label}`;
    return child.type === 'dir' ? [line, ...treeLines(child, prefix + (last ? '    ' : '│   '))] : [line];
  });
}

const COMMANDS = {
  help() {
    const width = Math.max(...T.help.map(([c]) => c.length)) + 2;
    T.help.forEach(([c, d]) => print(`<span class="t-cmd">${esc(c.padEnd(width))}</span>${esc(d)}`));
    print();
    printText(T.helpFoot, 't-muted');
  },

  ls(args) {
    const showHidden = args.some(a => /^-\w*a/.test(a));
    const targets = args.filter(a => !a.startsWith('-'));
    const target = targets[0] || '.';
    const node = getNode(resolvePath(termState.cwd, target));
    if (!node) return printText(`ls: ${T.noSuchFile(target)}`, 't-err');
    if (node.type === 'file') return printText(target);
    print(listDir(node, showHidden).join('&nbsp;&nbsp;'));
  },

  cd(args) {
    const target = args[0] || '~';
    const abs = resolvePath(termState.cwd, target);
    const node = getNode(abs);
    if (!node) return printText(`cd: ${T.noSuchFile(target)}`, 't-err');
    if (node.type !== 'dir') return printText(`cd: ${T.notDir(target)}`, 't-err');
    termState.cwd = abs;
  },

  pwd() { printText(termState.cwd); },

  cat(args) {
    if (!args.length) return printText(T.missing('cat'), 't-err');
    args.forEach(target => {
      const node = getNode(resolvePath(termState.cwd, target));
      if (!node) return printText(`cat: ${T.noSuchFile(target)}`, 't-err');
      if (node.type === 'dir') return printText(`cat: ${T.isDir(target)}`, 't-err');
      printText(node.content());
    });
  },

  tree() {
    const node = getNode(termState.cwd);
    print(`<span class="t-dir">.</span>`);
    treeLines(node).forEach(l => print(l));
  },

  open(args) {
    const target = args[0];
    if (!target) return printText(T.missing('open'), 't-err');
    const node = getNode(resolvePath(termState.cwd, target));
    if (!node) return printText(`open: ${T.noSuchFile(target)}`, 't-err');
    if (node.url) {
      printText(T.opening(target), 't-muted');
      window.open(node.url, '_blank', 'noopener');
    } else if (node.project && typeof openProjectModal === 'function') {
      printText(T.opening(target), 't-muted');
      closeTerminal();
      setTimeout(() => openProjectModal(node.project), 260);
    } else {
      printText(`open: ${T.cannotOpen(target)}`, 't-err');
    }
  },

  whoami() { printText(T.whoami); },

  echo(_args, rest) { printText(rest); },

  date() {
    printText(new Date().toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR', {
      dateStyle: 'full', timeStyle: 'medium'
    }));
  },

  uname(args) {
    printText(args.includes('-a')
      ? 'Linux portfolio 6.0.0-lilian #1 SMP x86_64 GNU/Linux'
      : 'Linux');
  },

  history() {
    termState.history.forEach((h, i) => printText(`${String(i + 1).padStart(4)}  ${h}`));
  },

  neofetch() {
    const logo = [
      '    .--.    ',
      '   |o_o |   ',
      '   |:_/ |   ',
      '  //   \\ \\  ',
      ' (|     | ) ',
      "/'\\_   _/`\\ ",
      '\\___)=(___/ '
    ];
    const info = [
      `<span class="t-user">lilian</span>@<span class="t-user">portfolio</span>`,
      '-----------------',
      `<span class="t-key">OS</span>: Portfolio Linux x86_64`,
      `<span class="t-key">Host</span>: ENSIBS Lorient`,
      `<span class="t-key">Shell</span>: lsh 1.0`,
      `<span class="t-key">${lang === 'en' ? 'Field' : 'Domaine'}</span>: ${lang === 'en' ? 'Mechatronics' : 'Mécatronique'}`,
      `<span class="t-key">${lang === 'en' ? 'Languages' : 'Langages'}</span>: Python, C, Java`,
      `<span class="t-key">${lang === 'en' ? 'Boards' : 'Cartes'}</span>: STM32, ESP32, Raspberry Pi`,
      `<span class="t-key">CAD</span>: SolidWorks`
    ];
    const rows = Math.max(logo.length, info.length);
    for (let i = 0; i < rows; i++) {
      print(`<span class="t-logo">${esc((logo[i] || '').padEnd(14))}</span>${info[i] || ''}`);
    }
  },

  theme(args) {
    const t = args[0];
    if (t !== 'light' && t !== 'dark') return printText(T.themeUsage, 't-err');
    document.body.classList.toggle('dark', t === 'dark');
    printText(T.themeSet(t));
  },

  lang(args) {
    const l = args[0];
    if (l !== 'fr' && l !== 'en') return printText(T.langUsage, 't-err');
    if (l !== lang) window.location.href = `/${l}/`;
  },

  clear() { termOut.innerHTML = ''; },

  exit() { closeTerminal(); },

  sudo() { printText(T.sudo, 't-err'); },

  rm() { printText(T.rm, 't-err'); }
};

/* ==========================================================================
   6. Init : bouton d'en-tête + raccourci clavier (touche ² ou `)
   ========================================================================== */
function initTerminal() {
  const tools = document.querySelector('.header-tools');
  if (tools) {
    const btn = document.createElement('button');
    btn.className = 'terminal-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', T.open);
    btn.setAttribute('aria-expanded', 'false');
    btn.title = `${T.open} (²)`;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 4 4-4 4M12 17h7"/></svg>';
    btn.addEventListener('click', toggleTerminal);
    tools.insertBefore(btn, tools.firstChild);
  }

  document.addEventListener('keydown', e => {
    if (e.key !== '²' && e.key !== '`') return;
    const t = e.target;
    const typing = t !== termInput && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    if (typing) return;
    e.preventDefault();
    toggleTerminal();
  });
}

initTerminal();
