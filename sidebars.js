// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'apuntes',
      label: 'Índice',
    },
    {
      type: 'link',
      label: 'Bloque 1: Licencia educativa GitHub',
      href: '/docs/apuntes#bloque-1',
    },
    {
      type: 'link',
      label: 'Bloque 2: Diferencia entre GitHub y VS Code',
      href: '/docs/apuntes#bloque-2',
    },
    {
      type: 'link',
      label: 'Bloque 3: Instalación y configuración de VS Code (Windows)',
      href: '/docs/apuntes#bloque-3',
    },
    {
      type: 'link',
      label: 'Bloque 4: Copilot/Chat en VS Code y sincronización con GitHub',
      href: '/docs/apuntes#bloque-4',
    },
    {
      type: 'link',
      label: 'Bloque 5: Estructura de trabajo con carpetas y Markdown',
      href: '/docs/apuntes#bloque-5',
    },
    {
      type: 'link',
      label: 'Bloque 6: Instrucciones/Agentes',
      href: '/docs/apuntes#bloque-6',
    },
    {
      type: 'link',
      label: 'Bloque 7: Estrategia de prompting aplicada a educación',
      href: '/docs/apuntes#bloque-7',
    },
    {
      type: 'link',
      label: 'Bloque 8: Legislación educativa',
      href: '/docs/apuntes#bloque-8',
    },
    {
      type: 'link',
      label: 'Bloque 9: Generación de apuntes y recursos',
      href: '/docs/apuntes#bloque-9',
    },
    {
      type: 'link',
      label: 'Bloque 10: Reutilización del contenido en múltiples formatos',
      href: '/docs/apuntes#bloque-10',
    },
    {
      type: 'link',
      label: 'Bloque 11: Web de apuntes con Docusaurus',
      href: '/docs/apuntes#bloque-11',
    },
    {
      type: 'link',
      label: 'Bloque 12: Presentaciones',
      href: '/docs/apuntes#bloque-12',
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
