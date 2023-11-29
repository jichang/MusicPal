import * as Comlink from 'comlink';

export interface TickerTask {
  id: string;
  delay: number;
  interval: number;
}

export interface TickerTimer {
  timeoutId: number;
  intervalId?: number;
}

const timerMap: Map<string, TickerTimer> = new Map<string, TickerTimer>();

export function startTask(
  task: TickerTask,
  callback: (ticker: TickerTask) => void,
) {
  const handleInterval = () => {
    callback(task);
  };

  const handleTimeout = () => {
    const timer = timerMap.get(task.id);
    if (timer) {
      timer.intervalId = self.setInterval(handleInterval, task.interval);
    }
  };

  const timeoutId = self.setTimeout(handleTimeout, task.delay);
  const timer: TickerTimer = {
    timeoutId,
  };

  timerMap.set(task.id, timer);
}

export function stopTask(task: TickerTask) {
  const timer = timerMap.get(task.id);
  if (timer?.timeoutId) {
    self.clearTimeout(timer.timeoutId);
  }
  if (timer?.intervalId) {
    self.clearInterval(timer.intervalId);
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
