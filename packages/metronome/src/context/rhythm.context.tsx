import React, { useContext } from 'react';

export interface RhythmContextProviderValue {
  editable: boolean;
}

export const RhythmContext = React.createContext<RhythmContextProviderValue>({
  editable: false,
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
