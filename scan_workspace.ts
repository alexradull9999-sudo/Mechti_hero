import fs from 'fs';
import path from 'path';

function scanDir(dir: string, depth = 0) {
  if (depth > 4) return;
  const indent = ' '.repeat(depth * 2);
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        console.log(`${indent}[DIR] ${entry.name}`);
        scanDir(fullPath, depth + 1);
      } else {
        const stats = fs.statSync(fullPath);
        console.log(`${indent}[FILE] ${entry.name} (${stats.size} bytes)`);
      }
    }
  } catch (err: any) {
    console.error(`Error scanning ${dir}: ${err.message}`);
  }
}

console.log('Scanning current directory recursively for files:');
scanDir('.');
