import { Question } from '../types';

// 4-Umpire System mechanics bank, covering the 60-foot diamond system
// (Full / Fill / U2 Fill rotations) and the 50/70 & 90-foot diamond system
// (Full / Reverse / U2 Drift / PU Trail rotations), rulings verified against
// the 2026 Little League Umpire's Manual. Scenarios are original wording.
//
// Crew shorthand used throughout, matching real crew language:
//   PU = plate umpire, U1/U2/U3 = base umpires, BR = batter-runner,
//   F1–F9 = fielders by scoring notation, C/NC = catch/no-catch,
//   Po1/Po2/Po3 = point of first/second/third base, PoP = point of plate,
//   AOR = area of responsibility, RiSP = runner(s) in scoring position.

export const MECH_QUESTIONS: Question[] = [
  // ── Rotations (60-ft) ────────────────────────────────────────────────
  {
    id: 'mech-001',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on base. The batter lifts a deep fly into the left-center gap and U2 goes out for the catch/no-catch. Which rotation is the crew now in?',
    options: [
      'Full rotation — everyone moves clockwise',
      'Fill rotation — U3 alone fills the vacancy',
      'U2 Fill — U2 covers first and second',
      'No rotation — everyone stays home',
    ],
    correctIndex: 0,
    explanation:
      'With no runners in scoring position (nobody on, or R1 only), U2 or U3 going out triggers the Full rotation: PU rotates up to third, U3 slides over to second, and U1 takes the batter-runner at first before releasing home.',
  },
  {
    id: 'mech-002',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, Full rotation in progress after U2 went out on a fly ball with nobody on. The batter-runner is being waved around second toward third. Who has the play at third base?',
    options: [
      'U3, sprinting back from second',
      'The plate umpire, in foul territory at Po3',
      'U1, cutting across the infield',
      'Nobody — the crew concedes the call to the closest umpire',
    ],
    correctIndex: 1,
    explanation:
      'In the Full rotation the plate umpire moves up the line to cover third, staying in foul territory all the way to Po3, and must arrive 60 feet ahead of the runner to be set for a tag play.',
  },
  {
    id: 'mech-003',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on. U3 goes out on a fly ball down the left-field line. In the Full rotation that follows, what is U1’s assignment?',
    options: [
      'Stay anchored at first for the whole play',
      'Rotate immediately to third base',
      'Observe the batter-runner’s touch of first, then release to cover home at PoP',
      'Go out to back up U3 on the catch',
    ],
    correctIndex: 2,
    explanation:
      'U1 watches the batter-runner touch first, then releases to home plate, mirroring the lead runner so as to arrive at PoP 60 feet ahead of the runner. The umpire covering second picks up the batter-runner back into first once U1 releases.',
  },
  {
    id: 'mech-004',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on, U3 out on a fly ball. The batter-runner rounds first and dives back in on the throw behind him. U1 has already released toward home. Whose call is it at first?',
    options: [
      'U1 must run back — first base is always his',
      'U2, who covered second in the rotation, picks up the batter-runner back into first',
      'The plate umpire from the plate area',
      'U3, coming back in from the outfield',
    ],
    correctIndex: 1,
    explanation:
      'Once U1 releases to home in the Full rotation, the umpire who rotated to second (here U2) is responsible for plays back into first. U1 never returns once he has released.',
  },
  {
    id: 'mech-005',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first only. A fly ball drives F8 toward the right-center gap and U2 goes out. Which rotation applies?',
    options: [
      'Fill rotation, because a runner is on base',
      'Full rotation — R1 only is still “no runners in scoring position”',
      'U2 Fill',
      'Reverse rotation',
    ],
    correctIndex: 1,
    explanation:
      'The trigger for the Full rotation is no runners in scoring position, which covers both bases empty and a runner on first only. The Fill rotation is reserved for runners in scoring position.',
  },
  {
    id: 'mech-006',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on second only. U3 goes out on a drive toward the left-field line. What does U2 do?',
    options: [
      'Stay planted at his starting position',
      'Rotate to third while PU takes second',
      'Move into the Restricted Area and cover both second and third',
      'Follow U3 out as backup on the catch',
    ],
    correctIndex: 2,
    explanation:
      'With a runner in scoring position, U2 or U3 leaving triggers the Fill rotation: the remaining middle umpire fills the vacancy from the Restricted Area and owns both second and third, slipping to the outside once his responsibilities become singular.',
  },
  {
    id: 'mech-007',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, bases loaded. U2 goes out on a fly ball to center. Where does the plate umpire go?',
    options: [
      'Up to third, as in the Full rotation',
      'Nowhere — PU stays home at PoP for the entire play',
      'Halfway up the third-base line to float between third and home',
      'To the mound to direct traffic',
    ],
    correctIndex: 1,
    explanation:
      'With runners in scoring position the crew uses the Fill rotation, and the plate umpire never leaves home: runs are the priority. With R3, PU lines up the tag-up at the dirt circle and then gets back to PoP aggressively.',
  },
  {
    id: 'mech-008',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runners on second and third. U1 goes out on a fly ball that pushes F9 toward the right-field line. Which rotation does the crew use?',
    options: [
      'Fill rotation, because runners are in scoring position',
      'Full rotation',
      'U2 Fill — it is always the answer when U1 leaves, regardless of the runners',
      'No rotation is needed when U1 goes out',
    ],
    correctIndex: 2,
    explanation:
      'Anytime U1 leaves to cover catch/no-catch, the crew is in the U2 Fill — the position of the runners never changes that. U2 fills the Restricted Area and takes first and second, and U3 moves to Po3.',
  },
  {
    id: 'mech-009',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, U2 Fill rotation: U1 went out on a fly ball. U2 is working from the Restricted Area covering first and second. The play ends with only one runner still moving, heading back into first. What should U2 do?',
    options: [
      'Stay deep in the Restricted Area no matter what',
      'Slip to the outside now that the responsibility is singular',
      'Hand first base off to the plate umpire',
      'Sprint to the outfield-side of second base',
    ],
    correctIndex: 1,
    explanation:
      'The Restricted Area is only for multiple responsibilities. Once an umpire’s coverage narrows to a single base, he slips to the outside and works the play from there, chest to ball.',
  },
  {
    id: 'mech-010',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runners on first and third. U3 goes out on a deep fly to left. In the Fill rotation, what is U1’s role?',
    options: [
      'Rotate to home to free up PU',
      'Move to Po1 and act as the “crew saver,” using proper use of eyes on everything he can',
      'Cover second and third from the Restricted Area',
      'Trail the batter-runner to second',
    ],
    correctIndex: 1,
    explanation:
      'In the Fill rotation U1 moves to Po1, holds first, and is the crew saver — eyes disciplined and on the whole play so he can bail the crew out on anything unexpected. U2 fills for second and third, and PU stays home.',
  },
  {
    id: 'mech-011',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on third, one out. U2 goes out on a medium fly ball to center and R3 tags. How does the plate umpire handle the tag-up?',
    options: [
      'Runs up the line to third to watch the retouch from close range',
      'Lines up R3’s retouch at the dirt circle, then returns aggressively to PoP for the play at the plate',
      'Delegates the retouch to U1 across the diamond',
      'Watches from the slot without moving',
    ],
    correctIndex: 1,
    explanation:
      'In the Fill rotation the plate umpire keeps the retouch at third when R3’s umpire situation demands it: he lines up the tag-up at the dirt circle, then hustles back to PoP because the play at the plate is his and runs are the priority.',
  },
  {
    id: 'mech-012',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond crew in the pre-game conference. A new umpire asks: “When exactly do we run the Full rotation?” What is the correct answer?',
    options: [
      'Any fly ball to the outfield, no matter who goes out',
      'Only with the bases completely empty',
      'When U2 or U3 goes out with no runners in scoring position — bases empty or R1 only',
      'Whenever the plate umpire feels like rotating',
    ],
    correctIndex: 2,
    explanation:
      'Full rotation = NRiSP (nobody on or R1 only) and the umpire leaving is U2 or U3. If U1 is the one who leaves, it is always the U2 Fill instead, and with runners in scoring position it becomes the Fill rotation.',
  },
  {
    id: 'mech-013',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on second. U3 goes out on a fly ball. A teammate expects the plate umpire to rotate up to third the way he does with nobody on. Does he?',
    options: [
      'Yes — PU always covers third when U3 leaves',
      'No — with a runner in scoring position PU stays at the plate and U2 fills for both second and third',
      'Yes, but only if the ball is caught',
      'No — U1 covers third instead',
    ],
    correctIndex: 1,
    explanation:
      'The Full rotation (PU up to third) is only used with no runners in scoring position. With R2, the crew is in the Fill rotation: PU never abandons the plate because the runner can score, and U2 owns second and third from the Restricted Area.',
  },
  {
    id: 'mech-014',
    ruleset: 'mech',
    topic: 'Rotations (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on, ball in the right-center gap with U2 out. U1 releases to home. The batter-runner takes a wide turn at first — who is watching him now, and from where?',
    options: [
      'U3, covering second in the rotation, picks up the batter-runner back into first',
      'U1, walking backward toward home',
      'PU from Po3',
      'U2 from the outfield grass',
    ],
    correctIndex: 0,
    explanation:
      'In the Full rotation with U2 out, U3 moves to Po2 opposite the throw for plays at second and also inherits plays back into first once U1 releases to the plate.',
  },

  // ── Fly Ball Coverage (60-ft) ────────────────────────────────────────
  {
    id: 'mech-015',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A slicing fly ball forces F9 to sprint toward the right-field foul line. Whose catch/no-catch is it?',
    options: [
      'U1 — F9 moving toward the line is his area',
      'U2 — he owns all three outfielders',
      'PU, since the ball threatens fair/foul',
      'U3, rotating behind the play',
    ],
    correctIndex: 0,
    explanation:
      'On the 60-ft diamond U1’s area of responsibility is F9 moving toward the right-field line. U2 has F7 and F9 moving in, back, or toward center, plus everything F8 does; U3 mirrors U1 on the left-field line.',
  },
  {
    id: 'mech-016',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. F8 turns and races straight back toward the center-field fence on a deep drive. Which umpire goes out?',
    options: [
      'U1',
      'U3',
      'U2 — anything F8 does belongs to him',
      'Nobody — a ball to the fence is obvious',
    ],
    correctIndex: 2,
    explanation:
      'F8 belongs to U2 in every direction. A ball threatening the fence is one of the “3 Fs” (fair/foul, fence, fielders converging) where an umpire absolutely must be out for catch/no-catch and boundary calls.',
  },
  {
    id: 'mech-017',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A fly ball pushes F7 drifting toward center field, away from the foul line. Whose ball is it?',
    options: [
      'U3 — F7 is always his',
      'U2 — F7 moving toward center belongs to U2, not U3',
      'PU, because no line is threatened',
      'U1, crossing behind second',
    ],
    correctIndex: 1,
    explanation:
      'U3 only owns F7 moving toward the left-field line. When F7 moves in, back, or toward center, that fly ball is U2’s. Reading the fielder’s direction — not the ball — is what defines the area of responsibility.',
  },
  {
    id: 'mech-018',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. On a drive into the left-center gap, both U2 and U3 break toward the outfield at the same time. How is the conflict resolved?',
    options: [
      'Whoever called it first keeps it',
      'The crew defers to U2 — he is the quarterback — and U3 recovers into the rotation, unless the ball is on the line',
      'The crew defers to U3 as the senior base umpire',
      'Both stay out and split the call',
    ],
    correctIndex: 1,
    explanation:
      'If two umpires take the same fly ball, the crew defers to U2, the quarterback on all fly balls to the outfield. The other umpire recovers and rotates. The exception is a ball on the foul line, which stays with the line umpire.',
  },
  {
    id: 'mech-019',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. U3 went out on a fly ball that dropped. The play turns into a rundown between third and home. May U3 come back in to help?',
    options: [
      'No — once out, an umpire never re-enters under any circumstance',
      'Yes — assisting on a rundown is the one exception to “go out and stay out,” waiting for the play to come toward him before calling himself in',
      'Yes, and he should immediately take over the lead call',
      'Only if the plate umpire physically waves him in',
    ],
    correctIndex: 1,
    explanation:
      'The rule is go out and stay out — except that an umpire may return to assist in a rundown, waiting for the play to move away from his partner before calling himself into it.',
  },
  {
    id: 'mech-020',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. U1 goes out on a fly ball down the right-field line. As the fielder tracks it, how should U1 physically work the play?',
    options: [
      'Run directly at the fielder to get as close as possible',
      'Run parallel to the fielder, as far as the play allows, and get stopped and set before the attempted catch',
      'Backpedal along the foul line watching the ball',
      'Stand still at his starting spot and take the long look',
    ],
    correctIndex: 1,
    explanation:
      'Going out means running parallel to the fielder to avoid being straight-lined, getting as far out as the play allows, and being stopped and set before the catch attempt — then using timing and proper use of eyes before signaling.',
  },
  {
    id: 'mech-021',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A high pop-up comes down on the infield grass behind the mound, with F4 and F6 converging and gloving it chest-high. Who has catch/no-catch?',
    options: [
      'U2, closest to the play',
      'The plate umpire — all catch/no-catch on the infield grass is his',
      'Whichever base umpire the glove opens toward',
      'U1, because the ball is right-side',
    ],
    correctIndex: 1,
    explanation:
      'The plate umpire owns all catch/no-catch on the infield grass, and any infield ball gloved above the fielder’s waist. The open glove theory only takes over on balls played below the waist off the grass.',
  },
  {
    id: 'mech-022',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A sinking line drive forces F6 to lunge low, glove opening toward the third-base side. The catch is at his shoe tops. Who rules catch or trap?',
    options: [
      'PU — every infield ball is his',
      'U3 — the open glove theory sends the call to the umpire the glove opens toward',
      'U2 — F6 always belongs to U2',
      'U1 — the throw is going his way',
    ],
    correctIndex: 1,
    explanation:
      'On balls fielded below the waist, the open glove theory applies: the umpire toward whom the fielder’s glove opens has catch/no-catch. That is exactly why base umpires must be able to see the shoe tops of the fielder in front of them.',
  },
  {
    id: 'mech-023',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, crack of the bat on a ball to the outfield. What is the “read step” every umpire is instructed to take?',
    options: [
      'A step toward home plate to hear the crew chief',
      'Opening with the ball, chest to ball, body sideways parallel to the foul line, to read fly ball vs. base hit, the fielders, and the partners',
      'Two hard steps toward the outfield on every batted ball',
      'A step backward to widen the view',
    ],
    correctIndex: 1,
    explanation:
      'The read step opens the umpire with the ball — chest to ball, posture parallel to the line — to sort out three things: is it a fly ball or a base hit, where are the fielders moving (which defines AOR), and what are the partners doing.',
  },
  {
    id: 'mech-024',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on. A fly ball hangs in U2’s area and U2 is reading whether to go out. Meanwhile U3 takes a couple of quiet early steps toward second base. What is U3 doing?',
    options: [
      'Abandoning his post — a mechanics error',
      'Taking a cheat step toward his rotation assignment so he arrives on time if U2 goes; if U2 stays, he simply returns to his base',
      'Trying to draw a throw from the outfielder',
      'Covering for the plate umpire',
    ],
    correctIndex: 1,
    explanation:
      'The cheat step is an early, small move toward the base the umpire will cover if the rotation happens. It buys a head start while the partner reads the fly ball, and costs nothing — if the partner stays, the umpire just steps back to his base.',
  },
  {
    id: 'mech-025',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A lazy single drops cleanly in front of F8, who fields it on one hop. U2 sprints into the outfield anyway. Why is this wrong?',
    options: [
      'It is not wrong — always go out on any ball to the outfield',
      'Base hits are not fly balls: going out on a clean hit abandons second base and strands the crew, which is exactly what the read step is meant to prevent',
      'U2 may never leave the infield under any circumstance',
      'Only U1 and U3 are allowed to go out',
    ],
    correctIndex: 1,
    explanation:
      'Umpires go out on fly balls in their area, not on clean base hits. On a clean hit U2 moves to Po2 opposite the throw for the runner sliding in. Umpires leaving on base hits was the specific problem the read-step emphasis was created to fix.',
  },

  // ── Fair / Foul (60-ft) ──────────────────────────────────────────────
  {
    id: 'mech-026',
    ruleset: 'mech',
    topic: 'Fair / Foul (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A chopper down the first-base line is fielded by F3 well in front of the bag, right on the chalk. Whose fair/foul call is it?',
    options: [
      'U1 — he is standing right there',
      'The plate umpire — he has both lines up to but not including the front edge of the base',
      'U2, from the middle',
      'Joint call between PU and U1',
    ],
    correctIndex: 1,
    explanation:
      'The plate umpire owns fair/foul on both lines up to but not including the front edge of first and third — including any ball fielded in front of the bag or that stops short of it. U1 takes over from the front edge and beyond.',
  },
  {
    id: 'mech-027',
    ruleset: 'mech',
    topic: 'Fair / Foul (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A hard ground ball bounds over the third-base bag itself and kicks into the outfield. Who makes the fair/foul call?',
    options: [
      'PU — all fair/foul belongs to the plate',
      'U3 — he has everything from the front edge of the base and beyond, including balls bounding over the bag',
      'U2, with the best cross angle',
      'No call is needed on a bounding ball',
    ],
    correctIndex: 1,
    explanation:
      'From the front edge of the base and beyond — bounding in the air, on the ground, or fielded even with or past the bag — the line belongs to U3 (or U1 on the other side). Short of the front edge it is the plate umpire’s call.',
  },
  {
    id: 'mech-028',
    ruleset: 'mech',
    topic: 'Fair / Foul (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. Earlier in the play U1 abandoned the right-field line to take a play, and now a looping ball lands near that line beyond first base. Who has fair/foul?',
    options: [
      'U1 hustles back to the line to make the call',
      'The plate umpire — once U1 abandons the line, PU assumes the entire line and U1 never comes back for fair/foul',
      'U2 splits the difference',
      'The call defaults to fair',
    ],
    correctIndex: 1,
    explanation:
      'An umpire who abandons his line never comes back to make a fair/foul decision. The plate umpire assumes the entire foul line the moment U1 or U3 leaves it — one of the reasons PU “holds the line” at PoP when not rotating.',
  },
  {
    id: 'mech-029',
    ruleset: 'mech',
    topic: 'Fair / Foul (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on third. A swinging bunt dribbles up the third-base line and R3 breaks home, crossing directly between the plate umpire and the rolling ball. What is the crew’s built-in answer to this?',
    options: [
      'PU calls it anyway on his best guess',
      'This is the “pinch”: with R3 blocking PU’s look between home and third, fair/foul passes to U3',
      'The ball is automatically foul once a runner screens the umpire',
      'U1 takes the call from across the diamond',
    ],
    correctIndex: 1,
    explanation:
      'With R3, the runner can block the plate umpire’s sight line on a ball between home and third. That is the pinch situation, and the fair/foul decision passes to U3 — something the crew pre-signals so nobody is surprised.',
  },
  {
    id: 'mech-030',
    ruleset: 'mech',
    topic: 'Fair / Foul (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A ground ball is rolling up the first-base line, untouched, still short of the bag and wobbling between fair and foul territory. When should an umpire declare it?',
    options: [
      'Immediately, so everyone can stop running',
      'Not until the ball is touched or settles — never before it reaches first or third on its own',
      'Once it crosses the halfway point of the baseline',
      'Only after the offensive coach asks',
    ],
    correctIndex: 1,
    explanation:
      'A rolling ball short of the base is declared only when it is touched or settles. Calling it early is a classic error: the ball can still spin fair or kick foul, and a premature “foul” kills a live play that might have stayed fair.',
  },
  {
    id: 'mech-031',
    ruleset: 'mech',
    topic: 'Fair / Foul (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A fly ball drifts down the line into the left-field corner, about 10 feet off the chalk, with F7 giving chase. The umpire on the call knows it will land near the line. When does he name it fair or foul?',
    options: [
      'While it is still in the air, to help the runners',
      'Only after the ball is touched by the fielder or touches the ground',
      'Never — outfield balls are not named',
      'As soon as the fielder waves his arms',
    ],
    correctIndex: 1,
    explanation:
      'A fly ball to the outfield is never named fair or foul until it is touched or lands. Once it does, a ball that becomes fair or foul within 20 feet of the line gets a verbal and visual call; obvious fouls far off the line do not.',
  },
  {
    id: 'mech-032',
    ruleset: 'mech',
    topic: 'Fair / Foul (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. From his angle, U3 is 100% certain a bounced ball nicked the batter in the box, but the plate umpire says nothing and the defense is playing on. What should U3 do?',
    options: [
      'Nothing — it is exclusively the plate umpire’s call',
      'Yell “Foul ball!” instantly',
      'Give PU a beat to make the call first; if he does not, stop everything by aggressively calling “Time!”, then sort out batter-in-the-box (foul) vs. out of the box (out)',
      'Wait until the end of the play and mention it quietly',
    ],
    correctIndex: 2,
    explanation:
      'A base umpire who is completely certain the batted ball touched the batter gives the plate umpire first crack, then kills the play with an aggressive “Time!” Afterward the crew decides: touched in the box is foul; touched outside the box over fair territory makes the batter-runner out.',
  },
  {
    id: 'mech-033',
    ruleset: 'mech',
    topic: 'Fair / Foul (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A towering pop-up drifts into foul ground halfway between home and first, with F3 camping under it. How do PU and U1 divide the play?',
    options: [
      'They bracket the fielder: PU holds the line for fair/foul while U1 shades toward the fence, with catch/no-catch decided by the infield principles',
      'Both converge on the fielder from the same side',
      'U1 takes everything; PU watches the batter',
      'PU takes everything; U1 protects first base',
    ],
    correctIndex: 0,
    explanation:
      'Pop-ups between home and first (or third) are bracketed: the plate umpire stays on the line for the fair/foul element and U1/U3 shades to the fence side. Who signals catch/no-catch follows the infield rules — PU above the waist or on the grass, open glove below.',
  },

  // ── Positioning (60-ft) ──────────────────────────────────────────────
  {
    id: 'mech-034',
    ruleset: 'mech',
    topic: 'Positioning (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A new U1 sets up about six feet behind the first-base bag, directly in line with F3. What is wrong with this pre-pitch position?',
    options: [
      'Nothing — closer is always better',
      'He must be at least 10–12 feet from the base, never parallel with or in front of the fielder, and outside the fielder’s 2–3 step “halo”',
      'He should be in fair territory instead',
      'He should stand on the foul line itself',
    ],
    correctIndex: 1,
    explanation:
      'The starting position rules: never closer than 10–12 feet to the base in front of you, never parallel with or ahead of the fielder, slightly outside the fielder’s halo, and always able to see the fielder’s shoe tops for a sinking line drive.',
  },
  {
    id: 'mech-035',
    ruleset: 'mech',
    topic: 'Positioning (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first only. Where does U2 set up?',
    options: [
      'B position',
      'C position — on the 60-ft diamond, R1 (and R1+R3) puts U2 in C',
      'Inside the diamond behind the mound',
      'Shallow center field',
    ],
    correctIndex: 1,
    explanation:
      'On the 60-ft diamond U2 works outside the diamond and picks his spot by the runners: C with R1 or R1+R3, B anytime a runner is on second, and preference with R3 only or nobody on.',
  },
  {
    id: 'mech-036',
    ruleset: 'mech',
    topic: 'Positioning (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on second. U2 wants to stay in the C position because he likes the view. What does the manual say?',
    options: [
      'Position is always umpire preference',
      'Anytime there is a runner on second, U2 uses the B position',
      'U2 must move inside the diamond with R2',
      'U2 should stand directly behind second base',
    ],
    correctIndex: 1,
    explanation:
      'With any runner on second base, U2 is in B on the 60-ft diamond. C is for R1 or R1+R3; only with R3 alone or bases empty does personal preference decide.',
  },
  {
    id: 'mech-037',
    ruleset: 'mech',
    topic: 'Positioning (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first. The base umpires want to use the relaxed standing “wide receiver” set they used all last inning with the bases empty. Is that allowed?',
    options: [
      'Yes — stance is always a comfort choice',
      'No — anytime a runner is on any base, every umpire uses the hands-on-knees set; wide receiver is only an option with nobody on, and only if the whole crew agreed pre-game',
      'Yes, but only for U2',
      'No — hands-on-knees is required at all times',
    ],
    correctIndex: 1,
    explanation:
      'With runners on, hands-on-knees is mandatory for every umpire. The walk-the-line wide receiver set is a bases-empty option that the whole crew must adopt together, decided in the pre-game conference.',
  },
  {
    id: 'mech-038',
    ruleset: 'mech',
    topic: 'Positioning (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. When is an umpire supposed to work from the Restricted Area rather than from the point of a base?',
    options: [
      'Whenever he wants a better view of the outfield',
      'When his responsibilities are multiple — covering more than one base; once they become singular he uses the point of the base',
      'Only on plays at the plate',
      'Never — the Restricted Area is for the 2-umpire system only',
    ],
    correctIndex: 1,
    explanation:
      'The Restricted Area (between the mound and the second-base cutout) is used only when covering multiple bases, staying chest to ball with depth to keep angles open. With a single responsibility, the umpire works from the point of the base instead.',
  },
  {
    id: 'mech-039',
    ruleset: 'mech',
    topic: 'Positioning (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond. Where exactly is “Po3,” the spot U3 owns on plays at third?',
    options: [
      'On the infield-side corner of the bag in fair territory',
      'The topside (outfield) corner of third base, in foul territory between the foul line and the coach’s box',
      'Ten feet up the left-field line toward home',
      'Directly behind the third-base coach',
    ],
    correctIndex: 1,
    explanation:
      'Point of third is the topside outfield corner of the bag, in foul ground between the line and the coach’s box — close enough to own the “real estate,” out of everyone’s way, chest to ball, and positioned for tag plays.',
  },
  {
    id: 'mech-040',
    ruleset: 'mech',
    topic: 'Positioning (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, between innings. Where does each member of the 4-umpire crew stand while the defense warms up?',
    options: [
      'All four gather behind the mound',
      'PU on the defensive side in foul territory near the line; U1, U2, U3 in shallow right, center, and left field respectively, moving in when the ball goes down to second',
      'Each umpire stands on his base',
      'PU at the backstop, base umpires along the first-base fence',
    ],
    correctIndex: 1,
    explanation:
      'Neutral positions: the plate umpire works the defensive-side foul territory (watching the on-deck batter, counting warm-up pitches, alerting at two remaining, one-minute limit), while U1/U2/U3 stand in shallow right/center/left and return to their starting spots when the ball is thrown down.',
  },
  {
    id: 'mech-041',
    ruleset: 'mech',
    topic: 'Positioning (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on. A routine ground ball goes to F6, throw over to first. What is the plate umpire doing during this play?',
    options: [
      'Standing still behind the plate',
      'Trailing the batter-runner toward first — watching for a runner’s lane violation, an overthrow going out of play, and helping U1 with a pulled foot or swipe tag if asked',
      'Rotating to third in case of an error',
      'Following the throw to the shortstop',
    ],
    correctIndex: 1,
    explanation:
      'With nobody on, PU trails the batter-runner up the line. He owns any tag attempt on the BR before the runner’s lane, watches the lane violation and out-of-play overthrows, and offers pulled-foot/swipe-tag help to U1 on request — then returns to PoP.',
  },

  // ── Tag-Ups & Touches (60-ft) ────────────────────────────────────────
  {
    id: 'mech-042',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runners on second and third, one out. U2 goes out on a deep fly to center and both runners tag. Who is watching R2’s retouch at second?',
    options: [
      'U2, glancing back over his shoulder',
      'U3 — the retouch advances to the umpire at the base ahead of the runner',
      'U1 from across the diamond',
      'PU handles both retouches at once',
    ],
    correctIndex: 1,
    explanation:
      'When an umpire leaves, retouch responsibility advances to the umpire positioned ahead of the runner: with U2 out, U1 has first, U3 has second, and PU has third. Trying to watch a tag-up behind you while covering a base ahead is how calls get missed.',
  },
  {
    id: 'mech-043',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on second and third. U1 goes out on a fly ball down the right-field line. Who has the retouches at first and second?',
    options: [
      'PU has both',
      'U2 has both retouches at first and second',
      'U3 takes first, PU takes second',
      'Nobody — retouches are waived when U1 leaves',
    ],
    correctIndex: 1,
    explanation:
      'When U1 goes out, U2 picks up the retouches at both first and second — consistent with the U2 Fill, where U2 owns everything on that side of the infield. U3 keeps third (or PU keeps it in situations where U3 has second and third).',
  },
  {
    id: 'mech-044',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first only. U2 goes out on a deep drive and R1 holds to tag. The crew is in a Full rotation. Who watches R1’s retouch at first?',
    options: [
      'U3, covering second',
      'PU on his way to third',
      'U1 — the one exception: in the Full rotation with R1 only, U1 takes R1’s retouch before releasing',
      'U2 from the outfield',
    ],
    correctIndex: 2,
    explanation:
      'Normally retouches advance to the umpire ahead of the runner, but the manual carves out one exception: with R1 only in the Full rotation, U1 keeps R1’s retouch at first — he is right there before his release home.',
  },
  {
    id: 'mech-045',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, Full rotation running with nobody on (U3 out on the catch attempt). The batter-runner is circling the bases on a ball in the gap. Match the touches: who has first, second, third, and home?',
    options: [
      'U1 has first and home, U2 has second, PU has third',
      'PU has first, U1 has second, U2 has third and home',
      'U1 has everything until relieved',
      'U2 has first and second, PU has home, U1 has third',
    ],
    correctIndex: 0,
    explanation:
      'Full rotation touch map: U1 takes the batter-runner’s touch of first and then home after releasing; the middle umpire who stayed (U2 here) has second; the plate umpire has third.',
  },
  {
    id: 'mech-046',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (60-ft)',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first, ground ball to F6 — a tailor-made double play. As the feed comes to second, what is the 2026 point-of-emphasis footwork for U2?',
    options: [
      'Charge the bag to get on top of the pivot',
      'One step in the direction of the throw for an angle, stopped and locked with eyes to the base — then drift with eyes down on the runner and fielder for any late infractions',
      'Back away toward the outfield for the wide view',
      'Straddle second base before the throw arrives',
    ],
    correctIndex: 1,
    explanation:
      'Double-play footwork: take one step toward the throw to create an angle, be stopped and locked at the moment of the force with eyes on the base, and afterward drift with eyes down on the runner and pivot fielder to catch slide or contact infractions.',
  },

  // ── Crew Signals & POEs ──────────────────────────────────────────────
  {
    id: 'mech-047',
    ruleset: 'mech',
    topic: 'Crew Signals & POEs',
    tier: 'sixty',
    scenario:
      'Any diamond, 4-umpire crew. The count runs to 3-2 on the batter. What is the whole crew expected to do before the next pitch?',
    options: [
      'Nothing — counts are the plate umpire’s business',
      'Every umpire signals the 3-2 count, flagging the coming “action pitch” for the whole crew',
      'Only PU and U1 exchange a nod',
      'The crew resets to bases-empty positions',
    ],
    correctIndex: 1,
    explanation:
      'On any count reaching 3-2, all four umpires signal it. The next pitch can produce a checked swing ask, a strikeout-throw-out double play, or ball four with runners moving — the crew signal keeps everyone alert to all of it.',
  },
  {
    id: 'mech-048',
    ruleset: 'mech',
    topic: 'Crew Signals & POEs',
    tier: 'big',
    scenario:
      'Any diamond. Two strikes on the batter. He offers at a low pitch and the ball skips past the catcher. Nobody on the defense asks for help on the swing. What does the plate umpire do?',
    options: [
      'Wait — check the swing only if the defense appeals',
      'Check the swing with the base umpire immediately, without being asked: two-strike half-swings are an automatic check',
      'Call the batter out on his own read',
      'Declare no pitch and reset',
    ],
    correctIndex: 1,
    explanation:
      'With two strikes, umpires check the swing immediately without waiting for an appeal — especially on a third strike not caught, where whether the batter struck out determines whether he can run. Waiting invites chaos and gives one side an advantage.',
  },
  {
    id: 'mech-049',
    ruleset: 'mech',
    topic: 'Crew Signals & POEs',
    tier: 'sixty',
    scenario:
      'Any diamond. The batter tries to hold up on an inside pitch and the ball grazes his hands mid-half-swing. Why must the plate umpire check the swing immediately here?',
    options: [
      'To decide whether to eject the pitcher',
      'Because the ruling hinges on it: if he swung it is a dead-ball strike, if he held up it is a hit-by-pitch — and that must be settled now, not retroactively',
      'Because the ball is live either way and runners are advancing',
      'It is only checked if the offense complains',
    ],
    correctIndex: 1,
    explanation:
      'A half-swing plus hit-by-pitch is an automatic, immediate check: swing means dead-ball strike, no swing means the batter is awarded first. Handling it on the spot avoids the mess of unwinding the play after the fact.',
  },
  {
    id: 'mech-050',
    ruleset: 'mech',
    topic: 'Crew Signals & POEs',
    tier: 'big',
    scenario:
      'Any diamond, 2026 season. When the plate umpire himself checks a swing, what new mechanic may he use so the crew cannot mistake it for anything else?',
    options: [
      'Pointing at the batter with his indicator',
      'Both hands out with open palms — an unmistakable two-handed checking signal',
      'Removing his mask and holding it overhead',
      'A closed fist pumped twice',
    ],
    correctIndex: 1,
    explanation:
      'New for 2026: the plate umpire may check a swing using two hands with open palms, a movement distinct enough that it cannot be confused with any other plate mechanic.',
  },
  {
    id: 'mech-051',
    ruleset: 'mech',
    topic: 'Crew Signals & POEs',
    tier: 'sixty',
    scenario:
      'Any diamond, pre-pitch. What does the crew’s “DOO” mnemonic tell each umpire to think through before every pitch?',
    options: [
      'Distance, Obstruction, Overthrow',
      'Whether his job on a ball in play is to move Down to the point of his base, Out for catch/no-catch in his area, or Over to another base in rotation',
      'Defense, Offense, Outs',
      'Drive, Observe, Officiate',
    ],
    correctIndex: 1,
    explanation:
      'Every pitch, every umpire already knows what he will “DOO” on a ball in play: Down to the point of his base, Out for a fly ball in his area, or Over to a base he covers in rotation — signaled pre-pitch by pointing, initiated by PU but done by all.',
  },
  {
    id: 'mech-052',
    ruleset: 'mech',
    topic: 'Crew Signals & POEs',
    tier: 'big',
    scenario:
      'Any diamond. Who initiates the pre-pitch responsibility signals in the 4-umpire system, and who is required to give them?',
    options: [
      'U2 initiates as the quarterback; only middle infield umpires signal',
      'The plate umpire initiates, but every umpire on the crew must signal',
      'The crew chief initiates; signals are optional',
      'Signals are only used with runners in scoring position',
    ],
    correctIndex: 1,
    explanation:
      'Pre-pitch communication is initiated by the plate umpire but must be done by all four: each umpire points to his responsibility for the situation. Early, continuous, audible and visual communication is the backbone of the system.',
  },

  // ── Tag Plays & the Wedge ────────────────────────────────────────────
  {
    id: 'mech-053',
    ruleset: 'mech',
    topic: 'Tag Plays & the Wedge',
    tier: 'big',
    scenario:
      'Any diamond. In wedge theory, what exactly is “the wedge” the umpire is trying to put his eyes into?',
    options: [
      'The triangle between the base, the mound, and the umpire',
      'The area between the fielder’s base-side hip and the incoming runner’s base-side hip, where the tag attempt happens',
      'The cutout of dirt around the base',
      'The gap between the umpire and the nearest coach',
    ],
    correctIndex: 1,
    explanation:
      'The wedge is the space between the fielder’s base-side hip and the runner’s base-side hip — getting your eyes in there as the two come together is what lets you actually see the tag instead of guessing at it.',
  },
  {
    id: 'mech-054',
    ruleset: 'mech',
    topic: 'Tag Plays & the Wedge',
    tier: 'sixty',
    scenario:
      'Any diamond, tag play developing at a base. Where does the umpire start when finding the wedge?',
    options: [
      'Straddling the base',
      '5–7 feet directly behind the fielder receiving the throw, without impeding the fielder’s lateral movement',
      '15–18 feet away at a fixed 90-degree angle',
      'On the runner’s track into the base',
    ],
    correctIndex: 1,
    explanation:
      'Current instruction: start 5–7 feet behind the fielder receiving the throw. That puts the umpire on a parallel track with the fielder, allows quick relative adjustments, and takes fewer steps to hold the wedge — while staying off the fielder’s lateral track and the runner’s path.',
  },
  {
    id: 'mech-055',
    ruleset: 'mech',
    topic: 'Tag Plays & the Wedge',
    tier: 'big',
    scenario:
      'Any diamond. The saying in wedge theory is that “the base will not take us to the play.” What actually takes the umpire to the play?',
    options: [
      'The runner’s path alone',
      'The three variables of a play — ball, fielder, and runner — moving together; the base is only a reference point',
      'The throw’s trajectory',
      'A pre-determined spot chosen before the pitch',
    ],
    correctIndex: 1,
    explanation:
      'A play is ball, fielder, and runner coming together — the definition never mentions the base. Running to a pre-set spot invites being straight-lined; moving with those three variables keeps the angle alive as the play changes direction.',
  },
  {
    id: 'mech-056',
    ruleset: 'mech',
    topic: 'Tag Plays & the Wedge',
    tier: 'sixty',
    scenario:
      'Any diamond, throw arriving on a tag play. The umpire is behind the fielder, and the runner starts his slide. Whom does the umpire adjust with as the tag is applied — the fielder or the runner?',
    options: [
      'The fielder, all the way through the play',
      'The runner: follow the fielder to the play, but adjust with the runner as the tag is applied, getting the runner sliding toward you',
      'Neither — lock in and never move',
      'The base coach’s signals',
    ],
    correctIndex: 1,
    explanation:
      'Follow the fielder, adjust with the runner. The fielder takes you to the developing play, but the fielder must bring the tag to the runner — so at the moment of truth you adjust with the runner, keeping him sliding toward you to avoid being blocked out.',
  },
  {
    id: 'mech-057',
    ruleset: 'mech',
    topic: 'Tag Plays & the Wedge',
    tier: 'big',
    scenario:
      'Any diamond, wedge theory. What is “the window,” and how does the umpire get into it?',
    options: [
      'The gap between the bases, reached at full sprint',
      'The space between the runner and the fielder at the point of the tag attempt, reached with final controlled “quiet steps” — staying patient and never defaulting to one side too soon',
      'The umpire’s field of vision when standing still',
      'The opening in the fence used for photographers',
    ],
    correctIndex: 1,
    explanation:
      'The window is the space between runner and fielder at the moment of the tag. Quiet steps — small, controlled final movements — put your eyes there. Committing early to one side is how umpires get straight-lined out of the call.',
  },

  // ── Rotations (Big Diamond) ──────────────────────────────────────────
  {
    id: 'mech-058',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond (50/70 or 90-ft), nobody on base. U1 goes out on a fly ball toward the right-field line. Which rotation covers the vacancy at first?',
    options: [
      'U2 Drift — U2 covers first and second',
      'PU Trail: the plate umpire trails the batter-runner and owns his touch and any play at first, releasing home as the BR touches second',
      'Full rotation with U3 covering first',
      'No coverage is needed at first with nobody on',
    ],
    correctIndex: 1,
    explanation:
      'On the big diamond with nobody on and U1 out, the crew uses PU Trail: the plate umpire trails the batter-runner to first, takes all plays on him there, and hustles back to PoP once the BR reaches second. U2 goes to Po2 and U3 to Po3.',
  },
  {
    id: 'mech-059',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on first only. U1 goes out on a fly ball. Does the plate umpire trail the batter-runner like he would with nobody on?',
    options: [
      'Yes — PU Trail applies anytime U1 leaves',
      'No — with any runner on base it becomes the U2 Drift: PU stays at PoP, and U2 drifts to the right side to take everything at first and second',
      'No — U3 sprints across to cover first',
      'Yes, but only until the ball lands',
    ],
    correctIndex: 1,
    explanation:
      'PU Trail is a bases-empty rotation. With runners on, a run can score, so PU stays home and U2 drifts into the working area on the right side of the infield, responsible for all plays at first and second. U3 holds third at Po3.',
  },
  {
    id: 'mech-060',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, nobody on. U2 goes out from his outside position on a gap fly ball. Which rotation follows?',
    options: [
      'Reverse rotation',
      'Full rotation: PU moves toward third, U3 covers second, and U1 stays at Po1 until the batter-runner reaches second, then releases to the plate',
      'U2 Drift',
      'No rotation — U2 has no coverage to replace',
    ],
    correctIndex: 1,
    explanation:
      'With no runners in scoring position and U2 (or U3) going out, the big diamond uses the Full rotation, just like the small field: PU drifts up toward third, the remaining middle umpire takes second, and U1 releases home once the lead runner reaches second.',
  },
  {
    id: 'mech-061',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on first, U3 goes out on a fly ball down the left-field line. In the Full rotation, when exactly does U1 leave first base for the plate, and what does he say?',
    options: [
      'Immediately at the crack of the bat, silently',
      'When the lead runner reaches second base, releasing in foul territory to PoP while telling U2, “I’m going home”',
      'Only when the plate umpire waves him in',
      'He never releases with a runner on first',
    ],
    correctIndex: 1,
    explanation:
      'U1 holds Po1 (observing the touches) until the lead runner reaches second, then releases in foul territory to the plate, verbally handing off with “I’m going home” so U2 knows he now owns first as well as second.',
  },
  {
    id: 'mech-062',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on second only. U3 goes out on a drive to left-center. What is U1’s assignment in the Reverse rotation?',
    options: [
      'Hold Po1 and never move',
      'Pivot into the infield between first and second, take the batter-runner’s touch of first, and slide with the BR — he owns the BR at both first and second',
      'Rotate behind the plate umpire to third',
      'Take the runner at third once R2 advances',
    ],
    correctIndex: 1,
    explanation:
      'In the Reverse rotation U1 pivots inside between first and second, watching the batter-runner touch first, then slides with him toward second — all plays on the BR at first and second are U1’s. U2 slides with the lead runner toward third.',
  },
  {
    id: 'mech-063',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on second only, U3 out on the fly ball. R2 tags and takes off for third on the catch. Who has the play at third, and how did he get there?',
    options: [
      'PU, rotating up the line',
      'U2 — he dropped toward the mound between second and third, took R2’s tag-up, slid with R2, and stays at third once R2 commits',
      'U3, doubling back from the outfield',
      'U1, cutting across the mound',
    ],
    correctIndex: 1,
    explanation:
      'That is the heart of the Reverse rotation: U2 drops toward the mound on the second-to-third side, owns R2’s retouch and any play back into second, then slides with R2 to third and stays there for the duration once the runner commits.',
  },
  {
    id: 'mech-064',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on third only. U2 — positioned outside with R3 only — goes out on a fly ball. Who covers the batter-runner at first and second?',
    options: [
      'U1 pivots into the infield and takes the BR at both first and second',
      'PU trails the batter-runner',
      'U3 crosses the diamond to first',
      'Nobody — the BR is on his own until third',
    ],
    correctIndex: 0,
    explanation:
      'With R3 only and U2 out, U1 pivots into the working area between first and second to see the BR’s touch and owns him at first and second. PU stays home for R3, and U3 stays at Po3 — a Reverse-family rotation.',
  },
  {
    id: 'mech-065',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on third only, fewer than two outs. U3 goes out on a deep fly to left. R3 retreats to tag. Who lines up the tag-up at third, and who ends up covering third base itself?',
    options: [
      'PU lines up R3’s tag-up and then returns aggressively to PoP; U2 uses the working area to move toward third and covers R3 back into third and the BR at third',
      'U1 takes both the tag-up and the base',
      'PU stays at third for the whole play; nobody covers home',
      'U2 lines up the tag-up from center field',
    ],
    correctIndex: 0,
    explanation:
      'With U3 gone, PU clears the catcher to line up R3’s retouch, then sprints back to PoP for the play at the plate. U2 works toward third through the working area, taking R3 back into third or the BR arriving there. U1 pivots for the BR at first and second.',
  },
  {
    id: 'mech-066',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runners on first and second, one out. U3 goes out on a deep fly ball that is caught, and R2 tags. Which rotation does the crew use — and why is it special?',
    options: [
      'Reverse rotation, like every other RiSP situation',
      'Full rotation: with fewer than two outs and the ball caught, PU reads R2 tagging and moves to third, letting U2 take R2’s tag-up and stay in the infield',
      'U2 Drift',
      'PU Trail',
    ],
    correctIndex: 1,
    explanation:
      'R1+R2 with U3 out is the special case: if the ball is caught with fewer than two outs and R2 tags, the crew runs a Full rotation — PU takes third, U1 watches R1’s tag-up and then rotates home once R2 advances. With two outs or the ball not caught, it is the Reverse instead.',
  },
  {
    id: 'mech-067',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runners on first and second, two outs. U3 goes out on a fly ball that drops in the gap. Which rotation applies now?',
    options: [
      'Full rotation — R1+R2 is always Full when U3 leaves',
      'Reverse rotation: with two outs (or the ball not caught) U1 pivots with the BR for first and second, and U2 slides with R1 toward third',
      'U2 Drift',
      'No rotation with two outs',
    ],
    correctIndex: 1,
    explanation:
      'The Full-rotation exception for R1+R2 requires fewer than two outs and a caught ball (a tag-up situation). With two outs nobody tags — everyone runs — so the crew uses the standard Reverse: U1 pivots with the BR, U2 slides with R1 to third, PU stays home.',
  },
  {
    id: 'mech-068',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, bases loaded. U1 goes out on a fly ball pushing F9 toward the line. Map the coverage behind him.',
    options: [
      'PU stays at PoP for the plate; U2 drifts into the infield between first and second for everything at those bases, including R1’s and R2’s retouches; U3 holds Po3 with R3’s retouch',
      'PU trails the batter-runner; U3 covers home',
      'U2 goes out with U1 to bracket the catch; U3 covers three bases',
      'The crew collapses to a 2-umpire system',
    ],
    correctIndex: 0,
    explanation:
      'U1 leaving with runners on is always the U2 Drift on the big diamond: U2 owns first and second (touches, plays, and the retouches by R1 and R2), U3 keeps third with R3’s retouch, and the plate umpire never leaves home.',
  },
  {
    id: 'mech-069',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, bases loaded, one out. U3 goes out on a drive to the left-center gap. In the Reverse rotation, U2 “slides with R1.” What does U2’s full plate of responsibilities look like?',
    options: [
      'Just the force at second',
      'R2’s retouch, R3 back into third, R2 back into second, R1 into second, and the plays at third on R2, R1, or the batter-runner as they arrive',
      'Only plays at third base',
      'The batter-runner at first and second',
    ],
    correctIndex: 1,
    explanation:
      'U2 drops toward the mound on the second-to-third side and lets the ball take him to the play: he owns R2’s tag-up, runners back into second and third, lead runners into second, and — once the lead runner commits — the plays at third. U1 pivots for the BR at first and second.',
  },
  {
    id: 'mech-070',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on first. A fly ball hangs toward right-center. A newer umpire wonders why U2 never seems to go out for catch/no-catch in this situation. What is the reason?',
    options: [
      'U2 is lazy positioning himself',
      'With R1 (and most runners-on situations) U2 is inside the diamond in the B position, so he has no outfield fly-ball responsibility at all — U1 and U3 split the outfield',
      'U2 is saving energy for the rundowns',
      'U2 must always stay within 10 feet of second base',
    ],
    correctIndex: 1,
    explanation:
      'When U2 sets up inside the diamond (R1, R2, R1+R2, R1+R3, R2+R3, bases full), he is not responsible for any fly ball to the outfield. U1 covers F8 straight in/back all the way to the right-field line and U3 covers F8 toward the left-field line plus everything F7 does.',
  },
  {
    id: 'mech-071',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, Reverse rotation (runner on second, U3 out). The batter-runner tries to stretch his hit and is thrown out sliding into second. Who made that call?',
    options: [
      'U2, from the third-base side',
      'U1 — in the Reverse rotation he slides with the batter-runner and owns him at both first and second',
      'PU, ranging up from home',
      'U3, who returned from the outfield',
    ],
    correctIndex: 1,
    explanation:
      'The Reverse rotation gives U1 the batter-runner start to finish on the right side: the touch at first, plays back into first, and the play on the BR at second. U2 is occupied sliding with the lead runner toward third.',
  },
  {
    id: 'mech-072',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runners on second and third. U3 goes out. R3 tags on the caught fly ball. Who is responsible for lining up R3’s retouch at third?',
    options: [
      'U2, sliding toward third',
      'The plate umpire — he clears the catcher, lines up R3’s tag-up, then returns aggressively to PoP',
      'U1 from the working area',
      'Nobody — the retouch is U3’s even from the outfield',
    ],
    correctIndex: 1,
    explanation:
      'In the Reverse rotation with R3, the plate umpire handles R3’s retouch — clear the catcher, line up the tag-up, then get back to PoP for the play on that same runner at the plate. U2 is busy with R2’s tag-up and the coverage toward third.',
  },
  {
    id: 'mech-073',
    ruleset: 'mech',
    topic: 'Rotations (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond crew comparing notes with a 60-ft crew. On the 60-ft diamond, U1 going out always produces the “U2 Fill.” What is the equivalent set of answers on the big diamond?',
    options: [
      'Identical — U2 Fill in all cases',
      'Nobody covers for U1 on the big diamond',
      'With nobody on it is PU Trail; with any runner on base it is the U2 Drift',
      'U3 always crosses to cover first',
    ],
    correctIndex: 2,
    explanation:
      'Big-diamond answer when U1 leaves: bases empty, the plate umpire trails the batter-runner (PU Trail); any runners on, U2 drifts to the right side for first and second (U2 Drift) while PU stays home.',
  },

  // ── Fly Ball Coverage (Big Diamond) ──────────────────────────────────
  {
    id: 'mech-074',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, nobody on. F8 sprints straight back on a deep drive to dead center. Whose catch/no-catch is it?',
    options: [
      'U1',
      'U2 — with nobody on he is outside and owns F7 to F9, including fielders going straight in or straight back',
      'U3',
      'PU from behind the plate',
    ],
    correctIndex: 1,
    explanation:
      'With nobody on (or R3 only), U2 works outside and his area runs from F7 to F9, including balls taking those fielders straight in or straight back. U1 and U3 take their outfielders moving toward the respective foul lines.',
  },
  {
    id: 'mech-075',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on first. The same deep drive sends F8 straight back toward the center-field fence. Whose ball is it now?',
    options: [
      'U2, same as with nobody on',
      'U1 — with U2 inside, U1’s area expands to cover F8 straight in and back, all the way to the right-field line',
      'PU sprints out for it',
      'U3 automatically, since U2 is inside',
    ],
    correctIndex: 1,
    explanation:
      'Once runners put U2 inside the diamond, the outfield is split two ways: U1 takes F8 straight in/straight back plus everything to the right-field line, and U3 takes F8 moving toward the third-base line plus all of F7. The runner situation changes the answer to the identical batted ball.',
  },
  {
    id: 'mech-076',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runners on first and second. A drive into the left-center gap takes F8 hard toward the left-field line, with F7 converging. Which umpire goes out?',
    options: [
      'U2 from inside the diamond',
      'U3 — F8 moving toward the third-base line, or F7 moving in any direction, is his when U2 is inside',
      'U1 — he owns all of F8',
      'PU, since the fielders are converging',
    ],
    correctIndex: 1,
    explanation:
      'With U2 inside, U3’s area is F7 in any direction plus F8 moving toward the left-field line. Converging fielders make it a must-cover ball (one of the 3 Fs). U1 only has F8 when the fielder goes straight in, straight back, or toward right.',
  },
  {
    id: 'mech-077',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on second. On a fly ball to right-center, both U1 and U3 break out at the same time. Who keeps it?',
    options: [
      'U3, because he started closer to the ball',
      'U1 — with runners in scoring position the crew defers to U1 so the remaining umpires stay ahead of the runners; U3 recovers and rotates',
      'U2 sorts it out from the infield',
      'Whoever yells louder',
    ],
    correctIndex: 1,
    explanation:
      'The deference rule flips with the runner situation: bases empty or R3 only, defer to U2; with R1 or runners in scoring position, defer to U1, because losing U3 (who recovers into the rotation) keeps the crew front-loaded ahead of the runners.',
  },
  {
    id: 'mech-078',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, nobody on. U1 and U2 both take two hard steps toward a fly ball in right-center. Who backs off?',
    options: [
      'U2 backs off — U1 outranks him',
      'U1 backs off — with nobody on, the crew defers to U2 and U1 recovers into the rotation',
      'Both continue out together',
      'PU picks one by pointing',
    ],
    correctIndex: 1,
    explanation:
      'With nobody on or R3 only, U2 is the deference answer on shared fly balls, exactly like the 60-ft system. The reversal to U1 only happens when runners on base put U2 inside the diamond.',
  },
  {
    id: 'mech-079',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on third only. How is outfield fly-ball coverage divided among the base umpires?',
    options: [
      'Like all other runners-on situations: U1 and U3 split everything',
      'Like nobody on: U2 is outside, so U1 has F9 to the line, U2 has F7 through F9 straight in/back, and U3 has F7 to the line',
      'PU takes all fly balls with R3',
      'Nobody goes out with a runner on third',
    ],
    correctIndex: 1,
    explanation:
      'R3 only is the exception among runners-on situations: U2 still sets up outside the diamond, so the coverage (and the defer-to-U2 rule) works exactly as with the bases empty.',
  },
  {
    id: 'mech-080',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond. Which three kinds of fly balls are the “3 Fs” that an umpire absolutely must go out on when they are in his area?',
    options: [
      'Fastballs, fouls, and fences',
      'Balls that threaten fair/foul, balls that threaten the fence or boundary, and balls with fielders converging',
      'Fly balls, flares, and force plays',
      'Any ball hit past the first fielder',
    ],
    correctIndex: 1,
    explanation:
      'The 3 Fs: Fair/foul (a ball in flight threatening the line), Fence (possible home run or ground-rule double), and Fielders converging. Those are the plays where a close-up look is irreplaceable — plus any catch attempt below the waist by a charging fielder.',
  },
  {
    id: 'mech-081',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runners on first and third. A can-of-corn fly ball settles toward F9, who barely moves. Nobody goes out. Who has the catch/no-catch if something goes wrong?',
    options: [
      'U2 from the B position',
      'The plate umpire — if no one goes out on a ball to the outfield, PU rules on catch/no-catch',
      'U1 retroactively',
      'The call is forfeited',
    ],
    correctIndex: 1,
    explanation:
      'On routine balls where no umpire goes out, the plate umpire carries catch/no-catch from PoP. The crew’s goal is still to have the appropriate umpire out on every true fly ball in an area of responsibility.',
  },
  {
    id: 'mech-082',
    ruleset: 'mech',
    topic: 'Fly Ball Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond. An umpire commits and goes out on a fly ball near the fence. The ball drops, and chaos erupts on the bases behind him. What does he do?',
    options: [
      'Sprint back in to help with the bases',
      'Stay out — he ruled on the catch and the boundary; his partners cover the bases, and he only re-enters to assist a rundown when the play allows',
      'Follow the batter-runner around the bases',
      'Take over the lead runner wherever he goes',
    ],
    correctIndex: 1,
    explanation:
      'Go out and stay out. The rotation exists precisely so the remaining three umpires can absorb the base coverage. The lone exception is calling yourself into a rundown after waiting for the play to move away from the partner working it.',
  },

  // ── Positioning (Big Diamond) ────────────────────────────────────────
  {
    id: 'mech-083',
    ruleset: 'mech',
    topic: 'Positioning (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on first. Where does U2 set up before the pitch?',
    options: [
      'Outside the diamond behind second, like the 60-ft system',
      'Inside the diamond in the “B only” position: heels or toes on the grass/dirt line between first and second, on the tangent line from the apex of home plate through the mound cutout, square to the third-base foul line',
      'Directly behind the mound',
      'In shallow center field',
    ],
    correctIndex: 1,
    explanation:
      'With runners on (except R3 only), big-diamond U2 works inside in “B only” — on the first-to-second grass line along the tangent from the plate’s apex through the mound cutout, square to the third-base line. C, or moving outside, is used only when the infielders’ positioning warrants it.',
  },
  {
    id: 'mech-084',
    ruleset: 'mech',
    topic: 'Positioning (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, nobody on. Where does U2 work, and what limits his spot?',
    options: [
      'Inside in the B position',
      'Outside the diamond — no more than 1–2 steps into the outfield grass or heels on the infield arc, either side of second, never in the batter’s direct line of sight (no straight-away center), square to the plate',
      'Anywhere in center field he likes',
      'Standing on second base',
    ],
    correctIndex: 1,
    explanation:
      'Bases empty (or R3 only), U2 is outside: within a step or two of the grass line behind second, on whichever side he prefers, no further toward first/third than the line from the plate through the mound cutout, out of the batter’s sight line, square to the plate, with halos around F4 and F6.',
  },
  {
    id: 'mech-085',
    ruleset: 'mech',
    topic: 'Positioning (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on third only. Inside or outside for U2?',
    options: [
      'Inside — any runner means inside',
      'Outside, exactly as with nobody on: R3 only is the one runners-on situation where U2 stays outside',
      'His choice with no constraints',
      'Behind third base to help with R3',
    ],
    correctIndex: 1,
    explanation:
      'R3 only keeps U2 outside the diamond. Every other runner configuration (R1, R2, and combinations) brings U2 inside to B — which is also what strips his outfield fly-ball coverage in those situations.',
  },
  {
    id: 'mech-086',
    ruleset: 'mech',
    topic: 'Positioning (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond. F3 is holding a runner on first and then, on the next batter, plays way back behind the bag. What must U1 do between those pitches?',
    options: [
      'Stay in the exact same spot for consistency',
      'Move up or back with F3, always staying behind the first-base bag while keeping a 2–3 step halo around F3 and a view of his shoe tops',
      'Move inside the diamond to compensate',
      'Switch places with U2',
    ],
    correctIndex: 1,
    explanation:
      'On the big diamond U1 (and U3) always set up behind the bag, adjusting depth with the fielder — never crowding inside the 2–3 step halo, never so deep they lose the shoe tops needed to rule on a sinking line drive.',
  },
  {
    id: 'mech-087',
    ruleset: 'mech',
    topic: 'Positioning (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on first, pickoff-happy pitcher. May U1 angle himself for the pickoff throw before the pitch?',
    options: [
      'No — square to the plate at all times',
      'Yes — U1 may initially set an angle for the pickoff at first, but must be square to the plate by the time the pitch is delivered, shortening up to use the wedge on a throw over',
      'Yes, and he may stay angled through the pitch',
      'Only with two outs',
    ],
    correctIndex: 1,
    explanation:
      'U1 can cheat his angle early for the pickoff, but the position of record at pitch delivery is square to the plate in foul territory, right foot near the line — shortened up enough to find the wedge on a play back into first.',
  },
  {
    id: 'mech-088',
    ruleset: 'mech',
    topic: 'Positioning (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, nobody on. A routine ground ball goes to F6. What does the plate umpire do while the throw goes across?',
    options: [
      'Hold the plate area no matter what',
      'Clear the catcher to the left and trail the batter-runner up the line, observing the play at first and offering U1 information if asked, then return to PoP',
      'Rotate toward third for the next play',
      'Follow the ball to shortstop',
    ],
    correctIndex: 1,
    explanation:
      'With nobody on, PU clears the catcher and trails the batter-runner, backing up the play at first (pulled foot, swipe tag, lane violation) before returning to PoP. Note the exception: with R3 only, PU stays home instead of trailing.',
  },
  {
    id: 'mech-089',
    ruleset: 'mech',
    topic: 'Positioning (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on first, ground ball in the hole to F6 with a force coming to second. As the 2026 point of emphasis directs, how does U2 work this from the deep “B only” spot?',
    options: [
      'Sprint to the bag and straddle it',
      'Step up to stay chest to ball and step toward the throw for the angle, get set — never moving at the moment of the force — with eyes to the base, then drift with eyes down on runner and fielder',
      'Back out of the infield for a wide view',
      'Freeze in place and lean',
    ],
    correctIndex: 1,
    explanation:
      'The double-play footwork emphasis for inside U2: step up from deep B, step toward the throw for the angle, and be absolutely set with eyes on the base when the force happens. Drifting with eyes down afterward catches slide infractions and the exchange.',
  },

  // ── Infield Coverage (Big Diamond) ───────────────────────────────────
  {
    id: 'mech-090',
    ruleset: 'mech',
    topic: 'Infield Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runners on first and second (U2 inside). A routine humpback pop-up settles over the middle infield. Who has catch/no-catch?',
    options: [
      'PU, as on the 60-ft diamond',
      'U2 — when he is positioned inside, all routine infield catch/no-catch belongs to him',
      'U1 and U3 split it at second base',
      'The nearest fielder’s umpire by open glove',
    ],
    correctIndex: 1,
    explanation:
      'When U2 is inside the diamond, he takes all routine infield catch/no-catch. With nobody on or R3 only (U2 outside), those routine infield flies belong to the plate umpire instead.',
  },
  {
    id: 'mech-091',
    ruleset: 'mech',
    topic: 'Infield Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond. A soft liner forces F4 to dive to his right, gloving the ball inches off the grass. Nobody on base. Who rules catch or trap?',
    options: [
      'U1 — F4 belongs to him in every direction',
      'U2 — a ball hit directly at F4 or F6, F4 diving right, or F6 diving left is U2’s',
      'PU — every infield liner is his',
      'U3 — the ball is moving toward his side',
    ],
    correctIndex: 1,
    explanation:
      'The infield split: U1 has balls straight at F3 and anything taking F3 or F4 to their left; U2 has balls straight at F4 or F6, F4 diving right, and F6 diving left; U3 has balls straight at F5 and anything taking F5 or F6 to their right; PU has the pitcher and chargers on the grass.',
  },
  {
    id: 'mech-092',
    ruleset: 'mech',
    topic: 'Infield Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond. F5 charges hard on a swinging bunt and short-hops-or-catches it on the infield grass near the mound-side. Who has the catch/no-catch?',
    options: [
      'U3, since it is F5',
      'The plate umpire — any ball to the pitcher or to an infielder charging in on the infield grass is his',
      'U2, closest to the grass',
      'U1, on the throw side',
    ],
    correctIndex: 1,
    explanation:
      'Fielders charging in on the grass — and anything the pitcher plays — belong to the plate umpire, who has the head-on look at a scoop versus a short hop. The base umpires’ open-glove reads cover the balls hit at or beside their fielders.',
  },
  {
    id: 'mech-093',
    ruleset: 'mech',
    topic: 'Infield Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond. A low screamer takes F6 ranging to his right, backhand, glove opening toward third base. Who rules on the short-hop?',
    options: [
      'U2 — F6 is always his',
      'U3 — a ball taking F5 or F6 to his right belongs to U3, matching the open glove',
      'U1 across the diamond',
      'PU by default',
    ],
    correctIndex: 1,
    explanation:
      'F6 moving right means the glove opens toward third — U3’s call, per both the assignment table and the open glove theory it encodes. F6 diving left would flip it to U2.',
  },
  {
    id: 'mech-094',
    ruleset: 'mech',
    topic: 'Infield Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond. Why must U1, U2, and U3 be able to see the shoe tops of the fielder in front of them from their starting positions?',
    options: [
      'To judge the fielder’s foot speed',
      'So they can rule catch versus trap on a sinking line drive played below the fielder’s waist — the open-glove calls that belong to them',
      'To check the fielder’s footwear for metal cleats',
      'It is a tradition with no practical purpose',
    ],
    correctIndex: 1,
    explanation:
      'Balls played below the waist are the base umpires’ calls under the open glove theory, and the difference between a catch and a short hop lives at the fielder’s shoe tops. Set up too deep or too shielded and that call is a guess.',
  },
  {
    id: 'mech-095',
    ruleset: 'mech',
    topic: 'Infield Coverage (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runner on third breaking on contact. A slow roller hugs the third-base line between home and third, and R3’s dash home screens the plate umpire. Who bails the crew out on fair/foul, and what is the situation called?',
    options: [
      'U3 takes the call — the “pinch,” pre-signaled whenever R3 is aboard',
      'U2 from the middle — the “squeeze”',
      'U1 from across the field — the “cross”',
      'The call is suspended until the runner passes',
    ],
    correctIndex: 0,
    explanation:
      'Same pinch mechanic as the small field: with R3, the runner can block the plate umpire’s view of a ball between home and third, so fair/foul passes to U3. Crews signal the pinch pre-pitch whenever R3 is on.',
  },

  // ── Tag-Ups & Touches (Big Diamond) ──────────────────────────────────
  {
    id: 'mech-096',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond crews state their tag-up philosophy differently than 60-ft crews. What is the big-diamond rule for retouch responsibility when the crew rotates?',
    options: [
      'Retouches always go to the plate umpire',
      'Retouch responsibility never reverts to an umpire behind the runner — coverage stays in front',
      'Each umpire keeps his original base’s retouch from wherever he is',
      'Retouches are shared calls requiring two umpires',
    ],
    correctIndex: 1,
    explanation:
      'The governing principle on the big diamond: tag-up responsibility will not revert to an umpire positioned behind that runner. The rotations are built so someone ahead of each runner owns the retouch — like PU taking R3’s tag-up in the Reverse rotation.',
  },
  {
    id: 'mech-097',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, runners on first and second, routine single to right — no umpire goes out. Who watches R2’s retouch-or-advance and R1’s retouch on this routine base hit?',
    options: [
      'U1 has R1’s retouch and the BR’s touch of first; U2 has R2 and everything at second; U3 waits at Po3',
      'PU takes all retouches from the plate',
      'U3 has both retouches from third',
      'Retouches do not apply on base hits',
    ],
    correctIndex: 0,
    explanation:
      'When nobody rotates out, each umpire keeps his own base: U1 watches R1’s retouch and the batter-runner touching first, U2 owns second including R2’s retouch, U3 holds third, and PU stays at PoP for the plate.',
  },
  {
    id: 'mech-098',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, Full rotation (nobody on, U2 out, ball in the gap). The batter-runner motors around the bases. Who has his touch at each base?',
    options: [
      'U1 at first and then home after releasing; U3 at second; PU at third',
      'PU at first; U1 at second; U3 at third and home',
      'U3 everywhere until the ball comes in',
      'U1 at first, second, and third',
    ],
    correctIndex: 0,
    explanation:
      'Full-rotation touch map on the big diamond mirrors the small field: U1 has the BR at first and, after releasing when the runner reaches second, at home; the remaining middle umpire covers second; the plate umpire covers third.',
  },
  {
    id: 'mech-099',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, Reverse rotation touch map. U3 went out with runners in scoring position. Who owns the touches at second and third as the runners advance?',
    options: [
      'U1 owns everything in the middle',
      'U2 — sliding with the lead runner, he has the lead runners at second and the trail coverage at third; U1 has the batter-runner at first and second; PU has home',
      'PU covers second and third at once',
      'U3 keeps them from the outfield',
    ],
    correctIndex: 1,
    explanation:
      'In the Reverse (slide) rotation: PU has all runners at home, U1 has the batter-runner at first and second, and the sliding middle umpire (U2 when U3 goes out) has the lead runners at second and the plays at third.',
  },
  {
    id: 'mech-100',
    ruleset: 'mech',
    topic: 'Tag-Ups & Touches (Big Diamond)',
    tier: 'big',
    scenario:
      'Big diamond, U2 Drift in progress (U1 went out with a runner on first). The batter-runner rounds first wide while R1 holds at second. Two bases, one umpire. How does U2 handle owning both first and second at once?',
    options: [
      'Pick the base closest to the ball and ignore the other',
      'Work with depth in the working area, stay chest to ball, and let the ball take him to the play — never overcommitting to one base until responsibilities become singular',
      'Straddle a midpoint and never move',
      'Call for help from U3',
    ],
    correctIndex: 1,
    explanation:
      'Multiple-base coverage is worked from the working area with depth: chest to ball, reading the throw, letting the ball dictate which base becomes the play. Overcommitting early to one base is what leaves the other one uncovered.',
  },
];
