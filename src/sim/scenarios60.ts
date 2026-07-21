import {
  A_POS,
  B_POS,
  C_POS,
  D_POS,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
  FIRST,
  HOME,
  midpoint,
  MOUND,
  PO1,
  PO2_1B,
  PO3,
  POP,
  Pt,
  PU_ISP,
  SECOND,
  THIRD,
  U2_B,
  U2_C,
} from './geometry';
import { SimActor, SimScenario, Waypoint } from './types';

// The v1 scenario bank: 60-ft diamond, 2-man and 4-man crews. Movements
// follow the 2026 LL Umpire's Manual (sections 4 & 5), with one local
// override: our 2-man base umpire NEVER goes out on a fly ball — on any
// ball to the outfield BU pivots into the Working Area.

const pt = (x: number, y: number): Pt => ({ x, y });
const wp = (t: number, p: Pt, s?: number): Waypoint =>
  s === undefined ? { t, x: p.x, y: p.y } : { t, x: p.x, y: p.y, s };

function actor(
  id: string,
  kind: SimActor['kind'],
  label: string,
  waypoints: Waypoint[],
  quizzed = false,
): SimActor {
  return quizzed ? { id, kind, label, quizzed, waypoints } : { id, kind, label, waypoints };
}

// Every play opens the same way: the pitch leaves at 0.25s, reaches the
// plate at 0.8s, and contact happens there. Ball waypoints continue from
// the plate; the `s` scale suggests height on fly balls.
const CONTACT = 0.8;
const pitch = (): Waypoint[] => [wp(0, MOUND), wp(0.25, MOUND), wp(CONTACT, HOME)];
const fly = (target: Pt, landT: number, peak = 1.7): Waypoint[] => [
  ...pitch(),
  wp((CONTACT + landT) / 2, midpoint(HOME, target), peak),
  wp(landT, target),
];
const grounder = (target: Pt, landT: number): Waypoint[] => [...pitch(), wp(landT, target)];

// The defense: static markers for everyone except the fielders a play
// moves, whose full waypoint lists are passed in by label.
const SPOTS: Record<string, Pt> = { F1, F2, F3, F4, F5, F6, F7, F8, F9 };
function defense(moving: Record<string, Waypoint[]> = {}): SimActor[] {
  return Object.keys(SPOTS).map((label) =>
    actor(label.toLowerCase(), 'fielder', label, moving[label] ?? [wp(0, SPOTS[label])]),
  );
}

