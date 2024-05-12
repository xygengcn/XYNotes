import { IConfigsColunm } from '@/typings/config';
import { INote } from '@/typings/note';
/**
 * 所有数据处理事件api 抽象类
 */

export default abstract class ApiBridge {
  /**
   * 拉取所有的笔记数据
   */
  abstract apiFetchNoteListData(): Promise<INote[]>;

  /**
   * 拉取某个详情的笔记
   */

  abstract apiFetchNoteDetailData(nid: string): Promise<any>;

  /**
   * 添加或者修改笔记
   * @returns
   */
  abstract apiSaveOrUpdateNote(note: INote): Promise<any>;

  /**
   * 删除笔记
   * @param note
   * @returns
   */
  abstract apiDeleteNote(note: INote): Promise<any>;

  /**
   * 拉取设置配置
   */
  abstract apiFetchConfigsData(): Promise<any>;

  /**
   * 添加或者保存配置
   */
  abstract apiSaveOrUpdateConfigs(configs: IConfigsColunm[]): Promise<IConfigsColunm[]>;
}
