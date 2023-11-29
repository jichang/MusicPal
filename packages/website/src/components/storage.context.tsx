import React, { useContext } from "react";
import { createContext } from "react";
import {
  DUPLETS_RHYTHM,
  Rhythm,
  SINGLE_RHYTHM,
  TRIPLETS_RHYTHM,
} from "@musicpal/metronome";
import Dexie, { Table } from "dexie";

export class MusicPalDexie extends Dexie {
  rhythms!: Table<Rhythm>;

  constructor() {
    super("musicpal");

    this.version(1).stores({
      rhythms: "++id, name, category, order, measures",
    });
  }

  init() {
    this.rhythms.bulkAdd([SINGLE_RHYTHM, DUPLETS_RHYTHM, TRIPLETS_RHYTHM]);
  }
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
    throw new Error("unable to get dexie storage");
  }

  return { dexie };
}
