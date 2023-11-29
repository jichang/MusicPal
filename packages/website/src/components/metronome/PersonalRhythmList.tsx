import React from "react";
import { RhythmList } from "@musicpal/metronome";
import { useLiveQuery } from "dexie-react-hooks";
import { useStorage } from "../storage.context";

export interface PersonalRhythmListProps {}

export function PersonalRhythmList(props: PersonalRhythmListProps) {
  const { dexie } = useStorage();

  const rhythms = useLiveQuery(() => {
    return dexie.rhythms.where("category").equals("personal").toArray();
  }, [dexie]);

  return <RhythmList rhythms={rhythms ?? []} />;
}
