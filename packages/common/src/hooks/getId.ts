
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
