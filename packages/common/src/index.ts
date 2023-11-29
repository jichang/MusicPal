export * from './hooks/useFlag';

export interface IdOption {
  prefix?: string;
}

export function getId(option: IdOption = {}) {
  const { prefix } = option;

  const parts = [String(Date.now()), String(Math.floor(Math.random() * 10000))];
  if (prefix) {
    parts.splice(0, 0, prefix);
  }

  return parts.join('.');
}

export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_MINUTE =
  SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
