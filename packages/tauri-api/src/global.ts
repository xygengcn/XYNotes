declare global {
  interface Window {
    /**
     * tauri变量
     */
    __TAURI_INTERNALS__: any;
  }
}

export {};
