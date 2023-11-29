import React, { useCallback } from "react";
import { Button, ConfigProvider, Empty, Space, List } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useStorage } from "../storage.context";
import { Rhythm } from "@musicpal/metronome";
import { Localized } from "@fluent/react";
import { Link } from "react-router-dom";
import { PlayCircleOutlined, EditOutlined } from "@ant-design/icons";

export interface DefaultRhythmListProps {}

export function DefaultRhythmList(props: DefaultRhythmListProps) {
  const { dexie } = useStorage();

  const rhythms = useLiveQuery(() => {
    return dexie.rhythms.where("category").equals("default").toArray();
  }, [dexie]);

  return (
    <List
      bordered
      header={
        <Space>
          <Localized id="rhythms">Rhythms</Localized>
        </Space>
      }
      dataSource={rhythms}
      renderItem={(rhythm: Rhythm) => {
        const actions = [
          <Link to={`/metronome/${rhythm.id}`}>
            <PlayCircleOutlined />
            <Localized id="play">Play</Localized>
          </Link>,
        ];

        return (
          <List.Item actions={actions}>
            <List.Item.Meta
              title={<Localized id={rhythm.name}>{rhythm.name}</Localized>}
            />
          </List.Item>
        );
      }}
    />
  );
}
