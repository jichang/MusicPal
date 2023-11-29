import React, { useCallback, useState } from "react";
import { UNIFORM_BPM_60, BeatsPerMinute, VARYING_BPM_60 } from "../utils/music";
import { InputNumber, Select } from "antd";
import { Localized } from "@fluent/react";

export interface BeatsPerMinuteAdjusterProps {
  beatsPerMinute: BeatsPerMinute;
  onChange: (beatsPerMinute: BeatsPerMinute) => void;
}

export function BeatsPerMinuteAdjuster(props: BeatsPerMinuteAdjusterProps) {
  const { beatsPerMinute, onChange } = props;

  const [uniformBeatsPerMinuteSpeed, setUniformBeatsPerMinuteSpeed] = useState(
    beatsPerMinute.type === "uniform"
      ? beatsPerMinute.speed
      : UNIFORM_BPM_60.speed
  );

  const [varyingBeatsPerMinuteFrom, setVaryingBeatsPerMinuteFrom] = useState(
    beatsPerMinute.type === "uniform"
      ? VARYING_BPM_60.from
      : beatsPerMinute.from
  );

  const [varyingBeatsPerMinuteTo, setVaryingBeatsPerMinuteTo] = useState(
    beatsPerMinute.type === "uniform" ? VARYING_BPM_60.to : beatsPerMinute.to
  );

  const [varyingBeatsPerMinuteStep, setVaryingBeatsPerMinuteStep] = useState(
    beatsPerMinute.type === "uniform"
      ? VARYING_BPM_60.step
      : beatsPerMinute.step
  );

  const handleOnChange = useCallback(
    (beatsPerMinute: BeatsPerMinute) => {
      onChange(beatsPerMinute);
    },
    [onChange]
  );

  const handleChangeType = useCallback(
    (value: BeatsPerMinute["type"]) => {
      if (value === "uniform") {
        handleOnChange({ type: value, speed: uniformBeatsPerMinuteSpeed });
      } else {
        handleOnChange({
          type: value,
          from: varyingBeatsPerMinuteFrom,
          to: varyingBeatsPerMinuteTo,
          step: varyingBeatsPerMinuteStep,
        });
      }
    },
    [
      uniformBeatsPerMinuteSpeed,
      varyingBeatsPerMinuteFrom,
      varyingBeatsPerMinuteTo,
      varyingBeatsPerMinuteStep,
      handleOnChange,
    ]
  );

  return (
    <div>
      <Select<BeatsPerMinute["type"]>
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
        onChange={handleChangeType}
      />
      {beatsPerMinute.type === "uniform" ? (
        <>
          <InputNumber value={uniformBeatsPerMinuteSpeed} />
        </>
      ) : (
        <>
          <InputNumber value={varyingBeatsPerMinuteFrom} />
          <InputNumber value={varyingBeatsPerMinuteTo} />
          <InputNumber value={varyingBeatsPerMinuteStep} />
        </>
      )}
    </div>
  );
}
