const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const input = path.join(__dirname, '..', 'docs', 'apuntes.md');
const outputDir = path.join(__dirname, '..', 'static', 'pdf');
const output = path.join(outputDir, 'apuntes.pdf');

const md = fs.readFileSync(input, 'utf8');

// Strip frontmatter
const content = md.replace(/^---[\s\S]*?---\s*/m, '');

function mdToText(s) {
  return s
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, '• ')
    .replace(/\|/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n');
}

const text = mdToText(content);

fs.mkdirSync(outputDir, { recursive: true });

const doc = new PDFDocument({
  size: 'A4',
  margin: 50
});

doc.info.Title = 'Apuntes Vibe Coding';

const stream = fs.createWriteStream(output);
doc.pipe(stream);

// Title
const lines = text.split('\n');
const title = lines.shift() || 'Apuntes Vibe Coding';

doc.fontSize(20).text(title, { align: 'center' });
doc.moveDown();

doc.fontSize(11).text(lines.join('\n'));

doc.end();

stream.on('finish', () => {
  console.log(output);
});
