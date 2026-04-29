// git_push.mjs
// Ejecutar con: node git_push.mjs
// Hace add + commit + push de todos los cambios pendientes del FlowAPP

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  try {
    const out = execSync(cmd, { cwd: __dirname, encoding: 'utf8' });
    if (out.trim()) console.log(out.trim());
  } catch (e) {
    console.error(e.stdout || e.message);
    process.exit(1);
  }
}

const msg = process.argv[2] || 'fix: link cliente + vercelignore + ig-oauth + email modal + barcelonasail posts';

console.log('🚀 Subiendo cambios a GitHub...\n');

run('git status');
run('git add -A');
run(`git commit -m "${msg}"`);
run('git push');

console.log('\n✅ Push completado. Vercel desplegará automáticamente en ~1 min.');
console.log('🔗 https://contentflow-4wos.vercel.app');
