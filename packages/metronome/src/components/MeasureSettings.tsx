import { InputNumber, Select } from "antd";
import React, { useCallback, useId, useState } from "react";
import {
  BeatsPerMinute,
  Measure,
  UNIFORM_BPM_60,
  VARYING_BPM_60,
} from "../utils/music";
import { Localized } from "@fluent/react";
import "./MeasureSettings.css";
import { Form, FormField, FormFieldGroup } from "./Form";

export interface MeasureSettingsProps {
  measure: Measure;
  onChangeRepeat: (repeat: number | null) => void;
  onChangeBeatsPerMinute: (beatsPerMinute: BeatsPerMinute) => void;
}

export function MeasureSettings(props: MeasureSettingsProps) {
  const { measure, onChangeRepeat, onChangeBeatsPerMinute } = props;
  const id = useId();

  const [uniformBeatsPerMinuteSpeed, setUniformBeatsPerMinuteSpeed] = useState(
    measure.beatsPerMinute.type === "uniform"
      ? measure.beatsPerMinute.speed
      : UNIFORM_BPM_60.speed,
  );

  const handleChangeUniformBeatsPerMinuteSpeed = useCallback(
    (speed: number | null) => {
      if (speed) {
        onChangeBeatsPerMinute({
          type: "uniform",
          speed,
        });
        setUniformBeatsPerMinuteSpeed(speed);
      }
    },
    [onChangeBeatsPerMinute],
  );

  const initialVaryingBeatsPerMinute =
    measure.beatsPerMinute.type === "uniform"
      ? VARYING_BPM_60
      : measure.beatsPerMinute;

  const [varyingBeatsPerMinuteBegin, setVaryingBeatsPerMinuteBegin] = useState(
    initialVaryingBeatsPerMinute.begin,
  );

  const [varyingBeatsPerMinuteEnd, setVaryingBeatsPerMinuteEnd] = useState(
    initialVaryingBeatsPerMinute.end,
  );

  const [varyingBeatsPerMinuteStep, setVaryingBeatsPerMinuteStep] = useState(
    initialVaryingBeatsPerMinute.step,
  );

  const handleChangeVaryingBeatsPerMinuteBegin = useCallback(
    (begin: number | null) => {
      if (begin) {
        onChangeBeatsPerMinute({
          type: "varying",
          begin,
          end: varyingBeatsPerMinuteEnd,
          step: varyingBeatsPerMinuteStep,
        });
        setVaryingBeatsPerMinuteBegin(begin);
      }
    },
    [
      varyingBeatsPerMinuteEnd,
      varyingBeatsPerMinuteStep,
      setVaryingBeatsPerMinuteBegin,
      onChangeBeatsPerMinute,
    ],
  );

  const handleChangeVaryingBeatsPerMinuteEnd = useCallback(
    (end: number | null) => {
      if (end) {
        onChangeBeatsPerMinute({
          type: "varying",
          begin: varyingBeatsPerMinuteBegin,
          end,
          step: varyingBeatsPerMinuteStep,
        });
        setVaryingBeatsPerMinuteEnd(end);
      }
    },
    [
      varyingBeatsPerMinuteBegin,
      varyingBeatsPerMinuteStep,
      setVaryingBeatsPerMinuteEnd,
      onChangeBeatsPerMinute,
    ],
  );

  const handleChangeVaryingBeatsPerMinuteStep = useCallback(
    (step: number | null) => {
      if (step) {
        onChangeBeatsPerMinute({
          type: "varying",
          begin: varyingBeatsPerMinuteBegin,
          end: varyingBeatsPerMinuteEnd,
          step,
        });
        setVaryingBeatsPerMinuteStep(step);
      }
    },
    [
      varyingBeatsPerMinuteBegin,
      varyingBeatsPerMinuteEnd,
      setVaryingBeatsPerMinuteStep,
      onChangeBeatsPerMinute,
    ],
  );

  const handleChangeType = useCallback(
    (value: BeatsPerMinute["type"]) => {
      if (value === "uniform") {
        onChangeBeatsPerMinute({
          type: value,
          speed: uniformBeatsPerMinuteSpeed,
        });
      } else {
        onChangeBeatsPerMinute({
          type: value,
          begin: varyingBeatsPerMinuteBegin,
          end: varyingBeatsPerMinuteEnd,
          step: varyingBeatsPerMinuteStep,
        });
      }
    },
    [
      uniformBeatsPerMinuteSpeed,
      varyingBeatsPerMinuteBegin,
      varyingBeatsPerMinuteEnd,
      varyingBeatsPerMinuteStep,
      onChangeBeatsPerMinute,
    ],
  );

  return (
    <Form autoComplete="off" name="settings">
      <FormField name={`${id}-repeat`} label="repeat">
        <InputNumber
          id={`${id}-repeat`}
          value={measure.repeat}
          onChange={onChangeRepeat}
        />
      </FormField>

      <FormField name={`${id}-type`} label="type">
        <Select<BeatsPerMinute["type"]>
          id={`${id}-type`}
          value={measure.beatsPerMinute.type}
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
      </FormField>
      {measure.beatsPerMinute.type === "uniform" ? (
        <FormField name={`${id}-speed`} label="speed">
          <InputNumber
            id={`${id}-speed`}
            min={1}
            value={uniformBeatsPerMinuteSpeed}
            onChange={handleChangeUniformBeatsPerMinuteSpeed}
          />
        </FormField>
      ) : (
        <FormFieldGroup>
          <FormField name={`${id}-begin`} label="begin">
            <InputNumber
              id={`${id}-begin`}
              min={1}
              value={varyingBeatsPerMinuteBegin}
              onChange={handleChangeVaryingBeatsPerMinuteBegin}
            />
          </FormField>

          <FormField name={`${id}-end`} label="end">
            <InputNumber
              id={`${id}-end`}
              min={1}
              value={varyingBeatsPerMinuteEnd}
              onChange={handleChangeVaryingBeatsPerMinuteEnd}
            />
          </FormField>

          <FormField name={`${id}-step`} label="step">
            <InputNumber
              id={`${id}-step`}
              min={1}
              value={varyingBeatsPerMinuteStep}
              onChange={handleChangeVaryingBeatsPerMinuteStep}
            />
          </FormField>
        </FormFieldGroup>
      )}
    </Form>
  );
}
