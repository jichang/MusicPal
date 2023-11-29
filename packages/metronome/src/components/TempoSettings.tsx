import { InputNumber, Select } from 'antd';
import React, { useCallback, useId, useState } from 'react';
import { Localized } from '@fluent/react';
import './TempoSettings.css';
import { Form, FormField, FormFieldGroup } from './Form';
import { Tempo, UNIFORM_BPM_60, VARYING_BPM_60 } from '@musicpal/music';

export interface TempoSettingsProps {
  tempo: Tempo;
  onChangeTempo: (tempo: Tempo) => void;
}

export function TempoSettings(props: TempoSettingsProps) {
  const { tempo, onChangeTempo } = props;
  const id = useId();

  const [uniformTempoSpeed, setUniformTempoSpeed] = useState(
    tempo.type === 'uniform' ? tempo.speed : UNIFORM_BPM_60.speed,
  );

  const handleChangeUniformTempoSpeed = useCallback(
    (speed: number | null) => {
      if (speed) {
        onChangeTempo({
          type: 'uniform',
          speed,
        });
        setUniformTempoSpeed(speed);
      }
    },
    [onChangeTempo],
  );

  const initialVaryingTempo = tempo.type === 'uniform' ? VARYING_BPM_60 : tempo;

  const [varyingTempoBegin, setVaryingTempoBegin] = useState(
    initialVaryingTempo.begin,
  );

  const [varyingTempoEnd, setVaryingTempoEnd] = useState(
    initialVaryingTempo.end,
  );

  const [varyingTempoStep, setVaryingTempoStep] = useState(
    initialVaryingTempo.step,
  );

  const handleChangeVaryingTempoBegin = useCallback(
    (begin: number | null) => {
      if (begin) {
        onChangeTempo({
          type: 'varying',
          begin,
          end: varyingTempoEnd,
          step: varyingTempoStep,
        });
        setVaryingTempoBegin(begin);
      }
    },
    [varyingTempoEnd, varyingTempoStep, setVaryingTempoBegin, onChangeTempo],
  );

  const handleChangeVaryingTempoEnd = useCallback(
    (end: number | null) => {
      if (end) {
        onChangeTempo({
          type: 'varying',
          begin: varyingTempoBegin,
          end,
          step: varyingTempoStep,
        });
        setVaryingTempoEnd(end);
      }
    },
    [varyingTempoBegin, varyingTempoStep, setVaryingTempoEnd, onChangeTempo],
  );

  const handleChangeVaryingTempoStep = useCallback(
    (step: number | null) => {
      if (step) {
        onChangeTempo({
          type: 'varying',
          begin: varyingTempoBegin,
          end: varyingTempoEnd,
          step,
        });
        setVaryingTempoStep(step);
      }
    },
    [varyingTempoBegin, varyingTempoEnd, setVaryingTempoStep, onChangeTempo],
  );

  const handleChangeType = useCallback(
    (value: Tempo['type']) => {
      if (value === 'uniform') {
        onChangeTempo({
          type: value,
          speed: uniformTempoSpeed,
        });
      } else {
        onChangeTempo({
          type: value,
          begin: varyingTempoBegin,
          end: varyingTempoEnd,
          step: varyingTempoStep,
        });
      }
    },
    [
      uniformTempoSpeed,
      varyingTempoBegin,
      varyingTempoEnd,
      varyingTempoStep,
      onChangeTempo,
    ],
  );

  return (
    <Form autoComplete="off" name="tempo__settings" className="tempo__settings">
      <FormField name={`${id}-type`} label="type">
        <Select<Tempo['type']>
          id={`${id}-type`}
          value={tempo.type}
          options={[
            {
              value: 'uniform',
              label: <Localized id="uniform">Uniform</Localized>,
            },
            {
              value: 'varying',
              label: <Localized id="varying">Varying</Localized>,
            },
          ]}
          onChange={handleChangeType}
        />
      </FormField>
      {tempo.type === 'uniform' ? (
        <FormField name={`${id}-speed`} label="speed">
          <InputNumber
            id={`${id}-speed`}
            min={10}
            max={120}
            step={10}
            value={uniformTempoSpeed}
            onChange={handleChangeUniformTempoSpeed}
          />
        </FormField>
      ) : (
        <FormFieldGroup>
          <FormField name={`${id}-begin`} label="begin">
            <InputNumber
              id={`${id}-begin`}
              min={10}
              max={120}
              step={10}
              value={varyingTempoBegin}
              onChange={handleChangeVaryingTempoBegin}
            />
          </FormField>

          <FormField name={`${id}-end`} label="end">
            <InputNumber
              id={`${id}-end`}
              min={10}
              max={120}
              step={10}
              value={varyingTempoEnd}
              onChange={handleChangeVaryingTempoEnd}
            />
          </FormField>

          <FormField name={`${id}-step`} label="step">
            <InputNumber
              id={`${id}-step`}
              min={10}
              max={120}
              step={10}
              value={varyingTempoStep}
              onChange={handleChangeVaryingTempoStep}
            />
          </FormField>
        </FormFieldGroup>
      )}
    </Form>
  );
}
