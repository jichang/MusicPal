import { useState } from 'react';
import * as Comlink from 'comlink';

export interface TimlingWorker {
  setInterval(identity: string, callback: () => void, interval: number): number;
  clearInterval(identity: string): void;
}

export function useTimingWorker() {
  const [worker] = useState(() => {
    const worker = new Worker(new URL('../utils/timing', import.meta.url), {
      type: 'module',
    });

    return Comlink.wrap<TimlingWorker>(worker);
  });

  return worker;
}
