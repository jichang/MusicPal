import React, { useCallback, useState } from "react";
import "./MetronomeListPage.css";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { PersonalRhythmList } from "../components/metronome/PersonalRhythmList";
import { DefaultRhythmList } from "../components/metronome/DefaultRhythmList";
import { Link, useNavigate } from "react-router-dom";
import { Localized } from "@fluent/react";
import { ArrowLeftOutlined } from "@ant-design/icons";

export type TabsItems = TabsProps["items"];

export function MetronomeListPage() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(() => {
    const url = new URL(window.location.href);
    return url.searchParams.get("tabkey") || "personal";
  });

  const items: TabsItems = [
    {
      key: "personal",
      label: <Localized id="personal">Personal</Localized>,
      children: <PersonalRhythmList />,
    },
    {
      key: "default",
      label: <Localized id="default">Default</Localized>,
      children: <DefaultRhythmList />,
    },
  ];

  const handleTabChanged = useCallback(
    (activeKey: string) => {
      setActiveKey(activeKey);
      navigate(
        {
          pathname: "/metronome",
          search: `?tabkey=${activeKey}`,
        },
        {
          replace: true,
        }
      );
    },
    [navigate, setActiveKey]
  );

  return (
    <div className="page page--metronome">
      <div className="page__header">
        <Link to="/">
          <ArrowLeftOutlined />
          <Localized id="back">Back</Localized>
        </Link>
      </div>
      <div className="page__content">
        <Tabs activeKey={activeKey} items={items} onChange={handleTabChanged} />
      </div>
    </div>
  );
}
