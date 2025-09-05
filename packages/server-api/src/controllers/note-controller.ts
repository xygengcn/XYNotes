import { BaseController } from './base-controller';
import noteService from '../services/note-service';
import { Post } from '../decorators/route-decorator';

export class NoteController extends BaseController {
  // 拉取笔记列表接口
  @Post('/note/list/query')
  async getNoteList(request: any, reply: any) {
    this.logInfo('Fetching note list', { 
      updateTime: request.body.updateTime, 
      pageSize: request.body.pageSize, 
      order: request.body.order 
    });
    
    const { updateTime, pageSize, order } = request.body as any;
    return await noteService.getNoteList(updateTime, pageSize, order);
  }

  // 拉取笔记详情接口
  @Post('/note/detail/query')
  async getNoteDetail(request: any, reply: any) {
    this.logInfo('Fetching note detail', { nid: request.body.nid });
    
    const { nid } = request.body as any;
    const note = await noteService.getNoteDetail(nid);

    if (!note) {
      this.logInfo('Note not found', { nid });
      throw new Error('笔记不存在');
    }
    
    return note;
  }

  // 更新或新建笔记接口
  @Post('/note/detail/save')
  async saveNote(request: any, reply: any) {
    this.logInfo('Saving note', { nid: request.body.note.nid });
    
    const { note } = request.body as any;
    return await noteService.saveNote(note);
  }

  // 同步笔记接口
  @Post('/note/detail/sync')
  async syncNote(request: any, reply: any) {
    this.logInfo('Syncing note', { nid: request.body.note.nid });
    
    const { note } = request.body as any;
    return await noteService.syncNote(note);
  }

  // 删除笔记接口
  @Post('/note/detail/delete')
  async deleteNote(request: any, reply: any) {
    this.logInfo('Deleting note', { nid: request.body.nid });
    
    const { nid } = request.body as any;
    const result = await noteService.deleteNote(nid);
    
    if (!result) {
      throw new Error('删除笔记失败');
    }
    
    return result;
  }
}