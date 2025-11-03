import { isFile } from '@/utils';
import fs from 'fs';
import { Context, Controller, Get, Headers, Param } from 'koa-api-plus';
import path from 'path';

@Controller()
export default class ResourceController {
  /**
   * 图片预览接口
   * @param param0
   * @returns
   */
  @Headers('content-type', 'image/jpg')
  @Get('/assets/:pathname')
  public viewAssets(@Param.Context() ctx: Context) {
    console.log('viewAssets', ctx.URL.pathname);
    const pathname = ctx.URL.pathname.replace('/resources', '');
    const filePath = path.join(process.cwd(), '/data', pathname);
    if (isFile(filePath)) {
      return fs.createReadStream(filePath);
    }
    return null;
  }
}
