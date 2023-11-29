import React, { useContext } from 'react';

export interface RhythmContextProviderValue {
  editable: boolean;
  currMeasureIndex: number;
  currMeasureOffset: number;
  currBeatIndex: number;
  currNoteIndex: number;
}

export const RhythmContext = React.createContext<RhythmContextProviderValue>({
  editable: true,
  currMeasureIndex: 0,
  currMeasureOffset: 0,
  currBeatIndex: 0,
  currNoteIndex: 0,
});

export interface RhythmContextProviderProps extends RhythmContextProviderValue {
  children: React.ReactNode;
}

export function RhythmContextProvider(props: RhythmContextProviderProps) {
  const { children, ...rest } = props;

  return (
    <RhythmContext.Provider value={rest}>{children}</RhythmContext.Provider>
  );
}

export function useRhythmContext() {
  return useContext(RhythmContext);
}
