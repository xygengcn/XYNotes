import { isString, parseJson } from '@/utils';
import { notePrismaClient } from '@/database';
import { logger } from '@/logger';
import { INote, NoteStatus } from '@/typings';
import { type Context, Controller, Param, Post } from 'koa-api-plus';
import stringify from 'fast-safe-stringify';
@Controller()
export default class NoteDetailController {
  @Post('/query')
  public async query(@Param.Body() content: { nid: string }, @Param.Context() ctx: Context) {
    logger.info(content, '[detail] query');

    // 校验nid
    if (!isString(content?.nid)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: '参数不对' });
    }

    return notePrismaClient.noteTable
      .findUnique({
        where: {
          nid: content.nid
        }
      })
      .then((result) => {
        // 废弃的不拉取
        if (result && result?.status !== NoteStatus.deprecated) {
          return {
            ...result,
            content: result.content ? parseJson(result.content) : null,
            createdAt: result.createdAt.getTime(),
            updatedAt: result.updatedAt.getTime(),
            onlineSyncAt: result.updatedAt.getTime()
          };
        }
        return null;
      })
      .catch((e) => {
        logger.error(e, '[detail] query');
        return null;
      });
  }
  /**
   * 保存笔记，以上传的为主
   * @param message
   */
  @Post('/save')
  public async save(@Param.Body() content: { note: INote }): Promise<INote> {
    logger.info(content, '[detail] save');
    const note = content.note;

    // 校验nid
    if (!isString(note?.nid)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: 'nid参数不对' });
    }
    // 校验title
    if (!isString(note?.title)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: 'title参数不对' });
    }
    // 校验text
    if (!(isString(note.text) && note.text)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: 'text参数不对' });
    }
    return notePrismaClient.noteTable
      .upsert({
        create: {
          content: note.content ? stringify(note.content) : '',
          text: note.text,
          title: note.title,
          intro: note.intro || '',
          author: 'admin',
          updatedAt: note.updatedAt ? new Date(note.updatedAt) : new Date(),
          order: note.order || 0,
          status: note.status ?? 1,
          type: note.type || 'text',
          nid: note.nid,

          createdAt: note.createdAt ? new Date(note.createdAt) : new Date()
        },
        update: {
          content: note.content ? stringify(note.content) : '',
          text: note.text,
          title: note.title,
          intro: note.intro,
          author: 'admin',
          updatedAt: note.updatedAt ? new Date(note.updatedAt) : new Date(),
          order: note.order,
          status: note.status,
          type: note.type
        },
        where: {
          nid: note.nid
        }
      })
      .then((result) => {
        return {
          ...result,
          content: result.content ? parseJson(result.content) : null,
          createdAt: result.createdAt.getTime(),
          updatedAt: result.updatedAt.getTime(),
          onlineSyncAt: result.updatedAt.getTime()
        } as INote;
      })
      .catch((e) => {
        logger.error(e.message, '[save]');
        return Promise.reject({
          code: 'DATABASE_ERROR',
          userMsg: e.message
        });
      });
  }

  /**
   * 同步笔记，以最新的更新时间为主
   * @param message
   */
  @Post('/sync')
  public async sync(@Param.Body() content: { note: INote }): Promise<INote> {
    logger.info(content, '[detail] save');
    const note = content.note;

    // 校验nid
    if (!isString(note?.nid)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: 'nid参数不对' });
    }
    // 校验title
    if (!isString(note?.title)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: 'title参数不对' });
    }
    // 校验text
    if (!(isString(note.text) && note.text)) {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: 'text参数不对' });
    }

    // 查询数据库有没有数据
    const noteDb: INote = await notePrismaClient.noteTable
      .findUnique({
        where: {
          nid: note.nid
        }
      })
      .catch((e) => {
        logger.error(e.message, '[detail] delete 笔记不存在');
        return null;
      });

    // 没有就新建
    if (!noteDb) {
      return notePrismaClient.noteTable
        .create({
          data: {
            content: note.content ? stringify(note.content) : '',
            text: note.text,
            title: note.title,
            intro: note.intro || '',
            author: 'admin',
            updatedAt: new Date(note.updatedAt),
            order: note.order || 0,
            status: note.status ?? 1,
            type: note.type || 'text',
            nid: note.nid,
            createdAt: new Date(note.createdAt)
          }
        })
        .then((result) => {
          return {
            ...result,
            content: result.content ? parseJson(result.content) : null,
            createdAt: result.createdAt.getTime(),
            updatedAt: result.updatedAt.getTime(),
            onlineSyncAt: result.updatedAt.getTime()
          } as INote;
        });
    }

    // 数据库的比较新
    if (noteDb.updatedAt.getTime() > note.updatedAt && noteDb.status !== NoteStatus.deprecated) {
      return {
        ...noteDb,
        createdAt: noteDb.createdAt.getTime(),
        updatedAt: noteDb.updatedAt.getTime(),
        onlineSyncAt: noteDb.updatedAt.getTime()
      } as INote;
    }

    // 更新数据库
    return notePrismaClient.noteTable
      .update({
        data: {
          content: note.content ? stringify(note.content) : '',
          text: note.text,
          title: note.title,
          intro: note.intro,
          author: 'admin',
          updatedAt: new Date(note.updatedAt),
          order: note.order,
          status: 1,
          type: note.type
        },
        where: {
          nid: note.nid
        }
      })
      .then((result) => {
        return {
          ...result,
          content: result.content ? parseJson(result.content) : null,
          createdAt: result.createdAt.getTime(),
          updatedAt: result.updatedAt.getTime(),
          onlineSyncAt: result.updatedAt.getTime()
        } as INote;
      })
      .catch((e) => {
        logger.error(e.message, '[sync]');
        return Promise.reject({
          code: 'DATABASE_ERROR',
          userMsg: e.message
        });
      });
  }

  /**
   * 删除文章

   * @returns
   */
  @Post('/delete')
  public async deletePost(@Param.Body() content: { nid: string; force: boolean }): Promise<{ result: boolean }> {
    logger.info(content, '[detail] delete');
    if (typeof content?.nid === 'undefined') {
      return Promise.reject({ code: 'KEY_PARAMETER_FAILED', message: '参数不对' });
    }

    const note: INote = await notePrismaClient.noteTable
      .findUnique({
        where: {
          nid: content.nid
        }
      })
      .catch((e) => {
        logger.error(e.message, '[detail] delete 笔记不存在');
        return null;
      });

    if (note) {
      // 是不是作者
      // if (note.author !== ctx.auth.userId) {
      //   return Promise.reject({
      //     code: 'NOTE_NOT_AUTH',
      //     userMsg: '无权限删除'
      //   });
      // }
      // 是不是强制删除
      if (content.force) {
        return notePrismaClient.noteTable.delete({ where: { nid: content.nid } }).then(() => {
          return { result: true };
        });
      }
      // 是不是删除过
      if (note.status === NoteStatus.deprecated) {
        return {
          result: true
        };
      }
      return notePrismaClient.noteTable
        .update({ where: { nid: content.nid }, data: { status: NoteStatus.deprecated } })
        .then(() => {
          return { result: true };
        })
        .catch(() => {
          return { result: false };
        });
    }
    return Promise.reject({
      code: 'NOTE_NOT_EXIST',
      userMsg: '笔记不存在'
    });
  }
}
