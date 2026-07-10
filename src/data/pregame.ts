// Static game-day reference content: the 4-umpire fly-ball coverage card,
// the plate-meeting checklist, and the rule-myths list. Coverage and plate
// meeting content follow the 2026 Little League Umpire's Manual (Section 5,
// 60-Foot Diamond Mechanics for the 4-Umpire System, and the Plate Meeting
// procedures); wording is condensed for field use.

// ── 4-Umpire fly-ball coverage (60-ft diamond) ─────────────────────────────

export type CrewPosition = 'PU' | 'U1' | 'U2' | 'U3';

export interface CrewDuty {
  umpire: CrewPosition;
  duty: string;
}

export interface CoverageBlock {
  title: string;
  rotation?: string;
  summary: string;
  duties: CrewDuty[];
}

export interface CoverageSection {
  heading: string;
  situation: string;
  intro?: string;
  blocks: CoverageBlock[];
}

// Why an umpire leaves in the first place — shown ahead of the rotations.
export const GOING_OUT = {
  heading: 'Who goes out',
  intro:
    'The appropriate umpire goes out on every fly ball to the outfield in their area of responsibility — especially the 3 Fs. Once you go out, you stay out.',
  aor: [
    { umpire: 'U1' as CrewPosition, duty: 'F9 moving toward the right-field line.' },
    {
      umpire: 'U2' as CrewPosition,
      duty: 'F7 and F9 moving in, back, or toward centre — plus everything F8 does.',
    },
    { umpire: 'U3' as CrewPosition, duty: 'F7 moving toward the left-field line.' },
  ],
  threeFs: [
    { label: 'Fair / Foul', detail: 'any ball in flight that threatens the foul line' },
    { label: 'Fence', detail: 'any ball that threatens the boundary — home run or ground-rule double' },
    { label: 'Fielders converging', detail: 'any ball that has fielders closing on each other' },
  ],
  note: 'If two umpires go out on the same ball, the crew defers to U2 — unless the ball is on the line.',
};

export const COVERAGE_SECTIONS: CoverageSection[] = [
  {
    heading: 'Routine plays',
    situation: 'NRiSP and/or RiSP',
    intro:
      'Nobody leaves — ground balls to the infield and clean base hits. Everyone works their own base and reads the ball, runners, and partners.',
    blocks: [
      {
        title: 'Standard coverage',
        summary: 'Each umpire owns their base; priorities run Fair/Foul, then Catch/No-Catch, then everything else.',
        duties: [
          {
            umpire: 'PU',
            duty: 'Fair/foul and catch/no-catch on the infield; all plays and touches at home. Trails the batter-runner to 1B with nobody on.',
          },
          {
            umpire: 'U1',
            duty: 'Fair/foul in AOR; all plays and touches at 1B. Adjusts with F3 if a force turns into a tag.',
          },
          {
            umpire: 'U2',
            duty: 'Catch/no-catch in AOR; all plays and touches at 2B, working chest-to-ball from the outside.',
          },
          {
            umpire: 'U3',
            duty: 'Fair/foul in AOR; all plays and touches at 3B. Owns the topside real estate between the line and the coach’s box.',
          },
        ],
      },
    ],
  },
  {
    heading: 'Trouble balls · NRiSP',
    situation: 'Nobody on, or R1 only',
    blocks: [
      {
        title: 'U2 or U3 goes out',
        rotation: 'Full Rotation',
        summary: 'Everyone moves clockwise — that’s why it’s the “full” rotation.',
        duties: [
          {
            umpire: 'PU',
            duty: 'Rotates to 3B in foul territory, all the way up to Po3. Arrive 60 feet ahead of the runner; wedge for tag plays.',
          },
          {
            umpire: 'U1',
            duty: 'Watches the batter-runner’s touch at 1B, then releases to cover home at the point of plate.',
          },
          {
            umpire: 'U2',
            duty: 'Out: covers catch/no-catch and stays out. In: moves to Po2 opposite the throw for plays at 2B, and picks up the BR back into 1B once U1 releases.',
          },
          {
            umpire: 'U3',
            duty: 'Out: covers catch/no-catch and stays out. In: same job as U2 staying — Po2 opposite the throw, plus the BR back into 1B.',
          },
        ],
      },
      {
        title: 'U1 goes out',
        rotation: 'U2 Fill',
        summary: 'U2 fills the right side; used any time U1 leaves, whatever the runners.',
        duties: [
          {
            umpire: 'PU',
            duty: 'Stays home at the point of plate. Trails the batter-runner to help U2 at 1B with a swipe tag or pulled foot.',
          },
          { umpire: 'U1', duty: 'Covers catch/no-catch in AOR and stays out.' },
          {
            umpire: 'U2',
            duty: 'Fills into the restricted area with depth — responsible for all plays at 1B and 2B. Slip outside once the job becomes singular.',
          },
          { umpire: 'U3', duty: 'Moves to Po3, opposite the throw, for plays at 3B.' },
        ],
      },
    ],
  },
  {
    heading: 'Trouble balls · RiSP',
    situation: 'R2, R3, or any multi-runner mix',
    blocks: [
      {
        title: 'U2 or U3 goes out',
        rotation: 'Fill Rotation',
        summary: 'One umpire fills the vacancy; home is never left unattended with runners in scoring position.',
        duties: [
          {
            umpire: 'PU',
            duty: 'Stays at the point of plate. With R3, lines up the retouch at the dirt circle, then gets back to the plate aggressively.',
          },
          {
            umpire: 'U1',
            duty: 'Moves to Po1 topside as the crew saver — proper use of eyes on all the action nobody else can watch.',
          },
          {
            umpire: 'U2',
            duty: 'Out: covers catch/no-catch and stays out. In: fills the restricted area with depth and covers both 2B and 3B, slipping outside once singular.',
          },
          {
            umpire: 'U3',
            duty: 'Out: covers catch/no-catch and stays out. In: same fill — restricted area with depth, covering 2B and 3B.',
          },
        ],
      },
      {
        title: 'U1 goes out',
        rotation: 'U2 Fill',
        summary: 'Identical to the NRiSP version — U2 Fill is the one rotation that never changes with runners.',
        duties: [
          { umpire: 'PU', duty: 'Stays home at the point of plate for the duration of the play.' },
          { umpire: 'U1', duty: 'Covers catch/no-catch in AOR and stays out.' },
          {
            umpire: 'U2',
            duty: 'Fills into the restricted area — all plays at 1B and 2B, with depth so neither base gets overcommitted to.',
          },
          { umpire: 'U3', duty: 'Moves to Po3, opposite the throw, for plays at 3B.' },
        ],
      },
    ],
  },
];

