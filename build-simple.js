// Simple build script without dependencies
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting LA FABULEUSE build...');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy static files
const staticFiles = ['index.html', 'public'];
staticFiles.forEach(file => {
  const source = path.join(__dirname, file);
  const dest = path.join(__dirname, 'dist', file);
  
  if (fs.existsSync(source)) {
    console.log(`📁 Copying ${file}...`);
    copyRecursive(source, dest);
  }
});

// Copy source files
const srcDir = path.join(__dirname, 'src');
const distSrcDir = path.join(__dirname, 'dist', 'src');
if (fs.existsSync(srcDir)) {
  console.log('📂 Copying src files...');
  copyRecursive(srcDir, distSrcDir);
}

// Create package.json for dist
const packageJson = {
  name: 'la-fabuleuse-tg',
  version: '1.0.0',
  type: 'module',
  main: 'index.js',
  scripts: {
    start: 'node index.js'
  }
};

fs.writeFileSync(
  path.join(__dirname, 'dist', 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Create simple index.js for dist
const indexJs = `
// LA FABULEUSE - Simple Entry Point
console.log('🍽️ LA FABULEUSE - Site Ready!');
console.log('📱 Open index.html in your browser');
`;

fs.writeFileSync(
  path.join(__dirname, 'dist', 'index.js'),
  indexJs.trim()
);

console.log('✅ Build completed successfully!');
console.log('📂 Dist directory ready for deployment');
console.log('🌐 Site is ready to deploy!');

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
