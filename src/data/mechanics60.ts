import { Question } from '../types';

// 4-Umpire System mechanics on the 60-foot diamond (Minor/Major level):
// Full / Fill / U2 Fill rotations, fly-ball coverage, fair/foul,
// positioning, and tag-ups, plus crew-wide points of emphasis and wedge
// theory. Rulings verified against the 2026 Little League Umpire's Manual;
// scenarios are original wording.
//
// Crew shorthand, matching real crew language:
//   PU = plate umpire, U1/U2/U3 = base umpires, BR = batter-runner,
//   F1–F9 = fielders by scoring notation, C/NC = catch/no-catch,
//   Po1/Po2/Po3 = point of first/second/third base, PoP = point of plate,
//   AOR = area of responsibility, RiSP = runner(s) in scoring position.

export const MECH60_QUESTIONS: Question[] = [
  // ── Rotations ───────────────────────────────────────────────────────────
  {
    id: 'mech-001',
    ruleset: 'mech60',
    topic: 'Rotations',
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
    ruleset: 'mech60',
    topic: 'Rotations',
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
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on. U3 goes out on a fly ball down the left-field line. In the Full rotation that follows, what is U1’s assignment?',
    options: [
      'Stay anchored at first base for the entire play, no matter what',
      'Rotate immediately to third base',
      'Take the touch of first, then release to cover home',
      'Go out to back up U3 on the catch',
    ],
    correctIndex: 2,
    explanation:
      'U1 watches the batter-runner touch first, then releases to home plate, mirroring the lead runner so as to arrive at PoP 60 feet ahead of the runner. The umpire covering second picks up the batter-runner back into first once U1 releases.',
  },
  {
    id: 'mech-004',
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on, U3 out on a fly ball. The batter-runner rounds first and dives back in on the throw behind him. U1 has already released toward home. Whose call is it at first?',
    options: [
      'U1 must run back — first base is always his',
      'U2, who covered second, picks up plays back into first',
      'The plate umpire, sliding over from the plate area to help',
      'U3, coming back in from the outfield',
    ],
    correctIndex: 1,
    explanation:
      'Once U1 releases to home in the Full rotation, the umpire who rotated to second (here U2) is responsible for plays back into first. U1 never returns once he has released.',
  },
  {
    id: 'mech-005',
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first only. A fly ball drives F8 toward the right-center gap and U2 goes out. Which rotation applies?',
    options: [
      'Fill rotation, because there is a runner on base',
      'Full rotation — R1 only is not scoring position',
      'U2 Fill — the ball is on U1’s side',
      'Reverse rotation, to protect the plate',
    ],
    correctIndex: 1,
    explanation:
      'The trigger for the Full rotation is no runners in scoring position, which covers both bases empty and a runner on first only. The Fill rotation is reserved for runners in scoring position.',
  },
  {
    id: 'mech-006',
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on second only. U3 goes out on a drive toward the left-field line. What does U2 do?',
    options: [
      'Stay planted at his starting position',
      'Rotate over to third while PU drops down to second',
      'Fill both second and third from the Restricted Area',
      'Follow U3 out as backup on the catch',
    ],
    correctIndex: 2,
    explanation:
      'With a runner in scoring position, U2 or U3 leaving triggers the Fill rotation: the remaining middle umpire fills the vacancy from the Restricted Area and owns both second and third, slipping to the outside once his responsibilities become singular.',
  },
  {
    id: 'mech-007',
    ruleset: 'mech60',
    topic: 'Rotations',
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
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runners on second and third. U1 goes out on a fly ball that pushes F9 toward the right-field line. Which rotation does the crew use?',
    options: [
      'Fill rotation, because runners are in scoring position',
      'Full rotation',
      'U2 Fill — always, when U1 is the one who leaves',
      'No rotation is needed when U1 goes out',
    ],
    correctIndex: 2,
    explanation:
      'Anytime U1 leaves to cover catch/no-catch, the crew is in the U2 Fill — the position of the runners never changes that. U2 fills the Restricted Area and takes first and second, and U3 moves to Po3.',
  },
  {
    id: 'mech-009',
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, U2 Fill rotation: U1 went out on a fly ball. U2 is working from the Restricted Area covering first and second. The play ends with only one runner still moving, heading back into first. What should U2 do?',
    options: [
      'Stay working from deep in the Restricted Area no matter what',
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
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runners on first and third. U3 goes out on a deep fly to left. In the Fill rotation, what is U1’s role?',
    options: [
      'Rotate to home to free up PU',
      'Move to Po1 and act as the “crew saver”',
      'Cover second and third from the Restricted Area',
      'Trail the batter-runner to second',
    ],
    correctIndex: 1,
    explanation:
      'In the Fill rotation U1 moves to Po1, holds first, and is the crew saver — eyes disciplined and on the whole play so he can bail the crew out on anything unexpected. U2 fills for second and third, and PU stays home.',
  },
  {
    id: 'mech-011',
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on third, one out. U2 goes out on a medium fly ball to center and R3 tags. How does the plate umpire handle the tag-up?',
    options: [
      'Runs up the line to third to watch the retouch from close range',
      'Lines up the retouch at the dirt circle, then hustles back to PoP',
      'Delegates the retouch to U1 across the diamond',
      'Watches from the slot without moving',
    ],
    correctIndex: 1,
    explanation:
      'In the Fill rotation the plate umpire keeps the retouch at third when R3’s umpire situation demands it: he lines up the tag-up at the dirt circle, then hustles back to PoP because the play at the plate is his and runs are the priority.',
  },
  {
    id: 'mech-012',
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond crew in the pre-game conference. A new umpire asks: “When exactly do we run the Full rotation?” What is the correct answer?',
    options: [
      'Any fly ball hit to the outfield, no matter which umpire goes out',
      'Only with the bases completely empty',
      'When U2 or U3 goes out with no runners in scoring position',
      'Whenever the plate umpire feels like rotating',
    ],
    correctIndex: 2,
    explanation:
      'Full rotation = NRiSP (nobody on or R1 only) and the umpire leaving is U2 or U3. If U1 is the one who leaves, it is always the U2 Fill instead, and with runners in scoring position it becomes the Fill rotation.',
  },
  {
    id: 'mech-013',
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on second. U3 goes out on a fly ball. A teammate expects the plate umpire to rotate up to third the way he does with nobody on. Does he?',
    options: [
      'Yes — PU always covers third whenever U3 leaves the infield',
      'No — PU stays home and U2 fills second and third',
      'Yes, but only if the ball is caught',
      'No — U1 covers third instead',
    ],
    correctIndex: 1,
    explanation:
      'The Full rotation (PU up to third) is only used with no runners in scoring position. With R2, the crew is in the Fill rotation: PU never abandons the plate because the runner can score, and U2 owns second and third from the Restricted Area.',
  },
  {
    id: 'mech-014',
    ruleset: 'mech60',
    topic: 'Rotations',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on, ball in the right-center gap with U2 out. U1 releases to home. The batter-runner takes a wide turn at first — who is watching him now, and from where?',
    options: [
      'U3, covering second, picks up plays back into first',
      'U1, watching over his shoulder as he trails home',
      'PU, glancing back from Po3',
      'U2 from the outfield grass',
    ],
    correctIndex: 0,
    explanation:
      'In the Full rotation with U2 out, U3 moves to Po2 opposite the throw for plays at second and also inherits plays back into first once U1 releases to the plate.',
  },
  // ── Fly Ball Coverage ───────────────────────────────────────────────────
  {
    id: 'mech-015',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A slicing fly ball forces F9 to sprint toward the right-field foul line. Whose catch/no-catch is it?',
    options: [
      'U1 — F9 moving toward the line is his area',
      'U2 — he owns all three outfielders',
      'PU, since the ball threatens the fair/foul line',
      'U3, rotating behind the play',
    ],
    correctIndex: 0,
    explanation:
      'On the 60-ft diamond U1’s area of responsibility is F9 moving toward the right-field line. U2 has F7 and F9 moving in, back, or toward center, plus everything F8 does; U3 mirrors U1 on the left-field line.',
  },
  {
    id: 'mech-016',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A fly ball pushes F7 drifting toward center field, away from the foul line. Whose ball is it?',
    options: [
      'U3 — F7 belongs to him in every direction',
      'U2 — F7 moving toward center belongs to him',
      'PU, because no line is threatened',
      'U1, crossing behind second',
    ],
    correctIndex: 1,
    explanation:
      'U3 only owns F7 moving toward the left-field line. When F7 moves in, back, or toward center, that fly ball is U2’s. Reading the fielder’s direction — not the ball — is what defines the area of responsibility.',
  },
  {
    id: 'mech-018',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond. On a drive into the left-center gap, both U2 and U3 break toward the outfield at the same time. How is the conflict resolved?',
    options: [
      'Whoever called it first keeps it',
      'Defer to U2, the quarterback; U3 recovers into rotation',
      'The crew defers to U3 as the senior base umpire on the crew',
      'Both stay out and split the call',
    ],
    correctIndex: 1,
    explanation:
      'If two umpires take the same fly ball, the crew defers to U2, the quarterback on all fly balls to the outfield. The other umpire recovers and rotates. The exception is a ball on the foul line, which stays with the line umpire.',
  },
  {
    id: 'mech-019',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond. U3 went out on a fly ball that dropped. The play turns into a rundown between third and home. May U3 come back in to help?',
    options: [
      'No — once out, an umpire never re-enters under any circumstance',
      'Yes — a rundown is the one exception to “go out and stay out”',
      'Yes, and he should immediately take over the lead call',
      'Only if the plate umpire physically waves him in',
    ],
    correctIndex: 1,
    explanation:
      'The rule is go out and stay out — except that an umpire may return to assist in a rundown, waiting for the play to move away from his partner before calling himself into it.',
  },
  {
    id: 'mech-020',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond. U1 goes out on a fly ball down the right-field line. As the fielder tracks it, how should U1 physically work the play?',
    options: [
      'Run directly at the fielder to get as close as possible',
      'Run parallel to the fielder and get set before the catch',
      'Backpedal along the foul line watching the ball',
      'Stand still at his starting spot and take the long look',
    ],
    correctIndex: 1,
    explanation:
      'Going out means running parallel to the fielder to avoid being straight-lined, getting as far out as the play allows, and being stopped and set before the catch attempt — then using timing and proper use of eyes before signaling.',
  },
  {
    id: 'mech-021',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A high pop-up comes down on the infield grass behind the mound, with F4 and F6 converging and gloving it chest-high. Who has catch/no-catch?',
    options: [
      'U2, closest to the play',
      'The plate umpire — the infield grass is all his',
      'Whichever base umpire the glove opens toward',
      'U1, because the ball is right-side',
    ],
    correctIndex: 1,
    explanation:
      'The plate umpire owns all catch/no-catch on the infield grass, and any infield ball gloved above the fielder’s waist. The open glove theory only takes over on balls played below the waist off the grass.',
  },
  {
    id: 'mech-022',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A sinking line drive forces F6 to lunge low, glove opening toward the third-base side. The catch is at his shoe tops. Who rules catch or trap?',
    options: [
      'PU — every infield ball is his',
      'U3 — the glove opens toward him',
      'U2 — F6 always belongs to U2',
      'U1 — the throw is going his way',
    ],
    correctIndex: 1,
    explanation:
      'On balls fielded below the waist, the open glove theory applies: the umpire toward whom the fielder’s glove opens has catch/no-catch. That is exactly why base umpires must be able to see the shoe tops of the fielder in front of them.',
  },
  {
    id: 'mech-023',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond, crack of the bat on a ball to the outfield. What is the “read step” every umpire is instructed to take?',
    options: [
      'A step toward home plate to hear the crew chief',
      'Opening with the ball, chest to ball, to read the play',
      'Two hard steps toward the outfield on every batted ball',
      'A step backward to widen the view',
    ],
    correctIndex: 1,
    explanation:
      'The read step opens the umpire with the ball — chest to ball, posture parallel to the line — to sort out three things: is it a fly ball or a base hit, where are the fielders moving (which defines AOR), and what are the partners doing.',
  },
  {
    id: 'mech-024',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on. A fly ball hangs in U2’s area and U2 is reading whether to go out. Meanwhile U3 takes a couple of quiet early steps toward second base. What is U3 doing?',
    options: [
      'Abandoning his post — a mechanics error',
      'Taking a cheat step toward his rotation assignment',
      'Trying to draw a pickoff throw from the outfielder',
      'Covering for the plate umpire',
    ],
    correctIndex: 1,
    explanation:
      'The cheat step is an early, small move toward the base the umpire will cover if the rotation happens. It buys a head start while the partner reads the fly ball, and costs nothing — if the partner stays, the umpire just steps back to his base.',
  },
  {
    id: 'mech-025',
    ruleset: 'mech60',
    topic: 'Fly Ball Coverage',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A lazy single drops cleanly in front of F8, who fields it on one hop. U2 sprints into the outfield anyway. Why is this wrong?',
    options: [
      'It is not wrong — always go out on any ball to the outfield',
      'Base hits are not fly balls — going out strands the crew',
      'U2 may never leave the infield under any circumstance',
      'Only U1 and U3 are allowed to go out',
    ],
    correctIndex: 1,
    explanation:
      'Umpires go out on fly balls in their area, not on clean base hits. On a clean hit U2 moves to Po2 opposite the throw for the runner sliding in. Umpires leaving on base hits was the specific problem the read-step emphasis was created to fix.',
  },
  // ── Fair / Foul ─────────────────────────────────────────────────────────
  {
    id: 'mech-026',
    ruleset: 'mech60',
    topic: 'Fair / Foul',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A chopper down the first-base line is fielded by F3 well in front of the bag, right on the chalk. Whose fair/foul call is it?',
    options: [
      'U1 — he is standing right on top of the play already',
      'The plate umpire — the line short of the bag is his',
      'U2, from the middle',
      'A joint call shared between PU and U1',
    ],
    correctIndex: 1,
    explanation:
      'The plate umpire owns fair/foul on both lines up to but not including the front edge of first and third — including any ball fielded in front of the bag or that stops short of it. U1 takes over from the front edge and beyond.',
  },
  {
    id: 'mech-027',
    ruleset: 'mech60',
    topic: 'Fair / Foul',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A hard ground ball bounds over the third-base bag itself and kicks into the outfield. Who makes the fair/foul call?',
    options: [
      'PU — every fair/foul decision belongs to the plate',
      'U3 — the front edge of the bag and beyond is his',
      'U2, with the best cross angle',
      'No call is needed on a bounding ball',
    ],
    correctIndex: 1,
    explanation:
      'From the front edge of the base and beyond — bounding in the air, on the ground, or fielded even with or past the bag — the line belongs to U3 (or U1 on the other side). Short of the front edge it is the plate umpire’s call.',
  },
  {
    id: 'mech-028',
    ruleset: 'mech60',
    topic: 'Fair / Foul',
    tier: 'sixty',
    scenario:
      '60-ft diamond, no runners on. A ball is driven into the right-field corner and U1 pivots into the working area rather than staying on the line. The ball bounds toward the line beyond first base. Who has fair/foul?',
    options: [
      'U1 hustles back to the line to make the call himself',
      'The plate umpire — the line became his when U1 left',
      'U2 slides over and splits the difference',
      'The call defaults to fair',
    ],
    correctIndex: 1,
    explanation:
      'Straddle the line or pivot into the working area — U1 picks one as the ball is hit, and pivoting abandons the line. An umpire who abandons his line never comes back to make a fair/foul decision; the plate umpire assumes the entire foul line the moment U1 or U3 leaves it, which is one of the reasons PU “holds the line” at PoP when not rotating.',
  },
  {
    id: 'mech-029',
    ruleset: 'mech60',
    topic: 'Fair / Foul',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on third. A swinging bunt dribbles up the third-base line and R3 breaks home, crossing directly between the plate umpire and the rolling ball. What is the crew’s built-in answer to this?',
    options: [
      'PU calls it anyway on his best guess',
      'The “pinch” — fair/foul passes to U3',
      'The ball is automatically foul once a runner screens the umpire',
      'U1 takes the call from across the diamond',
    ],
    correctIndex: 1,
    explanation:
      'With R3, the runner can block the plate umpire’s sight line on a ball between home and third. That is the pinch situation, and the fair/foul decision passes to U3 — something the crew pre-signals so nobody is surprised.',
  },
  {
    id: 'mech-030',
    ruleset: 'mech60',
    topic: 'Fair / Foul',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A ground ball is rolling up the first-base line, untouched, still short of the bag and wobbling between fair and foul territory. When should an umpire declare it?',
    options: [
      'Immediately, so everyone can stop running',
      'Not until the ball is touched or settles',
      'Once it crosses the halfway point of the baseline',
      'Only after the offensive coach asks',
    ],
    correctIndex: 1,
    explanation:
      'A rolling ball short of the base is declared only when it is touched or settles. Calling it early is a classic error: the ball can still spin fair or kick foul, and a premature “foul” kills a live play that might have stayed fair.',
  },
  {
    id: 'mech-031',
    ruleset: 'mech60',
    topic: 'Fair / Foul',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A fly ball drifts down the line into the left-field corner, about 10 feet off the chalk, with F7 giving chase. The umpire on the call knows it will land near the line. When does he name it fair or foul?',
    options: [
      'While it is still in the air, to help the runners',
      'Only once the ball is touched or lands',
      'Never — outfield balls are not named',
      'As soon as the fielder waves his arms',
    ],
    correctIndex: 1,
    explanation:
      'A fly ball to the outfield is never named fair or foul until it is touched or lands. Once it does, a ball that becomes fair or foul within 20 feet of the line gets a verbal and visual call; obvious fouls far off the line do not.',
  },
  {
    id: 'mech-032',
    ruleset: 'mech60',
    topic: 'Fair / Foul',
    tier: 'sixty',
    scenario:
      '60-ft diamond. From his angle, U3 is 100% certain a bounced ball nicked the batter in the box, but the plate umpire says nothing and the defense is playing on. What should U3 do?',
    options: [
      'Nothing — it is exclusively the plate umpire’s call',
      'Yell “Foul ball!” instantly',
      'Give PU a beat, then kill the play with an aggressive “Time!”',
      'Wait until the very end of the play and mention it to PU quietly',
    ],
    correctIndex: 2,
    explanation:
      'A base umpire who is completely certain the batted ball touched the batter gives the plate umpire first crack, then kills the play with an aggressive “Time!” Afterward the crew decides: touched in the box is foul; touched outside the box over fair territory makes the batter-runner out.',
  },
  {
    id: 'mech-033',
    ruleset: 'mech60',
    topic: 'Fair / Foul',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A towering pop-up drifts into foul ground halfway between home and first, with F3 camping under it. How do PU and U1 divide the play?',
    options: [
      'Bracket the fielder — PU on the line, U1 at the fence side',
      'Both umpires converge on the fielder from the same side',
      'U1 takes everything; PU watches the batter',
      'PU takes everything; U1 protects first base',
    ],
    correctIndex: 0,
    explanation:
      'Pop-ups between home and first (or third) are bracketed: the plate umpire stays on the line for the fair/foul element and U1/U3 shades to the fence side. Who signals catch/no-catch follows the infield rules — PU above the waist or on the grass, open glove below.',
  },
  // ── Positioning ─────────────────────────────────────────────────────────
  {
    id: 'mech-034',
    ruleset: 'mech60',
    topic: 'Positioning',
    tier: 'sixty',
    scenario:
      '60-ft diamond. A new U1 sets up about six feet behind the first-base bag, directly in line with F3. What is wrong with this pre-pitch position?',
    options: [
      'Nothing — closer to the bag is always better positioning',
      'Too close — 10–12 feet off the base is the minimum',
      'He should set up in fair territory instead',
      'He should stand on the foul line itself',
    ],
    correctIndex: 1,
    explanation:
      'The starting position rules: never closer than 10–12 feet to the base in front of you, never parallel with or ahead of the fielder, slightly outside the fielder’s halo, and always able to see the fielder’s shoe tops for a sinking line drive.',
  },
  {
    id: 'mech-035',
    ruleset: 'mech60',
    topic: 'Positioning',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first only. Where does U2 set up?',
    options: [
      'B position, as with any runner on',
      'C position — R1 puts U2 in C',
      'Inside the diamond behind the mound',
      'Shallow center field',
    ],
    correctIndex: 1,
    explanation:
      'On the 60-ft diamond U2 works outside the diamond and picks his spot by the runners: C with R1 or R1+R3, B anytime a runner is on second, and preference with R3 only or nobody on.',
  },
  {
    id: 'mech-036',
    ruleset: 'mech60',
    topic: 'Positioning',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on second. U2 wants to stay in the C position because he likes the view. What does the manual say?',
    options: [
      'Position is always umpire preference',
      'With any runner on second, U2 uses the B position',
      'U2 must move inside the diamond with R2',
      'U2 should stand directly behind the second-base bag',
    ],
    correctIndex: 1,
    explanation:
      'With any runner on second base, U2 is in B on the 60-ft diamond. C is for R1 or R1+R3; only with R3 alone or bases empty does personal preference decide.',
  },
  {
    id: 'mech-037',
    ruleset: 'mech60',
    topic: 'Positioning',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first. The base umpires want to use the relaxed standing “wide receiver” set they used all last inning with the bases empty. Is that allowed?',
    options: [
      'Yes — set stance is always a personal comfort choice',
      'No — with a runner on base, hands-on-knees is mandatory',
      'Yes, but only for the two wing umpires',
      'No — hands-on-knees is required at all times',
    ],
    correctIndex: 1,
    explanation:
      'With runners on, hands-on-knees is mandatory for every umpire. The walk-the-line wide receiver set is a bases-empty option that the whole crew must adopt together, decided in the pre-game conference.',
  },
  {
    id: 'mech-038',
    ruleset: 'mech60',
    topic: 'Positioning',
    tier: 'sixty',
    scenario:
      '60-ft diamond. When is an umpire supposed to work from the Restricted Area rather than from the point of a base?',
    options: [
      'Whenever he wants a better view of the outfield',
      'When he is covering more than one base at a time',
      'Only on plays at the plate',
      'Never — the Restricted Area is for the 2-umpire system only',
    ],
    correctIndex: 1,
    explanation:
      'The Restricted Area (between the mound and the second-base cutout) is used only when covering multiple bases, staying chest to ball with depth to keep angles open. With a single responsibility, the umpire works from the point of the base instead.',
  },
  {
    id: 'mech-039',
    ruleset: 'mech60',
    topic: 'Positioning',
    tier: 'sixty',
    scenario:
      '60-ft diamond. Where exactly is “Po3,” the spot U3 owns on plays at third?',
    options: [
      'On the infield-side corner of the bag in fair territory',
      'The topside outfield corner of the bag, in foul territory',
      'Ten feet up the left-field line toward home',
      'Directly behind the third-base coach',
    ],
    correctIndex: 1,
    explanation:
      'Point of third is the topside outfield corner of the bag, in foul ground between the line and the coach’s box — close enough to own the “real estate,” out of everyone’s way, chest to ball, and positioned for tag plays.',
  },
  {
    id: 'mech-040',
    ruleset: 'mech60',
    topic: 'Positioning',
    tier: 'sixty',
    scenario:
      '60-ft diamond, between innings. Where does each member of the 4-umpire crew stand while the defense warms up?',
    options: [
      'All four gather behind the mound',
      'PU in defensive-side foul ground, U1–U3 in the shallow outfield',
      'Each umpire stands on his base',
      'PU back at the backstop, base umpires along the first-base fence',
    ],
    correctIndex: 1,
    explanation:
      'Neutral positions: the plate umpire works the defensive-side foul territory (watching the on-deck batter, counting warm-up pitches, alerting at two remaining, one-minute limit), while U1/U2/U3 stand in shallow right/center/left and return to their starting spots when the ball is thrown down.',
  },
  {
    id: 'mech-041',
    ruleset: 'mech60',
    topic: 'Positioning',
    tier: 'sixty',
    scenario:
      '60-ft diamond, nobody on. A routine ground ball goes to F6, throw over to first. What is the plate umpire doing during this play?',
    options: [
      'Standing still behind the plate until the play ends',
      'Trailing the batter-runner up the first-base line',
      'Rotating to third in case of an error',
      'Following the throw to the shortstop',
    ],
    correctIndex: 1,
    explanation:
      'With nobody on, PU trails the batter-runner up the line. He owns any tag attempt on the BR before the runner’s lane, watches the lane violation and out-of-play overthrows, and offers pulled-foot/swipe-tag help to U1 on request — then returns to PoP.',
  },
  // ── Tag-Ups & Touches ───────────────────────────────────────────────────
  {
    id: 'mech-042',
    ruleset: 'mech60',
    topic: 'Tag-Ups & Touches',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runners on second and third, one out. U2 goes out on a deep fly to center and both runners tag. Who is watching R2’s retouch at second?',
    options: [
      'U2, glancing back over his shoulder from the outfield',
      'U3 — the retouch advances to the base ahead',
      'U1 from across the diamond',
      'PU handles both retouches at once',
    ],
    correctIndex: 1,
    explanation:
      'When an umpire leaves, retouch responsibility advances to the umpire positioned ahead of the runner: with U2 out, U1 has first, U3 has second, and PU has third. Trying to watch a tag-up behind you while covering a base ahead is how calls get missed.',
  },
  {
    id: 'mech-043',
    ruleset: 'mech60',
    topic: 'Tag-Ups & Touches',
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
    ruleset: 'mech60',
    topic: 'Tag-Ups & Touches',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first only. U2 goes out on a deep drive and R1 holds to tag. The crew is in a Full rotation. Who watches R1’s retouch at first?',
    options: [
      'U3, from his new spot covering second',
      'PU, glancing back over his shoulder on his way up to third',
      'U1 — the one exception to the usual hand-off',
      'U2, looking back in from the outfield',
    ],
    correctIndex: 2,
    explanation:
      'Normally retouches advance to the umpire ahead of the runner, but the manual carves out one exception: with R1 only in the Full rotation, U1 keeps R1’s retouch at first — he is right there before his release home.',
  },
  {
    id: 'mech-045',
    ruleset: 'mech60',
    topic: 'Tag-Ups & Touches',
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
    ruleset: 'mech60',
    topic: 'Tag-Ups & Touches',
    tier: 'sixty',
    scenario:
      '60-ft diamond, runner on first, ground ball to F6 — a tailor-made double play. As the feed comes to second, what is the 2026 point-of-emphasis footwork for U2?',
    options: [
      'Charge the bag to get on top of the pivot',
      'One step toward the throw, stopped and locked at the force',
      'Back away toward the outfield grass to take the wide view',
      'Straddle second base before the throw arrives',
    ],
    correctIndex: 1,
    explanation:
      'Double-play footwork: take one step toward the throw to create an angle, be stopped and locked at the moment of the force with eyes on the base, and afterward drift with eyes down on the runner and pivot fielder to catch slide or contact infractions.',
  },
  // ── Crew Signals & POEs ─────────────────────────────────────────────────
  {
    id: 'mech-047',
    ruleset: 'mech60',
    topic: 'Crew Signals & POEs',
    tier: 'sixty',
    scenario:
      'Any diamond, 4-umpire crew. The count runs to 3-2 on the batter. What is the whole crew expected to do before the next pitch?',
    options: [
      'Nothing — counts are the plate umpire’s business',
      'Every umpire signals the 3-2 count to the crew',
      'Only PU and U1 exchange a nod',
      'The crew resets to bases-empty positions',
    ],
    correctIndex: 1,
    explanation:
      'On any count reaching 3-2, all four umpires signal it. The next pitch can produce a checked swing ask, a strikeout-throw-out double play, or ball four with runners moving — the crew signal keeps everyone alert to all of it.',
  },
  {
    id: 'mech-049',
    ruleset: 'mech60',
    topic: 'Crew Signals & POEs',
    tier: 'sixty',
    scenario:
      'Any diamond. The batter tries to hold up on an inside pitch and the ball grazes his hands mid-half-swing. Why must the plate umpire check the swing immediately here?',
    options: [
      'To decide whether to eject the pitcher',
      'Swing means dead-ball strike; no swing means hit-by-pitch',
      'Because the ball is live either way and runners are advancing',
      'It is only checked if the offense complains',
    ],
    correctIndex: 1,
    explanation:
      'A half-swing plus hit-by-pitch is an automatic, immediate check: swing means dead-ball strike, no swing means the batter is awarded first. Handling it on the spot avoids the mess of unwinding the play after the fact.',
  },
  {
    id: 'mech-051',
    ruleset: 'mech60',
    topic: 'Crew Signals & POEs',
    tier: 'sixty',
    scenario:
      'Any diamond, pre-pitch. What does the crew’s “DOO” mnemonic tell each umpire to think through before every pitch?',
    options: [
      'Distance, Obstruction, Overthrow',
      'Down to his base, Out on a fly, or Over in rotation',
      'Defense, Offense, Outs — the pre-pitch checklist',
      'Drive, Observe, Officiate — the hustle mantra',
    ],
    correctIndex: 1,
    explanation:
      'Every pitch, every umpire already knows what he will “DOO” on a ball in play: Down to the point of his base, Out for a fly ball in his area, or Over to a base he covers in rotation — signaled pre-pitch by pointing, initiated by PU but done by all.',
  },
  // ── Tag Plays & the Wedge ───────────────────────────────────────────────
  {
    id: 'mech-054',
    ruleset: 'mech60',
    topic: 'Tag Plays & the Wedge',
    tier: 'sixty',
    scenario:
      'Any diamond, tag play developing at a base. Where does the umpire start when finding the wedge?',
    options: [
      'Straddling the base to see both sides',
      '5–7 feet directly behind the fielder receiving the throw',
      '15–18 feet off the play at a fixed 90-degree calling angle',
      'On the runner’s track into the base',
    ],
    correctIndex: 1,
    explanation:
      'Current instruction: start 5–7 feet behind the fielder receiving the throw. That puts the umpire on a parallel track with the fielder, allows quick relative adjustments, and takes fewer steps to hold the wedge — while staying off the fielder’s lateral track and the runner’s path.',
  },
  {
    id: 'mech-056',
    ruleset: 'mech60',
    topic: 'Tag Plays & the Wedge',
    tier: 'sixty',
    scenario:
      'Any diamond, throw arriving on a tag play. The umpire is behind the fielder, and the runner starts his slide. Whom does the umpire adjust with as the tag is applied — the fielder or the runner?',
    options: [
      'The fielder, all the way through the end of the play',
      'The runner — follow the fielder, adjust with the runner',
      'Neither — lock in and never move',
      'The base coach’s signals',
    ],
    correctIndex: 1,
    explanation:
      'Follow the fielder, adjust with the runner. The fielder takes you to the developing play, but the fielder must bring the tag to the runner — so at the moment of truth you adjust with the runner, keeping him sliding toward you to avoid being blocked out.',
  },
];
