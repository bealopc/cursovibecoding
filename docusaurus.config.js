// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Curso Vibe Coding',
  tagline: 'VS Code + GitHub + IA',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://bealopc.github.io',
  baseUrl: '/cursovibecoding/',

  organizationName: 'bealopc',
  projectName: 'cursovibecoding',

  onBrokenLinks: 'ignore',
  trailingSlash: true,
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'ignore',
    },
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/bealopc/cursovibecoding',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Curso Vibe Coding',
        logo: {
          alt: 'Curso Vibe Coding',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Apuntes',
          },
          {href: 'https://bealopc.github.io/cursovibecoding/reveal/index.html', label: 'Presentacion', position: 'left'},
          {href: 'https://bealopc.github.io/cursovibecoding/pdf/apuntes.pdf', label: 'PDF', position: 'left'},
          {
            href: 'https://github.com/bealopc/cursovibecoding',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contenido',
            items: [
              {
                label: 'Apuntes',
                to: '/docs/apuntes',
              },
            ],
          },
          {
            title: 'Recursos',
            items: [
              {
                label: 'Presentacion',
                href: 'https://bealopc.github.io/cursovibecoding/reveal/index.html',
              },
              {
                label: 'PDF',
                href: 'https://bealopc.github.io/cursovibecoding/pdf/apuntes.pdf',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/bealopc/cursovibecoding',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Curso Vibe Coding. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
