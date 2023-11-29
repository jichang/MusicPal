import { useState } from 'react';
import * as Comlink from 'comlink';
import type { TickerWorker } from '../utils/ticker';

export function useTickerWorker() {
  const [worker] = useState(() => {
    const worker = new Worker(new URL('../utils/ticker', import.meta.url), {
      type: 'module',
    });

    return Comlink.wrap<TickerWorker>(worker);
  });

  return worker;
}
