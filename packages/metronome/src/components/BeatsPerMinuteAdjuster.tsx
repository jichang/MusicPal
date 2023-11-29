import React, { useCallback, useState } from "react";
import { BeatsPerMinute } from "../utils/music";
import { Select } from "antd";
import { Localized } from "@fluent/react";

export interface BeatsPerMinuteAdjusterProps {
  beatsPerMinute: BeatsPerMinute;
  onChange: (beatsPerMinute: BeatsPerMinute) => void;
}

export function BeatsPerMinuteAdjuster(props: BeatsPerMinuteAdjusterProps) {
  const { beatsPerMinute, onChange } = props;

  const [type, setType] = useState(beatsPerMinute.type);

  const handleOnChange = useCallback(() => {}, [beatsPerMinute, onChange]);

  const handleChangeType = useCallback(() => {}, [beatsPerMinute, onChange]);

  return (
    <div>
      <Select
        value={beatsPerMinute.type}
        options={[
          {
            value: "uniform",
            label: <Localized id="uniform">Uniform</Localized>,
          },
          {
            value: "varying",
            label: <Localized id="varying">Varying</Localized>,
          },
        ]}
      />
    </div>
  );
}
