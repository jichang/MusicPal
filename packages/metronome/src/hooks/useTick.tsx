import { useEffect, useRef } from 'react';
import { useTimingWorker } from './useTimingWorker';
import * as Comlink from 'comlink';

export interface TickOption {
  isRunning: boolean;
  tempo: number;
  ticksPerBeat: number;
}

export type TickCallback = () => void;

export function useTick(option: TickOption, callback: TickCallback) {
  const { isRunning, tempo, ticksPerBeat } = option;
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const worker = useTimingWorker();

  useEffect(() => {
    if (isRunning && tempo && ticksPerBeat) {
      const tpm = tempo * ticksPerBeat;

      const identity = `Tick.${Date.now()}.${Math.random}`;
      const handleInteval = Comlink.proxy(() => {
        callbackRef.current();
      });

      const interval = (60 * 1000) / tpm;
      worker.setInterval(identity, handleInteval, interval);

      return () => {
        worker.clearInterval(identity);
      };
    }
  }, [worker, isRunning, tempo, ticksPerBeat]);
}
