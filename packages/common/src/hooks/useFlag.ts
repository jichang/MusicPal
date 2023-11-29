import { useCallback, useState } from 'react';

export function useFlag(initial: boolean) {
  const [flag, setFlag] = useState(initial);

  const turnOn = useCallback(() => {
    setFlag(true);
  }, [setFlag]);
  const turnOff = useCallback(() => {
    setFlag(false);
  }, [setFlag]);
  const toggle = useCallback(() => {
    setFlag((flag) => {
      return !flag;
    });
  }, [setFlag]);

  return {
    flag,
    turnOn,
    turnOff,
    toggle,
  };
}
