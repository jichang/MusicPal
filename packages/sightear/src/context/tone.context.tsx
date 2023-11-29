import { createContext, useContext } from 'react';
import * as Tone from 'tone';

export interface ToneContextValue {
  synth: Tone.Synth;
}

export const ToneContext = createContext<ToneContextValue | undefined>(
  undefined,
);

export function useTone() {
  const context = useContext(ToneContext);
  if (!context) {
    throw new Error('tone context is not initialized');
  }

  return context;
}
