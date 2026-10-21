/**
 * Gorka Setien Portfolio - Main Interactive Logic
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
    'LLMs & Spec-Driven Development (OpenSpec)',
    'Autonomous AI Agents & MCP Tooling',
    'Unity & Virtual Reality Architect',
    'Computer Science Engineer @ Innovae Group',
    'Context Engineering & Neural Workflows',
    'High-Performance Multiplayer (NGO & DOTS)'
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
  const heroSection = document.querySelector('.hero-section');
  const operatorFrame = document.getElementById('operator-frame');
  const operatorCard = document.getElementById('operator-card');
  const terminalFrame = document.getElementById('hero-terminal-frame');
  const terminalInput = document.getElementById('hero-terminal-input');
  const terminalHistory = document.getElementById('hero-terminal-history');
  const terminalScreen = document.getElementById('hero-terminal-screen');
  const terminalClose = document.getElementById('hero-terminal-close');
  const navTerminalLink = document.getElementById('nav-terminal-link');
  const mobileNavTerminalLink = document.getElementById('mobile-nav-terminal-link');

  if (!terminalFrame || !terminalInput || !terminalHistory) return;

  // Ensure terminal starts strictly hidden on initial page load
  terminalFrame.style.display = 'none';

  const commandList = {
    help: () => `
<span class="text-cyan">AVAILABLE COMMANDS:</span>
  <span class="text-amber">ai</span>          - AI protocols, LLMs &amp; Spec-Driven Dev
  <span class="text-amber">about</span>       - Profile overview &amp; engineering philosophy
  <span class="text-amber">stack</span>       - Technical arsenal &amp; key protocols
  <span class="text-amber">experience</span>  - Operational history (Innovae) &amp; credentials
  <span class="text-amber">contact</span>     - Direct communication channels
  <span class="text-amber">partner</span>     - Digital partner identification
  <span class="text-amber">clear</span>       - Clear terminal screen
  <span class="text-amber">whoami</span>      - Session diagnostic
  <span class="text-amber">date</span>        - System timestamp
`,
    ai: () => `
<span class="text-cyan">[NEURAL PROTOCOLS &amp; AI CAPABILITIES]</span>
• <strong class="text-main">Spec-Driven Development (SDD via OpenSpec):</strong> Formal specifications as canonical blueprints for deterministic code generation.
• <strong class="text-main">Autonomous Agent Orchestration:</strong> Multi-role agentic pipelines (researcher, architect, executor, auditor).
• <strong class="text-main">Model Context Protocol (MCP):</strong> Interfacing LLMs with local workspace tools, Unity profiling, and external services.
• <strong class="text-main">Context Engineering:</strong> Strict context window budgeting, structured RAG, and hallucination reduction.
`,
    about: () => `
<span class="text-cyan">[SYSTEM DIAGNOSTIC // ABOUT]</span>
Gorka Setien: Computer Science Engineer specializing at the intersection of
Applied Artificial Intelligence (LLMs, SDD with OpenSpec, autonomous agents) and spatial
computing (Unity VR, Netcode, DOTS) at Innovae Group.
`,
    stack: () => `
<span class="text-cyan">[TECHNICAL ARSENAL]</span>
• <strong class="text-cyan">AI &amp; Neural:</strong> LLMs, Spec-Driven Development (OpenSpec / SDD), Autonomous Agents, MCP, Context Engineering
• <strong class="text-magenta">XR / Engines:</strong> Unity 3D, Pico XR Enterprise SDK (Pico 3, 4, 4 Ultra, Swan / Space Pro), OpenXR, XR Interaction Toolkit
• <strong class="text-amber">Languages:</strong> C# (.NET), Python, Dart, Flutter, Android Native
• <strong class="text-main">Architecture:</strong> Unity NGO (Netcode), Photon Engine, DOTS / ECS
`,
    experience: () => `
<span class="text-cyan">[OPERATIONAL HISTORY]</span>
[ACTIVE]  <strong>Innovae Group</strong> // VR & Software Developer (Present)
          Engineering immersive industrial simulations and VR systems in Unity 3D.
[DEGREE]  <strong>Computer Science Engineer</strong> // B.S. in Computer Science & Engineering.
`,
    contact: () => `
<span class="text-cyan">[COMMUNICATION CHANNELS]</span>
• LinkedIn: <a href="https://www.linkedin.com/in/gorka-setien/" target="_blank" class="text-amber">linkedin.com/in/gorka-setien</a>
• GitHub:   <a href="https://github.com/gorkaseto" target="_blank" class="text-amber">github.com/gorkaseto</a>
• Email:    <a href="mailto:gorka.seto@gmail.com" class="text-amber">gorka.seto@gmail.com</a>
`,
    partner: () => `
<span class="text-cyan">[DIGITAL PARTNER DETECTED]</span>
Agumon Hakase // Research specialist and data systems operative.
"Always ready to analyze emerging technologies and compile robust solutions."
`,
    whoami: () => `<span class="text-muted">guest_user@cyber-grid // ACCESS_LEVEL: SECURE_PUBLIC_GUEST</span>`,
    date: () => `<span class="text-cyan">${new Date().toUTCString()}</span>`
  };

  // Open / Close terminal functions
  function openTerminal() {
    if (!heroSection || !terminalFrame) return;

    terminalFrame.style.display = 'block';
    // Force browser reflow so transition runs smoothly
    void terminalFrame.offsetWidth;

    heroSection.classList.add('terminal-active');

    setTimeout(() => {
      terminalInput.focus();
      if (terminalScreen) terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }, 180);
  }

  function closeTerminal() {
    if (!heroSection || !terminalFrame) return;

    heroSection.classList.remove('terminal-active');

    // Wait for the slide/fade transition to complete before setting display: none
    setTimeout(() => {
      if (!heroSection.classList.contains('terminal-active')) {
        terminalFrame.style.display = 'none';
      }
    }, 450);
  }

  function toggleTerminal() {
    if (heroSection && heroSection.classList.contains('terminal-active')) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }

  // Operator card and frame click toggles terminal
  const clickTarget = operatorCard || operatorFrame;
  if (clickTarget) {
    clickTarget.style.cursor = 'pointer';
    clickTarget.addEventListener('click', (e) => {
      if (e.target.closest('#hero-terminal-frame')) return;
      toggleTerminal();
    });

    clickTarget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTerminal();
      }
    });
  }

  if (operatorFrame && operatorFrame !== clickTarget) {
    operatorFrame.style.cursor = 'pointer';
    operatorFrame.addEventListener('click', (e) => {
      if (e.target.closest('#hero-terminal-frame')) return;
      toggleTerminal();
    });
  }

  // Close dot inside terminal
  if (terminalClose) {
    terminalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeTerminal();
    });
  }

  // Escape key closes terminal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && heroSection && heroSection.classList.contains('terminal-active')) {
      closeTerminal();
    }
  });

  // Nav terminal link clicks
  function handleNavTerminal(e) {
    e.preventDefault();
    const hero = document.getElementById('hero') || heroSection;
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    openTerminal();
  }

  if (navTerminalLink) navTerminalLink.addEventListener('click', handleNavTerminal);
  if (mobileNavTerminalLink) mobileNavTerminalLink.addEventListener('click', handleNavTerminal);

  // Command History Navigation
  const commandHistory = [];
  let historyIndex = -1;

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim();
      const command = rawInput.toLowerCase();
      terminalInput.value = '';

      if (!command) return;

      commandHistory.push(rawInput);
      historyIndex = commandHistory.length;

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
        responseLine.innerHTML = `<span style="color: #f43f5e;">Command not recognized: '${escapeHtml(rawInput)}'. Type '<span class="text-cyan">help</span>' for available commands.</span>`;
      }

      terminalHistory.appendChild(responseLine);
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
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

      copyFeedback.innerHTML = '<i class="fa-solid fa-check"></i> COPIED!';
      copyFeedback.style.background = 'rgba(16, 185, 129, 0.2)';
      copyFeedback.style.color = '#10b981';
      copyFeedback.style.borderColor = 'rgba(16, 185, 129, 0.4)';

      setTimeout(() => {
        copyFeedback.innerHTML = '<i class="fa-regular fa-copy"></i> COPY';
        copyFeedback.style.background = '';
        copyFeedback.style.color = '';
        copyFeedback.style.borderColor = '';
      }, 2500);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
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
