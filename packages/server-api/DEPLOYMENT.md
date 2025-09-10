# 生产环境部署指南

## 构建项目

```bash
# 安装依赖
pnpm install

# 构建生产环境代码
pnpm run build:prod
```

## 环境变量配置

在生产环境中，需要配置以下环境变量：

- `NODE_ENV`: 设置为 `production`
- `PORT`: 服务监听端口，默认为 3000
- `HOST`: 服务监听地址，默认为 `0.0.0.0`
- `LOG_LEVEL`: 日志级别，默认为 `info`
- `DATABASE_URL`: 数据库连接地址，默认为 `file:./notes.db`

可以在 `.env.production` 文件中配置这些变量。

## 启动服务

### 直接启动

```bash
# 启动生产环境服务
pnpm run start:prod
```

### 使用 Docker 部署

```bash
# 构建 Docker 镜像
docker build -t xynotes-server-api .

# 运行容器
docker run -d -p 3000:3000 --name xynotes-api xynotes-server-api
```

## 数据库迁移

在生产环境中部署新版本时，可能需要执行数据库迁移：

```bash
# 执行数据库迁移
pnpm run prisma:deploy
```

## 监控和日志

服务使用 pino 作为日志系统，可以通过配置 `LOG_LEVEL` 环境变量来控制日志级别：
- `trace`
- `debug`
- `info`
- `warn`
- `error`
- `fatal`

## 健康检查

服务提供 `/health` 端点用于健康检查，返回类似以下的响应：

```json
{
  "status": "ok",
  "timestamp": "2023-01-01T00:00:00.000Z"
}
```

## 性能优化建议

1. 使用反向代理（如 Nginx）处理静态资源和 SSL 终止
2. 配置适当的进程管理器（如 PM2）来管理 Node.js 进程
3. 根据负载情况调整 Node.js 的内存限制
4. 定期备份数据库文件