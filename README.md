# WKylin Personal Site

一个为 `wkylin.cn` 设计的现代个人网站，技术栈为 React 19、MySQL、Nginx。

## 本地开发

```bash
cd personal-site
pnpm install
pnpm dev
```

前端默认运行在 `http://127.0.0.1:5174`。如果后端未启动，页面会使用内置履历数据兜底。

## API 与 MySQL

```bash
cd personal-site
pnpm server:dev
```

API 默认读取 MySQL：

- `MYSQL_HOST=127.0.0.1`
- `MYSQL_PORT=3306`
- `MYSQL_USER=wkylin`
- `MYSQL_PASSWORD=wkylin_password`
- `MYSQL_DATABASE=wkylin_site`

环境变量文件：

- `.env`：通用配置，默认 `NODE_ENV=development`
- `.env.development`：开发环境 MySQL 配置
- `.env.production`：线上环境 MySQL 配置
- `VITE_USE_PROFILE_API=false`：前端不请求 `/api/profile`，直接使用静态 `src/profileData.ts`

线上启动：

```bash
pnpm server:prod
```

初始化 SQL 位于 `db/schema.sql` 与 `db/seed.sql`。

## Docker + Nginx

```bash
cd personal-site
docker compose up --build
```

访问 `http://127.0.0.1:8080`。Nginx 配置位于 `nginx/wkylin.conf`，已经包含 `wkylin.cn`、`www.wkylin.cn` 和通配二级域名。