export const SIM_SCENARIOS: SimScenario[] = [
  // ══ 2-MAN ═══════════════════════════════════════════════════════════════

  {
    id: 'two-single-wa',
    crew: 'two',
    kind: 'mechanics',
    group: 'Working the base hit',
    title: 'Single to center, nobody on',
    setup: 'Nobody on, one out. You are the base umpire in the A position.',
    seat: 'BU',
    question: 'Clean single dropping in front of F8. What’s your move?',
    options: [
      'Pivot inside into the working area, chest to ball, and take the BR at first',
      'Go out toward center field for catch/no-catch',
      'Hold your ground in foul territory behind first base',
      'Trail the batter-runner up the line in foul territory',
    ],
    correctIndex: 0,
    explanation:
      'Inside/outside theory: on any ball to the outfield, BU pivots inside into the Working Area (our crews never go out in the 2-man system). With the BR holding at first, stop and drop-step toward the 30-foot line, staying chest to ball for a play back into first. Trailing the BR in foul ground is PU’s job, not yours.',
    freezeAt: 1.5,
    duration: 6.5,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(0, 115), 2.2, 1.4),
        wp(2.6, pt(0, 112)),
        wp(4.0, pt(16, 70)),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(4.0, FIRST),
        wp(4.7, midpoint(FIRST, SECOND, 0.2)),
        wp(5.6, FIRST),
      ]),
      actor('bu', 'umpire', 'BU', [
        wp(0, A_POS),
        wp(1.0, A_POS),
        wp(2.4, pt(10, 60)),
        wp(3.6, pt(18, 50)),
      ], true),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(0.9, PU_ISP),
        wp(2.2, pt(-10, 8)),
        wp(5.0, POP),
      ]),
      ...defense({
        F8: [wp(0, F8), wp(1.0, F8), wp(2.6, pt(0, 112))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Lined into center field…' },
      { t: 2.7, text: 'F8 plays it on a hop' },
      { t: 5.4, text: 'BR holds with a look back into first' },
    ],
  },

  {
    id: 'two-double-wa',
    crew: 'two',
    kind: 'mechanics',
    group: 'Working the base hit',
    title: 'Gap double, nobody on',
    setup: 'Nobody on, no outs. You are the base umpire in the A position.',
    seat: 'BU',
    question: 'The ball splits the right-center gap and the BR is thinking two. Where do you take this play?',
    options: [
      'Into the working area, letting the ball take you ahead of the BR toward second',
      'Chase the ball into right-center for catch/no-catch',
      'Stay at the A position — first base is yours no matter what',
      'Sprint straight to third to get ahead of a possible triple',
    ],
    correctIndex: 0,
    explanation:
      'Pivot inside into the Working Area — BU owns the BR at first, second, AND third, so let the ball take you to the play and close into the 2B cutout only when the play there is imminent. Overcommitting to third with the ball still in the gap leaves you dead if the BR stops at second. And in our 2-man system, BU never goes out.',
    freezeAt: 1.6,
    duration: 7.5,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(52, 128), 3.0),
        wp(3.6, pt(52, 124)),
        wp(5.2, pt(6, 88)),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(3.8, FIRST),
        wp(6.6, SECOND),
      ]),
      actor('bu', 'umpire', 'BU', [
        wp(0, A_POS),
        wp(1.0, A_POS),
        wp(2.4, pt(10, 60)),
        wp(4.6, pt(2, 72)),
        wp(5.6, pt(-2, 78)),
      ], true),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(0.9, PU_ISP),
        wp(2.2, pt(10, 8)),
        wp(5.5, POP),
      ]),
      ...defense({
        F9: [wp(0, F9), wp(1.0, F9), wp(3.6, pt(52, 124))],
        F8: [wp(0, F8), wp(1.0, F8), wp(3.4, pt(30, 130))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Driven into the right-center gap…' },
      { t: 3.7, text: 'F9 runs it down' },
      { t: 6.6, text: 'BR slides into second' },
    ],
  },

  {
    id: 'two-r1-first-to-third',
    crew: 'two',
    kind: 'mechanics',
    group: 'Runners on',
    title: 'First-to-third rotation',
    setup: 'R1 only, one out. You are the plate umpire.',
    seat: 'PU',
    question: 'R1 is off on the hit and the coach is waving him to third. What’s your rotation?',
    options: [
      'Up the third-base line in foul ground — “I’ve got third!” — and beat R1 there',
      'Stay at the point of the plate; BU owns every base',
      'Up the first-base line to watch the BR’s touch',
      'Into the middle of the infield to read the relay throw',
    ],
    correctIndex: 0,
    explanation:
      'With R1 only on a clean hit, PU executes the first-to-third rotation: clear the catcher, move up the 3B line in foul territory, communicate “I’ve got third,” and rotate aggressively — arriving with the runner is arriving late. Cut into fair territory when the play is imminent; on an overthrow, retreat home. BU pivots into the Working Area and has the BR at first and second.',
    freezeAt: 1.6,
    duration: 7.5,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(62, 105), 2.6, 1.3),
        wp(3.0, pt(62, 108)),
        wp(5.2, pt(-40, 46)),
      ]),
      actor('r1', 'runner', 'R1', [
        wp(0, FIRST),
        wp(0.9, FIRST),
        wp(3.6, SECOND),
        wp(6.2, THIRD),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(4.0, FIRST),
        wp(6.8, SECOND),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(2.4, pt(-20, 14)),
        wp(4.6, pt(-44, 38)),
        wp(5.8, pt(-36, 37)),
      ], true),
      actor('bu', 'umpire', 'BU', [
        wp(0, B_POS),
        wp(1.0, B_POS),
        wp(2.6, pt(4, 62)),
        wp(4.5, pt(4, 68)),
        wp(6.4, pt(8, 80)),
      ]),
      ...defense({
        F9: [wp(0, F9), wp(1.0, F9), wp(3.0, pt(62, 108))],
        F5: [wp(0, F5), wp(3.4, F5), wp(4.8, pt(-40, 47))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Base hit into right…' },
      { t: 2.6, text: 'R1 is being waved to third' },
      { t: 5.3, text: 'Throw comes to third — tag play!' },
    ],
  },

  {
    id: 'two-r1-fly-tagup',
    crew: 'two',
    kind: 'mechanics',
    group: 'Tag-ups',
    title: 'Fly ball with R1 halfway',
    setup: 'R1 only, nobody out. You are the base umpire in the B position.',
    seat: 'BU',
    question: 'Fly ball to center with R1 halfway. Whose is R1’s retouch — and where do you take it?',
    options: [
      'Yours — pivot into the working area and line up the tag-up at first',
      'PU’s — all retouches belong to the plate umpire',
      'Go out beyond the infield for the catch, then find R1',
      'Stay at B — you can see the touch fine from there',
    ],
    correctIndex: 0,
    explanation:
      'BU has all retouches at first and second in the 2-man system. Pivot inside into the Working Area, stay chest to ball for the catch, and glance to line up R1’s tag-up at first. PU owns catch/no-catch with runners on (and R3’s retouch when there is one). Standing still at B leaves you flat-footed if R1 advances after the catch.',
    freezeAt: 1.6,
    duration: 6.5,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(0, 138), 3.4, 1.9),
        wp(5.0, pt(-14, 70)),
      ]),
      actor('r1', 'runner', 'R1', [
        wp(0, FIRST),
        wp(0.9, FIRST),
        wp(2.6, midpoint(FIRST, SECOND, 0.45)),
        wp(4.0, FIRST),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(2.6, pt(30, 30)),
        wp(3.6, FIRST),
        wp(4.4, pt(50, 44)),
      ]),
      actor('bu', 'umpire', 'BU', [
        wp(0, B_POS),
        wp(1.0, B_POS),
        wp(2.6, pt(2, 62)),
        wp(4.4, pt(10, 58)),
      ], true),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(0.9, PU_ISP),
        wp(2.2, pt(-13, 4)),
        wp(5.0, POP),
      ]),
      ...defense({
        F8: [wp(0, F8), wp(1.0, F8), wp(3.3, pt(0, 137))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Fly ball, straightaway center — R1 holds up' },
      { t: 3.4, text: 'F8 makes the catch' },
      { t: 4.4, text: 'R1 back to tag — and he holds' },
    ],
  },

  {
    id: 'two-risp-plate',
    crew: 'two',
    kind: 'mechanics',
    group: 'Runners on',
    title: 'R2 rounding third on a single',
    setup: 'R2 only, two outs. You are the plate umpire.',
    seat: 'PU',
    question: 'R2 rounds third as the ball drops into left. What’s your move?',
    options: [
      'Handle priorities from the point of the plate and stay home — this play is coming to you',
      'Rotate up the third-base line for a play on R2 at third',
      'Drift up the first-base line to watch the BR’s touch',
      'Move toward the mound for a better view of the relay',
    ],
    correctIndex: 0,
    explanation:
      'With a runner in scoring position, PU works from the point of the plate and stays there — every play at home is yours, and this one is coming. The first-to-third rotation only exists with R1 only. BU pivots into the Working Area and owns the bases, including the BR sneaking into second on the throw.',
    freezeAt: 1.6,
    duration: 7.5,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(-52, 108), 2.5, 1.3),
        wp(2.9, pt(-54, 110)),
        wp(5.4, pt(-2, 4)),
      ]),
      actor('r2', 'runner', 'R2', [
        wp(0, SECOND),
        wp(0.9, SECOND),
        wp(3.4, THIRD),
        wp(6.0, HOME),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(4.0, FIRST),
        wp(6.8, SECOND),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(2.2, pt(-8, 2)),
        wp(4.2, POP),
      ], true),
      actor('bu', 'umpire', 'BU', [
        wp(0, C_POS),
        wp(1.0, C_POS),
        wp(2.6, pt(0, 62)),
        wp(6.5, pt(6, 74)),
      ]),
      ...defense({
        F7: [wp(0, F7), wp(1.0, F7), wp(2.9, pt(-54, 112))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Base hit to left — R2 is coming around' },
      { t: 5.4, text: 'Throw home… play at the plate!' },
      { t: 6.6, text: 'BR takes second on the throw' },
    ],
  },

  {
    id: 'two-gb-double-play',
    crew: 'two',
    kind: 'mechanics',
    group: 'Ground balls',
    title: 'Double-play ball with R1',
    setup: 'R1 only, nobody out. You are the plate umpire.',
    seat: 'PU',
    question: 'Ground ball to F6 with R1 — where are you while the double play turns?',
    options: [
      'Out from behind the plate and up the third-base line to watch the play at second',
      'Locked at the point of the plate for the whole play',
      'Up the first-base line immediately — runner’s lane is priority one',
      'Into the working area behind the mound',
    ],
    correctIndex: 0,
    explanation:
      'PU clears the catcher and moves out and up the 3B line in foul territory to observe the play at second — you’re responsible for assisting BU on the slide. Once R1 is retired, get over to the first-base line for a possible runner’s-lane violation on the relay, then work back to the plate. BU stays on the OUTSIDE on a ball hit on the infield and takes both calls.',
    freezeAt: 1.4,
    duration: 7,
    actors: [
      actor('ball', 'ball', '', [
        ...grounder(pt(-19, 66), 1.7),
        wp(1.9, pt(-19, 66)),
        wp(2.6, pt(1, 84)),
        wp(3.8, pt(43, 44)),
      ]),
      actor('r1', 'runner', 'R1', [
        wp(0, FIRST),
        wp(0.9, FIRST),
        wp(3.0, pt(2, 80)),
        wp(3.9, pt(-6, 88)),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(4.0, FIRST),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(2.4, pt(-22, 18)),
        wp(3.0, pt(-22, 18)),
        wp(4.2, pt(12, 13)),
        wp(6.0, POP),
      ], true),
      actor('bu', 'umpire', 'BU', [
        wp(0, B_POS),
        wp(1.0, B_POS),
        wp(2.4, pt(16, 76)),
        wp(3.4, pt(28, 60)),
      ]),
      ...defense({
        F6: [wp(0, F6), wp(1.0, F6), wp(1.7, pt(-20, 66))],
        F4: [wp(0, F4), wp(1.0, F4), wp(2.4, pt(2, 84))],
        F3: [wp(0, F3), wp(1.6, F3), wp(2.8, pt(44, 44))],
      }),
    ],
    captions: [
      { t: 1.7, text: 'Ground ball to short…' },
      { t: 2.7, text: 'Force at second — one!' },
      { t: 3.9, text: 'Relay to first… double play?' },
    ],
  },

  {
    id: 'two-call-tagup-early',
    crew: 'two',
    kind: 'call',
    group: 'What’s the call?',
    title: 'Did R2 leave early?',
    setup: 'R2 only, one out. You are the base umpire in the C position. Watch R2 and the catch closely.',
    seat: 'BU',
    question: 'The defense throws to second and steps on the bag, appealing R2’s tag-up. What do you have?',
    options: [
      'R2 is out on appeal — he left second before the ball was touched',
      'Safe — once R2 reaches third, the tag-up can no longer be appealed',
      'Dead ball — call time and send R2 back to second',
      'Safe — leaving early only matters if the defense tags the runner himself',
    ],
    correctIndex: 0,
    explanation:
      'A runner may leave the moment a fly ball is FIRST TOUCHED — and R2 broke while the ball was still in the air. That makes him liable on a live-ball appeal at the base he left; touching the base (or tagging the runner) with a verbal appeal is enough. Retouches at first and second are BU’s calls, so this one is yours. Reaching third safely protects nothing.',
    duration: 7.5,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(-62, 130), 3.6, 1.9),
        wp(5.2, pt(-16, 70)),
        wp(6.3, pt(0, 85)),
      ]),
      actor('r2', 'runner', 'R2', [
        wp(0, SECOND),
        wp(3.1, SECOND),
        wp(5.6, THIRD),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(2.8, pt(36, 36)),
        wp(3.8, pt(46, 40)),
      ]),
      actor('bu', 'umpire', 'BU', [
        wp(0, C_POS),
        wp(1.0, C_POS),
        wp(2.4, pt(-4, 62)),
        wp(6.0, pt(-8, 76)),
      ], true),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(0.9, PU_ISP),
        wp(2.2, pt(-14, 6)),
        wp(5.0, POP),
      ]),
      ...defense({
        F7: [wp(0, F7), wp(1.0, F7), wp(3.4, pt(-62, 128))],
        F6: [wp(0, F6), wp(5.2, F6), wp(6.2, pt(-2, 84))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Deep drive to left — R2 waits…' },
      { t: 3.1, text: 'R2 breaks for third…' },
      { t: 3.6, text: '…and NOW F7 makes the catch' },
      { t: 6.3, text: 'Defense appeals at second' },
    ],
  },

  {
    id: 'two-call-pulled-foot',
    crew: 'two',
    kind: 'call',
    group: 'What’s the call?',
    title: 'Pulled foot at first',
    setup: 'Nobody on, two outs. You are the base umpire, set for the play at first. Watch F3’s foot.',
    seat: 'BU',
    question: 'The throw beats the BR — but you saw F3’s foot. What’s the call?',
    options: [
      'Safe — F3 pulled off the bag before the ball arrived',
      'Out — the throw clearly beat the runner',
      'Out — contact with the base isn’t required on a force',
      'No call — freeze and ask PU what he had',
    ],
    correctIndex: 0,
    explanation:
      'A force out needs possession AND contact with the base before the runner arrives. F3 stretched so far he came off the bag a beat before the ball got there — that’s a safe, and it deserves the full mechanic: “Safe! Off the bag!” PU (trailing the BR) can help on a pulled foot if you ask, but you saw it; make the call.',
    duration: 6,
    actors: [
      actor('ball', 'ball', '', [
        ...grounder(pt(-29, 62), 1.8),
        wp(2.1, pt(-29, 62)),
        wp(3.5, FIRST),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(3.65, FIRST),
        wp(4.4, pt(52, 52)),
      ]),
      actor('bu', 'umpire', 'BU', [
        wp(0, A_POS),
        wp(1.0, A_POS),
        wp(2.6, pt(55, 34)),
      ], true),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(3.0, pt(16, 12)),
        wp(5.2, POP),
      ]),
      ...defense({
        F6: [wp(0, F6), wp(1.0, F6), wp(1.9, pt(-28, 62))],
        F3: [wp(0, F3), wp(1.8, F3), wp(2.6, pt(43, 45)), wp(3.3, pt(39, 47))],
      }),
    ],
    captions: [
      { t: 1.8, text: 'F6 ranges deep into the hole…' },
      { t: 3.3, text: 'F3 stretches… his foot comes off!' },
      { t: 3.6, text: 'Bang-bang at first' },
    ],
  },

  // ── Pickoffs & balks ──────────────────────────────────────────────────
  // The pitcher's feet tell the whole story: to first or third he's
  // committed and must throw; to second he may step or turn and hold; and
  // a throw to an unoccupied base is legal only when a runner is going
  // there. Every one of these is a PU read on the rubber.

  {
    id: 'two-po-first-legal',
    crew: 'two',
    kind: 'call',
    group: 'Pickoffs & balks',
    title: 'Step and throw to first',
    setup: 'R1 only, one out. You are the plate umpire — watch the pitcher’s feet.',
    seat: 'PU',
    question:
      'From the set, the pitcher steps directly toward first and throws over to F3 holding the bag. Balk?',
    options: [
      'Legal — a direct step toward first with a throw is a proper pickoff',
      'Balk — he must step off the rubber before any throw to first',
      'Balk — he never held the set position long enough',
      'Legal only because the runner was tagged',
    ],
    correctIndex: 0,
    explanation:
      'A pickoff to first is legal when the pitcher steps directly toward the base and throws — he does NOT have to disengage the rubber first. Once he commits toward first he must complete the throw, and he did. Clean pickoff attempt: play on.',
    duration: 4.5,
    actors: [
      actor('ball', 'ball', '', [wp(0, MOUND), wp(1.3, MOUND), wp(1.9, FIRST)]),
      actor('r1', 'runner', 'R1', [wp(0, pt(36, 49)), wp(1.3, pt(36, 49)), wp(2.0, FIRST)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)], true),
      actor('bu', 'umpire', 'BU', [wp(0, B_POS)]),
      ...defense({
        F1: [wp(0, MOUND), wp(1.3, MOUND), wp(1.6, pt(24, 44))],
        F3: [wp(0, FIRST)],
      }),
    ],
    captions: [
      { t: 0.7, text: 'R1 with a lead at first…' },
      { t: 1.4, text: 'Pitcher steps and throws to first!' },
      { t: 2.1, text: 'R1 dives back — but was it legal?' },
    ],
  },

  {
    id: 'two-po-first-balk',
    crew: 'two',
    kind: 'call',
    group: 'Pickoffs & balks',
    title: 'Started to first, no throw',
    setup: 'R1 only, nobody out. You are the plate umpire — watch the pitcher’s feet.',
    seat: 'PU',
    question:
      'The pitcher begins his move toward first, then pulls the arm down and does NOT throw. What do you have?',
    options: [
      'Balk — once he steps toward first he must complete the throw',
      'Legal — a pitcher may always abort a pickoff',
      'Legal — no throw means no play, so nothing happened',
      'Balk only if the runner was forced to advance',
    ],
    correctIndex: 0,
    explanation:
      'To first or third the pitcher is committed the instant he steps toward the base — he must throw. Starting the move and holding the ball is a balk. Second base is the lone exception, where he may step or turn and keep the ball.',
    duration: 4.5,
    actors: [
      actor('ball', 'ball', '', [wp(0, MOUND), wp(1.5, pt(18, 45)), wp(2.3, MOUND)]),
      actor('r1', 'runner', 'R1', [wp(0, pt(36, 49)), wp(1.5, pt(36, 49)), wp(2.1, FIRST)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)], true),
      actor('bu', 'umpire', 'BU', [wp(0, B_POS)]),
      ...defense({
        F1: [wp(0, MOUND), wp(1.3, MOUND), wp(1.7, pt(18, 45)), wp(2.4, MOUND)],
        F3: [wp(0, FIRST)],
      }),
    ],
    captions: [
      { t: 0.7, text: 'R1 with his lead…' },
      { t: 1.5, text: 'He starts toward first…' },
      { t: 2.2, text: '…and pulls it back — no throw' },
    ],
  },

  {
    id: 'two-po-second-turn',
    crew: 'two',
    kind: 'call',
    group: 'Pickoffs & balks',
    title: 'Inside turn to second',
    setup: 'R2 only, one out. You are the plate umpire — watch the pitcher’s feet.',
    seat: 'PU',
    question:
      'R2 has a big lead. The pitcher spins with an inside turn toward second and holds the ball as R2 dives back. Balk?',
    options: [
      'Legal — a turn toward second does not require a throw',
      'Balk — any move toward a base must end in a throw',
      'Balk — he spun the wrong way',
      'Legal only if he then steps off the rubber',
    ],
    correctIndex: 0,
    explanation:
      'Second base is unique: the pitcher may turn or step toward it and hold the ball without throwing — no balk. The move to freeze the runner is legal by itself. The identical fake to first or third would be a balk.',
    duration: 4.5,
    actors: [
      actor('ball', 'ball', '', [wp(0, MOUND), wp(1.6, pt(-3, 50)), wp(2.3, MOUND)]),
      actor('r2', 'runner', 'R2', [wp(0, pt(-6, 78)), wp(1.4, pt(-6, 78)), wp(2.1, SECOND)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)], true),
      actor('bu', 'umpire', 'BU', [wp(0, C_POS)]),
      ...defense({
        F1: [wp(0, MOUND), wp(1.3, MOUND), wp(1.7, pt(-4, 49)), wp(2.4, MOUND)],
      }),
    ],
    captions: [
      { t: 0.7, text: 'R2 out with a long lead…' },
      { t: 1.5, text: 'Pitcher turns inside toward second…' },
      { t: 2.2, text: '…and holds the ball — R2 dives back' },
    ],
  },

  {
    id: 'two-po-second-stepoff-third',
    crew: 'two',
    kind: 'call',
    group: 'Pickoffs & balks',
    title: 'Step off, then fake to third',
    setup: 'R2 only, one out. You are the plate umpire — watch the pivot foot.',
    seat: 'PU',
    question:
      'The pitcher steps back off the rubber with his pivot foot, THEN fakes a throw toward third. Balk?',
    options: [
      'Legal — once off the rubber he is an infielder and may fake anywhere',
      'Balk — a pitcher may never fake to third',
      'Balk — he faked to an unoccupied base',
      'Legal only if a fielder was covering third',
    ],
    correctIndex: 0,
    explanation:
      'Stepping off the rubber with the pivot foot makes him an infielder — now he may fake to any base, third included, with no throw required. The illegal version is faking to first or third WHILE still engaged with the rubber. Watch the feet: off first, then anything goes.',
    duration: 5,
    actors: [
      actor('ball', 'ball', '', [wp(0, MOUND), wp(1.9, pt(-11, 44)), wp(2.9, MOUND)]),
      actor('r2', 'runner', 'R2', [wp(0, pt(-6, 78)), wp(1.6, pt(-6, 78)), wp(2.6, SECOND)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)], true),
      actor('bu', 'umpire', 'BU', [wp(0, C_POS)]),
      ...defense({
        F1: [wp(0, MOUND), wp(1.3, MOUND), wp(1.6, pt(0, 43)), wp(2.2, pt(-12, 43)), wp(2.9, MOUND)],
      }),
    ],
    captions: [
      { t: 0.7, text: 'R2 leading off second…' },
      { t: 1.5, text: 'Pitcher steps back off the rubber…' },
      { t: 2.3, text: '…then fakes to third' },
    ],
  },

  {
    id: 'two-po-third-empty-balk',
    crew: 'two',
    kind: 'call',
    group: 'Pickoffs & balks',
    title: 'Throw to an empty third',
    setup: 'R2 only, R2 holding his base. You are the plate umpire.',
    seat: 'PU',
    question:
      'From the rubber the pitcher whirls and throws toward third — but nobody is breaking there and F5 is off the bag. Balk?',
    options: [
      'Balk — a throw to an unoccupied base with no play being made',
      'Legal — a pitcher may throw to any base to keep runners honest',
      'Legal — F5 could have covered',
      'No call — it is just a wild throw',
    ],
    correctIndex: 0,
    explanation:
      'Third was unoccupied and no runner was going there, so there was no play to make — throwing there is a balk. A throw to an unoccupied base is legal ONLY when a runner is actually advancing to it and a fielder is covering.',
    duration: 5,
    actors: [
      actor('ball', 'ball', '', [wp(0, MOUND), wp(1.3, MOUND), wp(1.9, THIRD)]),
      actor('r2', 'runner', 'R2', [wp(0, pt(-6, 78)), wp(2.5, pt(-6, 78))]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)], true),
      actor('bu', 'umpire', 'BU', [wp(0, C_POS)]),
      ...defense({
        F1: [wp(0, MOUND), wp(1.3, MOUND), wp(1.6, pt(-16, 45))],
        F5: [wp(0, F5), wp(1.9, F5), wp(2.6, pt(-40, 45))],
      }),
    ],
    captions: [
      { t: 0.7, text: 'R2 holding, nobody moving…' },
      { t: 1.4, text: 'Pitcher whirls and throws to third!' },
      { t: 2.2, text: 'F5 wasn’t even covering the bag' },
    ],
  },

  {
    id: 'two-po-third-steal-legal',
    crew: 'two',
    kind: 'call',
    group: 'Pickoffs & balks',
    title: 'Throw on the steal of third',
    setup: 'R2 only. You are the plate umpire — watch for the play being made.',
    seat: 'PU',
    question:
      'R2 takes off to steal third. The pitcher steps and throws to third WITHOUT stepping off the rubber. Balk?',
    options: [
      'Legal — a runner is going to third, so it is a genuine play',
      'Balk — he must disengage before any throw to third',
      'Balk — third was unoccupied when he released the ball',
      'Legal only if the throw beats the runner',
    ],
    correctIndex: 0,
    explanation:
      'Because R2 is stealing third there is a real play there — the pitcher may step directly toward third and throw without disengaging, and F5 covering makes it a legal play on the runner. Contrast the empty-base throw: it is only a balk when nobody is going to the base.',
    duration: 4.5,
    actors: [
      actor('ball', 'ball', '', [wp(0, MOUND), wp(0.9, MOUND), wp(1.6, THIRD)]),
      actor('r2', 'runner', 'R2', [wp(0, pt(-6, 78)), wp(0.8, pt(-6, 78)), wp(2.4, THIRD)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)], true),
      actor('bu', 'umpire', 'BU', [wp(0, C_POS)]),
      ...defense({
        F1: [wp(0, MOUND), wp(0.9, MOUND), wp(1.3, pt(-16, 45))],
        F5: [wp(0, F5), wp(0.9, F5), wp(1.7, pt(-40, 45))],
      }),
    ],
    captions: [
      { t: 0.6, text: 'R2 takes off — steal of third!' },
      { t: 1.2, text: 'Pitcher steps and fires to third' },
      { t: 1.9, text: 'Tag play at the bag' },
    ],
  },

  {
    id: 'two-po-lefty-balk',
    crew: 'two',
    kind: 'call',
    group: 'Pickoffs & balks',
    title: 'Lefty’s leg breaks the plane',
    setup: 'R1 only. A left-handed pitcher is on. Watch his free (lead) foot.',
    seat: 'PU',
    question:
      'The lefty lifts his lead leg; it swings back past the rear edge of the rubber before he wheels and throws to first. Balk?',
    options: [
      'Balk — once the free foot crosses the back edge of the rubber he is committed home',
      'Legal — a lefty may throw to first any time his leg is up',
      'Legal — the leg position is irrelevant, only the throw matters',
      'Balk — a lefty may never throw to first from the set',
    ],
    correctIndex: 0,
    explanation:
      'A left-hander’s free foot passing the back edge of the pitching rubber commits him to deliver to the plate — going to first from there is a balk. If the leg stays in front of that plane he may still step and throw to first. There is no 45-degree rule; watch the back edge. (BU on the first-base side often has the better angle, but any umpire may call it.)',
    duration: 5,
    actors: [
      actor('ball', 'ball', '', [wp(0, MOUND), wp(1.8, MOUND), wp(2.4, FIRST)]),
      actor('r1', 'runner', 'R1', [wp(0, pt(36, 49)), wp(1.8, pt(36, 49)), wp(2.6, FIRST)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)], true),
      actor('bu', 'umpire', 'BU', [wp(0, B_POS)]),
      ...defense({
        F1: [wp(0, MOUND), wp(1.2, MOUND), wp(1.6, pt(6, 44)), wp(2.0, pt(22, 44))],
        F3: [wp(0, FIRST)],
      }),
    ],
    captions: [
      { t: 0.7, text: 'Lefty at the set, R1 leading…' },
      { t: 1.4, text: 'Leg lifts — swings back past the rubber…' },
      { t: 2.2, text: '…then he throws to first' },
    ],
  },

  // ── Fair or foul ──────────────────────────────────────────────────────
  // The call turns on where the BALL is when touched or when it settles —
  // never on where the fielder is standing.

  {
    id: 'two-ff-fielder-in-foul',
    crew: 'two',
    kind: 'call',
    group: 'Fair or foul',
    title: 'Fielder’s feet in foul ground',
    setup: 'Nobody on, one out. You are the plate umpire, working the third-base line.',
    seat: 'PU',
    question:
      'A chopper hugs the third-base line. F5 fields it with both feet in foul territory, but the ball is over fair ground when he touches it. Call?',
    options: [
      'Fair — the position of the ball, not the fielder, decides it',
      'Foul — the fielder was standing in foul territory',
      'Foul — any ball touched right on the line is foul',
      'Fair only if it had already passed third base',
    ],
    correctIndex: 0,
    explanation:
      'Fair/foul is judged by where the BALL is when touched, never where the fielder stands. The ball was over fair territory when F5 gloved it, so it is a fair ball — his feet in foul ground are irrelevant.',
    duration: 4.5,
    actors: [
      actor('ball', 'ball', '', [...grounder(pt(-20, 24), 1.9), wp(2.3, pt(-20, 24))]),
      actor('br', 'runner', 'BR', [wp(CONTACT, HOME), wp(2.6, pt(28, 28)), wp(3.6, FIRST)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP), wp(1.8, pt(-18, 16))], true),
      actor('bu', 'umpire', 'BU', [wp(0, A_POS)]),
      ...defense({
        F5: [wp(0, F5), wp(1.0, F5), wp(1.9, pt(-26, 22))],
      }),
    ],
    captions: [
      { t: 0.6, text: 'Chopper down the third-base line…' },
      { t: 1.5, text: 'F5 fields it — his feet are in foul ground' },
      { t: 2.2, text: 'But where was the ball?' },
    ],
  },

  {
    id: 'two-ff-ball-foul',
    crew: 'two',
    kind: 'call',
    group: 'Fair or foul',
    title: 'Touched foul before third',
    setup: 'Nobody on, nobody out. You are the plate umpire, working the third-base line.',
    seat: 'PU',
    question:
      'A slow roller stays in foul territory the whole way, and F5 picks it up in foul ground short of third. Call?',
    options: [
      'Foul — untouched in fair territory and first touched while foul',
      'Fair — a fielder touched it, which makes it live',
      'Fair — it was still in the infield',
      'Foul only once it comes to a complete rest',
    ],
    correctIndex: 0,
    explanation:
      'A batted ball touched (or settling) in foul territory before it passes first or third base is foul. The ball was over foul ground when F5 touched it — foul ball, kill it.',
    duration: 4.5,
    actors: [
      actor('ball', 'ball', '', [...grounder(pt(-30, 26), 2.0), wp(2.4, pt(-30, 26))]),
      actor('br', 'runner', 'BR', [wp(CONTACT, HOME), wp(2.8, pt(26, 26)), wp(3.6, pt(34, 34))]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP), wp(1.9, pt(-22, 18))], true),
      actor('bu', 'umpire', 'BU', [wp(0, A_POS)]),
      ...defense({
        F5: [wp(0, F5), wp(1.2, F5), wp(2.1, pt(-33, 26))],
      }),
    ],
    captions: [
      { t: 0.6, text: 'Slow roller down the line, in foul ground…' },
      { t: 1.6, text: 'It stays foul — F5 picks it up' },
      { t: 2.2, text: 'Touched in foul territory before third' },
    ],
  },

  {
    id: 'two-ff-over-the-bag',
    crew: 'two',
    kind: 'call',
    group: 'Fair or foul',
    title: 'Bounces over the bag',
    setup: 'Nobody on, one out. You are the plate umpire, working the third-base line.',
    seat: 'PU',
    question:
      'A sharp grounder takes a hop directly over third base, then bounds into foul territory beyond the bag. Fair or foul?',
    options: [
      'Fair — a ball that touches a base is fair, wherever it goes after',
      'Foul — it ended up in foul territory',
      'Foul — it left fair territory before anyone touched it',
      'Fair only if a fielder touches it first',
    ],
    correctIndex: 0,
    explanation:
      'Third base — like first base and home — is in fair territory. A batted ball that strikes the base is a fair ball no matter where it caroms afterward. Hooking into foul ground beyond the bag does not change it: fair ball.',
    duration: 4.5,
    actors: [
      actor('ball', 'ball', '', [...grounder(THIRD, 2.0), wp(2.3, THIRD), wp(3.0, pt(-70, 60))]),
      actor('br', 'runner', 'BR', [wp(CONTACT, HOME), wp(2.6, pt(28, 28)), wp(3.6, FIRST)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP), wp(1.9, pt(-24, 20))], true),
      actor('bu', 'umpire', 'BU', [wp(0, A_POS)]),
      ...defense({
        F5: [wp(0, F5), wp(2.0, F5), wp(2.8, pt(-52, 50))],
      }),
    ],
    captions: [
      { t: 0.6, text: 'Sharp grounder down the third-base line…' },
      { t: 1.8, text: 'It bounces right over the bag!' },
      { t: 2.6, text: '…then hooks into foul ground' },
    ],
  },

  // ── More runners-on mechanics ─────────────────────────────────────────

  {
    id: 'two-steal-second',
    crew: 'two',
    kind: 'mechanics',
    group: 'Runners on',
    title: 'Straight steal of second',
    setup: 'R1 only, one out. You are the base umpire in the B position.',
    seat: 'BU',
    question: 'R1 breaks on the pitch and the catcher comes up throwing. Where do you take the tag?',
    options: [
      'Button-hook toward the second-base cutout and get a set, 90° look at the tag',
      'Stay in B — the throw is coming right to you',
      'Go out toward the outfield to clear the play',
      'Slide to the plate to help PU on the pitch',
    ],
    correctIndex: 0,
    explanation:
      'On a straight steal of second, BU works from B toward the cutout, buttonhooking to earn a set, 90-degree angle on the tag. Come to a full stop before the tag — never rule a bang-bang play on the move. PU keeps the pitch and any check-swing.',
    freezeAt: 1.4,
    duration: 5,
    actors: [
      actor('ball', 'ball', '', [...pitch(), wp(1.3, F2), wp(2.4, SECOND)]),
      actor('r1', 'runner', 'R1', [wp(0, pt(36, 49)), wp(0.4, pt(36, 49)), wp(2.6, SECOND)]),
      actor('bu', 'umpire', 'BU', [
        wp(0, B_POS),
        wp(0.9, B_POS),
        wp(1.6, pt(6, 74)),
        wp(2.3, pt(2, 80)),
      ], true),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)]),
      ...defense({
        F6: [wp(0, F6), wp(0.9, F6), wp(2.0, pt(-2, 84))],
      }),
    ],
    captions: [
      { t: 0.5, text: 'R1 breaks — the steal is on!' },
      { t: 1.6, text: 'Catcher fires to second…' },
      { t: 2.5, text: 'Tag play at the bag' },
    ],
  },

  {
    id: 'two-rundown-1-2',
    crew: 'two',
    kind: 'mechanics',
    group: 'Rundowns',
    title: 'Rundown between first and second',
    setup: 'R1 caught off first, nobody out. You are the base umpire in the B position.',
    seat: 'BU',
    question: 'R1 is hung up in a rundown between first and second. How do you work it?',
    options: [
      'Stay with the runner, keep the whole rundown in front of you, and let PU rotate up to bracket a base',
      'Pick one base and plant on it',
      'Run alongside the runner stride for stride',
      'Call time immediately to sort out the mess',
    ],
    correctIndex: 0,
    explanation:
      'Don’t chase. Position yourself to keep the runner and both bases in front of you, watching for the tag, obstruction, or the fielders switching. In 2-man, PU rotates up the line to take a base so the rundown is bracketed — two sets of eyes, no blind side.',
    freezeAt: 1.6,
    duration: 5.5,
    actors: [
      actor('ball', 'ball', '', [
        wp(0, pt(36, 50)),
        wp(1.2, pt(18, 68)),
        wp(2.4, pt(36, 52)),
        wp(3.4, pt(18, 68)),
      ]),
      actor('r1', 'runner', 'R1', [
        wp(0, pt(30, 55)),
        wp(1.5, pt(20, 66)),
        wp(2.6, pt(30, 58)),
        wp(3.6, pt(18, 68)),
      ]),
      actor('bu', 'umpire', 'BU', [wp(0, B_POS), wp(1.0, B_POS), wp(1.8, pt(20, 60))], true),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.2, PU_ISP),
        wp(2.4, pt(30, 26)),
        wp(3.4, pt(44, 40)),
      ]),
      ...defense({
        F3: [wp(0, pt(40, 46)), wp(1.4, pt(30, 58))],
        F4: [wp(0, F4), wp(1.2, pt(20, 66))],
      }),
    ],
    captions: [
      { t: 0.6, text: 'R1 caught off first — rundown!' },
      { t: 1.8, text: 'Fielders run him back toward first' },
      { t: 3.4, text: 'Tag applied between the bases' },
    ],
  },

  // ══ 4-MAN ═══════════════════════════════════════════════════════════════

  {
    id: 'four-full-pu',
    crew: 'four',
    kind: 'mechanics',
    group: 'Rotations',
    title: 'Full rotation — PU to third',
    setup: 'Nobody on, one out. 4-umpire crew; you are the plate umpire.',
    seat: 'PU',
    question: 'U2 goes out on the drive to right-center with nobody on. Where does the crew need you?',
    options: [
      'Third base — rotate up the line in foul territory all the way to Po3',
      'Stay home — with U2 out, U3 handles everything on the left side',
      'Second base — fill the spot U2 vacated',
      'Halfway up the third-base line, ready to go either way',
    ],
    correctIndex: 0,
    explanation:
      'No runners in scoring position + U2 or U3 out = FULL ROTATION: everyone moves clockwise. PU rotates to third, staying in foul territory all the way to Po3, and must arrive 60 feet ahead of the runner — going “halfway” is arriving late. U1 sees the BR’s touch then releases home; U3 slides to Po2 and picks up the BR back into first.',
    freezeAt: 1.7,
    duration: 10,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(40, 150), 3.4, 1.8),
        wp(4.2, pt(48, 158)),
        wp(4.5, pt(48, 158)),
        wp(6.0, pt(20, 80)),
        wp(6.3, pt(20, 80)),
        wp(8.9, pt(-42, 44)),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(3.9, FIRST),
        wp(6.4, SECOND),
        wp(9.2, THIRD),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(3.4, pt(-24, 20)),
        wp(5.6, PO3),
        wp(8.6, pt(-40, 44)),
      ], true),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.2, A_POS),
        wp(3.9, pt(48, 44)),
        wp(5.8, pt(30, 18)),
        wp(7.6, pt(2, -7)),
      ]),
      actor('u2', 'umpire', 'U2', [
        wp(0, U2_B),
        wp(1.0, U2_B),
        wp(3.0, pt(30, 110)),
        wp(3.6, pt(34, 118)),
      ]),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.2, D_POS),
        wp(4.6, pt(-10, 88)),
      ]),
      ...defense({
        F8: [wp(0, F8), wp(1.0, F8), wp(3.4, pt(32, 146)), wp(4.4, pt(47, 156))],
        F4: [wp(0, F4), wp(3.5, F4), wp(5.2, pt(20, 82))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'U2 is going out — deep to right-center' },
      { t: 3.5, text: 'It’s in! BR digging for extra bases' },
      { t: 8.9, text: 'Relay to third… tag play!' },
    ],
  },

  {
    id: 'four-full-u1-release',
    crew: 'four',
    kind: 'mechanics',
    group: 'Rotations',
    title: 'Full rotation — U1 releases home',
    setup: 'Nobody on, nobody out. 4-umpire crew; you are U1.',
    seat: 'U1',
    question: 'U3 is out on the ball down the left-field line, nobody on. What’s your job as this develops?',
    options: [
      'See the BR touch first, then release and mirror him home to the point of the plate',
      'Stay anchored at first for the BR coming back',
      'Rotate home immediately — the touch at first is U2’s',
      'Follow the BR to second base',
    ],
    correctIndex: 0,
    explanation:
      'Full rotation with U3 out: PU has rotated to third, so home is yours. Observe the BR’s touch of first, then release and mirror the lead runner so you arrive at the point of the plate 60 feet ahead of him. You never come back once you release — U2, rotating to Po2, picks up the BR back into first.',
    freezeAt: 1.7,
    duration: 8,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(-70, 118), 3.2, 1.6),
        wp(3.8, pt(-76, 112)),
        wp(4.1, pt(-76, 112)),
        wp(5.6, pt(-6, 84)),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(3.9, FIRST),
        wp(6.4, SECOND),
      ]),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.2, A_POS),
        wp(3.9, pt(48, 45)),
        wp(5.4, pt(30, 16)),
        wp(7.0, pt(2, -7)),
      ], true),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.0, D_POS),
        wp(2.8, pt(-60, 80)),
        wp(3.4, pt(-64, 96)),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(3.2, pt(-24, 20)),
        wp(5.4, PO3),
      ]),
      actor('u2', 'umpire', 'U2', [
        wp(0, U2_B),
        wp(1.2, U2_B),
        wp(4.4, PO2_1B),
        wp(6.6, pt(14, 80)),
      ]),
      ...defense({
        F7: [wp(0, F7), wp(1.0, F7), wp(3.9, pt(-72, 114))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'U3 goes out down the line…' },
      { t: 3.2, text: 'Fair ball into the corner!' },
      { t: 6.4, text: 'BR in with a double' },
    ],
  },

  {
    id: 'four-fill-u2',
    crew: 'four',
    kind: 'mechanics',
    group: 'Rotations',
    title: 'Fill rotation — U2 owns two bases',
    setup: 'R2 only, one out. 4-umpire crew; you are U2, in the B position.',
    seat: 'U2',
    question: 'R2 only, and U3 just went out on the gap ball. Where do you go?',
    options: [
      'Into the restricted area with depth — you own both second and third now',
      'Rotate to third and let PU drop down to second',
      'Stay at B — you cover second only; PU takes third',
      'Out toward left-center to back up U3 on the catch',
    ],
    correctIndex: 0,
    explanation:
      'Runner in scoring position + U3 out = FILL ROTATION: the remaining middle umpire fills the vacancy from the Restricted Area and owns BOTH second and third. Get depth so you don’t overcommit to either base, and slip to the outside once your responsibility becomes singular. PU never leaves the point of the plate with RiSP, and U1 moves to Po1 as the crew saver.',
    freezeAt: 1.7,
    duration: 8,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(-38, 138), 3.2, 1.7),
        wp(3.6, pt(-34, 140)),
        wp(3.9, pt(-34, 140)),
        wp(5.2, pt(-20, 75)),
        wp(5.5, pt(-20, 75)),
        wp(6.6, pt(-2, 4)),
      ]),
      actor('r2', 'runner', 'R2', [
        wp(0, SECOND),
        wp(0.9, SECOND),
        wp(3.4, THIRD),
        wp(6.2, HOME),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(3.9, FIRST),
        wp(6.6, SECOND),
      ]),
      actor('u2', 'umpire', 'U2', [
        wp(0, U2_B),
        wp(1.2, U2_B),
        wp(3.0, pt(-4, 62)),
        wp(6.2, pt(-6, 74)),
      ], true),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.0, D_POS),
        wp(2.8, pt(-52, 90)),
        wp(3.4, pt(-56, 104)),
      ]),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.2, A_POS),
        wp(3.0, PO1),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(2.0, POP),
      ]),
      ...defense({
        F8: [wp(0, F8), wp(1.0, F8), wp(3.5, pt(-32, 139))],
        F7: [wp(0, F7), wp(1.0, F7), wp(3.4, pt(-46, 132))],
        F6: [wp(0, F6), wp(3.6, F6), wp(4.8, pt(-20, 77))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'U3 goes out — fielders converging in left-center' },
      { t: 3.3, text: 'It drops! R2 will score' },
      { t: 6.4, text: 'Throw home is late; BR into second' },
    ],
  },

  {
    id: 'four-u2-fill',
    crew: 'four',
    kind: 'mechanics',
    group: 'Rotations',
    title: 'U2 Fill — U1 goes out',
    setup: 'R1 only, one out. 4-umpire crew; you are U2, in the C position.',
    seat: 'U2',
    question: 'U1 leaves on the fly to right. With R1 on, what’s the crew’s answer — and yours?',
    options: [
      'U2 Fill — slide into the restricted area on the first-base side and take both first and second',
      'Full rotation — PU to third, everyone moves',
      'Stay at C — U3 covers first from Po3',
      'Replace U1 at the A position on the line',
    ],
    correctIndex: 0,
    explanation:
      'ANYTIME U1 goes out, the crew answers with the U2 FILL: U2 moves into the Restricted Area on the first-base side with depth and owns all plays at first and second — like this throw behind R1. U3 moves to Po3, and PU stays at the point of the plate (trailing the BR to assist at first with NRO or R1 only). U1 stays out once he goes.',
    freezeAt: 1.7,
    duration: 7,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(67, 115), 3.3, 1.7),
        wp(3.5, pt(66, 116)),
        wp(5.0, pt(43, 44)),
      ]),
      actor('r1', 'runner', 'R1', [
        wp(0, FIRST),
        wp(0.9, FIRST),
        wp(2.6, midpoint(FIRST, SECOND, 0.45)),
        wp(4.2, FIRST),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(2.8, pt(32, 32)),
        wp(3.8, pt(48, 38)),
      ]),
      actor('u2', 'umpire', 'U2', [
        wp(0, U2_C),
        wp(1.2, U2_C),
        wp(3.0, pt(8, 60)),
        wp(5.2, pt(20, 56)),
      ], true),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.0, A_POS),
        wp(2.8, pt(58, 80)),
        wp(3.3, pt(62, 95)),
      ]),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.2, D_POS),
        wp(3.2, PO3),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(2.6, pt(12, 10)),
        wp(5.0, POP),
      ]),
      ...defense({
        F9: [wp(0, F9), wp(1.0, F9), wp(3.2, pt(66, 117))],
        F3: [wp(0, F3), wp(3.5, F3), wp(4.6, pt(43, 45))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'U1 is going out toward the line' },
      { t: 3.3, text: 'F9 makes the catch — R1 scrambles back' },
      { t: 5.0, text: 'Throw behind R1 at first!' },
    ],
  },

  {
    id: 'four-r3-tagup',
    crew: 'four',
    kind: 'mechanics',
    group: 'Tag-ups & the plate',
    title: 'R3 tags on the deep fly',
    setup: 'R3 only, one out. 4-umpire crew; you are the plate umpire.',
    seat: 'PU',
    question: 'R3 only, and U2 goes out on the deep fly to center. What are your two jobs, in order?',
    options: [
      'Line up R3’s retouch at the dirt circle, then get back to the point of the plate for the tag play',
      'Rotate to third in foul territory — it’s a Full rotation',
      'Nothing changes — U3 takes the retouch and you never move',
      'Go halfway up the third-base line to bracket the throw home',
    ],
    correctIndex: 0,
    explanation:
      'R3 is a runner in scoring position, so U2 leaving triggers the FILL rotation — PU stays home. But with R3, PU first lines up R3’s retouch at the edge of the dirt circle, then returns aggressively to the point of the plate for the play everyone knows is coming. U3 fills the Restricted Area; U1 goes to Po1. The Full rotation would strand home plate uncovered.',
    freezeAt: 1.7,
    duration: 8,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(0, 152), 3.6, 1.9),
        wp(3.9, pt(0, 150)),
        wp(6.4, pt(2, 4)),
      ]),
      actor('r3', 'runner', 'R3', [
        wp(0, THIRD),
        wp(3.6, THIRD),
        wp(6.5, HOME),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(3.9, FIRST),
        wp(4.6, pt(46, 48)),
        wp(5.4, FIRST),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(2.4, pt(-12, 2)),
        wp(3.6, pt(-12, 2)),
        wp(4.8, POP),
      ], true),
      actor('u2', 'umpire', 'U2', [
        wp(0, U2_B),
        wp(1.0, U2_B),
        wp(3.0, pt(8, 110)),
        wp(3.5, pt(4, 120)),
      ]),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.2, D_POS),
        wp(3.4, pt(-10, 60)),
      ]),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.2, A_POS),
        wp(3.0, PO1),
      ]),
      ...defense({
        F8: [wp(0, F8), wp(1.0, F8), wp(3.5, pt(0, 150))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'U2 goes out on the deep fly' },
      { t: 3.6, text: 'Catch! R3 tags…' },
      { t: 6.2, text: 'Here comes the throw… play at the plate!' },
    ],
  },

  {
    id: 'four-call-time-play',
    crew: 'four',
    kind: 'call',
    group: 'What’s the call?',
    title: 'Time play at the plate',
    setup: 'R2 only, TWO OUTS. 4-umpire crew; you are the plate umpire. Watch the plate and second base.',
    seat: 'PU',
    question: 'Third out on the tag at second, an eye-blink after R2 crossed the plate. Does the run count?',
    options: [
      'Yes — R2 scored before the third out, and the out was a tag, not a force',
      'No — no run can ever score on the play where the third out is made',
      'No — the BR was retired before reaching second, killing the run',
      'Yes, but only if the offense asks for it',
    ],
    correctIndex: 0,
    explanation:
      'Time play. The BR was tagged going for second — after he had already reached first safely — so it’s NOT a force out. On a timing play the run counts if the runner crosses the plate before the out is recorded, and R2 beat the tag by a step. PU’s mechanic: see both, then point at the plate — “that run scores!” Signal it to the scorer immediately.',
    duration: 7.5,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(-50, 105), 2.5, 1.3),
        wp(2.9, pt(-52, 108)),
        wp(3.2, pt(-52, 108)),
        wp(4.9, pt(1, 84)),
      ]),
      actor('r2', 'runner', 'R2', [
        wp(0, SECOND),
        wp(0.9, SECOND),
        wp(3.1, THIRD),
        wp(4.85, HOME),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(3.7, FIRST),
        wp(5.15, pt(-2, 80)),
      ]),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.2, PU_ISP),
        wp(2.2, POP),
      ], true),
      actor('u2', 'umpire', 'U2', [
        wp(0, U2_B),
        wp(1.2, U2_B),
        wp(4.4, pt(10, 86)),
      ]),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.2, A_POS),
        wp(3.0, PO1),
      ]),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.4, pt(-50, 46)),
      ]),
      ...defense({
        F7: [wp(0, F7), wp(1.0, F7), wp(2.9, pt(-52, 110))],
        F4: [wp(0, F4), wp(3.4, F4), wp(4.4, pt(2, 84))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Two outs — R2 running on contact' },
      { t: 4.85, text: 'R2 crosses the plate…' },
      { t: 5.1, text: '…BR tagged out at second. THIRD OUT.' },
    ],
  },

  {
    id: 'four-call-trap',
    crew: 'four',
    kind: 'call',
    group: 'What’s the call?',
    title: 'Catch or trap?',
    setup: 'Nobody on, one out. 4-umpire crew; you are U2 — and this sinking liner is yours. Watch ball and glove.',
    seat: 'U2',
    question: 'You went out on it. Ball or glove first?',
    options: [
      'No catch — the ball short-hopped into the glove; signal safe emphatically',
      'Catch — he picked it clean off the top of the grass',
      'No call — defer to PU’s angle from the infield',
      'Foul ball — a trapped liner is dead',
    ],
    correctIndex: 0,
    explanation:
      'Run the replay: the ball touches down a beat before F8’s glove gets there — that’s a trap, and a trap is NO CATCH. This is exactly why U2 goes out on a charging fielder: only the 90-degree look shows the daylight. Sell it: “No catch! No catch!” with the safe signal, and stay with the ball. The crew behind you has already rotated (Full — nobody on).',
    duration: 7.5,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(0, 118), 2.5, 1.25),
        wp(2.65, pt(0, 117)),
        wp(4.6, pt(18, 70)),
      ]),
      actor('br', 'runner', 'BR', [
        wp(CONTACT, HOME),
        wp(3.9, FIRST),
        wp(4.6, pt(46, 48)),
        wp(5.4, FIRST),
      ]),
      actor('u2', 'umpire', 'U2', [
        wp(0, U2_B),
        wp(1.0, U2_B),
        wp(2.4, pt(10, 98)),
        wp(2.8, pt(12, 103)),
      ], true),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(3.2, pt(-24, 20)),
        wp(5.2, PO3),
      ]),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.2, A_POS),
        wp(3.9, pt(48, 44)),
        wp(5.4, pt(30, 16)),
        wp(7.0, pt(2, -7)),
      ]),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.2, D_POS),
        wp(4.4, pt(-9, 88)),
      ]),
      ...defense({
        F8: [wp(0, F8), wp(1.0, F8), wp(2.6, pt(0, 118))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Sinking liner — F8 charging hard!' },
      { t: 2.6, text: 'Glove flashes up… did he catch it?' },
      { t: 4.2, text: 'BR holds at first' },
    ],
  },

  {
    id: 'four-infield-fly',
    crew: 'four',
    kind: 'call',
    group: 'What’s the call?',
    title: 'Infield fly, bases loaded',
    setup: 'Bases loaded, one out. 4-umpire crew; you are the plate umpire.',
    seat: 'PU',
    question: 'A routine pop-up hangs over the infield. What must the crew do — and when?',
    options: [
      'Declare “Infield fly, batter’s out!” while it’s up and clearly playable with ordinary effort',
      'Wait until F6 catches it, then call the batter out',
      'Say nothing — the runners advance at their own risk',
      'Call time and freeze all the runners',
    ],
    correctIndex: 0,
    explanation:
      'Infield fly applies with runners on first and second (or loaded) and fewer than two outs on a fair fly playable with ordinary effort. Any umpire signals it — point straight up and declare “Infield fly, batter’s out!” WHILE the ball is in the air. The batter is out at once, the force is removed, and runners advance at their own risk. Late is not good enough.',
    duration: 5.5,
    actors: [
      actor('ball', 'ball', '', [...fly(pt(-8, 72), 3.0, 1.9), wp(4.4, pt(-12, 70))]),
      actor('r1', 'runner', 'R1', [wp(0, FIRST), wp(1.2, FIRST), wp(3.0, pt(30, 47))]),
      actor('r2', 'runner', 'R2', [wp(0, SECOND), wp(1.2, SECOND), wp(3.0, pt(-6, 80))]),
      actor('r3', 'runner', 'R3', [wp(0, THIRD), wp(1.2, THIRD), wp(3.0, pt(-30, 34))]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP), wp(2.4, pt(-8, 10))], true),
      actor('u1', 'umpire', 'U1', [wp(0, A_POS)]),
      actor('u2', 'umpire', 'U2', [wp(0, U2_C)]),
      actor('u3', 'umpire', 'U3', [wp(0, D_POS)]),
      ...defense({
        F6: [wp(0, F6), wp(2.0, F6), wp(3.0, pt(-10, 72))],
      }),
    ],
    captions: [
      { t: 0.8, text: 'Pop-up over the infield — bases loaded, one out' },
      { t: 2.4, text: 'F6 camps under it…' },
      { t: 3.0, text: 'This is infield-fly territory!' },
    ],
  },

  {
    id: 'four-ff-lf-line',
    crew: 'four',
    kind: 'call',
    group: 'Fair or foul',
    title: 'Fair/foul in the left corner',
    setup: 'Nobody on, one out. 4-umpire crew; you are U3.',
    seat: 'U3',
    question: 'A line drive skips down the left-field line near the pole. Whose call is this, and what governs it?',
    options: [
      'Mine — straddle the line and judge the ball where it lands or passes the bag',
      'The plate umpire’s — all foul-line calls are his',
      'U2’s — he has the outfield',
      'No one’s until a fielder touches it',
    ],
    correctIndex: 0,
    explanation:
      'Past the base, the fair/foul call down the left-field line belongs to U3. Get on or straddle the line and judge the ball relative to it where it lands or passes: a ball that first lands fair is fair even if it spins foul after, and one that first touches foul ground beyond the bag is foul. Set your feet and sell it.',
    duration: 6.5,
    actors: [
      actor('ball', 'ball', '', [...fly(pt(-88, 118), 3.2, 1.2), wp(3.8, pt(-92, 116))]),
      actor('br', 'runner', 'BR', [wp(CONTACT, HOME), wp(3.9, FIRST), wp(6.0, SECOND)]),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.0, D_POS),
        wp(2.4, pt(-58, 60)),
        wp(3.4, pt(-72, 90)),
      ], true),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP), wp(3.0, pt(-20, 16))]),
      actor('u1', 'umpire', 'U1', [wp(0, A_POS), wp(3.9, pt(46, 44))]),
      actor('u2', 'umpire', 'U2', [wp(0, U2_C), wp(3.4, pt(-10, 86))]),
      ...defense({
        F7: [wp(0, F7), wp(1.0, F7), wp(3.2, pt(-84, 116))],
      }),
    ],
    captions: [
      { t: 0.8, text: 'Screamer down the left-field line…' },
      { t: 2.6, text: 'U3 hustles down the line' },
      { t: 3.6, text: 'Fair or foul at the corner?' },
    ],
  },

  {
    id: 'four-catchers-interference',
    crew: 'four',
    kind: 'call',
    group: 'What’s the call?',
    title: 'Bat nicks the catcher’s mitt',
    setup: 'R3 on third, one out. 4-umpire crew; you are the plate umpire.',
    seat: 'PU',
    question: 'The batter’s swing clips F2’s glove, and the batter still grounds one to short. What do you have?',
    options: [
      'Catcher’s interference — delayed dead ball; award the batter first, offense may take the play',
      'Nothing — the batter hit the ball, so ignore the contact',
      'The batter is out for interfering with the catcher',
      'Immediate dead ball, everyone back',
    ],
    correctIndex: 0,
    explanation:
      'Contact between the bat/batter and the catcher (or his mitt) during the swing is catcher’s INTERFERENCE — a delayed dead ball. Point at it and let the play finish. The minimum award is the batter to first and each runner forced; the offense may instead take the result of the play if it’s better. Don’t kill it live — flag it and sort the award after.',
    duration: 5,
    actors: [
      actor('ball', 'ball', '', [...pitch(), wp(1.4, pt(-14, 60)), wp(2.6, pt(-18, 68))]),
      actor('br', 'runner', 'BR', [wp(CONTACT, HOME), wp(2.6, pt(28, 28)), wp(3.6, FIRST)]),
      actor('r3', 'runner', 'R3', [wp(0, THIRD), wp(1.2, THIRD), wp(3.0, pt(-20, 20))]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)], true),
      actor('u1', 'umpire', 'U1', [wp(0, A_POS)]),
      actor('u2', 'umpire', 'U2', [wp(0, U2_C)]),
      actor('u3', 'umpire', 'U3', [wp(0, D_POS)]),
      ...defense({
        F6: [wp(0, F6), wp(1.4, F6), wp(2.6, pt(-18, 68))],
      }),
    ],
    captions: [
      { t: 0.7, text: 'Swing — the bat nicks the catcher’s mitt!' },
      { t: 1.6, text: 'Ball dribbles to short' },
      { t: 3.0, text: 'Delayed dead ball — sort the award' },
    ],
  },

  {
    id: 'four-u3-goes-out',
    crew: 'four',
    kind: 'mechanics',
    group: 'Rotations',
    title: 'U3 goes out on the trouble ball',
    setup: 'Nobody on, nobody out. 4-umpire crew; you are U3.',
    seat: 'U3',
    question: 'A sinking, twisting ball drops toward the left-field corner. As U3, what’s your responsibility?',
    options: [
      'Go out — take catch/no-catch and fair/foul in the corner, and stay out to the end',
      'Stay at third — never leave your base',
      'Rotate to the plate immediately',
      'Trail the batter-runner up to first',
    ],
    correctIndex: 0,
    explanation:
      'A trouble ball — possible shoestring catch, trap, or fair/foul near the line — triggers “going out.” U3 goes out to rule on it, and once you go out you STAY out and see it to completion. The crew rotates behind you: PU takes third, U1 watches the BR’s touch then releases home, U2 slides toward second.',
    freezeAt: 1.6,
    duration: 7,
    actors: [
      actor('ball', 'ball', '', [...fly(pt(-78, 110), 2.8, 0.9), wp(3.4, pt(-82, 106))]),
      actor('br', 'runner', 'BR', [wp(CONTACT, HOME), wp(3.9, FIRST), wp(6.4, SECOND)]),
      actor('u3', 'umpire', 'U3', [
        wp(0, D_POS),
        wp(1.0, D_POS),
        wp(2.2, pt(-58, 72)),
        wp(3.2, pt(-66, 92)),
      ], true),
      actor('pu', 'umpire', 'PU', [
        wp(0, PU_ISP),
        wp(1.0, PU_ISP),
        wp(3.2, pt(-24, 20)),
        wp(5.4, PO3),
      ]),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.2, A_POS),
        wp(3.9, pt(48, 45)),
        wp(5.4, pt(30, 16)),
      ]),
      actor('u2', 'umpire', 'U2', [wp(0, U2_B), wp(1.2, U2_B), wp(4.4, PO2_1B)]),
      ...defense({
        F7: [wp(0, F7), wp(1.0, F7), wp(2.8, pt(-76, 108))],
      }),
    ],
    captions: [
      { t: 0.8, text: 'Twisting ball into the left-field corner…' },
      { t: 2.0, text: 'Trouble ball — someone has to go out' },
      { t: 3.2, text: 'U3 rules it in the corner' },
    ],
  },

  {
    id: 'four-no-rotation-loaded',
    crew: 'four',
    kind: 'mechanics',
    group: 'Rotations',
    title: 'No rotation with the bases loaded',
    setup: 'Bases loaded, one out. 4-umpire crew; you are the plate umpire.',
    seat: 'PU',
    question: 'A base hit drops into the outfield. With runners in scoring position, does the crew rotate?',
    options: [
      'No rotation — you stay home for the plays; umpires hold their bases',
      'Full rotation clockwise, as with nobody on',
      'You go to third; U1 takes the plate',
      'U2 goes out and everyone fills behind him',
    ],
    correctIndex: 0,
    explanation:
      'With a runner in scoring position (second or third), the rotation is OFF — there will be plays at the plate and PU must stay home. Umpires hold their bases and take the runners coming into them: U3 the touches at third, U2 the middle, U1 the batter-runner. Rotating away from a plate play is the classic blown mechanic here.',
    freezeAt: 1.7,
    duration: 8,
    actors: [
      actor('ball', 'ball', '', [
        ...fly(pt(44, 132), 3.0, 1.6),
        wp(3.6, pt(46, 130)),
        wp(6.4, pt(6, 30)),
      ]),
      actor('r3', 'runner', 'R3', [wp(0, THIRD), wp(1.0, THIRD), wp(2.6, HOME)]),
      actor('r2', 'runner', 'R2', [wp(0, SECOND), wp(1.0, SECOND), wp(4.4, THIRD), wp(6.6, HOME)]),
      actor('r1', 'runner', 'R1', [wp(0, FIRST), wp(1.0, FIRST), wp(4.0, SECOND), wp(6.6, THIRD)]),
      actor('br', 'runner', 'BR', [wp(CONTACT, HOME), wp(4.2, FIRST)]),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP), wp(5.6, POP)], true),
      actor('u1', 'umpire', 'U1', [wp(0, A_POS), wp(1.2, A_POS), wp(3.6, pt(40, 46))]),
      actor('u2', 'umpire', 'U2', [wp(0, U2_B), wp(1.0, U2_B), wp(3.4, pt(20, 82))]),
      actor('u3', 'umpire', 'U3', [wp(0, D_POS), wp(1.2, D_POS), wp(4.4, pt(-40, 46))]),
      ...defense({
        F9: [wp(0, F9), wp(1.0, F9), wp(3.6, pt(46, 130))],
      }),
    ],
    captions: [
      { t: 0.9, text: 'Base hit to right, bases loaded…' },
      { t: 2.6, text: 'R3 scores, R2 digging around third' },
      { t: 6.0, text: 'Throw comes home — PU has the plate' },
    ],
  },

  {
    id: 'four-u1-chase-rf',
    crew: 'four',
    kind: 'mechanics',
    group: 'Rotations',
    title: 'U1 goes out down the right line',
    setup: 'Nobody on, one out. 4-umpire crew; you are U1.',
    seat: 'U1',
    question: 'A ball hooks toward the right-field corner — catchable but sinking. As U1, what do you do?',
    options: [
      'Go out — you have catch/no-catch and fair/foul in the corner; the crew rotates behind you',
      'Stay at first for the batter-runner',
      'Rotate to second base',
      'Signal U2 to take it instead',
    ],
    correctIndex: 0,
    explanation:
      'The trouble ball down the right-field line is U1’s to go out on — catch/no-catch and the fair/foul in the corner. Go out and stay out. Behind you the remaining infield umpires rotate up to bracket the batter-runner: with U1 out and nobody on, PU rotates toward third, U3 takes second, U2 covers the middle and first.',
    freezeAt: 1.6,
    duration: 7,
    actors: [
      actor('ball', 'ball', '', [...fly(pt(84, 112), 3.0, 1.0), wp(3.6, pt(88, 108))]),
      actor('br', 'runner', 'BR', [wp(CONTACT, HOME), wp(3.9, FIRST), wp(6.4, SECOND)]),
      actor('u1', 'umpire', 'U1', [
        wp(0, A_POS),
        wp(1.0, A_POS),
        wp(2.2, pt(62, 66)),
        wp(3.2, pt(72, 90)),
      ], true),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP), wp(3.4, pt(-22, 18))]),
      actor('u2', 'umpire', 'U2', [wp(0, U2_B), wp(1.2, U2_B), wp(4.2, pt(10, 84))]),
      actor('u3', 'umpire', 'U3', [wp(0, D_POS), wp(1.2, D_POS), wp(4.4, pt(-8, 86))]),
      ...defense({
        F9: [wp(0, F9), wp(1.0, F9), wp(3.0, pt(82, 110))],
      }),
    ],
    captions: [
      { t: 0.8, text: 'Ball hooks toward the right-field corner…' },
      { t: 2.0, text: 'Trouble ball — U1 goes out' },
      { t: 3.4, text: 'U1 rules it in the corner' },
    ],
  },

  {
    id: 'four-check-swing-appeal',
    crew: 'four',
    kind: 'call',
    group: 'What’s the call?',
    title: 'Check-swing appeal to U1',
    setup: 'Nobody on, 1-1 count. 4-umpire crew; you are U1.',
    seat: 'U1',
    question: 'PU calls the pitch a ball; the catcher asks for help on the check swing and PU points to you. What’s the standard?',
    options: [
      'Did he offer at the pitch? If he went, strike; if not, ball — and give a clear signal either way',
      'Any movement of the bat is automatically a strike',
      'Only the plate umpire may judge a swing; decline the appeal',
      'If the bat crossed the front edge of the plate it’s a strike',
    ],
    correctIndex: 0,
    explanation:
      'On appeal the base umpire judges whether the batter offered at the pitch — did he go? It is not about the barrel crossing the plate or any set angle; it is your judgment that he attempted to strike. Sell it: hammer a strike, or a clear “No, he did not go.” Once PU points, the call is yours.',
    duration: 4.5,
    actors: [
      actor('ball', 'ball', '', [...pitch(), wp(1.3, pt(3, -4))]),
      actor('br', 'runner', 'BR', [wp(0, pt(6, -2)), wp(1.2, pt(6, -2))]),
      actor('u1', 'umpire', 'U1', [wp(0, A_POS), wp(1.0, A_POS)], true),
      actor('pu', 'umpire', 'PU', [wp(0, PU_ISP), wp(1.0, PU_ISP)]),
      actor('u2', 'umpire', 'U2', [wp(0, U2_C)]),
      actor('u3', 'umpire', 'U3', [wp(0, D_POS)]),
      ...defense(),
    ],
    captions: [
      { t: 0.8, text: 'Pitch outside — batter holds up…' },
      { t: 1.3, text: '“Ball!” — catcher appeals the swing' },
      { t: 2.0, text: 'PU points to U1 at first' },
    ],
  },
];

export function scenariosForCrew(crew: 'two' | 'four'): SimScenario[] {
  return SIM_SCENARIOS.filter((s) => s.crew === crew);
}
