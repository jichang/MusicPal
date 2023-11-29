import React, { useCallback } from "react";
import { Rhythm } from "@musicpal/metronome";
import { useLiveQuery } from "dexie-react-hooks";
import { useStorage } from "../storage.context";
import { Button, ConfigProvider, Empty, List, Card } from "antd";
import { Link } from "react-router-dom";
import { Localized } from "@fluent/react";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";

export interface PersonalRhythmListProps {
  onCreateRhythm: () => void;
}

export function PersonalRhythmList(props: PersonalRhythmListProps) {
  const { onCreateRhythm } = props;
  const { dexie } = useStorage();

  const rhythms = useLiveQuery(() => {
    return dexie.rhythms.where("category").equals("personal").toArray();
  }, [dexie]);

  const renderEmpty = useCallback(() => {
    return (
      <Empty description={<Localized id="no-rhythms">No Rhythms</Localized>}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreateRhythm}>
          <Localized id="create-rhythm">Create Rhythm</Localized>
        </Button>
      </Empty>
    );
  }, [onCreateRhythm]);

  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <Card
        title={<Localized id="rhythms">Rhythms</Localized>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onCreateRhythm}
          >
            <Localized id="create-rhythm">Create Rhythm</Localized>
          </Button>
        }
      >
        <List
          dataSource={rhythms}
          renderItem={(rhythm: Rhythm) => {
            const actions = [
              <Link to={`/metronome/${rhythm.id}`}>
                <ArrowRightOutlined />
                <Localized id="open">Open</Localized>
              </Link>,
            ];

            return (
              <List.Item actions={actions}>
                <List.Item.Meta title={rhythm.name} />
              </List.Item>
            );
          }}
        />
      </Card>
    </ConfigProvider>
  );
}
