# 每日行動儀表板 — 完整專案文檔

> 給接手 AI 的完整說明，讓您無需追問即可理解全貌。

---

## 一、專案概覽

**名稱：** 每日行動儀表板 (Daily Dashboard)
**網址：** https://richfly2u.github.io/daily-dashboard/
**託管方式：** GitHub Pages（靜態站，無後端）
**資料庫：** Firestore (bentodish-alan) — 集合 `dashboard`，文件 `{boardKey}`
**權限：** 完全公開讀寫（Firestore rules allow read/write if true）
**作者：** 上天使者（食香園素食餐廳老闆）
**使用情境：** 日常工作事項追蹤、照顧輪值管理、個人習慣打卡

---

## 二、核心功能清單

### 2.1 登入系統
- 登入畫面輸入「儀表板名稱」（boardKey）
- 同名稱跨裝置自動同步（Firestore 共用同一文件）
- 登入後 localStorage 記住名稱，下次自動進入

### 2.2 每日事項清單（Checklist）
- 每項有：文字(text)、類型(type)、完成狀態(done)、備註(notes)、鎖定(locked)
- 項目標號：1-7，固定對應預設事項
- 點擊 checkbox 切換完成狀態 → 自動存 Firestore
- 長按住文字可編輯
- **鎖定機制**：預設 locked:true，解鎖後才可刪除/編輯類型
- **類型**：text（一般事項）、name-picker（選人姓名）
- name-picker 會顯示下拉選單選人名，選中後顯示為紫色粗體

### 2.3 日期導航
- 可切換前後天查看/編輯
- 「今天」按鈕一鍵回到當天
- 每天獨立一份事項清單

### 2.4 統計數據（三卡片）
1. **已完成** — 當天打勾數（綠色）
2. **總項目** — 當天事項總數（藍色）
3. **運作天數** — 從首次使用日到今天的總天數（琥珀色）

### 2.5 進度條
- 完成率百分比顯示
- 紫色漸層進度條（6c5ce7 → a855f7）

### 2.6 連續天數（Streak）
- 火焰圖示 🔥 + 天數
- 計算邏輯：從今天往回數連續有完成事項的天數
- 中斷則歸零

### 2.7 熱力圖（Heatmap）
- 最近 90 天的完成狀況
- 顏色層級：0(l0)深黑 → 5(l5)亮綠
- 今天有紫色外框標示

### 2.8 照顧輪值（Care Rotation）
- 可展開/收合的照顧概覽面板
- 設定：輪值週期天數(careEvery)、每次照顧人數(careCount)、間隔天數(careInterval)
- 根據 EPOCH（基準日 2026-01-05）計算當日照顧者
- 每個照顧者顯示狀態：ready(可照顧)、cooling(冷卻中)、never(未輪到)

### 2.9 編輯模式
- 側邊「編」按鈕切換編輯模式（垂直文字，動畫滑入）
- 編輯模式下顯示刪除按鈕和編輯按鈕
- 鎖定圖示防誤刪

### 2.10 備註系統
- 每項可展開備註區塊
- 支援多人留言（顯示留言者+時間戳）
- 有備註的項目顯示紫色圖示標記

### 2.11 姓名管理
- 彈出式可愛對話框（🌸🌿 裝飾）
- 可新增/刪除姓名
- 支援 name-picker 下拉選擇

---

## 三、UI/UX 風格要求

### 3.1 整體風格
- **深色主題**：紫藍夜景漸層背景
- **玻璃擬態（Glassmorphism）**：所有卡片/區塊都有半透明玻璃效果
- 背景漸層：`#0a0a1a → #12102a → #1a0a30 → #162040 → #0f1a3a → #0a0a1a`
- 背景上有微光暈（body::before 左上紫色光暈、body::after 右下藍色光暈）

### 3.2 玻璃效果參數（統一規範）
```
background: rgba(255,255,255,0.06)
backdrop-filter: blur(20px)
-webkit-backdrop-filter: blur(20px)
border: 1px solid rgba(255,255,255,0.18)
box-shadow: 0 8px 32px rgba(0,0,0,0.3)
inset 0 1px 0 rgba(255,255,255,0.15)
```

### 3.3 套用玻璃的元素
- 日期導航列 (.date-nav)
- 統計三卡片 (.stat-card)
- 進度條區塊 (.progress-wrap)
- 每個 check-item（事項條目）
- 熱力圖區塊 (.heatmap-section)
- 新增事項輸入框 (.add-wrap input)
- 照顧切換按鈕 (.care-toggle)
- 照顧概覽面板 (.care-overview)
- 登入畫面輸入框 (.login-screen input)

### 3.4 顏色主題
- 主要色：`#6c5ce7`（紫色）
- 漸層色：`linear-gradient(135deg, #6c5ce7, #a855f7)`
- 完成色：`#34d399`（綠色）
- 連結色：`#60a5fa`（藍色）
- 警告色：`#fbbf24` / `#f59e0b`（琥珀色）
- 文字主色：`#e8e8ed`（淺灰白）
- 次要文字：`#888` / `#aaa` / `#555`

### 3.5 響應式
- 最大寬度 720px（手機優先）
- 480px 以下 padding 縮小

---

## 四、技術架構

