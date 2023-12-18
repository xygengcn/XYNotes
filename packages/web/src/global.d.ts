declare global {
  interface Window {
    openDevtools: (flag: boolean) => void;
    createWindow: (options: { nid: string }) => void;
    show: () => void;
  }
}

export {};
