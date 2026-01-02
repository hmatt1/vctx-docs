---
title: "vctx - Hardware for Humans"
description: "A hardware description language built with CIRCT."
noStyle: true
components:
  meta: true
  favicon: true
  css: false
  theme: false
  themeMode: true
  scripts: false
  mainScripts: false
  lightbox: false
seo:
  ldJson:
    "@context": "https://schema.org"
    "@type": "SoftwareApplication"
    name: "vctx"
    operatingSystem: "Any"
    applicationCategory: "DeveloperApplication"
    url: "https://hmatt1.github.io/vctx-docs/"
    description: "vctx is a structural hardware description language designed for hobbyists."
    creator:
      "@type": "Organization"
      name: "vctx Project"
    programmingLanguage: "vctx"
customHead: |
  <link rel="stylesheet" href="/assets/css/welcome.css">
  
  <script type="module">
      // 1. Import only what modern-monaco exports

      const code = [
        '// Define a hardware component with an output port',
        'component Blinky(output led: u1) {',
        '',
        '    // "=" is for Declarations',
        '    // 27-bit flip-flop initialized to 0',
        '    reg counter: u27 = 0',
        '',
        '    // "<=" is for Sequential Assignment',
        '    // Increment counter on every clock cycle',
        '    counter <= counter + 1',
        '',
        '    // ":=" is for Combinational Assignment',
        '    // Wire the 24th bit to led',
        '    led := counter[24]',
        '}'
      ].join('\n');

        import { codeToHtml, createHighlighter } from 'https://esm.sh/shiki@3.0.0'

        const grammar = await fetch('/vctx-docs/assets/vctx.tmLanguage.json').then(res => res.text());

        console.log("grammar", grammar)

        const vctxLang = JSON.parse(grammar, 'utf8')

        const highlighter = await createHighlighter({
          langs: [vctxLang],
          themes: ['vitesse-dark']
        })

        const innerText = await codeToHtml(code, {
          lang: vctxLang,
          theme: 'vitesse-dark'
        })
      
        document.getElementById("editor-inside").innerHTML = innerText;

    </script>


  <script>
    // --- UI Logic ---
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // Update DOM
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('docmd-theme', newTheme);

    }
    
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        const button = event.target.closest('.copy-button');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"></polyline></svg>';
        button.style.color = '#10b981';
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.color = '';
        }, 2000);
      });
    }
  </script>
  
  <style>
    /* Styling to make the editor container look like a window */
    .editor-window {
      width: 100%;
      height: 400px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid var(--border-color, #334155);
      background-color: var(--bg-color, #1e1e1e);
      display: flex;
      flex-direction: column;
    }
    
    .editor-titlebar {
      height: 36px;
      background-color: rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      padding: 0 12px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      flex-shrink: 0;
    }
    
    .window-dots {
      display: flex;
      gap: 6px;
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot.red { background-color: #ef4444; }
    .dot.yellow { background-color: #f59e0b; }
    .dot.green { background-color: #10b981; }
    
    .filename {
      margin-left: 16px;
      font-size: 12px;
      opacity: 0.6;
      font-family: monospace;
    }

    #editor {
      display: block;
      flex-grow: 1;
      width: 100%;
      height: 100%;
      padding: 10px;
    }

  </style>
---

<div class="header-top">
  <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark/light mode">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon-icon lucide-sun-moon"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>
  </button>
</div>

<div class="landing-container">
  <div class="content-side">
    <div class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu-icon lucide-cpu"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
      <span class="logo-text">vctx</span>
    </div>

    <h1>Experimental HDL</h1>

    <p class="tagline">
      A hardware description language built with CIRCT.
    </p>
    
    <div class="features">
      <div class="feature">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="feature-text">
          <strong>Type Checking</strong>
          Strict typing for registers, wires, and widths
        </div>
      </div>

      <div class="feature">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box-select-icon lucide-box-select"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/></svg>
        </div>
        <div class="feature-text">
          <strong>LSP Server</strong>
          VS Code Language Extension
        </div>
      </div>

      <div class="feature">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check-icon lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div class="feature-text">
          <strong>Verification</strong>
          `sim` and `formal` blocks for testing
        </div>
      </div>

      <div class="feature">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap-icon lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div class="feature-text">
          <strong>Incremental Compilation</strong>
            Compile only code you changed (rest is cached)
        </div>
      </div>
    </div>

    <div class="install-section">
      <div class="install-code">
        <pre><code>vctx-cli --help</code></pre>
        <button class="copy-button" onclick="copyToClipboard('vctx-cli --help')" aria-label="Copy vctx help command">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="buttons">
      <a href="/getting-started/" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket-icon lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
        Get Started
      </a>
      <a href="https://github.com/hmatt1/vctx-lang" target="_blank" rel="noopener" class="btn btn-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        GitHub
      </a>
    </div>
  </div>
  
  <div class="preview-side">
    <div class="editor-window">
      <div class="editor-titlebar">
        <div class="window-dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <div class="filename">blinky.vctx</div>
      </div>
      <div id="editor">
        <div id="editor-inside">
        </div>
      </div>
    </div>
  </div>
</div>