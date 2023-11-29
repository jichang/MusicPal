import { UniformTempo } from '@musicpal/music';
import { useEffect, useState } from 'react';
import * as Comlink from 'comlink';
import { TickerTask, TickerWorker } from '../utils/ticker';

export interface TempoTickerProps {
  worker: Comlink.Remote<TickerWorker>;
  tempo: UniformTempo;
  delay: number;
  interval: number;
  count: number;
  onTick: (tick: number, tempo: UniformTempo) => void;
}

export function TempoTicker(props: TempoTickerProps) {
  const { worker, count, delay, interval, tempo, onTick } = props;

  const [currTick, setCurrTick] = useState(0);

  useEffect(() => {
    if (interval && tempo) {
      const id = `Tick.${Date.now()}.${Math.random()}`;
      const task: TickerTask = {
        id,
        delay,
        interval,
      };

      let ticks = 0;
      const handleInterval = Comlink.proxy(() => {
        if (ticks < count) {
          ticks++;
          onTick(ticks, tempo);
        } else {
          worker.stopTask(task);
        }
      });

      worker.startTask(task, handleInterval);

      return () => {
        worker.stopTask(task);
      };
    }
  }, [worker, count, delay, tempo, interval, onTick]);

  return null;
}
