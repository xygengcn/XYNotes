import 'reflect-metadata';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { join } from 'path';
import { NoteController } from './controllers/note-controller';
import { registerRoutes } from './utils/route-register';
import logger from './utils/logger';
import { loadControllers, getControllerRoutes } from './utils/controller-loader';

// 初始化 Fastify 应用，使用 pino 作为日志管理器
const app = fastify({ 
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
});

// 注册 CORS 插件处理跨域问题
app.register(cors, {
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-App-DeviceId', 'X-App-Source']
});

// 健康检查端点
app.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// 注册路由
registerRoutes(app, [NoteController]);

// 打印所有注册的路由
app.ready(async () => {
  logger.info('Fastify app is ready');
  
  // 自动加载所有控制器并获取路由信息
  try {
    const controllersPath = join(__dirname, 'controllers');
    const controllers = await loadControllers(controllersPath);
    
    // 添加手动注册的控制器（如果尚未包含）
    if (!controllers.some(ctrl => ctrl.name === 'NoteController')) {
      controllers.push(NoteController);
    }
    
    const routes = getControllerRoutes(controllers);
    
    logger.info('Available API endpoints:');
    routes.forEach(route => {
      logger.info(`  ${route.method} http://localhost:3000${route.path} [${route.controller}]`);
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to load controller routes');
  }
});

// 添加请求日志中间件
app.addHook('onRequest', async (request, reply) => {
  logger.info(`Incoming request: ${request.method} ${request.url} from ${request.ip}`);
});

// 添加响应日志中间件
app.addHook('onResponse', async (request, reply) => {
  logger.info(`Request completed: ${request.method} ${request.url} - ${reply.statusCode} in ${reply.elapsedTime}ms`);
});

// 添加错误处理中间件
app.setErrorHandler((error, request, reply) => {
  logger.error({ err: error }, `Request error: ${request.method} ${request.url} - ${error.message}`);
  reply.status(500).send({
    code: 500,
    message: 'Internal Server Error',
    userMsg: '服务器内部错误'
  });
});

// 启动服务
const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    const host = process.env.HOST || '0.0.0.0';
    
    await app.listen({ port, host });
    logger.info(`Server is running on port ${port}`);
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
};

start();