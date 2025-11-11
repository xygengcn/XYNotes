import { notePrismaClient } from '@/database';
import { logger } from '@/logger';
import { ITaskItem } from '@/typings';
import { isNumber, isString } from '@/utils';
import { Controller, Param, Post } from 'koa-api-plus';

@Controller()
export default class TaskController {
  @Post('/list')
  public getTaskList() {
    logger.debug('[task] list');
    return notePrismaClient.taskQuadrant
      .findMany({
        where: {
          author: 'admin',
          status: 0 // 未完成
        }
      })
      .catch((e) => {
        logger.error(e.message, '[task] list');
        return Promise.reject({ code: 'TASK_QUERY_FAILED', message: e.message });
      });
  }

  @Post('/save')
  public saveTask(@Param.Body() task: ITaskItem) {
    logger.debug('[task] add');
    // 校验nid
    if (!isString(task?.title)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: '参数不对' });
    }
    return notePrismaClient.taskQuadrant
      .upsert({
        create: {
          ...task,
          author: 'admin',
          updatedAt: new Date(),
          createdAt: new Date()
        },
        update: {
          ...task,
          author: 'admin',
          updatedAt: new Date()
        },
        where: {
          id: task.id
        }
      })
      .catch((e) => {
        logger.error(e.message, '[task] save 保存失败');
        return Promise.reject({ code: 'TASK_SAVE_FAILED', message: e.message });
      });
  }

  @Post('/delete')
  public deleteTask(@Param.Body() task: { id: number }) {
    logger.debug('[task] remove');
    // 校验nid
    if (!isNumber(task?.id)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: '参数不对' });
    }
    return notePrismaClient.taskQuadrant
      .delete({
        where: {
          id: task.id
        }
      })
      .then(() => {
        return {
          result: true
        };
      })
      .catch((e) => {
        logger.error(e.message, '[task] delete 删除失败');
        return {
          result: false
        };
      });
  }
}
