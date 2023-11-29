import { useEffect, useRef } from "react";
import { useTimingWorker } from "./useTimingWorker";
import * as Comlink from "comlink";

export interface TickOption {
  isRunning: boolean;
  beatsPerMinute: number;
  ticksPerBeat: number;
}

export type TickCallback = () => void;

export function useTick(option: TickOption, callback: TickCallback) {
  const { isRunning, beatsPerMinute, ticksPerBeat } = option;
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const worker = useTimingWorker();

  useEffect(() => {
    if (isRunning && beatsPerMinute && ticksPerBeat) {
      const tpm = beatsPerMinute * ticksPerBeat;

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
  }, [worker, isRunning, beatsPerMinute, ticksPerBeat]);
}
