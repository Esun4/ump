import { Question } from '../types';

// Crew signals and umpire-to-umpire communication: pre-pitch signals,
// rotation calls, coverage hand-offs, and getting/giving help. Grounded in
// the 2026 Little League Umpire Manual (4-Umpire 60-ft system fundamentals,
// rotation matrix, and crew-consultation guidance) plus the standard crew
// conventions the manual leaves to the pre-game conference (count ask,
// infield-fly reminder). Scenarios are original wording.

export const SIGNALS_QUESTIONS: Question[] = [
  // ── Pre-Pitch Signals ────────────────────────────────────────────────────
  {
    id: 'sig-001',
    ruleset: 'signals',
    topic: 'Pre-Pitch Signals',
    tier: 'sixty',
    scenario:
      'Runners on first and second, one out. Before the next pitch the plate umpire makes eye contact with you at third and gives the crew’s infield-fly signal. What is he telling you, and what should you do?',
    options: [
      'He’s calling time — kill the play and reset',
      'The infield fly is possible on this pitch — return the signal so he knows the whole crew is armed',
      'He wants you to rotate home if the ball goes to the outfield',
      'He’s reminding you the batter has two strikes',
    ],
    correctIndex: 1,
    explanation:
      'The infield fly is in effect with runners on first and second (or bases loaded) and fewer than two outs. The plate umpire initiates the pre-pitch reminder, and every umpire echoes it back — an unanswered signal means part of the crew isn’t armed, which is exactly how a dropped pop turns into chaos.',
  },
  {
    id: 'sig-002',
    ruleset: 'signals',
    topic: 'Pre-Pitch Signals',
    tier: 'sixty',
    scenario:
      'Runner on first only, nobody else on, one out. The plate umpire flashes the infield-fly signal at the crew. You’re at second. What’s the right response?',
    options: [
      'Echo the signal — better safe than sorry',
      'Ignore it and hope he figures it out',
      'Get his attention and wash it off before the pitch — infield fly can’t be in effect with only first occupied',
      'Call time and hold a crew conference on the mound',
    ],
    correctIndex: 2,
    explanation:
      'The infield fly requires a force at third — first and second, or bases loaded — plus fewer than two outs. With R1 only, the signal is a miscommunication, and the time to fix a wrong crew signal is before the pitch: a discreet wash-off and the correct signal, not a game-stopping conference.',
  },
  {
    id: 'sig-003',
    ruleset: 'signals',
    topic: 'Pre-Pitch Signals',
    tier: 'sixty',
    scenario:
      'The count on the batter runs to 3-2 with a runner on first. Under the 2026 points of emphasis, what is every umpire on the crew expected to do before the next pitch?',
    options: [
      'Nothing — the count is the plate umpire’s job alone',
      'Signal the 3-2 count to raise crew awareness of an impending action pitch',
      'Rotate one position clockwise in anticipation of the steal',
      'Verbally announce “full count” loud enough for both dugouts',
    ],
    correctIndex: 1,
    explanation:
      'A 2026 mechanics emphasis: on any count that reaches 3-2, each umpire signals the 3-2 count to the crew. It flags an “action pitch” — an immediate check-swing ask, a potential strikeout/throw-out double play versus ball four, and runners likely moving — so nobody gets caught flat.',
  },
  {
    id: 'sig-004',
    ruleset: 'signals',
    topic: 'Pre-Pitch Signals',
    tier: 'sixty',
    scenario:
      'Working the bases, you lose track of the count between pitches. You catch your plate partner’s eye and tap the top of your head. What are you asking, and how should he answer?',
    options: [
      'You’re asking for the count — he answers discreetly with fingers, balls on the left hand and strikes on the right, before the next pitch',
      'You’re telling him you have the infield fly',
      'You’re asking to swap positions at the end of the inning',
      'You’re signalling that you need time for equipment',
    ],
    correctIndex: 0,
    explanation:
      'The head tap is the standard crew ask for the count (agree on it in the pre-game — it can also cover outs). The partner answers quietly with fingers, balls on the left hand and strikes on the right, so the crew is synced without broadcasting to the field that an umpire lost the count.',
  },
  {
    id: 'sig-005',
    ruleset: 'signals',
    topic: 'Pre-Pitch Signals',
    tier: 'sixty',
    scenario:
      'In a 4-umpire crew, U3 figures everyone already knows their responsibilities and never returns the plate umpire’s pre-pitch signals. What does the manual actually require?',
    options: [
      'Signals are optional once the crew has worked together before',
      'Pre-pitch signals are initiated by the plate umpire but must be given by ALL umpires, pointing to their responsibility for the situation',
      'Only the plate umpire signals; base umpires just nod',
      'Signals are only required with runners in scoring position',
    ],
    correctIndex: 1,
    explanation:
      'Pre-pitch communication is a fundamental of the system: the plate umpire initiates, and every umpire signals by pointing to their responsibility given the situation. Communication must be early, continuous, audible AND visual — a silent crew is a crew about to blow a rotation.',
  },

  // ── Rotations & Coverage Calls ───────────────────────────────────────────
  {
    id: 'sig-006',
    ruleset: 'signals',
    topic: 'Rotations & Coverage Calls',
    tier: 'sixty',
    scenario:
      'Four umpires, nobody on base. U2 reads a fly ball in his area and goes out for the catch/no-catch. Which rotation is the crew in, and where does the plate umpire go?',
    options: [
      'Fill rotation — the plate umpire stays home',
      'Full rotation — the plate umpire rotates to third; U1 takes first and then home after communicating his release',
      'U2 Fill — U3 covers both second and third',
      'No rotation — the three remaining umpires hold their bases',
    ],
    correctIndex: 1,
    explanation:
      'With no runners on (or R1 only), U2 or U3 leaving triggers the FULL rotation: PU rotates to third, U3 (or U2) slides to second, and U1 handles first before trailing to the plate — communicating that release so home is never silently uncovered.',
  },
  {
    id: 'sig-007',
    ruleset: 'signals',
    topic: 'Rotations & Coverage Calls',
    tier: 'sixty',
    scenario:
      'Runner on second only. U3 goes out on a drive to the left-field line. R2 tags and heads for third. In the Fill rotation, who has the play at third base?',
    options: [
      'The plate umpire, rotating up the line',
      'U1, sprinting across the diamond',
      'U2, filling from the restricted area to cover second AND third',
      'U3 makes it from the outfield',
    ],
    correctIndex: 2,
    explanation:
      'With runners in scoring position, U2 or U3 leaving triggers the FILL rotation: exactly one umpire uses the restricted area to fill the vacancy. Here U2 owns second and third, U1 stays at first, and the plate umpire stays home where the money play is coming.',
  },
  {
    id: 'sig-008',
    ruleset: 'signals',
    topic: 'Rotations & Coverage Calls',
    tier: 'sixty',
    scenario:
      'U1 breaks to the outfield on a sinking liner toward the right-field line. Bases empty. What rotation does his departure trigger, and who covers first base?',
    options: [
      'Full rotation — the plate umpire takes first',
      'U2 Fill — U2 works first and second from the restricted area, regardless of where the runners are',
      'Fill rotation — U3 crosses to first',
      'No coverage change; first base stays open until U1 returns',
    ],
    correctIndex: 1,
    explanation:
      'Anytime U1 goes out — with any runner configuration — the crew is in the U2 Fill: U2 moves into the restricted area and covers both first and second. It’s the one rotation whose trigger never depends on the runners, which is why the matrix lists it on every row.',
  },
  {
    id: 'sig-009',
    ruleset: 'signals',
    topic: 'Rotations & Coverage Calls',
    tier: 'sixty',
    scenario:
      'A fly ball splits left-center. You (U3) and U2 both take two hard steps out before you see each other going. Who takes the ball, and how is that resolved mid-play?',
    options: [
      'Whoever called it first keeps it',
      'Defer to U2 — he’s the quarterback on outfield fly balls; use the non-verbal stop hand, then recover and rotate',
      'Both go out; the infield can survive with two umpires',
      'Defer to the senior umpire on the crew',
    ],
    correctIndex: 1,
    explanation:
      'U2 is the “quarterback” on all fly balls to the outfield: when two umpires break on the same ball, the crew defers to U2, and the other umpire recovers into rotation. The manual’s tool for sorting it out in real time is the non-verbal stop hand between partners.',
  },
  {
    id: 'sig-010',
    ruleset: 'signals',
    topic: 'Rotations & Coverage Calls',
    tier: 'sixty',
    scenario:
      'Runner on second only, deep fly to center. U2 goes out for the catch. R2 is tagging. Who watches R2’s retouch at second base?',
    options: [
      'Nobody — retouches are the outfield umpire’s job',
      'U1, since he’s the closest remaining umpire',
      'U3 — when an umpire leaves, the retouch advances to the umpire at the base ahead of the runner',
      'The plate umpire watches all retouches from home',
    ],
    correctIndex: 2,
    explanation:
      'When an umpire vacates a base to go out or rotate, responsibility for the retouch at that base advances to the umpire ahead of the runner — here U3 at third takes R2’s tag-up. (The one exception: R1 only in the Full rotation, where U1 keeps R1’s retouch.)',
  },
  {
    id: 'sig-011',
    ruleset: 'signals',
    topic: 'Rotations & Coverage Calls',
    tier: 'sixty',
    scenario:
      'Two-umpire crew, runner on first. On a clean single R1 rounds second, and from behind you the plate umpire calls “I’ve got third!” As the base umpire, what does that tell you to do?',
    options: [
      'Sprint to third — he’s asking you to take it',
      'Stay with the batter-runner — the plate umpire is taking the lead runner into third, so don’t chase that play',
      'Cover home plate while he’s gone',
      'Nothing — it’s a courtesy call with no coverage meaning',
    ],
    correctIndex: 1,
    explanation:
      '“I’ve got third” is the plate umpire announcing he’s taking the lead runner’s play at third. That frees the base umpire to stay chest-to-ball with the batter-runner at first and second. Two umpires converging on third while the batter-runner slides in unwatched is the classic communication failure this call prevents.',
  },

  // ── Fly Balls & Fair/Foul ────────────────────────────────────────────────
  {
    id: 'sig-012',
    ruleset: 'signals',
    topic: 'Fly Balls & Fair/Foul',
    tier: 'sixty',
    scenario:
      'A soft liner has the second baseman gloving it at his shoe tops, halfway between U1 and U2. Both could rule on it. Under the Open Glove Theory, whose catch/no-catch is it?',
    options: [
      'Always the plate umpire’s',
      'The umpire the fielder’s glove is opening toward',
      'The umpire physically closest to the fielder',
      'U2, because he’s the quarterback',
    ],
    correctIndex: 1,
    explanation:
      'On infield fly balls and line drives played below the fielder’s waist, the Open Glove Theory assigns catch/no-catch to the umpire the glove opens toward. The plate umpire keeps everything caught above the waist and anything on the infield grass — sort it out in the pre-game so nobody double-calls a shoestring catch.',
  },
  {
    id: 'sig-013',
    ruleset: 'signals',
    topic: 'Fly Balls & Fair/Foul',
    tier: 'sixty',
    scenario:
      'Runner on third. The plate umpire gives U3 the crew’s “pinch” signal before the pitch. What situation is he flagging?',
    options: [
      'He wants U3 to pinch in toward the mound for a bunt',
      'R3 may block his view of fair/foul between home and third — if pinched, fair/foul passes to U3',
      'The batter is squeezing — watch for interference',
      'U3 should take the tag-up at third',
    ],
    correctIndex: 1,
    explanation:
      'The PINCH covers exactly this: with R3, the runner (and coach) can screen the plate umpire’s look at a ball down the third-base line between home and the front of the bag. The pre-pitch signal tells U3 that if PU is pinched, the fair/foul decision passes to him.',
  },
  {
    id: 'sig-014',
    ruleset: 'signals',
    topic: 'Fly Balls & Fair/Foul',
    tier: 'sixty',
    scenario:
      'U1 abandons the right-field line to go out on a fly ball. Moments later a different runner’s hit hooks toward that same line. U1 is still in the outfield. Who owns fair/foul on the line now?',
    options: [
      'U1 hustles back to the line — it’s still his',
      'The plate umpire — once U1 or U3 abandons the line, PU assumes the entire line, and the departed umpire never comes back to make a fair/foul decision',
      'U2 slides over to take the line',
      'Whichever umpire has the best look in the moment',
    ],
    correctIndex: 1,
    explanation:
      'The manual is blunt: if U1 or U3 abandons the line, NEVER come back to it for a fair/foul decision. The plate umpire assumes the entire foul line the moment the wing umpire leaves — which is why “going out” is communicated loudly, so PU knows the line is his.',
  },
  {
    id: 'sig-015',
    ruleset: 'signals',
    topic: 'Fly Balls & Fair/Foul',
    tier: 'sixty',
    scenario:
      'Runners on first and second, one out. A high pop drifts toward the third-base line — it may land foul. The infield fly was signalled pre-pitch. What does the responsible umpire verbalize while the ball is in the air?',
    options: [
      '“Infield fly, the batter is out!” — the drift doesn’t matter',
      'Nothing until the ball lands',
      '“Infield fly, if fair!” — pointing up, so the ruling covers both outcomes',
      '“Foul ball!” to protect the runners',
    ],
    correctIndex: 2,
    explanation:
      'On a pop that threatens the line, the call is “Infield fly, if fair!” with the arm up. If it settles fair the batter is out; if it lands foul it’s just a foul ball. Declaring the batter out unconditionally on a ball that might land foul — or saying nothing — both put runners in an impossible spot.',
  },

  // ── Appeals & Crew Help ──────────────────────────────────────────────────
  {
    id: 'sig-016',
    ruleset: 'signals',
    topic: 'Appeals & Crew Help',
    tier: 'sixty',
    scenario:
      'The catcher asks the plate umpire to check a swing, and PU steps out and points to you at first: “Did he go?” You saw the batter hold up. How do you answer?',
    options: [
      'Shrug — it was really the plate umpire’s look',
      'A clear verbal “No, he didn’t go!” with the safe signal — and your answer IS the call',
      'Quietly tell PU your opinion and let him decide',
      'Signal strike so the crew looks unified',
    ],
    correctIndex: 1,
    explanation:
      'A checked-swing appeal transfers the decision: the base umpire answers immediately and unmistakably — “Yes, he went!” with a fist or “No, he didn’t go!” with a safe signal — and that answer becomes the call. Mumbling or deferring back defeats the whole mechanic. (And with two strikes, check immediately without waiting to be asked.)',
  },
  {
    id: 'sig-017',
    ruleset: 'signals',
    topic: 'Appeals & Crew Help',
    tier: 'sixty',
    scenario:
      'U1 calls the batter-runner out on a close play where the first baseman may have pulled his foot. The manager politely asks him to get help. Who decides whether to consult, and how should the conference run?',
    options: [
      'The plate umpire overrules from home — he outranks the bases',
      'U1 decides and, if consulting, initiates it himself: shortly after the call, the ENTIRE crew, away from players and managers',
      'The manager’s request makes a conference mandatory',
      'Only the two nearest umpires huddle so the game keeps moving',
    ],
    correctIndex: 1,
    explanation:
      'Crew consultation belongs to the umpire who made the call — he initiates it, promptly (not after a lengthy argument), with the whole crew included so every observation is available, held away from players and managers. Getting help is described as a sign of maturity, not weakness — but it’s his to seek.',
  },
  {
    id: 'sig-018',
    ruleset: 'signals',
    topic: 'Appeals & Crew Help',
    tier: 'sixty',
    scenario:
      'From third you clearly saw the ball nick the batter’s hand on a pitch the plate umpire ruled a foul ball. Nobody has asked you anything. What’s the right way to get that information into the game?',
    options: [
      'Jog in immediately and announce what you saw',
      'Give the crew’s pre-arranged “I have information” signal and let the calling umpire decide whether to come get it',
      'Say nothing ever — it’s not your call',
      'Tell the batter’s coach so he can appeal',
    ],
    correctIndex: 1,
    explanation:
      'The crew should have agreed in the pre-game on a subtle signal that information is available. You post the signal; whether to seek it stays with the umpire who made the call. Interrupting the game with unsolicited information — however right you are — is explicitly not acceptable under the 9.02/9.04(c) framework.',
  },
];
