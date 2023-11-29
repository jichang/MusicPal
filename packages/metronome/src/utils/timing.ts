import * as Comlink from 'comlink';

const intervalIds: Map<string, number> = new Map<string, number>();

export function setInterval(
  identity: string,
  callback: () => void,
  interval: number,
) {
  const intervalId = globalThis.setInterval(callback, interval);
  intervalIds.set(identity, intervalId);
}

export function clearInterval(identity: string) {
  const intervalId = intervalIds.get(identity);
  if (intervalId) {
    globalThis.clearInterval(intervalId);
    intervalIds.delete(identity);
  }
}

Comlink.expose({
  setInterval,
  clearInterval,
});