### 4.1 前端（單頁 HTML 應用）
- **純 HTML + CSS + JS**，無框架
- Google Fonts: Inter (400,500,600,700,800)
- 單一 index.html 包含所有樣式、邏輯、HTML 結構

### 4.2 資料庫（Firestore）
- 專案：bentodish-alan
- API Key：AIzaSyCRazQsleeT4H4Nt6VrqI1KGlfVenc（公開 Web SDK key，安全可公開）
- 集合：`dashboard`
- 文件 ID：`{boardKey}`（用戶自訂名稱）
- 資料結構：
```json
{
  "_names": ["Alan", "媽媽", "...", "..."],
  "_careEvery": 1,
  "_careCount": 1,
  "_careInterval": 7,
  "_startDate": "2026-01-05",
  "_careDates": { "2026-01-05": "Alan", "2026-01-06": "媽媽" },
  "2026-01-15": {
    "items": [
      { "text": "喝水", "type": "text", "done": true, "selected": "", "notes": "", "locked": true },
      { "text": "選人", "type": "name-picker", "done": false, "selected": "Alan", "notes": "", "locked": true }
    ]
  }
}
```

### 4.3 同步機制（onSnapshot）
- Firestore 即時監聽，跨裝置同步
- **關鍵邏輯**：初始延遲 1 秒 (`setTimeout(ready=true, 1000)`) 避免首次雙重 render
- 比對 `JSON.stringify` 判斷資料是否真正變化，避免無謂的 DOM 重建
- `hasPendingWrites` 過濾本地寫入觸發的同步事件
- 90 天自動補缺（若 Firestore 無該日資料則用預設值填充）

### 4.4 PWA（漸進式網頁應用）
- manifest.json 設定應用圖示、名稱、主題色
- 無 service worker（簡單 PWA，純 manifest）
- apple-touch-icon 設定
- Android 專用玻璃風格圖標

---

## 五、預設事項（DEFAULTS）

7 個固定事項，對應 item[0] ~ item[6]：

| 索引 | 文字 | 類型 | 說明 |
|------|------|------|------|
| 0 | 喝第一杯水 | text | 喝水提醒 |
| 1 | 吃代謝 | text | 吃代謝保健品 |
| 2 | 起床喝 | text | 起床喝水 |
| 3 | 素食 | text | 吃素確認 |
| 4 | 水果 | text | 吃水果 |
| 5 | 葉黃素 | text | 吃葉黃素 |
| 6 | 三省吾身 | text | ★曾改為 name-picker（選人），後改回 text |

---

## 六、已知問題與注意事項

### 6.1 已修復問題
1. ~~「進不去」問題~~ — 舊版 encoding 被 PowerShell 損壞，已從 WSL UTF-8 重寫
2. ~~3 秒玻璃消失~~ — onSnapshot 邏輯重構，防止不必要的 render
3. ~~玻璃效果不明顯~~ — 背景加深、透明度調低為 0.06、blur 提升到 20px

### 6.2 已知邊界情況
- 若 Firestore 文件不存在，自動用 DEFAULTS 建立
- 首次使用自動設定 _startDate
- name-picker 與 text 類型可互換（migration 邏輯在 loadDay）
- 刪除 item 後重新加入會保持原始位置
- 照顧輪值 EPOCH 固定為 2026-01-05

### 6.3 不應改動的部分
- **不應重構為 React/Vue 等框架** — 保持單頁 HTML 以便 GitHub Pages 直接託管
- **不應加認證** — Firestore 設定為公開讀寫
- **不應改 item 結構** — Firestore 中已有大量歷史資料
- **DEFAULTS 順序固定** — 避免打亂用戶習慣的位置

---

## 七、開發指南

### 7.1 本地開發
```bash
# clone repo
git clone https://github.com/richfly2u/daily-dashboard.git
cd daily-dashboard
# 直接編輯 index.html，無需建置
# 用瀏覽器打開 index.html 即可測試（Firestore 會跨域連線）
```

### 7.2 部署
```bash
# 直接 push 到 master，GitHub Pages 自動部署
git add index.html
git commit -m "描述你的改動"
git push origin master
# CDN 快取約 1-2 分鐘更新
```

### 7.3 Firestore Rules 部署（需 Firebase CLI）
```powershell
# Windows PowerShell（需先安裝 Firebase CLI）
firebase deploy --project bentodish-alan --only firestore:rules
```

### 7.4 注意
- push 時 Windows 的 LF→CRLF 轉換會觸發 warning，但**不影響功能**
- WSL git push 需要 token；可用 Windows PowerShell 的 cached credentials
- CDN 更新後可用 `curl -s URL | grep '<marker>'` 確認

---

## 八、用戶偏好（重要）

> 以下為「上天使者」（食香園素食餐廳老闆/管理人）的個人偏好

1. **溝通語言**：繁體中文
2. **偏好**：直接、有效率，討厭繞遠路或過度解釋
3. **測試要求**：修改後必須自己測試，不要問用戶「要不要試試看」
4. **Git push**：直接 push，不要問用戶憑證
5. **不喜歡**：臨時性補丁、功能精簡、問「能不能/要不要」
6. **需求表達**：「try your best」= 直接做，不要再解釋
7. **UI 風格**：喜歡玻璃擬態、深色主題、紫藍色系
8. **價格敏感**：已從 OpenAI 轉 DeepSeek API，盡量避免昂貴方案
