/**
 * Gorka Setién Portfolio - Main Interactive Logic
 * Serious Cyberpunk Theme
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTypewriter();
  initBackgroundCanvas();
  initTerminal();
  initCopyEmail();
  initMobileNav();
});

/* ==========================================================================
   01. REAL-TIME HUD CLOCK (UTC)
   ========================================================================== */
function initClock() {
  const clockElement = document.getElementById('hud-clock');
  if (!clockElement) return;

  function update() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds} UTC`;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   02. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    'Unity & Virtual Reality Developer',
    'Computer Science Engineer',
    'VR Systems Architect @ Innovae Group',
    'Multiplayer Netcode & DOTS Specialist',
    'LLMs & Spec-Driven Development (SDD)'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 2200;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      target.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
      setTimeout(type, typeSpeed);
    } else {
      target.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, deleteSpeed);
    }
  }

  type();
}

/* ==========================================================================
   03. AMBIENT CYBER GRID CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('cyber-grid-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.min(Math.floor((width * height) / 30000), 45);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5
    });
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  let isVisible = true;
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
  });

  function render() {
    if (!isVisible) {
      requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.fill();

      // Connect with neighbor nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null) {
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 * (1 - mdist / 140)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   04. INTERACTIVE CYBER TERMINAL
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalScreen = document.getElementById('terminal-screen');
  if (!terminalInput || !terminalHistory) return;

  const commandList = {
    help: () => `
<span class="text-cyan">COMANDOS DISPONIBLES:</span>
  <span class="text-amber">about</span>       - Resumen de perfil y enfoque
  <span class="text-amber">stack</span>       - Tecnologías, motores y lenguajes clave
  <span class="text-amber">experience</span>  - Información laboral actual y formación
  <span class="text-amber">contact</span>     - Canales de comunicación y redes
  <span class="text-amber">partner</span>     - Identificación del asistente digital
  <span class="text-amber">clear</span>       - Limpiar pantalla de consola
  <span class="text-amber">whoami</span>      - Diagnóstico de sesión
  <span class="text-amber">date</span>        - Timestamp del sistema
`,
    about: () => `
<span class="text-cyan">[DIAGNÓSTICO // ABOUT]</span>
Gorka Setién: Ingeniero Informático especializado en Realidad Virtual, 
arquitectura multijugador con Unity y computación espacial en Innovae Group.
Pionero en integración de Spec-Driven Development y pipelines asistidos por IA.
`,
    stack: () => `
<span class="text-cyan">[ARSENAL TECNOLÓGICO]</span>
• <strong class="text-main">XR / Engines:</strong> Unity 3D, Meta Quest SDK, OpenXR, XR Interaction Toolkit
• <strong class="text-main">Languages:</strong> C# (.NET), Python, Dart, Flutter, Android
• <strong class="text-main">Architecture:</strong> Unity NGO (Netcode), Photon Engine, DOTS / ECS
• <strong class="text-main">Methodologies:</strong> Spec-Driven Development (SDD), LLM-Augmented Dev
`,
    experience: () => `
<span class="text-cyan">[HISTORIAL DE OPERACIONES]</span>
[ACTIVE]  <strong>Innovae Group</strong> // VR & Software Developer (Presente)
          Desarrollo de simulaciones y experiencias industriales inmersivas en Unity.
[DEGREE]  <strong>Computer Science Engineer</strong> // Grado en Ingeniería Informática.
`,
    contact: () => `
<span class="text-cyan">[CANALES DE COMUNICACIÓN]</span>
• LinkedIn: <a href="https://www.linkedin.com/in/gorka-setien/" target="_blank" class="text-amber">linkedin.com/in/gorka-setien</a>
• GitHub:   <a href="https://github.com/gorkaseto" target="_blank" class="text-amber">github.com/gorkaseto</a>
• Email:    <a href="mailto:gorka.seto@gmail.com" class="text-amber">gorka.seto@gmail.com</a>
`,
    partner: () => `
<span class="text-cyan">[DIGITAL PARTNER DETECTED]</span>
Agumon Hakase // Especialista en investigación y sistemas de datos.
"Siempre listo para analizar nuevas tecnologías y compilar soluciones robustas."
`,
    whoami: () => `<span class="text-muted">guest_user@cyber-grid // ACCESS_LEVEL: SECURE_PUBLIC_GUEST</span>`,
    date: () => `<span class="text-cyan">${new Date().toUTCString()}</span>`
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim();
      const command = rawInput.toLowerCase();
      terminalInput.value = '';

      if (!command) return;

      // Add user line to history
      const userLine = document.createElement('div');
      userLine.className = 'terminal-line';
      userLine.innerHTML = `<span class="terminal-user">guest@gorkaseto:~$</span> <span>${escapeHtml(rawInput)}</span>`;
      terminalHistory.appendChild(userLine);

      // Handle Command
      if (command === 'clear' || command === 'cls') {
        terminalHistory.innerHTML = '';
        return;
      }

      const responseLine = document.createElement('div');
      responseLine.className = 'terminal-line';

      if (commandList[command]) {
        responseLine.innerHTML = commandList[command]();
      } else {
        responseLine.innerHTML = `<span style="color: #f43f5e;">Comando no reconocido: '${escapeHtml(rawInput)}'. Escribe '<span class="text-cyan">help</span>' para la lista de comandos.</span>`;
      }

      terminalHistory.appendChild(responseLine);
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

/* ==========================================================================
   05. COPY EMAIL TO CLIPBOARD
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const emailText = 'gorka.seto@gmail.com';

  if (!copyBtn || !copyFeedback) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailText);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = emailText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      copyFeedback.innerHTML = '<i class="fa-solid fa-check"></i> ¡COPIADO!';
      copyFeedback.style.background = 'rgba(16, 185, 129, 0.2)';
      copyFeedback.style.color = '#10b981';
      copyFeedback.style.borderColor = 'rgba(16, 185, 129, 0.4)';

      setTimeout(() => {
        copyFeedback.innerHTML = '<i class="fa-regular fa-copy"></i> COPIAR';
        copyFeedback.style.background = '';
        copyFeedback.style.color = '';
        copyFeedback.style.borderColor = '';
      }, 2500);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  });
}

/* ==========================================================================
   06. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    drawer.classList.toggle('active');
    const isOpen = drawer.classList.contains('active');
    btn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  drawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
      btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}
