# 📋 每日行動儀表板 — Daily Action Dashboard

一個個人化的每日習慣/行動檢查儀表板，支援 **Firebase 雲端同步**、**連續天數計算**、**90 天熱力圖**，以及每日輪流「成全對象」姓名選取。

> 🔗 線上使用：https://richfly2u.github.io/daily-dashboard/

---

## ✨ 功能特色

### ✅ 每日待辦清單
- 預設 10 個習慣項目（9 個每日行動 + 1 個「今天成全了誰？」姓名選取）
- 點擊方塊或文字切換完成狀態
- 已完成項目自動灰階 + 刪除線
- 可自由新增、編輯、刪除自訂項目

### 🔒 鎖定 / 編輯模式
- 每個項目可個別鎖定（🔒）或解鎖（🔓），防止誤編輯
- 編輯模式（✏️）下鎖定按鈕與備註按鈕模糊不可操作，確保資料安全
- 編輯模式切為 ✅ 完成編輯後恢復正常操作

### 📝 備註功能
- 每個項目可添加備註（📝）
- 備註區域顯示前 2 天的歷史記錄
- 第一項「早起喝水」為簡潔設計，無備註按鈕

### 📊 進度追蹤
- 已完成 / 總項目 / 完成率 三項統計
- 進度條即時反映當日完成比例
- **連續天數徽章**（🔥）— 連續完整完成所有項目的天數

### 📅 日期瀏覽
- 可瀏覽過去和未來日期的清單
- 「今天」按鈕一鍵跳回當日

### 👤 姓名管理
- 每日自動輪流選取一位人員（「今天成全了誰？」）
- 以 `2024-01-01` 為基準，循環選取名單中的人
- 可透過「名單管理」對話框新增、編輯、刪除姓名
- 預設含 20 個團隊人員姓名

### 🔥 熱力圖 (90 天)
- 6 級完成度視覺化（0% → 100%）
- 今日突出標示
- 滑鼠懸停顯示日期與完成比例

### ☁️ Firebase 雲端同步
- 輸入相同儀表板名稱即可跨裝置同步
- 離開頁面自動儲存
- 連線狀態指示燈（🟢 上線 / 🟡 離線）
- 零後端架構，直接讀寫 Firestore

### 📱 PWA 支援
- 可安裝至手機主畫面（Android / iOS / Desktop）
- 離線使用，上線後自動同步
- Service Worker 快取支援

---

## 🚀 使用方式

1. 開啟 https://richfly2u.github.io/daily-dashboard/
2. 輸入你的儀表板名稱（不限中英文）
3. 不同裝置使用 **同一個名稱** 即自動同步資料
4. 開始記錄每日習慣吧！

---

## 🛠️ 技術架構

| 項目 | 技術 |
|------|------|
| 前端 | 純 HTML / CSS / JavaScript（ES Modules） |
| 字體 | Inter (Google Fonts) |
| 主題 | 暗色主題（Impeccable 設計規範） |
| 資料庫 | Firebase Firestore |
| 部署 | GitHub Pages |
| PWA | Service Worker + Manifest |

### 設計規範

本專案前端設計遵循 [Impeccable](https://impeccable.style/) 產品設計原則：
- 禁用漸層裝飾（純色按鈕與進度條）
- 統一的色彩語義（單一紫色強調色）
- 完整的互動回饋狀態（hover 過渡效果）
- 材質設計曲線動畫

---

## 📁 專案結構

```
daily-dashboard/
├── index.html          # 主應用（單一 HTML 檔）
├── manifest.json       # PWA 清單
├── sw.js              # Service Worker
├── firebase.json      # Firebase 設定
├── firestore.rules    # Firestore 安全規則
├── icon-192.png       # PWA 圖示
├── icon-512.png       # PWA 圖示
└── backend.py         # (備用) 後端腳本
```

### Firestore 資料結構

```
dashboard/{boardKey}/
├── _names: [String]        # 人員名單
├── {YYYY-MM-DD}:
│   └── items: [{
│       text: String,       # 項目文字
│       type: "text"|"name-picker",
│       done: Boolean,      # 是否完成
│       selected: String,   # 選取人員（name-picker 專用）
│       notes: String,      # 備註文字
│       locked: Boolean     # 是否鎖定
│   }]
```

---

## 🧑‍💻 開發

本專案為純前端應用，無需建置工具。可直接編輯 `index.html` 後推送至 GitHub Pages 即可生效。

```bash
git clone https://github.com/richfly2u/daily-dashboard.git
cd daily-dashboard
# 編輯 index.html 後
git add -A && git commit -m "你的變更"
git push origin master
```

### CDN 快取繞過
GitHub Pages 有 CDN 快取，更新後在 URL 加上 `?v=N` 參數強制重新整理。

---

## 📄 License

MIT
