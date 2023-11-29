import { useContext } from 'react';
import { WebAudioContext } from '../context/webaudio.context';

export function useWebAudio() {
  const context = useContext(WebAudioContext);
  if (!context) {
    throw new Error('audio context is not initialized');
  }

  return context;
}
