import React, { useContext } from 'react';
import { createContext } from 'react';
import { Rhythm } from '@musicpal/music';
import Dexie, { Table } from 'dexie';

export class MusicPalDexie extends Dexie {
  rhythms!: Table<Rhythm>;

  constructor() {
    super('musicpal');

    this.version(1).stores({
      rhythms:
        '++id, name, createdTime, updatedTime, preparatoryBeats, order, tempo, measures',
    });
  }

  init() {}
}

export const StorageContext = createContext<{ dexie: MusicPalDexie | null }>({
  dexie: null,
});

export interface StorageContextProviderProps {
  dexie: MusicPalDexie;
  children: React.ReactNode;
}

export function StorageContextProvider(props: StorageContextProviderProps) {
  const { dexie, children } = props;

  return (
    <StorageContext.Provider value={{ dexie }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const { dexie } = useContext(StorageContext);
  if (!dexie) {
    throw new Error('unable to get dexie storage');
  }

  return { dexie };
}
