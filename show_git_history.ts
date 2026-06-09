import { execSync } from 'child_process';

try {
  console.log('--- GIT STATUS ---');
  console.log(execSync('git status', { encoding: 'utf8' }));
  
  console.log('--- GIT RECENT COMMITS ---');
  console.log(execSync('git log -n 5 --oneline', { encoding: 'utf8' }));
  
  console.log('--- GIT DIFF HISTORIC ---');
  // Let's show difference of src/data.ts from the initial commit
  console.log(execSync('git log -p -n 2 src/data.ts', { encoding: 'utf8' }).slice(0, 5000));
} catch (err: any) {
  console.error(`Error: ${err.message}`);
}
