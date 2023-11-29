import { useState } from 'react';
import * as Comlink from 'comlink';
import type { TimingWorker } from '../utils/timing';

export function useTimingWorker() {
  const [worker] = useState(() => {
    const worker = new Worker(new URL('../utils/timing', import.meta.url), {
      type: 'module',
    });

    return Comlink.wrap<TimingWorker>(worker);
  });

  return worker;
}
