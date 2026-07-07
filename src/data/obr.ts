import { Question } from '../types';

// Baseball Canada / OBR bank. All scenarios are original; explanations
// paraphrase rulings in plain English and cite rule areas by topic only.

export const OBR_QUESTIONS: Question[] = [
  // ── Balks ────────────────────────────────────────────────────────────
  {
    id: 'obr-001',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'district',
    scenario:
      'R1, one out. The pitcher comes set, begins his delivery toward the plate, then freezes halfway through and steps off.',
    options: [
      'Balk — award R1 second base',
      'No pitch, no penalty',
      'Ball on the batter',
      'Time is called; warn the pitcher',
    ],
    correctIndex: 0,
    explanation:
      'Once the pitcher starts his motion to pitch, he must deliver the ball without interruption. Stopping partway through is a balk with a runner on, and R1 is awarded second.',
  },
  {
    id: 'obr-002',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'district',
    scenario:
      'R2, nobody out. From the set, the pitcher steps directly toward second base and fakes a throw without stepping off the rubber.',
    options: [
      'Balk — a pitcher may never feint while on the rubber',
      'Legal — a feint to second is allowed with a proper step',
      'Balk — he must disengage before any feint',
      'Illegal pitch — ball on the batter',
    ],
    correctIndex: 1,
    explanation:
      'Second base is the one base a pitcher may feint a throw to while engaged, as long as he steps toward it. Feinting to first or third from the rubber is a balk.',
  },
  {
    id: 'obr-003',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'provincial',
    scenario:
      'R1. A right-hander in the set position lifts his free leg, and it swings past the back edge of the pitching rubber before he spins and throws to first for a pickoff attempt.',
    options: [
      'Legal pickoff — the runner is out if tagged',
      'Balk — once the leg breaks the plane of the rubber he is committed to pitch',
      'Legal only if the throw beats the runner',
      'No call — the leg position is irrelevant from the set',
    ],
    correctIndex: 1,
    explanation:
      'When the free foot swings past the back edge of the rubber, the pitcher must deliver to the plate (or throw to second on a runner advancing there). Spinning back to first from that position is a balk.',
  },
  {
    id: 'obr-004',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'district',
    scenario:
      'R1 and R3. The batter is still settling into the box, head down, when the pitcher hurries into his delivery and pitches.',
    options: [
      'Legal — the batter must be ready at all times',
      'No pitch — start over with a warning',
      'Quick pitch: a balk — both runners advance one base',
      'Quick pitch: ball on the batter, runners hold',
    ],
    correctIndex: 2,
    explanation:
      'A pitch thrown before the batter is reasonably set is a quick pitch. With runners on base it is a balk; with the bases empty it is called a ball.',
  },
  {
    id: 'obr-005',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'provincial',
    scenario:
      'R1 and R3, one out. From the rubber the pitcher steps toward third and fakes a throw, then immediately wheels and throws to first, still engaged, catching R1 off the base.',
    options: [
      'Legal — he stepped toward each base he threw to',
      'Out if the tag is applied before R1 returns',
      'Balk — the third-to-first move is illegal',
      'Legal only if R3 was breaking for home',
    ],
    correctIndex: 2,
    explanation:
      'Feinting a throw to third from the rubber is itself a balk under current rules, so the popular old "fake third, throw first" move is dead. Both runners are awarded a base.',
  },
  {
    id: 'obr-006',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'district',
    scenario:
      'R2. The pitcher comes to the set position but delivers to the plate in one continuous motion without ever pausing.',
    options: [
      'Legal — a pause is only required with two strikes',
      'Balk — he must come to a complete stop before delivering',
      'Ball on the batter',
      'Legal — the stop is optional from the windup',
    ],
    correctIndex: 1,
    explanation:
      'From the set position the pitcher must come to a complete and discernible stop with runners on base. Rolling through the set without stopping is a balk.',
  },
  {
    id: 'obr-007',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'district',
    scenario:
      'R1. While standing on the rubber taking his sign, the ball slips out of the pitcher’s hand and rolls a metre in front of the mound.',
    options: [
      'No pitch — retrieve the ball and resume',
      'Ball on the batter',
      'Balk — R1 is awarded second',
      'Dead ball; do-over with a warning',
    ],
    correctIndex: 2,
    explanation:
      'A pitcher who drops the ball while touching the rubber has balked when runners are on base. With the bases empty it is a ball only if the ball crosses a foul line.',
  },
  {
    id: 'obr-008',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'district',
    scenario:
      'Bases empty. The pitcher delivers before the batter has both feet set and his eyes on the pitcher.',
    options: [
      'Ball on the batter — quick pitch with nobody on',
      'Balk',
      'Strike if it is in the zone',
      'No call — bases are empty',
    ],
    correctIndex: 0,
    explanation:
      'A quick pitch is always illegal. With the bases empty the penalty is a ball added to the count; with runners on it becomes a balk.',
  },
  {
    id: 'obr-009',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'provincial',
    scenario:
      'R2 only, first base open. Without stepping off, the pitcher suddenly throws to the first baseman standing near his bag. No runner is advancing toward first.',
    options: [
      'Legal — he may throw to any base',
      'Balk — throw to an unoccupied base with no play on',
      'Legal if the first baseman was holding his position',
      'Time — no pitch',
    ],
    correctIndex: 1,
    explanation:
      'While engaged, a pitcher may only throw to an unoccupied base to make a play on an advancing runner. Throwing to an empty base for no reason is a balk.',
  },
  {
    id: 'obr-010',
    ruleset: 'obr',
    topic: 'Balks',
    tier: 'provincial',
    scenario:
      'R1. While standing on the rubber, the pitcher brings his pitching hand to his mouth, then grips the ball without wiping off.',
    options: [
      'Balk — R1 advances',
      'Ball on the batter — not a balk',
      'Ejection for doctoring the ball',
      'No penalty unless he throws a pitch',
    ],
    correctIndex: 1,
    explanation:
      'Going to the mouth while engaged (without wiping) is penalized with a ball on the batter, not a balk. It is a common trap answer — the balk penalties are listed separately.',
  },

  // ── Interference ─────────────────────────────────────────────────────
  {
    id: 'obr-011',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'district',
    scenario:
      'Bunt in front of the plate. The batter-runner runs the last 20 feet to first entirely in fair territory, inside the running lane, and the catcher’s throw hits him in the back.',
    options: [
      'Interference — batter-runner out, ball dead',
      'No call — the throw hit him accidentally',
      'Obstruction on the catcher',
      'Interference only if he slowed down',
    ],
    correctIndex: 0,
    explanation:
      'On the last half to first base the batter-runner must be inside the 3-foot running lane (which is in foul ground). Being hit by a quality throw while outside the lane in fair territory is interference: he is out and other runners return.',
  },
  {
    id: 'obr-012',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'provincial',
    scenario:
      'R1, one out. On a ground ball to short, R1 slides well wide of second base, never able to reach the bag with hand or foot, and takes out the pivot man as the relay to first sails wide.',
    options: [
      'Only R1 is out — the throw was wide anyway',
      'R1 and the batter-runner are both out',
      'No call — hard slides are part of the game',
      'The batter-runner returns to first',
    ],
    correctIndex: 1,
    explanation:
      'A slide that is not a bona fide attempt to reach the base, made to break up a double play, is interference: the sliding runner is out and so is the batter-runner. The wide throw does not matter.',
  },
  {
    id: 'obr-013',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'district',
    scenario:
      'R2, nobody out. A ground ball up the middle strikes R2 on the shin in fair territory before it reaches the shortstop positioned behind the baseline.',
    options: [
      'Live ball — play on',
      'Dead ball — R2 out, batter awarded first base',
      'Dead ball — both R2 and the batter are out',
      'Dead ball — R2 returns to second, batter bats again',
    ],
    correctIndex: 1,
    explanation:
      'A runner struck by a fair batted ball before it passes an infielder is out, and the ball is dead. The batter is awarded first base and credited with a hit.',
  },
  {
    id: 'obr-014',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'provincial',
    scenario:
      'R1 holding at first with the first baseman playing in front of him. A sharp grounder gets past the first baseman untouched and then hits R1. No other infielder had a chance to make a play on the ball.',
    options: [
      'R1 is out — a runner hit by a fair ball is always out',
      'Live ball — no interference, play on',
      'Dead ball — batter awarded first, R1 stays',
      'R1 is out only if the ball was catchable',
    ],
    correctIndex: 1,
    explanation:
      'Once a fair ball passes an infielder (other than the pitcher) and no other infielder has a play, a runner hit by it is not out. The ball stays live.',
  },
  {
    id: 'obr-015',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'provincial',
    scenario:
      'R2. The catcher’s mitt nicks the bat during the swing, but the batter still lines a clean single and R2 scores.',
    options: [
      'Catcher’s interference — batter must take first, R2 returns to third',
      'The play stands — the interference is disregarded since everyone advanced',
      'Dead ball immediately when the mitt touches the bat',
      'The manager may choose the result of the play or the award',
    ],
    correctIndex: 1,
    explanation:
      'When catcher’s interference occurs but the batter reaches first and every runner advances at least one base, the interference is ignored and the play stands automatically. The manager’s option only exists when the play turned out worse than the award.',
  },
  {
    id: 'obr-016',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'district',
    scenario:
      'R2 rounding third on a base hit. The third-base coach grabs the runner’s arm and physically pulls him back toward the bag as the throw comes in.',
    options: [
      'Legal coaching',
      'The runner is out for coach’s interference',
      'Delayed dead ball — award decided after the play',
      'Warning to the coach, runner returns to third',
    ],
    correctIndex: 1,
    explanation:
      'A coach who physically assists a runner — grabbing, pushing, or pulling him — causes that runner to be called out. Verbal direction is fine; touching is not.',
  },
  {
    id: 'obr-017',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'district',
    scenario:
      'R1 stealing on the pitch. The batter swings and misses for strike three, then shifts his feet and blocks the catcher’s throwing lane to second. The throw is never made.',
    options: [
      'Only the batter is out — strike three',
      'The batter is out on strikes and R1 is also out for the interference',
      'R1 returns to first, batter out',
      'No call — the batter may stand anywhere in the box',
    ],
    correctIndex: 1,
    explanation:
      'A just-retired batter who hinders the catcher’s play on a runner commits interference, and the runner being played on is called out as well. Two outs on the play.',
  },
  {
    id: 'obr-018',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'provincial',
    scenario:
      'Deep fly down the line. A spectator reaches clearly over the outfield fence into the field of play and deflects the ball just as the right fielder camps under it at the warning track.',
    options: [
      'Home run — the ball left the playing field',
      'Dead ball — the batter is declared out for spectator interference',
      'Do-over pitch',
      'Ground-rule double automatically',
    ],
    correctIndex: 1,
    explanation:
      'When a spectator reaches into the field and prevents what the umpire judges would have been a catch, the batter is out. Otherwise the umpire places all runners where they would have ended up absent the interference.',
  },
  {
    id: 'obr-019',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'provincial',
    scenario:
      'R2 stealing third. The batter swings and misses, and his natural follow-through clips the catcher’s mitt as the catcher comes up to throw. The throw dies and R2 is safe.',
    options: [
      'The batter is out for interference',
      'Dead ball — strike on the batter, R2 returns to second',
      'Play stands — follow-through contact is nothing',
      'R2 is out for the batter’s interference',
    ],
    correctIndex: 1,
    explanation:
      'Unintentional backswing contact is not full interference: the ball is dead, the swing counts as a strike, and runners return. Nobody is out unless that strike was strike three.',
  },
  {
    id: 'obr-020',
    ruleset: 'obr',
    topic: 'Interference',
    tier: 'provincial',
    scenario:
      'R1 stealing. The plate umpire is clipped by the catcher’s arm as the catcher throws, the throw arrives late, and R1 slides in safely.',
    options: [
      'R1 returns to first — umpire interference',
      'The play stands — R1 is safe',
      'R1 is automatically out',
      'The pitch is replayed',
    ],
    correctIndex: 0,
    explanation:
      'When the plate umpire hinders the catcher’s throw and the runner is not retired, the ball is dead and the runner returns. If the throw had retired the runner, the out would stand.',
  },

  // ── Obstruction ──────────────────────────────────────────────────────
  {
    id: 'obr-021',
    ruleset: 'obr',
    topic: 'Obstruction',
    tier: 'district',
    scenario:
      'R1 is caught in a rundown between first and second. Retreating, he collides with the first baseman, who is standing in the basepath without the ball waiting for a throw.',
    options: [
      'Dead ball immediately — R1 is awarded second base',
      'Delayed dead ball — see how the play ends',
      'R1 is out for leaving the basepath',
      'No call — incidental contact',
    ],
    correctIndex: 0,
    explanation:
      'Obstruction of a runner who is being played on kills the play immediately, and the runner is awarded at least one base beyond the last one he legally touched — here, second.',
  },
  {
    id: 'obr-022',
    ruleset: 'obr',
    topic: 'Obstruction',
    tier: 'district',
    scenario:
      'Base hit to right. Rounding first, the batter-runner has to swerve around the first baseman, who is standing in the path watching the outfield with no ball coming. The runner stops at first.',
    options: [
      'Dead ball — award second base automatically',
      'Delayed dead ball — award second only if the umpire judges the hindrance cost him the base',
      'No call — the runner chose to stop',
      'Warn the fielder; no award possible',
    ],
    correctIndex: 1,
    explanation:
      'Obstruction with no play being made on the runner is a delayed dead ball. The umpire lets the play finish and then awards whatever bases nullify the obstruction — which may be none if it cost the runner nothing.',
  },
  {
    id: 'obr-023',
    ruleset: 'obr',
    topic: 'Obstruction',
    tier: 'district',
    scenario:
      'Slow roller to the third baseman, who charges and is about to glove the ball when R2, advancing, runs into him.',
    options: [
      'Obstruction — R2 is awarded third',
      'Nothing — a train wreck, play on',
      'The fielder had right of way; R2 risks an interference call, not obstruction',
      'Both players are penalized',
    ],
    correctIndex: 2,
    explanation:
      'A fielder in the act of fielding a batted ball is protected; he cannot be guilty of obstruction. It is the runner who must avoid him, and contact that hinders the fielder is offensive interference.',
  },
  {
    id: 'obr-024',
    ruleset: 'obr',
    topic: 'Obstruction',
    tier: 'district',
    scenario:
      'R1 rounds second on a ball in the gap. The shortstop, nowhere near the ball, drops to a knee and mimics taking a throw and applying a tag, and R1 slides.',
    options: [
      'Legal deke',
      'Obstruction — the fake tag hindered the runner',
      'Interference on the shortstop',
      'No call unless contact occurs',
    ],
    correctIndex: 1,
    explanation:
      'A fake tag is obstruction: faking a play without the ball hinders the runner even without contact. The umpire protects the runner and awards bases that nullify the act; many leagues also treat it as an ejectable unsportsmanlike act.',
  },
  {
    id: 'obr-025',
    ruleset: 'obr',
    topic: 'Obstruction',
    tier: 'provincial',
    scenario:
      'R2 tries to score on a single. The catcher, without the ball, plants himself on the plate and blocks the sliding runner’s leg; the throw then arrives and the tag is applied.',
    options: [
      'Out — the throw beat him',
      'Obstruction — the run scores',
      'Out if the block was unintentional',
      'Runner returns to third',
    ],
    correctIndex: 1,
    explanation:
      'A fielder without possession may not block a base or the plate. Blocking the runner before having the ball is obstruction on a runner being played on: dead ball, and the runner is awarded home.',
  },
  {
    id: 'obr-026',
    ruleset: 'obr',
    topic: 'Obstruction',
    tier: 'provincial',
    scenario:
      'Swinging bunt. As the batter-runner breaks from the box, the catcher chasing the ball shoves him off stride before fielding it, then throws him out at first by half a step.',
    options: [
      'Out stands — the contact was before the throw',
      'Obstruction before reaching first — dead ball, batter-runner awarded first',
      'Offsetting: interference and obstruction cancel',
      'Do-over pitch',
    ],
    correctIndex: 1,
    explanation:
      'A batter-runner obstructed before touching first while the defense is playing on him gets first base; the ball is dead. (If the catcher had been in the act of fielding the ball, he would have been protected instead.)',
  },
  {
    id: 'obr-027',
    ruleset: 'obr',
    topic: 'Obstruction',
    tier: 'provincial',
    scenario:
      'Hit into the corner, no play on the runner. R2 is bumped by the shortstop while rounding second; the umpire signals delayed obstruction and judges it cost him third base at most. R2 keeps running and is thrown out by five metres trying to score.',
    options: [
      'Safe — obstruction protects him all the way home',
      'Out stands — he advanced beyond his protection at his own risk',
      'Out is nullified and he returns to third',
      'Dead ball when the obstruction occurred',
    ],
    correctIndex: 1,
    explanation:
      'Obstruction protection with no play on only reaches the base the umpire judges the hindrance cost — here, third. A runner who keeps going past his protected base advances at his own risk, so the out at the plate stands.',
  },
  {
    id: 'obr-028',
    ruleset: 'obr',
    topic: 'Obstruction',
    tier: 'provincial',
    scenario:
      'Pickoff at first. The first baseman straddles the bag in the runner’s dive path before the throw arrives; R1, diving back, is blocked from the base and tagged.',
    options: [
      'Out — good baseball play',
      'Obstruction — a fielder cannot block the base before he has the ball',
      'No call — the runner left the base voluntarily',
      'Balk on the pitcher',
    ],
    correctIndex: 1,
    explanation:
      'Until he possesses the ball, a fielder may not deny the runner access to the base. Blocking the dive-back lane before the throw arrives is obstruction, and the runner is protected back to first (or awarded beyond it if a play was being made on him — here he is safe at first at minimum).',
  },

  // ── Force & tag plays ────────────────────────────────────────────────
  {
    id: 'obr-029',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'district',
    scenario:
      'R1, one out. Ground ball to the first baseman, who steps on first and then throws to second, where the shortstop stretches and touches the bag well before R1 arrives — but applies no tag.',
    options: [
      'Double play — inning-style force at second',
      'R1 is safe — the force was removed when the batter was put out first',
      'R1 is out if the throw beat him by more than a step',
      'Dead ball — runners return',
    ],
    correctIndex: 1,
    explanation:
      'Putting out the batter-runner at first removes the force on R1. At second it becomes a tag play: touching the bag is no longer enough — R1 must be tagged while off base.',
  },
  {
    id: 'obr-030',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'district',
    scenario:
      'R2 only, nobody out. Ground ball to the shortstop, who runs over and stomps on second base as R2 slides in, never tagging him.',
    options: [
      'Out — force play at second',
      'Safe — R2 was never forced, so he must be tagged',
      'Out if the fielder beat him to the bag',
      'Safe only if he overslides',
    ],
    correctIndex: 1,
    explanation:
      'A force exists only when a runner must vacate his base for the batter-runner. R2 with first base empty is not forced; retiring him requires a tag.',
  },
  {
    id: 'obr-031',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'district',
    scenario:
      'Bases loaded, two out. Ground ball to third; the third baseman steps on the bag for the force on R2 just after R3 crosses the plate.',
    options: [
      'Run counts — R3 scored before the out',
      'Run does not count — no run can score when the third out is a force',
      'Run counts if the play at third was close',
      'Umpire’s judgment on the timing',
    ],
    correctIndex: 1,
    explanation:
      'Timing is irrelevant when the third out is a force out (or the batter-runner out before first): the run can never score.',
  },
  {
    id: 'obr-032',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'district',
    scenario:
      'R3, two out. The batter hits a slow chopper and is thrown out at first, an eyelash after R3 touches home plate.',
    options: [
      'Run counts — he crossed before the out',
      'Run does not count — the batter-runner was out before reaching first',
      'Run counts because it was not a force at first',
      'Protest situation',
    ],
    correctIndex: 1,
    explanation:
      'The batter-runner being retired before touching first is one of the automatic run-killers, exactly like a force: no run may score on the play regardless of timing.',
  },
  {
    id: 'obr-033',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'district',
    scenario:
      'Rundown between third and home. The catcher, ball in his bare hand, dives and touches the runner with only his empty glove.',
    options: [
      'Out — any touch with glove or hand counts',
      'Safe — the tag must be made with the ball or the glove holding the ball',
      'Out if the runner was off the baseline',
      'Safe only if the runner avoids the sweep',
    ],
    correctIndex: 1,
    explanation:
      'A legal tag is contact with the ball itself, or with the hand or glove actually holding the ball. Touching a runner with an empty glove while the ball is in the other hand retires no one.',
  },
  {
    id: 'obr-034',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'provincial',
    scenario:
      'Force at second. The ball lodges in the webbing of the shortstop’s glove, so he pulls the glove off and stretches it out, glove-with-ball touching the bag before the runner arrives.',
    options: [
      'Out — the ball touched the base first',
      'Out — the glove still counts as part of the fielder',
      'Safe — a detached glove holding the ball is not secure possession by the fielder',
      'Dead ball — lodged ball, everyone advances one base',
    ],
    correctIndex: 2,
    explanation:
      'For a force out, the fielder must touch the base while securely holding the ball in his hand or a worn glove. A glove that is no longer on his hand touching the bag does not record the out.',
  },
  {
    id: 'obr-035',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'provincial',
    scenario:
      'Bases loaded, two out. R1 beats the force at second, touching the bag, but his momentum slides him past it. He is tagged while off the base — after R3 had already crossed the plate.',
    options: [
      'No run — third out on a force at second',
      'Run scores — the force was satisfied when he touched the bag, so it became a time play',
      'No run — an overslide is treated as never reaching the base',
      'Run scores only if the defence does not appeal',
    ],
    correctIndex: 1,
    explanation:
      'Touching the base extinguishes the force even if the runner slides past it. The tag afterward is an ordinary third out, so the run counts if it crossed before the tag — a classic time play.',
  },
  {
    id: 'obr-036',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'district',
    scenario:
      'R2 and R3, two out. Single to left. R3 scores easily; R2 is tagged out sliding into third just after R3 touched the plate.',
    options: [
      'No run — the inning ended on the out',
      'Run counts — the third out was a tag play made after the run crossed',
      'No run — R2’s out is treated like a force',
      'Run counts only with fewer than two outs',
    ],
    correctIndex: 1,
    explanation:
      'A tag of a runner who is not forced is a time play. Since R3 touched home before the tag at third, the run counts. Umpires should watch the plate touch and the tag in the same look.',
  },
  {
    id: 'obr-037',
    ruleset: 'obr',
    topic: 'Force & tag plays',
    tier: 'provincial',
    scenario:
      'Play at the plate. The catcher fields the throw up the line, and the runner, with a clear lane to slide to the plate, lowers his shoulder and runs him over, jarring the ball loose.',
    options: [
      'Safe — the ball came out',
      'Out — a runner who deviates to initiate avoidable contact violates the collision rule, and the ball is dead',
      'Safe, but the runner is ejected',
      'Do-over — both players were at fault',
    ],
    correctIndex: 1,
    explanation:
      'A runner may not deviate from his path to initiate contact with the catcher when a slide was available. He is out even though the ball came loose, the ball is dead, and the contact can also draw an ejection.',
  },

  // ── Batted ball rulings ──────────────────────────────────────────────
  {
    id: 'obr-038',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'district',
    scenario:
      'Deep drive down the left-field line strikes the foul pole above the top of the fence.',
    options: [
      'Foul ball',
      'Home run',
      'Ground-rule double',
      'Umpire’s discretion',
    ],
    correctIndex: 1,
    explanation:
      'The foul pole is in fair territory — the name is misleading. A fly ball that hits the pole above the fence is a home run.',
  },
  {
    id: 'obr-039',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'district',
    scenario:
      'A hard grounder hits the first-base bag and ricochets into foul territory, where it is picked up behind the base.',
    options: [
      'Foul — it ended up in foul ground',
      'Fair — a ball that touches a base is fair',
      'Dead ball — replay the pitch',
      'Foul unless a fielder could have played it',
    ],
    correctIndex: 1,
    explanation:
      'First and third base sit entirely in fair territory. The instant a batted ball touches a bag it is fair, no matter where it bounces afterward.',
  },
  {
    id: 'obr-040',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'district',
    scenario:
      'A bunt wobbles up the third-base line and comes to rest untouched exactly on the chalk, halfway between home and third.',
    options: [
      'Foul ball',
      'Fair ball — the line is fair territory',
      'No call until a fielder touches it',
      'Dead ball',
    ],
    correctIndex: 1,
    explanation:
      'The foul lines themselves are fair. A ball resting on any part of the line between home and the base is a fair ball.',
  },
  {
    id: 'obr-041',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'district',
    scenario:
      'A sinking fly ball lands untouched three feet beyond first base, in foul ground, then spins across the line into fair territory.',
    options: [
      'Fair — it ended up fair',
      'Foul — past the base, the call is made where the ball first lands',
      'Fair if a fielder could have caught it',
      'Depends where it stops rolling',
    ],
    correctIndex: 1,
    explanation:
      'Beyond first or third base, fair/foul is fixed by where the ball first touches the ground (or a fielder). Before the base it is judged where it is touched or comes to rest — a distinction worth drilling.',
  },
  {
    id: 'obr-042',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'district',
    scenario:
      'R1 and R2, nobody out. High pop-up to the shortstop; the umpire declares “infield fly, batter’s out.” The ball drops untouched at the shortstop’s feet, and R2 sprints to third and beats the late throw.',
    options: [
      'R2 must return — runners cannot advance on an infield fly',
      'Batter is out; R2’s advance stands since he advanced at his own risk on a live ball',
      'Batter is not out because the ball was dropped',
      'Dead ball — both runners return',
    ],
    correctIndex: 1,
    explanation:
      'The infield fly call retires the batter and removes the force, but the ball stays live. Runners may advance at their own risk whether or not the ball is caught.',
  },
  {
    id: 'obr-043',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'provincial',
    scenario:
      'R1, nobody out, no infield fly situation. The second baseman lets an easy soft line drive hit his glove and deliberately drops it, then starts a 6-4-3-style double play.',
    options: [
      'Legal — heads-up play',
      'Dead ball — the batter is out for the intentional drop and R1 returns to first',
      'Only the force at second stands',
      'Umpire cannot judge intent',
    ],
    correctIndex: 1,
    explanation:
      'An infielder who intentionally drops a fair fly or line drive with a force in effect kills the cheap double play: the ball is dead, the batter is out, and runners return. Letting it fall untouched, by contrast, is legal.',
  },
  {
    id: 'obr-044',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'provincial',
    scenario:
      'A comebacker glances off the pitcher’s leg while over fair territory, then rolls across the line and is picked up in foul ground before reaching first base.',
    options: [
      'Foul — it was in foul ground when touched by the fielder who picked it up',
      'Fair — it was touched by a fielder while over fair territory',
      'Foul — it never reached the base',
      'Dead ball off the pitcher',
    ],
    correctIndex: 1,
    explanation:
      'A batted ball touched by a fielder while over fair territory is a fair ball from that moment. Everything after the deflection — including rolling foul — is irrelevant.',
  },
  {
    id: 'obr-045',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'district',
    scenario:
      'A chopped ball bounces straight down onto home plate and then high into fair territory, where the catcher barehands it and throws the batter out.',
    options: [
      'Foul — the plate is foul territory',
      'Dead ball — hitting the plate is a do-over',
      'The out stands — home plate is fair territory',
      'The batter cannot be out on a ball that hits the plate',
    ],
    correctIndex: 2,
    explanation:
      'Home plate is just another piece of fair ground. A batted ball that strikes it is treated like any other batted ball — here, a fair ball and a routine out.',
  },
  {
    id: 'obr-046',
    ruleset: 'obr',
    topic: 'Batted ball rulings',
    tier: 'provincial',
    scenario:
      'The batter lays down a bunt and drops his bat in fair territory as he runs. The slowly rolling ball bumps into the stationary bat; the umpire sees no intent.',
    options: [
      'Batter out — the ball touched his bat a second time',
      'Foul ball automatically',
      'Live ball — play on, the fair/foul call proceeds normally',
      'Dead ball, runners return',
    ],
    correctIndex: 2,
    explanation:
      'A fair ball rolling into a bat lying on the ground is nothing, provided the batter did not drop the bat onto the ball or intend to interfere. Judge intent; absent it, play on.',
  },

  // ── Appeals ──────────────────────────────────────────────────────────
  {
    id: 'obr-047',
    ruleset: 'obr',
    topic: 'Appeals',
    tier: 'district',
    scenario:
      'R1 sprints first-to-third on a base hit but never touches second. After time is back in, the pitcher steps off and throws to the shortstop, who tags second and tells the umpire the runner missed it.',
    options: [
      'Safe — the play is over once he reaches third',
      'Out on appeal at second',
      'The runner just returns to second',
      'Appeals require the plate umpire’s permission first',
    ],
    correctIndex: 1,
    explanation:
      'A missed base is an appeal play: with a live ball, before the next pitch or play, the defence tags the missed base (or the runner) and makes the claim unmistakably. The runner is out.',
  },
  {
    id: 'obr-048',
    ruleset: 'obr',
    topic: 'Appeals',
    tier: 'district',
    scenario:
      'The batter rips a ball into the corner and cruises into third, but the first-base umpire sees him miss first by a foot. The defence appeals properly at first base.',
    options: [
      'He returns to first and the triple becomes a single',
      'The batter-runner is out; the triple is wiped out',
      'He keeps third — you cannot appeal first base',
      'He is out only if he also missed second',
    ],
    correctIndex: 1,
    explanation:
      'A proper appeal at a missed base retires the runner outright — it does not send him back. The apparent triple becomes an out at first.',
  },
  {
    id: 'obr-049',
    ruleset: 'obr',
    topic: 'Appeals',
    tier: 'district',
    scenario:
      'R2, one out. Deep fly to centre, caught. R2 tags and makes third easily, but the defence believes he left early. The pitcher steps off and throws to the shortstop, who touches second base and states the claim clearly.',
    options: [
      'Nothing — you cannot appeal a tag-up',
      'If the umpire judges R2 left before the catch, he is out on appeal',
      'R2 simply returns to second',
      'The appeal had to be made before R2 reached third',
    ],
    correctIndex: 1,
    explanation:
      'Leaving too soon on a caught fly is appealable exactly like a missed base: live ball, unmistakable appeal at the base left early, before the next pitch or play.',
  },
  {
    id: 'obr-050',
    ruleset: 'obr',
    topic: 'Appeals',
    tier: 'provincial',
    scenario:
      'Two out, R3. The batter singles and R3 scores, but the batter-runner misses first and the defence appeals at first before the next pitch.',
    options: [
      'Run scores — it crossed before the appeal',
      'Run is nullified — the appeal out is the batter-runner failing to reach first',
      'Run scores because an appeal is not a play',
      'Defence must choose the out or the run',
    ],
    correctIndex: 1,
    explanation:
      'An appeal for missing first is treated as the batter-runner being out before touching first — one of the outs that kills every run on the play, regardless of timing.',
  },
  {
    id: 'obr-051',
    ruleset: 'obr',
    topic: 'Appeals',
    tier: 'provincial',
    scenario:
      'One out, R1 and R3. On a caught line drive, R1 is doubled off first for the third out — while R3, who left early, crosses the plate before that throw arrives. The defence then also appeals R3’s early departure at third.',
    options: [
      'Run counts — the inning was already over',
      'The "fourth-out" appeal is upheld and the run is taken off the board',
      'You cannot appeal after the third out',
      'Run counts because R3 crossed before the third out',
    ],
    correctIndex: 1,
    explanation:
      'The defence may appeal a fourth out, and if it is against a runner who scored, that out replaces the third out and cancels the run. It must be made before the infielders leave fair territory.',
  },
  {
    id: 'obr-052',
    ruleset: 'obr',
    topic: 'Appeals',
    tier: 'provincial',
    scenario:
      'Inning-ending catch; R2 had left second well before the ball was caught. The whole infield jogs across the foul line toward the dugout, then the third baseman runs back out and asks for an appeal at second.',
    options: [
      'Valid — no pitch has intervened',
      'Too late — the right to appeal ended when the infield left fair territory',
      'Valid if made before the other team bats',
      'The umpire may allow it at his discretion',
    ],
    correctIndex: 1,
    explanation:
      'Appeal rights on a half-inning’s last play expire when the pitcher and all infielders have left fair territory. Once they cross the line, the appeal window is closed.',
  },
  {
    id: 'obr-053',
    ruleset: 'obr',
    topic: 'Appeals',
    tier: 'district',
    scenario:
      'Two strikes. The batter checks his swing and the plate umpire calls the pitch a ball. The catcher immediately asks the plate umpire to check with the base umpire.',
    options: [
      'The plate umpire may refuse the request',
      'The plate umpire must ask the base umpire, whose ruling then stands',
      'Checked swings cannot be appealed with two strikes',
      'Only the manager may request the appeal',
    ],
    correctIndex: 1,
    explanation:
      'On a checked swing called a ball, the plate umpire is required to seek the base umpire’s judgment when the catcher (or manager) asks. The base umpire’s answer is final.',
  },
  {
    id: 'obr-054',
    ruleset: 'obr',
    topic: 'Appeals',
    tier: 'district',
    scenario:
      'Close play at the plate — the runner’s hook slide misses home entirely and the tag misses him. The runner pops up and walks toward his dugout; the catcher follows and tags him a few steps away.',
    options: [
      'Safe — the play at the plate was over',
      'Out — he never touched home and was tagged before returning',
      'The run counts unless the defence appeals to the umpire verbally',
      'Dead ball — he must be sent back to touch the plate',
    ],
    correctIndex: 1,
    explanation:
      'A runner who misses home may correct the miss until he is tagged or the plate itself is tagged after he heads for the bench. The umpire makes no signal until one side resolves it — here, the tag retires him.',
  },

  // ── Substitutions & lineups ──────────────────────────────────────────
  {
    id: 'obr-055',
    ruleset: 'obr',
    topic: 'Substitutions & lineups',
    tier: 'district',
    scenario:
      'A pinch hitter bats in the sixth and is then replaced in the seventh. In the ninth, the manager tries to send the same player back in to play second base.',
    options: [
      'Legal — position players may re-enter once',
      'Illegal — a substitute who has been removed may not return in the same game',
      'Legal only in extra innings',
      'Legal if the opposing manager consents',
    ],
    correctIndex: 1,
    explanation:
      'Under OBR-based rules, any player removed from the game is done for that game. (Some youth categories add re-entry privileges by local rule — know your tournament — but the baseline rule is no return.)',
  },
  {
    id: 'obr-056',
    ruleset: 'obr',
    topic: 'Substitutions & lineups',
    tier: 'district',
    scenario:
      'A new left fielder trots out without anyone informing the plate umpire. He catches a fly ball two pitches later, and the offence protests the catch was made by an illegal player.',
    options: [
      'The catch is nullified',
      'The substitute became legal the moment play resumed with him in the game — the catch stands',
      'The substitute is ejected',
      'The offence chooses whether the play stands',
    ],
    correctIndex: 1,
    explanation:
      'Failing to announce a substitution has no penalty. An unannounced substitute becomes legal as soon as the ball is put in play with him participating. The catch stands.',
  },
  {
    id: 'obr-057',
    ruleset: 'obr',
    topic: 'Substitutions & lineups',
    tier: 'provincial',
    scenario:
      'The number-five hitter bats in the number-four spot by mistake and doubles. Before a pitch is thrown to the next batter, the defensive manager points out the mistake to the plate umpire.',
    options: [
      'The double stands and the order just continues',
      'The proper batter (the four hitter) is declared out and the double is wiped out',
      'The improper batter (the five hitter) is declared out',
      'Both batters are out',
    ],
    correctIndex: 1,
    explanation:
      'On a timely batting-out-of-turn appeal, it is the batter who failed to bat — the proper batter — who is called out, and the improper batter’s action is nullified. The order resumes after the proper batter’s spot.',
  },
  {
    id: 'obr-058',
    ruleset: 'obr',
    topic: 'Substitutions & lineups',
    tier: 'provincial',
    scenario:
      'Same mix-up: the five hitter bats out of turn and doubles — but this time the defence says nothing until after a pitch is thrown to the following batter.',
    options: [
      'The proper batter is out once the defence finally appeals',
      'Too late — the improper batter is legalized, his double stands, and the order continues from his spot',
      'The double is cancelled but no one is out',
      'The game reverts to the correct spot with no other consequence',
    ],
    correctIndex: 1,
    explanation:
      'One pitch to the next batter legalizes everything the improper batter did. The lineup then simply continues from the batter after the legalized one — which is why the offence sometimes skips a hitter unnoticed.',
  },
  {
    id: 'obr-059',
    ruleset: 'obr',
    topic: 'Substitutions & lineups',
    tier: 'district',
    scenario:
      'Mid at-bat with a 2-1 count, the offensive manager sends up a pinch hitter for the injured batter.',
    options: [
      'Not allowed — substitutions only between at-bats',
      'The pinch hitter takes over with the 2-1 count',
      'The count resets to 0-0',
      'The at-bat is ruled an out due to injury',
    ],
    correctIndex: 1,
    explanation:
      'A batter may be replaced at any time the ball is dead, and the substitute inherits the existing count. Only with two strikes and a strikeout completed by the sub does the original batter get charged.',
  },
  {
    id: 'obr-060',
    ruleset: 'obr',
    topic: 'Substitutions & lineups',
    tier: 'district',
    scenario:
      'A reliever is brought in, completes his warm-up pitches, and the manager immediately signals for another pitcher before the batter steps in.',
    options: [
      'Fine — pitching changes are unlimited',
      'Not allowed — the reliever must pitch to at least one batter until that batter is put out or reaches base',
      'Allowed if the reliever claims injury only after examination by the umpire',
      'Allowed, but the team forfeits a mound visit',
    ],
    correctIndex: 1,
    explanation:
      'A relief pitcher must face at least one batter to completion (injury or illness excepted, in the umpire’s judgment). The manager cannot swap him out before that.',
  },
];
