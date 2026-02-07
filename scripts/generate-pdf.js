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

// Create output directory
fs.mkdirSync(outputDir, { recursive: true });

// Create temporary markdown file for Python to process
const tempMd = path.join(outputDir, 'temp_apuntes.md');
fs.writeFileSync(tempMd, content, 'utf8');

// Call Python script to generate PDF
const python = spawn('python3', [pythonScript, tempMd, output]);

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
