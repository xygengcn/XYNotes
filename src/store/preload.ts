import { useConfigsStore } from './config.store';
import { useNotesStore } from './notes.store';

// 启动后同步操作

export default function perload(): void {
  const configs = useConfigsStore();
  const note = useNotesStore();
  // // 同步配置
  configs.syncConfigs().then(() => {
    // 同步笔记信息
    note.syncDatabaseToStore();
  });
}
