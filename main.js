/**
 * Gorka Setien Portfolio - Interactive Logic
 * Focused, Clean & Refined Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initBackgroundCanvas();
  initTerminal();
  initCopyEmail();
  initMobileNav();
});

/* ==========================================================================
   01. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    'LLMs & Spec-Driven Development (OpenSpec)',
    'Unity VR & Pico XR Enterprise Architect',
    'Autonomous AI Agents & MCP Tooling',
    'Computer Science Engineer @ Innovae Group'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 65;
  const deleteSpeed = 30;
  const pauseEnd = 2400;

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
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, deleteSpeed);
    }
  }

  type();
}

/* ==========================================================================
   02. CALM AMBIENT BACKGROUND CANVAS
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
    createNodes();
  });

  const mouse = { x: null, y: null };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  let nodes = [];
  const densityDivisor = 24000; // Calmer, fewer nodes

  function createNodes() {
    nodes = [];
    const count = Math.floor((width * height) / densityDivisor);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 0.5
      });
    }
  }

  createNodes();

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];

      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0) n.x = width;
      if (n.x > width) n.x = 0;
      if (n.y < 0) n.y = height;
      if (n.y > height) n.y = 0;

      // Draw subtle particle node
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.22)';
      ctx.fill();

      // Connect neighbor nodes with very light lines
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 105) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.07 * (1 - dist / 105)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Very subtle mouse proximity
      if (mouse.x !== null) {
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 100) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - mdist / 100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   03. INTERACTIVE COMMAND TERMINAL
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalWrapper = document.getElementById('terminal-wrapper');
  const toggleBtn = document.getElementById('terminal-toggle-btn');
  const toggleIcon = document.getElementById('terminal-toggle-icon');
  const toggleText = document.getElementById('terminal-toggle-text');
  const shortcutButtons = document.querySelectorAll('.terminal-cmd-pill');

  if (!terminalInput || !terminalHistory) return;

  const commandList = {
    help: () => `
<span class="text-cyan">Available commands:</span>
  <span class="text-amber">ai</span>          - AI protocols, LLMs &amp; Spec-Driven Dev
  <span class="text-amber">about</span>       - Profile overview &amp; engineering background
  <span class="text-amber">stack</span>       - Technical arsenal &amp; core frameworks
  <span class="text-amber">experience</span>  - Operational history at Innovae Group &amp; credentials
  <span class="text-amber">contact</span>     - Direct communication channels
  <span class="text-amber">partner</span>     - Agumon Hakase companion info
  <span class="text-amber">clear</span>       - Clear terminal history
  <span class="text-amber">whoami</span>      - Session info
  <span class="text-amber">date</span>        - Current UTC timestamp
`,
    ai: () => `
<span class="text-cyan">[AI PROTOCOLS &amp; SPEC-DRIVEN DEVELOPMENT]</span>
• <strong class="text-main">Spec-Driven Development (OpenSpec):</strong> Formal specifications as canonical blueprints for deterministic code generation.
• <strong class="text-main">Autonomous Multi-Agent Systems:</strong> Hierarchical agent pipelines (spec architect, executor, tester, auditor).
• <strong class="text-main">Model Context Protocol (MCP):</strong> Custom MCP servers interfacing LLMs with local IDEs, Unity profiling tools, and testing APIs.
• <strong class="text-main">Context Engineering:</strong> Strict context window budgeting, structured prompts, and hallucination reduction.
`,
    about: () => `
<span class="text-cyan">[ENGINEERING PROFILE]</span>
Gorka Setien: Computer Science Engineer specializing at the convergence of
Applied Artificial Intelligence (LLMs, SDD with OpenSpec, autonomous agents) and spatial
computing (Unity VR, Netcode, DOTS) at Innovae Group.
`,
    stack: () => `
<span class="text-cyan">[TECHNICAL ARSENAL]</span>
• <strong class="text-cyan">AI &amp; Neural:</strong> LLMs, Spec-Driven Development (OpenSpec / SDD), Autonomous Agents, MCP, Context Engineering
• <strong class="text-magenta">XR / Engines:</strong> Unity 3D, Pico XR Enterprise SDK (Pico 3, 4, 4 Ultra, Space Pro), OpenXR, XR Interaction Toolkit
• <strong class="text-amber">Languages:</strong> C# (.NET), Python, Dart &amp; Flutter, Android Native
• <strong class="text-main">Architecture:</strong> Unity NGO (Netcode), Photon Engine, Unity DOTS / ECS
`,
    experience: () => `
<span class="text-cyan">[EXPERIENCE &amp; CREDENTIALS]</span>
• <strong>Innovae Group</strong> // Virtual Reality &amp; Software Developer (Present)
  Engineering industrial VR simulations in Unity 3D for Pico XR Enterprise headsets with SDD workflows.
• <strong>B.S. in Computer Science &amp; Engineering</strong> // Software Engineering Alumni.
`,
    contact: () => `
<span class="text-cyan">[COMMUNICATION CHANNELS]</span>
• LinkedIn: <a href="https://www.linkedin.com/in/gorka-setien/" target="_blank" class="text-amber">linkedin.com/in/gorka-setien</a>
• GitHub:   <a href="https://github.com/gorkaseto" target="_blank" class="text-amber">github.com/gorkaseto</a>
• Email:    <a href="mailto:gorka.seto@gmail.com" class="text-amber">gorka.seto@gmail.com</a>
`,
    partner: () => `
<span class="text-cyan">[PARTNER: AGUMON HAKASE]</span>
Digital partner, research specialist, and curious tech enthusiast.
`,
    whoami: () => `<span class="text-muted">guest@gorkaseto · Secure Portfolio Visitor</span>`,
    date: () => `<span class="text-cyan">${new Date().toUTCString()}</span>`
  };

  function executeCommand(rawInput) {
    const command = rawInput.trim().toLowerCase();
    if (!command) return;

    // Add user line to history
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="terminal-user">guest@gorkaseto:~$</span> <span>${escapeHtml(rawInput)}</span>`;
    terminalHistory.appendChild(userLine);

    // Handle Clear
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
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  // Shortcut Pills Click Handlers
  shortcutButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        // If terminal is collapsed, expand it
        if (terminalWrapper && terminalWrapper.classList.contains('collapsed')) {
          toggleTerminal();
        }
        executeCommand(cmd);
      }
    });
  });

  // Toggle Collapse / Expand
  function toggleTerminal() {
    if (!terminalWrapper) return;
    const isCollapsed = terminalWrapper.classList.toggle('collapsed');
    if (toggleIcon && toggleText) {
      if (isCollapsed) {
        toggleIcon.className = 'fa-solid fa-chevron-down';
        toggleText.textContent = 'Expand';
      } else {
        toggleIcon.className = 'fa-solid fa-chevron-up';
        toggleText.textContent = 'Collapse';
      }
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTerminal();
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

/* ==========================================================================
   04. COPY EMAIL TO CLIPBOARD
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

      copyFeedback.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      copyFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
      copyFeedback.style.color = '#10b981';
      copyFeedback.style.borderColor = 'rgba(16, 185, 129, 0.3)';

      setTimeout(() => {
        copyFeedback.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
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
   05. MOBILE NAVIGATION DRAWER
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
