@echo off
echo 🚀 Starting LA FABULEUSE build...
echo.

REM Create dist directory
if not exist "dist" mkdir "dist"

REM Copy static files
echo 📁 Copying static files...
xcopy "index.html" "dist\" /E /I /Y
xcopy "public" "dist\" /E /I /Y

REM Copy source files
echo 📂 Copying source files...
xcopy "src" "dist\src\" /E /I /Y

REM Create package.json for dist
echo 📝 Creating package.json...
echo { > "dist\package.json"
echo   "name": "la-fabuleuse-tg", >> "dist\package.json"
echo   "version": "1.0.0", >> "dist\package.json"
echo   "type": "module", >> "dist\package.json"
echo   "main": "index.js" >> "dist\package.json"
echo   "scripts": { >> "dist\package.json"
echo     "start": "node index.js" >> "dist\package.json"
echo   } >> "dist\package.json"
echo } >> "dist\package.json"

REM Create simple index.js for dist
echo 🌐 Creating index.js...
echo // LA FABULEUSE - Simple Entry Point > "dist\index.js"
echo console.log('🍽️ LA FABULEUSE - Site Ready!'); >> "dist\index.js"
echo console.log('📱 Open index.html in your browser'); >> "dist\index.js"

echo.
echo ✅ Build completed successfully!
echo 📂 Dist directory is ready for deployment
echo 🌐 Site is ready to deploy!
echo.
pause
