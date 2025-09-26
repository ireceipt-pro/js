#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function fixEsmImports(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = join(dir, file.name);
    
    if (file.isDirectory()) {
      await fixEsmImports(filePath);
    } else if (file.name.endsWith('.js')) {
      let content = await readFile(filePath, 'utf-8');
      
      // Fix relative imports to include .js extension
      content = content.replace(
        /from\s+['"](\.[^'"]*?)['"];/g, 
        (match, path) => {
          if (path.endsWith('.js')) return match;
          return `from '${path}.js';`;
        }
      );
      
      content = content.replace(
        /import\s*\(\s*['"](\.[^'"]*?)['"]\s*\)/g,
        (match, path) => {
          if (path.endsWith('.js')) return match;
          return `import('${path}.js')`;
        }
      );
      
      await writeFile(filePath, content);
    }
  }
}

fixEsmImports(process.argv[2] || './dist/esm').catch((err) => {
  console.error('Error fixing ESM imports:', err);
  process.exit(1);
});