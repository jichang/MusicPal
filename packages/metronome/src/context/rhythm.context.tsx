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
  currMeasureIndex: -1,
  currMeasureOffset: -1,
  currBeatIndex: -1,
  currNoteIndex: -1,
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
