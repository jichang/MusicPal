import React, { useCallback } from "react";
import { Rhythm } from "@musicpal/metronome";
import { useLiveQuery } from "dexie-react-hooks";
import { useStorage } from "../storage.context";
import { Button, ConfigProvider, Empty, Space, List } from "antd";
import { Link } from "react-router-dom";
import { Localized } from "@fluent/react";
import { PlayCircleOutlined, EditOutlined } from "@ant-design/icons";

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
    );
  }, []);

  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <List
        bordered
        header={
          <Space>
            <Localized id="rhythms">Rhythms</Localized>
            <Space />
            <Link to="/metronome/create">
              <Localized id="create">Create</Localized>
            </Link>
          </Space>
        }
        dataSource={rhythms}
        renderItem={(rhythm: Rhythm) => {
          const actions = [
            <Link to={`/metronome/${rhythm.id}`}>
              <PlayCircleOutlined />
              <Localized id="play">Play</Localized>
            </Link>,
            <Button icon={<EditOutlined />}>Edit</Button>,
          ];

          return (
            <List.Item actions={actions}>
              <List.Item.Meta title={rhythm.name} />
            </List.Item>
          );
        }}
      />
    </ConfigProvider>
  );
}
