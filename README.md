# Zero to Tech

从零到技术 —— 记录全栈学习之路的个人作品集。

> 参考项目：[zero-to-tech-demos](https://github.com/joylibo/zero-to-tech-demos)

## 技术栈

- **前端**：React 19 + TypeScript + Vite + React Router
- **后端**：Go + Gin 框架
- **包管理**：Bun（前端）/ Go Modules（后端）

## 项目结构

```
zero-to-tech/
├── frontend/           # React 前端
│   ├── src/
│   │   ├── components/ # 页面组件
│   │   ├── css/        # 样式文件
│   │   ├── services/   # API 调用
│   │   └── types/      # TypeScript 类型定义
│   └── package.json
├── backend/            # Go 后端
│   ├── apis/           # API 处理器
│   ├── main.go         # 入口
│   ├── go.mod
│   └── go.sum
└── README.md
```

## 快速开始

### 后端

```bash
cd backend
go run main.go
```

服务启动在 `http://127.0.0.1:8080`。

### 前端

```bash
cd frontend
bun install       # 安装依赖
bun run dev       # 启动开发服务器
```

## API

| 路由              | 方法   | 说明             |
|-----------------|------|----------------|
| `/api/identity` | GET  | 返回随机座右铭        |
| `/api/analysis` | POST | 提交文字，返回拼音和情绪分析 |

## 功能

- **首页** — 个人介绍页，动态展示座右铭
- **文字实验室** — 输入文字，实时获取拼音标注和情绪分析
