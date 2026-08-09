const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const contentDir = path.join(__dirname, 'lib', 'content');
const appDir = path.join(__dirname, 'app');
const componentsDir = path.join(__dirname, 'components');
const files = [...walk(contentDir), ...walk(appDir), ...walk(componentsDir)];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('https://getfuntools.app')) {
    const newContent = content.replace(/https:\/\/getfuntools\.app/g, 'https://www.getfuntools.app');
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
console.log('Finished updating content files.');
