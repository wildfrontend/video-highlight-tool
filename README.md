# Video Highlight Tool

---

## 技術選型
- **框架**：Next.js  
- **UI**：MUI  
- **狀態管理**：Zustand  

---

## 本地開發

### 安裝依賴
```bash
npm install
npm run dev
```

### 訪問應用程式
打開瀏覽器並前往：http://localhost:3000

---

## Mock Data

- 模擬使用者上傳的影片：`/public/mock-video.mp4`
- 模擬 AI 處理後的 API 回傳資料：`/src/mocks/hank_outline_segments.json`
- 影片字幕檔（用於分析）：`/src/mocks/mock-video.srt`

---

## 處理 Mock Data

### 1. 建立字幕檔
- 使用 faster-whisper 將影片轉為逐字稿
- 也可使用線上轉檔工具，例如：[線上轉檔資源](https://yowlab.idv.tw/wordpress/?p=2962)
- 產生的字幕檔為 `mock-video.srt`

### 2. 產生 API 回傳資料
- 將字幕檔與影片大綱交給 NoteboolLM 或 ChatGPT 處理，生成 `hank_outline_segments.json`
- 內容包含精華片段的時間軸與字幕
- 只整理出乾淨、正確的資料（部分字幕可能缺失）

---

## 功能設計

### 1. 上傳影片後取得模擬 AI 處理資料
- 使用者可上傳影片或圖片
- 系統模擬 AI 處理，產生精華片段資料
- 透過 Zustand 初始化影片控制與字幕控制

### 2. 編輯精華片段區塊
- 顯示影片大綱與段落字幕
- 點擊時間戳 → 跳轉到影片對應時間段
- 可勾選段落是否為精華片段
- 播放中段落會高亮顯示
- 使用 `useScrollIntoView` 確保當前播放段落可見
- 字幕段落會隨影片進度自動滾動

### 3. 影片播放與進度條互動
- 精華片段區塊會隨影片進度變色
- 精華片段區塊與字幕自動更新
- 可列出影片精華片段，點擊即可跳轉至對應進度

---

## 技術細節：

### useScrollIntoView

- 段落區塊是巢狀結構，不能直接使用 `container.scrollTo`
- 使用 `getBoundingClientRect()` 取得元素相對於視窗的位置
- 計算元素相對容器頂部的距離 `distanceToTop`
- 計算目標滾動位置：

```typescript
targetScrollTop = container.scrollTop + distanceToTop - offset
```

### useHighlightPlayer

`useHighlightPlayer` 是控制影片播放與精華片段互動的核心 hook，主要負責以下功能：

- **自動播放精華片段**  
  - 當使用者點擊某個精華片段，影片會跳轉至對應時間段並播放  
  - 可支援自動播放下個精華片段

- **同步字幕與精華片段高亮**  
  - 根據影片播放進度，動態更新精華片段區塊的高亮狀態  
  - 滑動字幕區塊，使當前播放段落始終可見（結合 `useScrollIntoView`）

- **影片控制整合**  
  - 暫停、播放、跳轉到指定時間  
  - 與進度條互動：當進度條拖動或點擊，精華片段區塊與字幕自動更新


---

## 開發時程

- Day 1：釐清需求，製作 Mock Data
- Day 2~3：開發雛形
- Day 4：補全功能