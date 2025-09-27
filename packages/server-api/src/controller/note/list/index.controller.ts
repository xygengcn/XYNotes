import { notePrismaClient } from '@/database';
import { logger } from '@/logger';
import { INote, NoteStatus } from '@/typings';
import { parseJson } from '@/utils';
import { type Context, Controller, Param, Post } from 'koa-api-plus';

@Controller()
export default class NoteListController {
  /**
   * 获取列表
   * order 排序
   * @param message
   */
  @Post('/query')
  public query(
    @Param.Body() content: { updateTime: Date; pageSize: number; order: 'updatedAt' | 'createdAt' },
    @Param.Context() ctx: Context
  ): Promise<INote[]> {
    logger.info(content, '[list] query');
    const where = {
      author: 'admin',
      status: {
        // 排除废弃的笔记
        not: NoteStatus.deprecated
      }
    };
    const orderBy = content?.order || 'updatedAt';
    // 获取排序逻辑
    if (content?.updateTime) {
      if (orderBy === 'createdAt') {
        Object.assign(where, {
          createdAt: {
            lte: new Date(content.updateTime)
          }
        });
      } else {
        Object.assign(where, {
          updatedAt: {
            lte: new Date(content.updateTime)
          }
        });
      }
    }
    return notePrismaClient.noteTable
      .findMany({
        where,
        take: content.pageSize,
        orderBy: {
          [orderBy]: 'desc'
        }
      })
      .then((result) => {
        const list = result.map((i) => {
          return {
            ...i,
            content: i.content ? parseJson(i.content) : null,
            tags: i.tags ? parseJson(i.tags) : [],
            createdAt: i.createdAt.getTime(),
            updatedAt: i.updatedAt.getTime(),
            onlineSyncAt: i.updatedAt.getTime()
          } as INote;
        });
        return list;
      })
      .catch((e) => {
        logger.error(e, '[list] query');
        return [];
      });
  }
}
