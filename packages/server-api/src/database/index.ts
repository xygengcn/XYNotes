import { logger } from '../logger';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const notePrismaClient = prismaClient.$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, model, args, query }) {
        const start = new Date().getTime();
        try {
          const result = await query(args);
          return result;
        } catch (error: any) {
          // 错误日志记录
          logger.error('[prisma] ' + JSON.stringify({
            operation,
            model,
            args: JSON.stringify(args),
            time: new Date().getTime() - start,
            error: error.message || error
          }));
          throw error;
        }
      }
    }
  }
});


export { notePrismaClient };