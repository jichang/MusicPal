import React, { useCallback } from "react";
import { ConfigProvider, Empty, List } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useStorage } from "../storage.context";
import { RhythmList } from "@musicpal/metronome";
import { Localized } from "@fluent/react";
import { Link } from "react-router-dom";

export interface DefaultRhythmListProps {}

export function DefaultRhythmList(props: DefaultRhythmListProps) {
  const { dexie } = useStorage();

  const rhythms = useLiveQuery(() => {
    return dexie.rhythms.where("category").equals("default").toArray();
  }, [dexie]);

  const renderEmpty = useCallback(() => {
    return (
      <Empty description={<Localized id="no-rhythms">No Rhythms</Localized>} />
    )
  }, []);

  return <ConfigProvider renderEmpty={renderEmpty}><RhythmList rhythms={rhythms ?? []} /></ConfigProvider>;
}