export const COVERAGE_GLOSSARY: { term: string; meaning: string }[] = [
  { term: 'NRiSP / RiSP', meaning: 'No runners / runners in scoring position' },
  { term: 'AOR', meaning: 'Area of responsibility for catch/no-catch' },
  { term: 'PoP', meaning: 'Point of plate — 5–7 ft behind the apex' },
  { term: 'Po1 / Po2 / Po3', meaning: 'Standard positions at 1B / 2B / 3B' },
  { term: 'RA', meaning: 'Restricted area — the working area behind the mound' },
  { term: 'F7 / F8 / F9', meaning: 'Left, centre, and right fielders' },
  { term: 'BR', meaning: 'Batter-runner' },
  { term: 'CtB', meaning: 'Chest to ball' },
];

// ── Plate meeting checklist ────────────────────────────────────────────────

export interface ChecklistItem {
  title: string;
  detail: string;
}

export interface ChecklistSection {
  heading: string;
  items: ChecklistItem[];
}

export const PLATE_MEETING: ChecklistSection[] = [
  {
    heading: 'Set the tone',
    items: [
      {
        title: 'Greet both benches',
        detail:
          'Introduce the crew and get the managers’ names — use names, not “coach.” Sunglasses off for eye contact. The plate umpire is the only speaking voice of the crew.',
      },
      {
        title: 'Keep it brief',
        detail: 'The meeting happens before players warm up and should stay short — hit the list and break.',
      },
    ],
  },
  {
    heading: 'LEGS — the required minimum',
    items: [
      {
        title: 'Line-up cards',
        detail: 'Collect, review, and exchange line-up cards, if they’re used at this level.',
      },
      {
        title: 'Equipment',
        detail:
          'Get verbal affirmation from both managers that their teams are properly and legally equipped (Rule 3.01). Umpires don’t inspect equipment pre-game anymore — anything illegal found during the game gets removed and stowed.',
      },
      {
        title: 'Ground rules',
        detail:
          'Briefly review as needed — what’s out of play, gaps in fences, anything the field does that the rulebook doesn’t cover.',
      },
      {
        title: 'Sportsmanship',
        detail:
          'Expectations for players and coaches: call “time” and wait for it, hustle on and off the field. Assure them the crew will hustle too.',
      },
    ],
  },
  {
    heading: 'Level & division specifics',
    items: [
      {
        title: 'Time limit',
        detail:
          'Confirm the limit and who keeps the official clock. Interlock: two hours from the SCHEDULED start — no new inning after, but an inning underway is completed.',
      },
      {
        title: 'Stealing & leadoffs',
        detail:
          'Confirm what the division allows — runners leave on the pitch reaching the batter on the 60-ft diamond, plus any Interlock or house limits on steals.',
      },
      {
        title: 'Run caps & mercy rule',
        detail: 'Per-inning run limits and the mercy line, if the division plays with them.',
      },
      {
        title: 'Batting order & mandatory play',
        detail:
          'Continuous batting order or conventional subs, courtesy runners, and mandatory-play requirements for the level.',
      },
    ],
  },
  {
    heading: 'Before you break',
    items: [
      {
        title: 'Special situations',
        detail:
          'Anything unusual worth flagging now: curfew, darkness with no lights, shared field, weather on the way.',
      },
      {
        title: 'Wish them a good game',
        detail: 'End on the right note and get the crew to positions for the anthem.',
      },
    ],
  },
];

