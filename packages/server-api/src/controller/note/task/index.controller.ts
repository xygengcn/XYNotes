import { notePrismaClient } from '@/database';
import { logger } from '@/logger';
import { ITaskItem } from '@/typings';
import { isString } from '@/utils';
import { Controller, Param, Post } from 'koa-api-plus';

@Controller()
export default class TaskController {
  @Post('/list')
  public getTaskList() {
    logger.debug('[task] list');
    return notePrismaClient.taskQuadrant
      .findMany({
        where: {
          author: 'admin'
        }
      })
      .then((result) => {
        // 排序 priority优先级高，再排序更新时间updatedAt
        return result.sort((a, b) => {
          if (a.priority === b.priority) {
            return b.updatedAt.getTime() - a.updatedAt.getTime();
          }
          return b.priority - a.priority;
        });
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
          taskId: task.taskId
        }
      })
      .catch((e) => {
        logger.error(e.message, '[task] save 保存失败');
        return Promise.reject({ code: 'TASK_SAVE_FAILED', message: e.message });
      });
  }

  @Post('/delete')
  public deleteTask(@Param.Body() task: { taskId: string }) {
    logger.debug('[task] remove');
    // 校验nid
    if (!isString(task?.taskId, true)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: '参数不对' });
    }
    return notePrismaClient.taskQuadrant
      .delete({
        where: {
          taskId: task.taskId
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

  @Post('/sort')
  public sortTask(@Param.Body() list: Array<Pick<ITaskItem, 'taskId' | 'quadrant' | 'priority'>>) {
    logger.debug('[task] sort');
    // 校验nid
    if (!Array.isArray(list)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: '参数不对' });
    }
    return notePrismaClient
      .$transaction(
        list.map((item) => {
          return notePrismaClient.taskQuadrant.update({
            where: {
              taskId: item.taskId
            },
            data: {
              quadrant: item.quadrant,
              priority: item.priority
            }
          });
        })
      )
      .then(() => {
        return {
          result: true
        };
      })
      .catch((e) => {
        logger.error(e.message, '[task] sort 排序失败');
        return Promise.reject({ code: 'TASK_SORT_FAILED', message: '任务排序失败' });
      });
  }

  @Post('/status')
  public status() {
    // 分别获取不同quadrant且status为0的数量
    return notePrismaClient.taskQuadrant
      .groupBy({
        by: ['quadrant'],
        where: {
          status: 0
        },
        _count: true
      })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        logger.error(e.message, '[task] status 获取任务状态失败');
        return Promise.reject({ code: 'TASK_STATUS_FAILED', message: '任务状态获取失败' });
      });
  }
}
