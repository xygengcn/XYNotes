import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

// 初始化 Prify Client
const prisma = new PrismaClient();

class NoteService {
  // 拉取笔记列表
  async getNoteList(updateTime: number, pageSize: number, order: string) {
    logger.info({ updateTime, pageSize, order }, 'Getting note list from database');
    
    try {
      const orderBy: any = 
        order === 'createdAt' ? { createdAt: 'desc' } : { updatedAt: 'desc' };
        
      const notes = await prisma.note.findMany({
        where: {
          updatedAt: {
            gt: updateTime
          }
        },
        orderBy: [orderBy],
        take: pageSize
      });

      // 转换 attachment 字段从字符串到数组
      const result = notes.map(note => ({
        ...note,
        attachment: note.attachment ? JSON.parse(note.attachment) : []
      }));
      
      logger.info({ count: result.length }, 'Successfully retrieved note list');
      return result;
    } catch (error: any) {
      logger.error({ err: error }, 'Failed to get note list');
      throw error;
    }
  }

  // 拉取笔记详情
  async getNoteDetail(nid: string) {
    logger.info({ nid }, 'Getting note detail from database');
    
    try {
      const note = await prisma.note.findUnique({
        where: { nid }
      });

      if (!note) {
        logger.info({ nid }, 'Note not found in database');
        return null;
      }
      
      // 转换 attachment 字段从字符串到数组
      const result = {
        ...note,
        attachment: note.attachment ? JSON.parse(note.attachment) : []
      };
      
      logger.info({ nid }, 'Successfully retrieved note detail');
      return result;
    } catch (error: any) {
      logger.error({ err: error }, 'Failed to get note detail');
      throw error;
    }
  }

  // 保存笔记（更新或新建）
  async saveNote(note: any) {
    logger.info({ nid: note.nid }, 'Saving note to database');
    
    try {
      // 准备数据
      const data = {
        ...note,
        attachment: note.attachment ? JSON.stringify(note.attachment) : null
      };
      
      // 检查笔记是否已存在
      const existingNote = await prisma.note.findUnique({
        where: { nid: note.nid }
      });
      
      let result;
      if (existingNote) {
        // 更新笔记
        logger.info({ nid: note.nid }, 'Updating existing note');
        result = await prisma.note.update({
          where: { nid: note.nid },
          data
        });
      } else {
        // 新建笔记
        logger.info({ nid: note.nid }, 'Creating new note');
        result = await prisma.note.create({
          data
        });
      }
      
      // 转换 attachment 字段从字符串到数组
      const responseNote = {
        ...result,
        attachment: result.attachment ? JSON.parse(result.attachment) : []
      };
      
      logger.info({ nid: responseNote.nid }, 'Successfully saved note');
      return responseNote;
    } catch (error: any) {
      logger.error({ err: error }, 'Failed to save note');
      throw error;
    }
  }

  // 同步笔记
  async syncNote(note: any) {
    logger.info({ nid: note.nid }, 'Syncing note to database');
    
    try {
      // 准备数据
      const data = {
        ...note,
        attachment: note.attachment ? JSON.stringify(note.attachment) : null
      };
      
      // 更新或插入笔记
      logger.info({ nid: note.nid }, 'Upserting note');
      const result = await prisma.note.upsert({
        where: { nid: note.nid },
        update: data,
        create: data
      });
      
      // 转换 attachment 字段从字符串到数组
      const responseNote = {
        ...result,
        attachment: result.attachment ? JSON.parse(result.attachment) : []
      };
      
      logger.info({ nid: responseNote.nid }, 'Successfully synced note');
      return responseNote;
    } catch (error: any) {
      logger.error({ err: error }, 'Failed to sync note');
      throw error;
    }
  }

  // 删除笔记
  async deleteNote(nid: string) {
    logger.info({ nid }, 'Deleting note from database');
    
    try {
      await prisma.note.delete({
        where: { nid }
      });
      
      logger.info({ nid }, 'Successfully deleted note');
      return true;
    } catch (error: any) {
      logger.error({ err: error }, 'Failed to delete note');
      return false;
    }
  }
}

export default new NoteService();