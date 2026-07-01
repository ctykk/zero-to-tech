# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### 前端 (frontend/)
```bash
cd frontend
bun install          # 安装依赖
bun run dev          # 启动 Vite 开发服务器 (端口 3000)
bun run build        # tsc 类型检查 + Vite 打包
bun run preview      # 预览生产构建
bun run format       # Prettier 格式化所有文件（含 Tailwind 类排序）
bun run format:check # Prettier 检查格式
```

### 后端 (backend/)
```bash
cd backend
go run main.go       # 启动 Go 服务 (端口 8080)
```

### 开发流程
1. 启动后端: `cd backend && go run main.go`
2. 启动前端: `cd frontend && bun run dev`
3. 前端开发服务器自动将 `/api` 请求代理到 `127.0.0.1:8080`

### 代码风格
- 前端: Prettier (`bun run format`)，含 `prettier-plugin-tailwindcss` 自动排序 Tailwind 类
- TypeScript strict 模式
- 后端: 标准 Go 格式 (`go fmt`)

## 项目架构

### 整体结构
```
zero-to-tech/
├── frontend/       # React 19 SPA (Vite + TypeScript)
│   └── vite.config.ts         # @tailwindcss/vite + @vitejs/plugin-react
└── backend/        # Go REST API (Gin 框架)
```
前后端通过 HTTP API 通信，无 SSR/模板渲染。前端生产构建输出到 `frontend/dist/`。

### 前端架构

**样式方案**: Tailwind CSS v4（无手写 CSS 文件）。
- 设计变量通过 `@theme` 定义在 `src/globals.css` 中（8 种颜色、2 种圆角、阴影、渐变、字体、动画关键帧）
- `@tailwindcss/vite` 插件处理构建，无需 PostCSS 配置
- 无 `tailwind.config.*` 或 `postcss.config.*` 文件，所有配置在 CSS 中完成
- 所有样式以 utility classes 写在 JSX 中

**路由结构** (React Router DOM v7):
```
App (BrowserRouter)
 └── Layout (导航栏 + Outlet)
      ├── /         → HomePage    (个人介绍 + 座右铭)
      └── /text-lab → TextLabPage (文字分析工具)
```

**组件分层**:
- `components/Layout.tsx` / `Nav.tsx` — 布局外壳和导航
- `components/home/` — 首页相关组件
- `components/text-lab/` — 文字实验室相关组件 (InputCard, ResultCard)
- 共享组件: `PageHeading`, `AnimatedCardGrid`

**数据流**:
- 使用 React 内置 `useState` / `useEffect`，无外部状态管理
- API 调用封装在 `services/api.ts` (Axios)，路径别名 `@/` 指向 `src/`
- TypeScript 类型定义在 `types/index.ts`
- 文本输入通过 `localStorage` 持久化 (key: `lastLabInput`)

**路径别名**: `@/` → `src/`（已在 tsconfig.json 和 vite.config.ts 中配置）

### 后端架构

**入口**: `backend/main.go` — 创建 Gin router，注册路由，监听 `127.0.0.1:8080`

**API 处理**:
- `apis/identity.go` — `GET /api/identity`，返回随机座右铭（从 10 条古典名句中选取）
- `apis/analysis.go` — `POST /api/analysis`，接收 `{"text":"..."}`，返回拼音数组（go-pinyin 库，Tone 风格）和情绪分析结果

**依赖**: gin (HTTP 框架), go-pinyin (拼音转换)

### API 契约

| 方法 | 路由 | 请求体 | 响应 |
|------|------|--------|------|
| GET | `/api/identity` | — | `{"motto": "..."}` |
| POST | `/api/analysis` | `{"text": "汉字"}` | `{"pinyin": [{"char":"今","pinyin":"jīn"}], "emotion":"中性", "emotion_score":0.1}` |

情绪分数范围 [-1, 1]，映射为五档：消极 / 偏消极 / 中性 / 偏积极 / 积极。当前为随机生成。
