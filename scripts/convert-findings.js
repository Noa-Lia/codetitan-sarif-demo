const path = require('path');
const fs = require('fs');

// Usage: node convert-findings.js <inputDir> <outputDir>
const inputDir = process.argv[2];
const outputDir = process.argv[3];

if (!inputDir || !outputDir) {
  console.error('Usage: node convert-findings.js <inputDir> <outputDir>');
  process.exit(1);
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const srcPath = path.join(inputDir, file);
  const destPath = path.join(outputDir, file.replace('.json', '-converted.json'));

  const raw = fs.readFileSync(srcPath, 'utf8');
  const findings = JSON.parse(raw);

  const converted = findings.map(f => ({
    id: f.id,
    severity: f.impact >= 0.7 ? 'high' : f.impact >= 0.4 ? 'medium' : 'low',
    title: f.title,
    description: f.desc,
  }));

  fs.writeFileSync(destPath, JSON.stringify(converted, null, 2));
  console.log(`Converted ${file} -> ${path.basename(destPath)}`);
});
