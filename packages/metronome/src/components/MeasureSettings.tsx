import { InputNumber, Select } from 'antd';
import React, { FormEvent, useCallback, useId, useState } from 'react';
import { Localized } from '@fluent/react';
import './MeasureSettings.css';
import { Form, FormField, FormFieldGroup } from './Form';
import { Measure } from '@musicpal/music';
import { useRhythmContext } from '../context/rhythm.context';

export interface MeasureSettingsProps {
  measure: Measure;
  onChangeRepeat: (repeat: number | null) => void;
}

export function MeasureSettings(props: MeasureSettingsProps) {
  const { measure, onChangeRepeat } = props;
  const id = useId();

  const submit = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();
    },
    [onChangeRepeat],
  );

  const { editable } = useRhythmContext();

  return (
    <Form autoComplete="off" name="settings" onSubmit={submit}>
      <FormField name={`${id}-repeat`} label="repeat">
        <InputNumber
          disabled={!editable}
          id={`${id}-repeat`}
          value={measure.repeat}
          onChange={onChangeRepeat}
        />
      </FormField>
    </Form>
  );
}