// ── Rule myths ─────────────────────────────────────────────────────────────

export interface RuleMyth {
  myth: string;
  ruling: string;
  detail: string;
}

export const RULE_MYTHS: RuleMyth[] = [
  {
    myth: 'Tie goes to the runner.',
    ruling: 'There are no ties.',
    detail:
      'Nothing in the book awards a tie to anyone. The umpire judges whether the ball or the runner arrived first — one of them did. Make the call and sell it.',
  },
  {
    myth: 'The hands are part of the bat.',
    ruling: 'The hands are part of the batter.',
    detail:
      'A pitch that hits the batter’s hands is a hit-by-pitch and the ball is dead — unless the batter was swinging, in which case it’s a dead-ball strike. It is never a foul ball.',
  },
  {
    myth: 'The runner must slide.',
    ruling: 'Slide OR avoid — the runner chooses.',
    detail:
      'No rule ever requires a slide. In Little League the runner must slide or attempt to get around a fielder who has the ball and is waiting to make the tag — going in standing up is legal when there’s no play waiting.',
  },
  {
    myth: 'Head-first slides mean an automatic out.',
    ruling: 'Only while advancing.',
    detail:
      'In Little League (Majors and below) a runner is out for sliding head-first while advancing to a base. Diving back to a base they already occupied is perfectly legal.',
  },
  {
    myth: 'A foul tip is a dead ball.',
    ruling: 'A caught foul tip is a live strike.',
    detail:
      'A foul tip goes sharp and direct from the bat to the catcher’s hand or glove and is caught. It’s a strike, the ball is live, and runners can steal. Anything nicked that isn’t caught sharp-and-direct is just a foul ball.',
  },
  {
    myth: 'An overthrow out of play is “one plus one.”',
    ruling: 'Two bases, from a fixed point.',
    detail:
      'The award is two bases from the time of the throw — or from the time of the pitch when it’s the first play by an infielder. There is no “the base they’re going to plus one” rule.',
  },
  {
    myth: 'Strike three is always the end of the at-bat.',
    ruling: 'Not if the catcher doesn’t catch it.',
    detail:
      'In Majors and above, on an uncaught third strike the batter may run for first when it’s unoccupied — or any time with two outs. The batter is only out automatically when first is occupied with fewer than two outs.',
  },
  {
    myth: 'The ball is dead on an infield fly.',
    ruling: 'The infield fly is live.',
    detail:
      'The batter is out whether the ball is caught or not, but everything else continues: runners may advance at their own risk, tagging up if it’s caught. Killing the play is the surest way to create a mess.',
  },
  {
    myth: 'A runner standing on the base is safe from a batted ball.',
    ruling: 'The base is not a shelter.',
    detail:
      'A runner in fair territory struck by an untouched batted ball is out, on the base or off it. The one exception: a runner touching their base when an infield fly is declared is not out for being hit.',
  },
  {
    myth: 'A tag with an empty glove counts.',
    ruling: 'Tag with the ball, or the hand/glove holding it.',
    detail:
      'Ball in the throwing hand, tag with the empty glove — that’s no tag. The runner is only out when tagged with the ball itself or with the glove or hand the ball is secured in.',
  },
  {
    myth: 'The next batter warms up on deck.',
    ruling: 'No on-deck batter in Little League.',
    detail:
      'Below the Intermediate division there is no on-deck position — the next batter stays in the dugout until it’s their turn. Swinging a bat outside the dugout between at-bats isn’t permitted.',
  },
];
