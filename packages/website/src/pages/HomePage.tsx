import React, { useCallback } from "react";
import { Button, Dropdown, List, MenuProps } from "antd";
import { PlaySquareOutlined, TranslationOutlined } from "@ant-design/icons";
import { Localized } from "@fluent/react";
import "./HomePage.css";
import { useAppContext } from "../components/app.context";
import { RESOURCES_LABELS } from "../i18n";

export function HomePage() {
  const items: MenuProps["items"] = [
    {
      label: RESOURCES_LABELS["en-US"],
      key: "en-US",
    },
    {
      label: RESOURCES_LABELS["zh-CN"],
      key: "zh-CN",
    },
  ];

  const { locale, changeLocale } = useAppContext();
  const handleLocaleChanged = useCallback(
    ({ key }: { key: string }) => {
      changeLocale(key);
    },
    [changeLocale]
  );

  return (
    <div className="page page--home">
      <div className="page__header">
        <Dropdown
          menu={{
            items,
            onClick: handleLocaleChanged,
          }}
        >
          <Button icon={<TranslationOutlined />}>
            {RESOURCES_LABELS[locale]}
          </Button>
        </Dropdown>
      </div>
      <div className="page__content">
        <List bordered>
          <List.Item
            actions={[
              <Button
                type="link"
                icon={<PlaySquareOutlined />}
                href="/metronome"
              >
                <Localized id="open">Open</Localized>
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<Localized id="metronome" />}
              description={<Localized id="metronome-description" />}
            />
          </List.Item>
        </List>
      </div>
    </div>
  );
}
