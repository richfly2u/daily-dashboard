@echo off
chcp 65001 >nul
echo 📋 每日行動儀表板 - 手機連線
echo ================================
echo.

REM Get local IP
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do set ip=%%a
set ip=%ip: =%
echo 🖥️  電腦 IP: %ip%
echo.
echo 📱 手機操作（同一個 WiFi）:
echo    1. 手機連同一個 WiFi
echo    2. 打開瀏覽器輸入 http://%ip%:8765
echo    3. 也可安裝到手機桌面（Safari/Chrome 選「加入主畫面」）
echo.
echo ❌ 關閉此視窗 = 停止伺服器
echo ================================
echo.

python -m http.server 8765 --bind 0.0.0.0 -d "C:\Users\alan\Desktop\daily_dashboard"
pause
