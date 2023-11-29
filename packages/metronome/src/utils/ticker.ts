import * as Comlink from 'comlink';

export interface TickerTask {
  id: string;
  delay: number;
  interval: number;
}

export interface TickerTimer {
  timeoutId?: number;
  intervalId?: number;
}

const timerMap: Map<string, TickerTimer> = new Map<string, TickerTimer>();

export function startTask(
  task: TickerTask,
  callback: (ticker: TickerTask) => void,
) {
  const timer: TickerTimer = {};
  const handleInterval = () => {
    callback(task);
  };

  if (task.delay) {
    const handleTimeout = () => {
      timer.intervalId = self.setInterval(handleInterval, task.interval);
    };

    timer.timeoutId = self.setTimeout(handleTimeout, task.delay);
  } else {
    timer.intervalId = self.setInterval(handleInterval, task.interval);
  }

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
  stopTask
});
