import { createContext, useContext } from 'react';

export interface AudioContextValue {
  audioContext: AudioContext;
}

export const AudioContext = createContext<AudioContextValue | undefined>(
  undefined,
);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('audio context is not initialized');
  }

  return context;
}
