const fs = require('fs');
const path = require('path');

// Simple build script without npm/node dependency
console.log('🚀 Starting build process...');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy static files
const staticFiles = ['index.html', 'public', 'favicon.ico'];
staticFiles.forEach(file => {
  const source = path.join(__dirname, file);
  const dest = path.join(__dirname, 'dist', file);
  
  if (fs.existsSync(source)) {
    console.log(`📁 Copying ${file}...`);
    if (fs.statSync(source).isDirectory()) {
      copyDir(source, dest);
    } else {
      fs.copyFileSync(source, dest);
    }
  }
});

// Copy source files
const srcDir = path.join(__dirname, 'src');
const distSrcDir = path.join(__dirname, 'dist', 'src');
if (fs.existsSync(srcDir)) {
  copyDir(srcDir, distSrcDir);
}

// Create package.json for dist
const packageJson = {
  name: 'la-fabuleuse-tg',
  version: '1.0.0',
  type: 'module',
  scripts: {
    start: 'node index.js'
  }
};

fs.writeFileSync(
  path.join(__dirname, 'dist', 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

console.log('✅ Build completed successfully!');
console.log('📂 Dist directory is ready for deployment');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
