declare global {
  interface Window {
    $ui: {
      toast: (str: string) => void;
    };
  }
}

export {};
