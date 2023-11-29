import { useState } from 'react';

export function useAudioContext() {
  const [audioContext] = useState(() => {
    return new AudioContext();
  });

  return audioContext;
}
