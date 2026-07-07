import { Question } from '../types';

// 4-Umpire System mechanics on the 50/70 and 90-foot diamonds
// (Intermediate and up, CCA-aligned): Full / Reverse / U2 Drift / PU Trail
// rotations, the inside-vs-outside U2 coverage split, infield C/NC,
// positioning, and tag-ups, plus crew-wide points of emphasis and wedge
// theory. Rulings verified against the 2026 Little League Umpire's Manual;
// scenarios are original wording.
//
// Crew shorthand, matching real crew language:
//   PU = plate umpire, U1/U2/U3 = base umpires, BR = batter-runner,
//   F1–F9 = fielders by scoring notation, C/NC = catch/no-catch,
//   Po1/Po2/Po3 = point of first/second/third base, PoP = point of plate,
//   AOR = area of responsibility, RiSP = runner(s) in scoring position.

export const MECH_BIG_QUESTIONS: Question[] = [
  // ── Crew Signals & POEs ─────────────────────────────────────────────────
  {
    id: 'mech-048',
    ruleset: 'mechBig',
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
    id: 'mech-050',
    ruleset: 'mechBig',
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
    id: 'mech-052',
    ruleset: 'mechBig',
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
  // ── Tag Plays & the Wedge ───────────────────────────────────────────────
  {
    id: 'mech-053',
    ruleset: 'mechBig',
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
    id: 'mech-055',
    ruleset: 'mechBig',
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
    id: 'mech-057',
    ruleset: 'mechBig',
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
  // ── Rotations ───────────────────────────────────────────────────────────
  {
    id: 'mech-058',
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
    ruleset: 'mechBig',
    topic: 'Rotations',
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
  // ── Fly Ball Coverage ───────────────────────────────────────────────────
  {
    id: 'mech-074',
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
    ruleset: 'mechBig',
    topic: 'Fly Ball Coverage',
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
  // ── Positioning ─────────────────────────────────────────────────────────
  {
    id: 'mech-083',
    ruleset: 'mechBig',
    topic: 'Positioning',
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
    ruleset: 'mechBig',
    topic: 'Positioning',
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
    ruleset: 'mechBig',
    topic: 'Positioning',
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
    ruleset: 'mechBig',
    topic: 'Positioning',
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
    ruleset: 'mechBig',
    topic: 'Positioning',
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
    ruleset: 'mechBig',
    topic: 'Positioning',
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
    ruleset: 'mechBig',
    topic: 'Positioning',
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
  // ── Infield Coverage ────────────────────────────────────────────────────
  {
    id: 'mech-090',
    ruleset: 'mechBig',
    topic: 'Infield Coverage',
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
    ruleset: 'mechBig',
    topic: 'Infield Coverage',
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
    ruleset: 'mechBig',
    topic: 'Infield Coverage',
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
    ruleset: 'mechBig',
    topic: 'Infield Coverage',
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
    ruleset: 'mechBig',
    topic: 'Infield Coverage',
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
    ruleset: 'mechBig',
    topic: 'Infield Coverage',
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
  // ── Tag-Ups & Touches ───────────────────────────────────────────────────
  {
    id: 'mech-096',
    ruleset: 'mechBig',
    topic: 'Tag-Ups & Touches',
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
    ruleset: 'mechBig',
    topic: 'Tag-Ups & Touches',
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
    ruleset: 'mechBig',
    topic: 'Tag-Ups & Touches',
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
    ruleset: 'mechBig',
    topic: 'Tag-Ups & Touches',
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
    ruleset: 'mechBig',
    topic: 'Tag-Ups & Touches',
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
