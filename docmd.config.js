// docmd.config.js: Configuration for the vctx documentation site
module.exports = {
  // --- Core Identity ---
  siteTitle: 'vctx',
  siteUrl: 'https://vctx.org', // Replace with your actual URL

  // --- Visuals ---
  logo: {
    text: 'vctx', // Text fallback if images aren't ready
    // light: '/assets/images/vctx-logo-light.png', 
    // dark: '/assets/images/vctx-logo-dark.png',   
    alt: 'vctx logo',
    href: '/',
  },

  favicon: '/assets/favicon.ico',

  // --- Directories ---
  srcDir: 'docs',       
  outputDir: 'site',    

  // --- Theme ---
  theme: {
    name: 'dark',      
    defaultMode: 'dark',
    enableModeToggle: true,
    codeHighlight: true,    
  },

  // --- Navigation Structure ---
  navigation: [
    // 1. HOME (Landing Page)
    // Maps to docs/index.md
    { 
      title: 'Home', 
      path: '/', 
      icon: 'home' 
    },

    // 2. DOCS (The Handbook)
    // A collapsible container for your long-form technical guides
    { 
      title: 'Docs', 
      path: '#', // Makes this a dropdown folder
      icon: 'book-open',
      collapsible: true,
      children: [
        { title: 'Getting Started', path: '/getting-started', icon: 'rocket' },
        { title: 'Language Manual', path: '/manual', icon: 'code-2' },
        { title: 'Tooling & Workflow', path: '/tooling', icon: 'terminal' },
      ]
    },

    // 3. SHOWCASE
    // Maps to docs/showcase.md
    { 
      title: 'Showcase', 
      path: '/showcase', 
      icon: 'monitor' 
    },

    // 4. COMMUNITY
    // Maps to docs/community.md
    { 
      title: 'Community', 
      path: '/community', 
      icon: 'heart' 
    },

    // 5. GITHUB
    { 
      title: 'GitHub', 
      path: 'https://github.com/your-org/vctx', 
      icon: 'github', 
      external: true 
    },
  ],

  // --- Sidebar Settings ---
  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },

  // --- Plugins ---
  plugins: {
    seo: {
      defaultDescription: 'vctx is a structural hardware description language designed for hobbyists. Beginner-friendly, explicitly timed, and built for fun FPGA design.',
      openGraph: {
        siteName: 'vctx Documentation',
        defaultImage: '/assets/images/vctx-preview.png',
      },
      twitter: {
        cardType: 'summary_large_image',
      }
    },
    sitemap: {
      defaultChangefreq: 'weekly',
      defaultPriority: 0.8
    }
  },

  // --- Page Features ---
  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/your-org/vctx/edit/main/docs',
    text: 'Edit this page on GitHub'
  },
  
  autoTitleFromH1: true,
  copyCode: true,
  search: true,
  pageNavigation: true, // "Next/Prev" buttons at bottom of pages

  // --- Footer ---
  footer: '© ' + new Date().getFullYear() + ' vctx Project. Built for hardware hobbyists.',
};