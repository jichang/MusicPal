import * as Tone from 'tone';

export const notes: Tone.Unit.Note[] = [
  "Cbb-4", "Cb-4", "C-4", "C#-4", "Cx-4", "Dbb-4", "Db-4", "D-4", "D#-4", "Dx-4", "Ebb-4", "Eb-4", "E-4", "E#-4", "Ex-4", "Fbb-4", "Fb-4", "F-4", "F#-4", "Fx-4", "Gbb-4", "Gb-4", "G-4", "G#-4", "Gx-4", "Abb-4", "Ab-4", "A-4", "A#-4", "Ax-4", "Bbb-4", "Bb-4", "B-4", "B#-4", "Bx-4",
  "Cbb-3", "Cb-3", "C-3", "C#-3", "Cx-3", "Dbb-3", "Db-3", "D-3", "D#-3", "Dx-3", "Ebb-3", "Eb-3", "E-3", "E#-3", "Ex-3", "Fbb-3", "Fb-3", "F-3", "F#-3", "Fx-3", "Gbb-3", "Gb-3", "G-3", "G#-3", "Gx-3", "Abb-3", "Ab-3", "A-3", "A#-3", "Ax-3", "Bbb-3", "Bb-3", "B-3", "B#-3", "Bx-3",
  "Cbb-2", "Cb-2", "C-2", "C#-2", "Cx-2", "Dbb-2", "Db-2", "D-2", "D#-2", "Dx-2", "Ebb-2", "Eb-2", "E-2", "E#-2", "Ex-2", "Fbb-2", "Fb-2", "F-2", "F#-2", "Fx-2", "Gbb-2", "Gb-2", "G-2", "G#-2", "Gx-2", "Abb-2", "Ab-2", "A-2", "A#-2", "Ax-2", "Bbb-2", "Bb-2", "B-2", "B#-2", "Bx-2",
  "Cbb-1", "Cb-1", "C-1", "C#-1", "Cx-1", "Dbb-1", "Db-1", "D-1", "D#-1", "Dx-1", "Ebb-1", "Eb-1", "E-1", "E#-1", "Ex-1", "Fbb-1", "Fb-1", "F-1", "F#-1", "Fx-1", "Gbb-1", "Gb-1", "G-1", "G#-1", "Gx-1", "Abb-1", "Ab-1", "A-1", "A#-1", "Ax-1", "Bbb-1", "Bb-1", "B-1", "B#-1", "Bx-1",
  "Cbb0", "Cb0", "C0", "C#0", "Cx0", "Dbb0", "Db0", "D0", "D#0", "Dx0", "Ebb0", "Eb0", "E0", "E#0", "Ex0", "Fbb0", "Fb0", "F0", "F#0", "Fx0", "Gbb0", "Gb0", "G0", "G#0", "Gx0", "Abb0", "Ab0", "A0", "A#0", "Ax0", "Bbb0", "Bb0", "B0", "B#0", "Bx0",
  "Cbb1", "Cb1", "C1", "C#1", "Cx1", "Dbb1", "Db1", "D1", "D#1", "Dx1", "Ebb1", "Eb1", "E1", "E#1", "Ex1", "Fbb1", "Fb1", "F1", "F#1", "Fx1", "Gbb1", "Gb1", "G1", "G#1", "Gx1", "Abb1", "Ab1", "A1", "A#1", "Ax1", "Bbb1", "Bb1", "B1", "B#1", "Bx1",
  "Cbb2", "Cb2", "C2", "C#2", "Cx2", "Dbb2", "Db2", "D2", "D#2", "Dx2", "Ebb2", "Eb2", "E2", "E#2", "Ex2", "Fbb2", "Fb2", "F2", "F#2", "Fx2", "Gbb2", "Gb2", "G2", "G#2", "Gx2", "Abb2", "Ab2", "A2", "A#2", "Ax2", "Bbb2", "Bb2", "B2", "B#2", "Bx2",
  "Cbb3", "Cb3", "C3", "C#3", "Cx3", "Dbb3", "Db3", "D3", "D#3", "Dx3", "Ebb3", "Eb3", "E3", "E#3", "Ex3", "Fbb3", "Fb3", "F3", "F#3", "Fx3", "Gbb3", "Gb3", "G3", "G#3", "Gx3", "Abb3", "Ab3", "A3", "A#3", "Ax3", "Bbb3", "Bb3", "B3", "B#3", "Bx3",
  "Cbb4", "Cb4", "C4", "C#4", "Cx4", "Dbb4", "Db4", "D4", "D#4", "Dx4", "Ebb4", "Eb4", "E4", "E#4", "Ex4", "Fbb4", "Fb4", "F4", "F#4", "Fx4", "Gbb4", "Gb4", "G4", "G#4", "Gx4", "Abb4", "Ab4", "A4", "A#4", "Ax4", "Bbb4", "Bb4", "B4", "B#4", "Bx4",
  "Cbb5", "Cb5", "C5", "C#5", "Cx5", "Dbb5", "Db5", "D5", "D#5", "Dx5", "Ebb5", "Eb5", "E5", "E#5", "Ex5", "Fbb5", "Fb5", "F5", "F#5", "Fx5", "Gbb5", "Gb5", "G5", "G#5", "Gx5", "Abb5", "Ab5", "A5", "A#5", "Ax5", "Bbb5", "Bb5", "B5", "B#5", "Bx5",
  "Cbb6", "Cb6", "C6", "C#6", "Cx6", "Dbb6", "Db6", "D6", "D#6", "Dx6", "Ebb6", "Eb6", "E6", "E#6", "Ex6", "Fbb6", "Fb6", "F6", "F#6", "Fx6", "Gbb6", "Gb6", "G6", "G#6", "Gx6", "Abb6", "Ab6", "A6", "A#6", "Ax6", "Bbb6", "Bb6", "B6", "B#6", "Bx6",
  "Cbb7", "Cb7", "C7", "C#7", "Cx7", "Dbb7", "Db7", "D7", "D#7", "Dx7", "Ebb7", "Eb7", "E7", "E#7", "Ex7", "Fbb7", "Fb7", "F7", "F#7", "Fx7", "Gbb7", "Gb7", "G7", "G#7", "Gx7", "Abb7", "Ab7", "A7", "A#7", "Ax7", "Bbb7", "Bb7", "B7", "B#7", "Bx7",
  "Cbb8", "Cb8", "C8", "C#8", "Cx8", "Dbb8", "Db8", "D8", "D#8", "Dx8", "Ebb8", "Eb8", "E8", "E#8", "Ex8", "Fbb8", "Fb8", "F8", "F#8", "Fx8", "Gbb8", "Gb8", "G8", "G#8", "Gx8", "Abb8", "Ab8", "A8", "A#8", "Ax8", "Bbb8", "Bb8", "B8", "B#8", "Bx8",
  "Cbb9", "Cb9", "C9", "C#9", "Cx9", "Dbb9", "Db9", "D9", "D#9", "Dx9", "Ebb9", "Eb9", "E9", "E#9", "Ex9", "Fbb9", "Fb9", "F9", "F#9", "Fx9", "Gbb9", "Gb9", "G9", "G#9", "Gx9", "Abb9", "Ab9", "A9", "A#9", "Ax9", "Bbb9", "Bb9", "B9", "B#9", "Bx9",
  "Cbb10", "Cb10", "C10", "C#10", "Cx10", "Dbb10", "Db10", "D10", "D#10", "Dx10", "Ebb10", "Eb10", "E10", "E#10", "Ex10", "Fbb10", "Fb10", "F10", "F#10", "Fx10", "Gbb10", "Gb10", "G10", "G#10", "Gx10", "Abb10", "Ab10", "A10", "A#10", "Ax10", "Bbb10", "Bb10", "B10", "B#10", "Bx10",
  "Cbb11", "Cb11", "C11", "C#11", "Cx11", "Dbb11", "Db11", "D11", "D#11", "Dx11", "Ebb11", "Eb11", "E11", "E#11", "Ex11", "Fbb11", "Fb11", "F11", "F#11", "Fx11", "Gbb11", "Gb11", "G11", "G#11", "Gx11", "Abb11", "Ab11", "A11", "A#11", "Ax11", "Bbb11", "Bb11", "B11", "B#11", "Bx11"
]

export function generateRandomNote(): Tone.Unit.Note {
  const index = Math.floor(Math.random() * 10000) % notes.length;
  return notes[index];
}