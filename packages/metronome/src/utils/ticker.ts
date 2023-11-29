import * as Comlink from 'comlink';
import { Rhythm, UniformTempo, locate } from '@musicpal/music';
import { MILLISECONDS_PER_MINUTE } from '@musicpal/music';

export interface TickerTask {
  id: string;
  rhythm: Rhythm;
  tempo: UniformTempo;
  preparatoryTime: number;
  beginTime: number;
  ticksPerBeat: number;
  ticksCount: number;
}

export interface TickerTimer {
  preparatoryTimeoutId: number;
  beginTimeoutId: number;
  tickIntervalId: number | null;
}

const timerMap: Map<TickerTask['id'], TickerTimer> = new Map();

export enum TickType {
  First = 0,
  Middle = 1,
  Last = 2,
}

export interface Tick {
  measureIndex: number;
  measureOffset: number;
  beatIndex: number;
  beatOffset: number;
  noteIndex: number;
  noteOffset: number;
  tickIndex: number;
}

export interface TickerPreparatoryEvent {
  type: 'preparatory';
}

export interface TickerTickEvent {
  type: 'tick';
  tick: Tick;
}

export type TickerEvent = TickerPreparatoryEvent | TickerTickEvent;

export function startTask(
  task: TickerTask,
  callback: (event: TickerEvent, ticker: TickerTask) => void,
) {
  const {
    id,
    rhythm,
    preparatoryTime,
    beginTime,
    tempo,
    ticksCount,
    ticksPerBeat,
  } = task;
  let tickIndex = -1;
  const handleTick = () => {
    tickIndex++;
    const {
      measureIndex,
      measureOffset,
      beatIndex,
      beatOffset,
      noteIndex,
      noteOffset,
    } = locate(rhythm, ticksPerBeat, tickIndex);
    callback(
      {
        type: 'tick',
        tick: {
          measureOffset,
          measureIndex,
          beatIndex,
          beatOffset,
          noteIndex,
          noteOffset,
          tickIndex,
        },
      },
      task,
    );

    if (tickIndex >= ticksCount - 1) {
      const timer = timerMap.get(task.id);
      if (timer?.tickIntervalId) {
        self.clearInterval(timer?.tickIntervalId);
        timer.tickIntervalId = null;
      }
    }
  };

  const tickInterval = MILLISECONDS_PER_MINUTE / (ticksPerBeat * tempo.speed);
  const handleTickerBegin = () => {
    const timer = timerMap.get(task.id);
    if (timer) {
      timer.tickIntervalId = self.setInterval(handleTick, tickInterval);
    }
  };

  const handleTickerPreparatory = () => {
    callback({ type: 'preparatory' }, task);
  };

  const preparatoryTimeoutId = self.setTimeout(
    handleTickerPreparatory,
    preparatoryTime,
  );
  const beginTimeoutId = self.setTimeout(
    handleTickerBegin,
    beginTime - tickInterval,
  );
  const timer: TickerTimer = {
    beginTimeoutId,
    preparatoryTimeoutId,
    tickIntervalId: null,
  };

  timerMap.set(id, timer);
}

export function stopTask(task: TickerTask) {
  const timer = timerMap.get(task.id);

  if (timer?.preparatoryTimeoutId) {
    self.clearTimeout(timer.preparatoryTimeoutId);
  }

  if (timer?.beginTimeoutId) {
    self.clearTimeout(timer.beginTimeoutId);
  }

  if (timer?.tickIntervalId) {
    self.clearInterval(timer.tickIntervalId);
  }
}

export interface TickerWorker {
  startTask: typeof startTask;
  stopTask: typeof stopTask;
}

Comlink.expose({
  startTask,
  stopTask,
});
