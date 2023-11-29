import React from 'react';
import { WebAudioContext } from '../context/webaudio.context';

export interface WebAudioContextProviderProps {
  audioContext: AudioContext;
  children: React.ReactNode;
}

export function WebAudioContextProvider(props: WebAudioContextProviderProps) {
  const { children, audioContext } = props;

  return (
    <WebAudioContext.Provider value={{ audioContext }}>
      {children}
    </WebAudioContext.Provider>
  );
}
