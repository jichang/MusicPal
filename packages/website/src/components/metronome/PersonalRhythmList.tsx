import React, { useCallback } from "react";
import { RhythmList } from "@musicpal/metronome";
import { useLiveQuery } from "dexie-react-hooks";
import { useStorage } from "../storage.context";
import { ConfigProvider, Empty } from "antd";
import { Link } from "react-router-dom";
import { Localized } from "@fluent/react";

export interface PersonalRhythmListProps {}

export function PersonalRhythmList(props: PersonalRhythmListProps) {
  const { dexie } = useStorage();

  const rhythms = useLiveQuery(() => {
    return dexie.rhythms.where("category").equals("personal").toArray();
  }, [dexie]);

  const renderEmpty = useCallback(() => {
    return (
      <Empty description={<Localized id="no-rhythms">No Rhythms</Localized>}>
        <Link to="/metronome/create">
          <Localized id="create">Create</Localized>
        </Link>
      </Empty>
    )
  }, []);

  return <ConfigProvider renderEmpty={renderEmpty}><RhythmList rhythms={rhythms ?? []} /></ConfigProvider>;
}
