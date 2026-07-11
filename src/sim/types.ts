// Scenario model for the play simulator. Every scenario is a small
// timeline: actors move through waypoints in field coordinates (feet, see
// geometry.ts) over `duration` seconds, and a single master clock drives
// them all.

export type SimCrew = 'two' | 'four';

// mechanics — the play freezes at `freezeAt`, the quizzed seat is asked
// for their move, and the rest of the timeline plays as the reveal.
// call — the whole play runs (replayable), then the question is asked.
export type SimKind = 'mechanics' | 'call';

export type ActorKind = 'umpire' | 'runner' | 'fielder' | 'ball';

export interface Waypoint {
  t: number; // seconds from scenario start
  x: number;
  y: number;
  s?: number; // marker scale, used to suggest ball height (default 1)
}

export interface SimActor {
  id: string;
  kind: ActorKind;
  label: string; // PU, U1, BR, R2, F8…
  quizzed?: boolean; // the seat the question puts you in
  waypoints: Waypoint[]; // sorted by t; a single waypoint means static
}

export interface SimCaption {
  t: number;
  text: string;
}

export interface SimScenario {
  id: string;
  crew: SimCrew;
  kind: SimKind;
  group: string; // library grouping, e.g. "Rotations"
  title: string;
  setup: string; // situation line shown before the play starts
  seat: string; // whose shoes you're in
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  freezeAt?: number; // mechanics only
  duration: number;
  actors: SimActor[];
  captions?: SimCaption[];
}
