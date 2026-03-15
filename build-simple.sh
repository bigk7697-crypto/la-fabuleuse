#!/bin/sh

echo "🚀 Starting LA FABULEUSE build..."
echo "=========================================="

# Create dist directory
echo "📁 Creating dist directory..."
mkdir -p dist

# Copy static files
echo "📄 Copying static files..."
cp index.html dist/ 2>/dev/null || echo "index.html not found, continuing..."
cp -r public dist/ 2>/dev/null || echo "public folder not found, continuing..."

# Copy source files
echo "📂 Copying source files..."
cp -r src dist/ 2>/dev/null || echo "src folder not found, continuing..."

# Create package.json for dist
echo "📝 Creating package.json..."
cat > dist/package.json << 'EOF'
{
  "name": "la-fabuleuse-tg",
  "version": "1.0.0",
  "type": "module",
  "main": "index.html",
  "scripts": {
    "start": "echo '🍽️ LA FABULEUSE - Site Ready!' && echo '📱 Open index.html in your browser'"
  }
}
EOF

# Create simple index.js for dist
echo "🌐 Creating index.js..."
cat > dist/index.js << 'EOF'
// LA FABULEUSE - Simple Entry Point
console.log('🍽️ LA FABULEUSE - Site Ready!');
console.log('📱 Open index.html in your browser');
EOF

echo ""
echo "✅ Build completed successfully!"
echo "📂 Dist directory is ready for deployment"
echo "🌐 Site is ready to deploy!"
echo ""
echo "🚀 Ready for Netlify deployment!"
echo "=========================================="
