const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const input = path.join(__dirname, '..', 'docs', 'apuntes.md');
const outputDir = path.join(__dirname, '..', 'static', 'pdf');
const output = path.join(outputDir, 'apuntes.pdf');
const pythonScript = path.join(__dirname, 'md-to-pdf.py');

// Read and process markdown
const md = fs.readFileSync(input, 'utf8');

// Strip frontmatter
let content = md.replace(/^---[\s\S]*?---\s*/m, '');

// Remove Docusaurus admonitions like :::tip ... :::
content = content.replace(/:::[\s\S]*?:::/g, '');

// Remove custom index HTML block
const lines = content.split(/\r?\n/);
const cleaned = [];
let skipping = false;
let depth = 0;
for (const line of lines) {
  if (!skipping && line.includes('<div className="custom-index">')) {
    skipping = true;
    depth = 0;
  }
  if (skipping) {
    if (line.includes('<div')) depth += 1;
    if (line.includes('</div>')) depth -= 1;
    if (skipping && depth <= 0 && line.includes('</div>')) {
      skipping = false;
    }
    continue;
  }
  cleaned.push(line);
}
content = cleaned.join('\n');

// Remove heading IDs like {#id} anywhere
content = content.replace(/\s*\\{#[^}]+\\}/g, '');

// Create output directory
fs.mkdirSync(outputDir, { recursive: true });

// Create temporary markdown file for Python to process
const tempMd = path.join(outputDir, 'temp_apuntes.md');
fs.writeFileSync(tempMd, content, 'utf8');

// Call Python script to generate PDF
const isWindows = process.platform === 'win32';
const pythonCmd = isWindows ? 'py' : 'python3';
const pythonArgs = isWindows ? ['-3', pythonScript, tempMd, output] : [pythonScript, tempMd, output];
const python = spawn(pythonCmd, pythonArgs);

python.stdout.on('data', (data) => {
  console.log(data.toString());
});

python.stderr.on('data', (data) => {
  console.error(data.toString());
});

python.on('close', (code) => {
  // Clean up temp file
  if (fs.existsSync(tempMd)) {
    fs.unlinkSync(tempMd);
  }
  
  if (code === 0) {
    console.log(`✓ PDF generado exitosamente: ${output}`);
  } else {
    console.error(`✗ Error al generar PDF (código ${code})`);
    process.exit(code);
  }
});
