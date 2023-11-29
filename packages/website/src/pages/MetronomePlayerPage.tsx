import React, { useState } from "react";
import "./MetronomePlayerPage.css";
import { GoBack } from "../components/GoBack";
import { useStorage } from "../components/storage.context";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router-dom";
import { RhythmEditor } from "../components/metronome/RhythmEditor";
import { Fill } from "../components/Fill";
import { useFlag } from "../hooks/useFlag";
import { FloatButton } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";

export function MetronomePlayerPage() {
  const { id } = useParams();
  const { dexie } = useStorage();

  const rhythm = useLiveQuery(() => {
    if (id) {
      return dexie.rhythms.get(id);
    }
  }, [dexie, id]);

  const { flag: isRunning, turnOn: start, turnOff: stop } = useFlag(false);

  const [beatsPerMinute, setBeatsPerMinute] = useState(120);

  return (
    <div className="page page--metronome-player">
      <div className="page__header">
        <GoBack />
        <Fill>
          <p className="page__header__title">{rhythm?.name}</p>
        </Fill>
      </div>
      <div className="page__content">
        {rhythm ? (
          <RhythmEditor
            isRunning={isRunning}
            rhythm={rhythm}
            beatsPerMinute={beatsPerMinute}
          />
        ) : null}
      </div>
      <FloatButton icon={<PlayCircleFilled />} onClick={start} />
    </div>
  );
}
