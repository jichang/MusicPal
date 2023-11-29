import React, { useCallback, useState } from "react";
import "./Metronome.css";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { PersonalRhythmList } from "./PersonalRhythmList";
import { DefaultRhythmList } from "./DefaultRhythmList";
import { useNavigate } from "react-router-dom";

export type TabsItems = TabsProps["items"];

export function Metronome() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(() => {
    const url = new URL(window.location.href);
    return url.searchParams.get("tabkey") || "default";
  });

  const items: TabsItems = [
    {
      key: "personal",
      label: "Personal",
      children: <PersonalRhythmList />,
    },
    {
      key: "default",
      label: "Default",
      children: <DefaultRhythmList />,
    },
  ];

  const handleTabChanged = useCallback(
    (activeKey: string) => {
      setActiveKey(activeKey);
      navigate({
        pathname: "/metronome",
        search: `?tabkey=${activeKey}`,
      });
    },
    [navigate, setActiveKey]
  );

  return (
    <div className="metronome">
      <Tabs activeKey={activeKey} items={items} onChange={handleTabChanged} />
    </div>
  );
}
