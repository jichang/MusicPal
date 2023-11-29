import React from "react";
import { List } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useStorage } from "../storage.context";
import { RhythmList } from "@musicpal/metronome";

export interface DefaultRhythmListProps {}

export function DefaultRhythmList(props: DefaultRhythmListProps) {
  const { dexie } = useStorage();

  const rhythms = useLiveQuery(() => {
    return dexie.rhythms.where("category").equals("default").toArray();
  }, [dexie]);

  return <RhythmList rhythms={rhythms ?? []} />;
}
