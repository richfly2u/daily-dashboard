@echo off
chcp 65001 >nul
title 每日行動儀表板

echo 📋 每日行動儀表板 - 完整啟動
echo ================================
echo.

REM Get local IP
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do set ip=%%a
set ip=%ip: =%
echo 🖥️  後端: http://%ip%:5000
echo 🖥️  前端: http://%ip%:8765
echo 📱  手機: http://%ip%:8765
echo.
echo 🔥 啟動中...

REM Start backend
start /B "" "C:\Users\alan\AppData\Local\Programs\Python\Python313\python.exe" -m flask run --host=0.0.0.0 --port=5000
cd /d "C:\Users\alan\Desktop\daily_dashboard"

REM Start frontend
start /B "" "C:\Users\alan\AppData\Local\Programs\Python\Python313\python.exe" -m http.server 8765 --bind 0.0.0.0

echo ✅ 已啟動！
echo.
echo 瀏覽器開啟 http://localhost:8765
echo 手機連同WiFi後開啟 http://%ip%:8765
echo.
echo ❌ 關閉此視窗 = 停止所有服務
echo ================================
pause
