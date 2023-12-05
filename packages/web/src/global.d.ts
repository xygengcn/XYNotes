declare global {
  interface Window {
    openDevtools: (flag?: boolean) => void;
  }
}

export {};
