import * as Comlink from 'comlink';

const intervalMap: Map<string, number> = new Map<string, number>();

export function setInterval(
  identity: string,
  callback: (identity: string) => void,
  interval: number,
) {
  const handleInterval = () => {
    callback(identity);
  };

  const intervalId = self.setInterval(handleInterval, interval);
  intervalMap.set(identity, intervalId);
}

export function clearInterval(identity: string) {
  const intervalId = intervalMap.get(identity);
  if (intervalId) {
    self.clearInterval(intervalId);
    intervalMap.delete(identity);
  }
}

export interface TimingWorker {
  setInterval: typeof setInterval;
  clearInterval: typeof clearInterval;
}

Comlink.expose({
  setInterval,
  clearInterval,
});
