// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import vctxLang from './syntax/vctx.tmLanguage.json';
import larkLang from './syntax/lark.tmLanguage.json';

import { sidebar } from './sidebar.mjs';

// https://astro.build/config
export default defineConfig({
    site: "https://hmatt1.github.io/",
    base: "/vctx-docs/",
    integrations: [
        starlight({
            title: 'vctx',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/hmatt1/vctx-lang' }],
            expressiveCode:{
                shiki: {
                    langs: [vctxLang, larkLang],
                    
                    // Allow using the alias 'mjs' for the 'javascript' language
                    langAlias: {
                        mjs: 'javascript',
                    }
                }
            },
            components: {
                // This tells Starlight to use your file instead of the default Hero
                Hero: './src/components/hero.astro',
                Footer: './src/components/Footer.astro',
            },
            sidebar: sidebar
        }),
    ],
});