# Curso Vibe Coding — Web de apuntes

Sitio de apuntes y recursos del curso **Vibe Coding para Docentes**.
Incluye:
- Documentación en Markdown con Docusaurus.
- PDF descargable generado desde los apuntes.
- Presentación Reveal.js publicada como página estática.

Repositorio: `https://github.com/bealopc/cursovibecoding`

## Requisitos

- Node.js >= 20
- npm
- Python 3
- ReportLab (`pip install reportlab`)

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm start
```

## Generar PDF

```bash
npm run generate-pdf
```

Salida: `static/pdf/apuntes.pdf`

Alternativa:

```bash
npm run build:pdf
```

## Build

```bash
npm run build
```

## Despliegue en GitHub Pages

```bash
$env:GIT_USER="bealopc"
npm run deploy
```

Esto publica en el branch `gh-pages`.

## Estructura clave

- `docs/apuntes.md` contenido principal en Markdown
- `static/pdf/apuntes.pdf` PDF descargable
- `static/reveal/index.html` presentación Reveal.js
- `scripts/generate-pdf.js` script de generación de PDF
