// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://hmatt1.github.io/",
	base: "/vctx-docs/",
	integrations: [
		starlight({
			title: 'vctx',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/hmatt1/vctx-lang' }],
			sidebar: [
				{
					label: 'Welcome',
					items: [
						{ label: 'Getting Started', slug: 'getting-started' },
						{label: '1', slug: '1'},
						{label: '1', slug: '1'},
						{label: '1', slug: '1'}
					],
				},
				{
					label: 'Language Reference',
					items: [
						{ label: '1', slug: '1' },
						{label: '1', slug: '1'},
						{label: '1', slug: '1'},
						{label: '1', slug: '1'}
					],
				},
				{
					label: 'Tooling',
					items: [
						{ label: '1', slug: '1' },
						{label: '1', slug: '1'},
						{label: '1', slug: '1'},
						{label: '1', slug: '1'}
					],
				},
				{
					label: 'Showcase',
					items: [
						{ label: '1', slug: '1' },
						{label: '1', slug: '1'},
						{label: '1', slug: '1'},
						{label: '1', slug: '1'}
					],
				},
			],
		}),
	],
});
