import { logger } from '@/logger';
import { IFile } from '@/typings';
import { isFile, isString } from '@/utils';
import { Controller, Middleware, Param, Post } from 'koa-api-plus';

@Middleware()
@Controller()
export default class NoteAssetsController {
  /**
   * 文件上传
   * @param requestFile
   * @returns
   */
  @Post('/upload')
  async upload(
    @Param.Body() options: { type: string; origin: string },
    @Param.Files() requestFile: { file: IFile }
  ): Promise<{ originUrl: string; size: number; name: string; mimeType: string }> {
    logger.info(options, '[resource] upload');
    // 判断空
    if (!requestFile?.file) {
      throw new Error('文件不存在');
    }

    // 来源
    if (!isString(options.origin, true) || !options.origin) {
      throw new Error('上传参数不完整');
    }
    // 文件列表
    let file: IFile = Array.isArray(requestFile.file) ? requestFile.file[0] : requestFile.file;

    if (!isFile(file.filepath)) {
      logger.error(file, '[resource] upload');
      throw new Error('文件不存在，上传失败');
    }

    return {
      originUrl: options.origin + '/resources/assets/' + file.newFilename,
      size: file.size,
      name: file.originalFilename,
      mimeType: file.mimetype
    };
  }
}
