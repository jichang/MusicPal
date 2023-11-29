export * from './context/audio.context';
export * from './components/AudioContextProvider';
export * from './hooks/useFlag';
export * from './hooks/useSoundAnalyser';
export * from './hooks/getId';

export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_MINUTE =
  SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
