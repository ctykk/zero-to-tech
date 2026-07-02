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
- **前端**: Prettier (`bun run format`)，配置在 `frontend/.prettierrc`，含 `prettier-plugin-tailwindcss` 自动排序 Tailwind 类
- TypeScript strict 模式（`strict: true`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `verbatimModuleSyntax`）
- **后端**: 标准 Go 格式 (`go fmt`)

### 测试
当前项目无测试框架配置。

## 项目架构

### 整体结构
```
zero-to-tech/
├── frontend/       # React 19 SPA (Vite + TypeScript + Tailwind v4)
│   └── vite.config.ts         # @tailwindcss/vite + @vitejs/plugin-react + @/ 别名
└── backend/        # Go REST API (Gin 框架)
```
前后端通过 HTTP API 通信，无 SSR/模板渲染。前端生产构建输出到 `frontend/dist/`。

### 前端架构

**样式方案**: Tailwind CSS v4（通过 `@tailwindcss/vite` 插件，无 PostCSS 配置）。
- 所有设计变量通过 `@theme` 定义在 `src/globals.css` 中（8 种颜色、2 种圆角、阴影、渐变、字体、动画关键帧）
- 无 `tailwind.config.*` 或 `postcss.config.*` 文件，无手写 CSS 文件
- 所有样式以 utility classes 写在 JSX 中

**路由结构** (React Router DOM v7):
```
App (BrowserRouter)
 └── Layout (页面背景 + Outlet)
      ├── Nav (Logo + 导航链接)
      ├── /         → HomePage    (个人介绍 + 座右铭)
      └── /text-lab → TextLabPage (文字分析工具: InputCard + ResultCard)
```

**组件分层**:
- `components/Layout.tsx` — 页面外壳（渐变背景、最大宽度约束）
- `components/Nav.tsx` — 顶部导航栏（logo + 两个 NavLink 条目）
- `components/home/` — 首页相关组件（个人介绍卡片）
- `components/text-lab/` — 文字实验室相关组件
- 共享组件: `PageHeading`（渐变色标题+副标题）、`AnimatedCardGrid`（staggered 入场动画容器）

**AnimatedCardGrid 动画模式**:
- 组件通过 `querySelectorAll("[data-card]")` 查找子元素，为每个卡片添加递增的 `animationDelay`
- 子卡片需添加 `data-card` 属性以触发动画
- 动画通过 CSS 变量 `--animate-card-enter` 定义在 `globals.css` 中

**数据流**:
- 使用 React 内置 `useState` / `useEffect`，无外部状态管理
- API 调用封装在 `services/api.ts` (Axios)，路径别名 `@/` 指向 `src/`
- TypeScript 类型定义在 `types/index.ts`
- 文本输入通过 `localStorage` 持久化 (key: `lastLabInput`)
- 错误处理: 组件内维护 `error` 状态，API 调用失败时通过 `try/catch` 捕获并展示错误信息

**路径别名**: `@/` → `src/`（已在 tsconfig.json 和 vite.config.ts 中配置）

### 后端架构

**入口**: `backend/main.go` — 创建 Gin router，注册路由，监听 `127.0.0.1:8080`
- 使用 `gin.ReleaseMode`，日志由 Gin 中间件处理

**API 处理**:
- `apis/identity.go` — `GET /api/identity`，从 10 条古典名句中随机选取一条返回
- `apis/analysis.go` — `POST /api/analysis`
  - 使用 `go-pinyin` 库（Tone 风格）将汉字逐字转为拼音
  - **情绪分析当前为随机生成**（`emotion_score` 范围 [-1, 1] 随机，映射到五档标签），非真实 NLP
  - 模拟 0~1s 的随机延迟

**依赖**: gin (HTTP 框架), go-pinyin (拼音转换)

### API 契约

| 方法   | 路由              | 请求体              | 响应                                                                               |
|------|-----------------|------------------|----------------------------------------------------------------------------------|
| GET  | `/api/identity` | —                | `{"motto": "..."}`                                                               |
| POST | `/api/analysis` | `{"text": "汉字"}` | `{"pinyin": [{"char":"今","pinyin":"jīn"}], "emotion":"中性", "emotion_score":0.1}` |

情绪分数范围 [-1, 1]，映射为五档：消极 / 偏消极 / 中性 / 偏积极 / 积极。