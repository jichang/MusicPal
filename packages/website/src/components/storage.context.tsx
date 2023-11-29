import React, { useContext } from "react";
import { createContext } from "react";
import { Dynamics, Rhythm } from "@musicpal/metronome";
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
    this.rhythms.bulkAdd([
      {
        id: "0",
        name: "Rhythm4x4",
        category: "default",
        order: 0,
        measures: [
          {
            repeat: 1,
            beats: [
              {
                repeat: 1,
                notes: [
                  {
                    dynamics: Dynamics.Strong,
                  },
                  { dynamics: Dynamics.Light },
                  { dynamics: Dynamics.Light },
                  { dynamics: Dynamics.Light },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1",
        name: "Rhythm8x4",
        category: "default",
        order: 1,
        measures: [
          {
            repeat: 1,
            beats: [
              {
                repeat: 1,
                notes: [
                  {
                    dynamics: Dynamics.Strong,
                  },
                  { dynamics: Dynamics.Light },
                  { dynamics: Dynamics.Light },
                  { dynamics: Dynamics.Light },
                  {
                    dynamics: Dynamics.Strong,
                  },
                  { dynamics: Dynamics.Light },
                  { dynamics: Dynamics.Light },
                  { dynamics: Dynamics.Light },
                ],
              },
            ],
          },
        ],
      },
    ]);
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
