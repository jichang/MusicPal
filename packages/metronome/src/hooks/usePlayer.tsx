import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTimingWorker } from './useTimingWorker';
import * as Comlink from 'comlink';
import { Rhythm, analyseRhythm, locate } from '@musicpal/music';

export interface TickOption {
  isRunning: boolean;
  rhythm: Rhythm;
}

export type TickCallback = () => void;

export function usePlayer(option: TickOption) {
  const { isRunning, rhythm } = option;

  const [currMeasureIndex, setCurrMeasureIndex] = useState(0);
  const [currMeasureOffset, setCurrMeasureOffset] = useState(0);
  const [currBeatIndex, setCurrBeatIndex] = useState(0);
  const [currNoteIndex, setCurrNoteIndex] = useState(0);

  const worker = useTimingWorker();
  const { ticksPerBeat, tempos } = useMemo(() => {
    return analyseRhythm(rhythm);
  }, [rhythm]);

  useEffect(() => {
    if (isRunning && ticksPerBeat) {
      const tpm = ticksPerBeat;

      const identity = `Tick.${Date.now()}.${Math.random}`;
      const handleInteval = Comlink.proxy((identity: string) => {
        if (identity === identity) {
        }
      });

      const interval = (60 * 1000) / tpm;
      worker.setInterval(identity, handleInteval, interval);

      return () => {
        worker.clearInterval(identity);
      };
    }
  }, [worker, isRunning, ticksPerBeat]);

  return { currMeasureIndex, currMeasureOffset, currBeatIndex, currNoteIndex };
}
