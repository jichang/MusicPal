export interface UniformTempo {
  type: 'uniform';
  speed: number;
}

export interface VaryingTempo {
  type: 'varying';
  begin: number;
  step: number;
  end: number;
}

export type Tempo = UniformTempo | VaryingTempo;

export enum Dynamics {
  None = 0,
  Light,
  Accent,
  Invalid,
}

export interface Note {
  dynamics: Dynamics;
}

export interface Beat {
  notes: Note[];
}
export interface Measure {
  repeat: number;
  beats: Beat[];
}

export interface Rhythm {
  id: string;
  name: string;
  order: number;
  tempo: Tempo;
  createdTime: Date;
  updatedTime: Date;
  measures: Measure[];
}
