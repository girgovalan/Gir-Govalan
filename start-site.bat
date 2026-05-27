@echo off
cd /d "%~dp0"
echo.
echo  Gir Govalan - Local Website Server
echo  ===================================
echo.
echo  Starting server...
echo.
echo  On THIS computer open:
echo    http://localhost:8000
echo    http://localhost:8000/pages/who-is-gir-govalan/
echo    http://localhost:8000/blogs/news/
echo.
echo  On phone/tablet (same WiFi) open:
echo    http://192.168.31.91:8000
echo.
echo  Press Ctrl+C to stop the server.
echo.
npx --yes http-server -p 8000 -a 0.0.0.0 -c-1
pause
