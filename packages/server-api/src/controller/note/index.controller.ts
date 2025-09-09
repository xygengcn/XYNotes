import { Controller, Middleware } from 'koa-api-plus';

@Middleware()
@Controller('/note')
export default class NoteController {}
