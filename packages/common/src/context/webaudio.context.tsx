import { createContext } from 'react';

export interface WebAudioContextValue {
  audioContext: AudioContext;
}

export const WebAudioContext = createContext<WebAudioContextValue | undefined>(
  undefined,
);
