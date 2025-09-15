@echo off
title EnergizeAI Dashboard Server
color 0A
echo.
echo ========================================
echo    EnergizeAI Dashboard Starting...
echo ========================================
echo.
echo Starting local server on port 8080...
echo Dashboard will open automatically in your browser
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "C:\Users\banda\Desktop\EnergizeAI-Dashboard"

REM Start the Python HTTP server
start "" "http://localhost:8080"
python -m http.server 8080

pause
