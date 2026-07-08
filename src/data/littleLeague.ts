import { Question } from '../types';

// Little League bank. All scenarios are original inventions; every ruling was
// verified against Section 3 (Rules Interpretations) of the 2026 Little League
// Umpire's Manual (see reference/, gitignored). Tier doubles as division
// context: 'majors' = Majors & below, 'intermediate' = Intermediate (50/70),
// Junior, and Senior. Scenario text states the division when the ruling
// depends on it.

export const LL_QUESTIONS: Question[] = [
  // ── Leaving early ────────────────────────────────────────────────────
  {
    id: 'll-001',
    ruleset: 'll',
    topic: 'Leaving early',
    tier: 'majors',
    scenario:
      'Majors game, R1. As the pitcher’s arm comes forward, R1 breaks for second. The batter takes the pitch for a ball, and R1 slides into second ahead of the catcher’s throw.',
    options: [
      'Stolen base — he beat the throw',
      'R1 is out for leaving early',
      'No out, but R1 is returned to first',
      'Delayed dead ball — offence’s choice',
    ],
    correctIndex: 2,
    explanation:
      'In Majors and below, runners may not leave the base until the pitched ball reaches the batter. Leaving early is not an out — the violation is remedied after the play, and a runner who advanced on it is sent back.',
  },
  {
    id: 'll-002',
    ruleset: 'll',
    topic: 'Leaving early',
    tier: 'intermediate',
    scenario:
      'Intermediate (50/70) game, R1. As the pitcher comes set, R1 walks two steps off first base into a lead.',
    options: [
      'Violation — runners may never lead off in Little League',
      'Legal — leadoffs are allowed in Intermediate and above',
      'Legal only after the first pitch of the at-bat',
      'R1 must return once the pitcher looks at him',
    ],
    correctIndex: 1,
    explanation:
      'The no-leadoff restriction belongs to Majors and below. From Intermediate (50/70) up, runners may lead off and steal exactly as in conventional baseball — which is also why balks exist only at those levels.',
  },
  {
    id: 'll-003',
    ruleset: 'll',
    topic: 'Leaving early',
    tier: 'majors',
    scenario:
      'Majors game. After a wild play ends, the catcher is still retrieving his mask near the backstop when R2 suddenly trots toward third. The pitcher has the ball near the mound but is not on the pitcher’s plate.',
    options: [
      'R2 must return — the play was over',
      'Legal — the pitcher and catcher are not yet in position',
      'Dead ball — runners may never advance between pitches',
      'R2 is out for leaving early',
    ],
    correctIndex: 1,
    explanation:
      'The leaving-early restriction only bites once the pitcher begins delivery with the catcher ready to receive. Before the pitcher and catcher are in position, the ball is live and runners advance at their own risk.',
  },
  {
    id: 'll-004',
    ruleset: 'll',
    topic: 'Leaving early',
    tier: 'majors',
    scenario:
      'Majors game. The batter-runner rounds first hard on a clean single and hesitates fifteen feet toward second. The pitcher gets the ball back and quickly steps onto the pitcher’s plate, claiming the runner must now return.',
    options: [
      'Correct — engaging the plate freezes all runners',
      'The runner may still advance or return at his own risk',
      'The runner is out if he does not return immediately',
      'No pitch is declared',
    ],
    correctIndex: 1,
    explanation:
      'A runner who is legitimately off his base (here, on his own hit) is not stopped by the pitcher stepping onto the plate. The pitcher must actually make a play; stepping on the rubber is not a magic freeze.',
  },
  {
    id: 'll-005',
    ruleset: 'll',
    topic: 'Leaving early',
    tier: 'majors',
    scenario:
      'Majors game. The umpires notice that on every pitch, all runners break the instant the pitcher’s arm starts forward, and the third-base coach can be heard telling them to go on first movement.',
    options: [
      'Nothing can be done beyond returning the runners',
      'The manager may be warned and then ejected',
      'Each runner is automatically out after the second violation',
      'The game is forfeited',
    ],
    correctIndex: 1,
    explanation:
      'When leaving early is judged to be deliberate team instruction rather than a kid’s mistake, the remedy escalates to the bench: the manager can be warned or ejected for intentionally violating the rule.',
  },
  {
    id: 'll-006',
    ruleset: 'll',
    topic: 'Leaving early',
    tier: 'majors',
    scenario:
      'Majors game. The pitcher toes the plate ready to go. The catcher is in position facing him, mask on, but standing upright rather than crouched. The pitcher begins his delivery.',
    options: [
      'No pitch — the catcher must be in a squat',
      'Legal — mask on and facing the pitcher is “ready”',
      'Quick pitch — ball on the batter',
      'Time out is automatic until the catcher crouches',
    ],
    correctIndex: 1,
    explanation:
      '“Ready to receive” means mask on and facing the pitcher — nothing more. Runners are free to advance until both pitcher and catcher meet those elements, but once they do, the delivery may begin.',
  },
  {
    id: 'll-007',
    ruleset: 'll',
    topic: 'Leaving early',
    tier: 'intermediate',
    scenario:
      'Senior League game, R2. On the pitcher’s first movement to the plate, R2 takes off and steals third without a throw.',
    options: [
      'R2 is returned to second — he left before the ball reached the batter',
      'Clean steal — the play stands',
      'No pitch — runners may not steal on the first movement',
      'R2 is out',
    ],
    correctIndex: 1,
    explanation:
      'In Junior and Senior (and Intermediate) baseball, runners may leave with the pitch like in any conventional game. Sending the runner back is a Majors-and-below remedy only.',
  },

  // ── Baserunning & sliding ────────────────────────────────────────────
  {
    id: 'll-008',
    ruleset: 'll',
    topic: 'Baserunning & sliding',
    tier: 'majors',
    scenario:
      'Majors game. R2 tries to score on a single and dives headfirst across home plate just under the tag.',
    options: [
      'Safe — great slide',
      'Out — no headfirst slides while advancing',
      'Safe, but the team is warned',
      'The run counts only if the tag was late',
    ],
    correctIndex: 1,
    explanation:
      'In the Little League divisions and below, sliding headfirst while advancing is an automatic out — even if the runner beats the tag. It is a safety rule, not a judgment call.',
  },
  {
    id: 'll-009',
    ruleset: 'll',
    topic: 'Baserunning & sliding',
    tier: 'majors',
    scenario:
      'Majors game. On a pickoff throw to first, R1 dives back headfirst and gets his hand on the bag before the tag.',
    options: [
      'Out — headfirst slides are illegal in Majors',
      'Safe — the restriction only applies while advancing',
      'Out, and the manager is warned',
      'Safe only if the throw pulled the fielder off the bag',
    ],
    correctIndex: 1,
    explanation:
      'The headfirst-slide rule applies to runners advancing to a base. Diving back to a base already reached is legal at every level.',
  },
  {
    id: 'll-010',
    ruleset: 'll',
    topic: 'Baserunning & sliding',
    tier: 'majors',
    scenario:
      'Majors game. The catcher, ball in hand, stands on the plate waiting. R3 comes home standing up at full speed and crashes into him without any attempt to slide or veer off.',
    options: [
      'Safe if he touched the plate first',
      'Out — he must attempt to slide or avoid the fielder',
      'Obstruction on the catcher for blocking the plate',
      'Both players are ejected automatically',
    ],
    correctIndex: 1,
    explanation:
      'Little League has no “must slide” rule, but when the fielder has the ball and is waiting, the runner must make some attempt to slide or get around. Barreling straight in is an out, and flagrant contact can add an ejection.',
  },
  {
    id: 'll-011',
    ruleset: 'll',
    topic: 'Baserunning & sliding',
    tier: 'majors',
    scenario:
      'Majors game. Caught in no-man’s-land, R1 sprints in a wide arc through the outfield grass to get around the second baseman, who is chasing him with the ball. No batted ball is nearby.',
    options: [
      'Legal — a runner can run anywhere',
      'Out if he leaves his basepath by more than three feet',
      'Out only if he is touched',
      'The basepath is always a straight line between the bases',
    ],
    correctIndex: 1,
    explanation:
      'A runner’s basepath is set at the moment of the tag attempt: a straight line from the runner to the base. Deviating more than three feet from it to avoid a tag is an out. There is no violation until the defence actually attempts a tag.',
  },
  {
    id: 'll-012',
    ruleset: 'll',
    topic: 'Baserunning & sliding',
    tier: 'majors',
    scenario:
      'Majors game. Ball four. The batter-runner jogs to first, rounds it a step past the bag out of habit, and is immediately tagged by the alert first baseman before returning.',
    options: [
      'Out — the overrun protection does not apply on a walk',
      'Safe — the overrun protection applies on a walk too',
      'Out unless he turned toward foul territory',
      'Dead ball — he must stay on the bag on a walk',
    ],
    correctIndex: 1,
    explanation:
      'The overrun protection at first base applies even when the batter was awarded first on a walk, so long as he returns immediately. Turning left or right does not matter unless he actually attempts to advance.',
  },
  {
    id: 'll-013',
    ruleset: 'll',
    topic: 'Baserunning & sliding',
    tier: 'majors',
    scenario:
      'Majors game. R1 slides hard into second on a steal, beats the tag — and his slide knocks the entire bag loose from its anchor, leaving him lying beside the dislodged base.',
    options: [
      'Out when tagged while not touching the base',
      'Safe — no play can be made on him at the dislodged bag',
      'He must chase the bag and hold on to it',
      'Dead ball — he is awarded third for the faulty equipment',
    ],
    correctIndex: 1,
    explanation:
      'When a runner’s impact dislodges the base after he has reached it safely, he cannot be played on at that base. He is not expected to follow the bag around or hover over its original spot.',
  },
  {
    id: 'll-014',
    ruleset: 'll',
    topic: 'Baserunning & sliding',
    tier: 'majors',
    scenario:
      'Majors game, R1 and R3, one out. R1 is tagged on a close play at second, believes he is out even though the umpire signalled safe, and jogs off across the infield toward his dugout. He is well onto the foul territory grass when the defence notices.',
    options: [
      'He can return to second any time before being tagged',
      'Out for abandonment — the ball stays live for R3',
      'Dead ball — he returns to second with a warning',
      'He is out, and the ball is dead immediately',
    ],
    correctIndex: 1,
    explanation:
      'A runner who clearly gives up and heads for the dugout is out for abandonment once he has progressed well off the baseline. The ball remains live, so other runners may still advance at their own risk.',
  },
  {
    id: 'll-015',
    ruleset: 'll',
    topic: 'Baserunning & sliding',
    tier: 'majors',
    scenario:
      'Majors game. R1 is struck by the shortstop’s wild throw while running the bases; later in the same game, R2 collides with the third baseman who is bent over fielding a slow roller.',
    options: [
      'Both are automatic outs the moment contact occurs',
      'Neither can be penalized — contact alone is never a violation by itself',
      'Nothing on the thrown ball; possible interference on the batted ball',
      'Both are obstruction calls against the fielders',
    ],
    correctIndex: 2,
    explanation:
      'Right of way flips with the type of ball: on a thrown ball the runner has it, so being hit or bumped is ordinarily nothing; on a batted ball the fielder fielding it has it, so the runner who hinders him commits interference.',
  },

  // ── Appeals ──────────────────────────────────────────────────────────
  {
    id: 'll-016',
    ruleset: 'll',
    topic: 'Appeals',
    tier: 'intermediate',
    scenario:
      'Junior League game. The defence believes R2 missed third scoring on a double. The pitcher steps off and fires the appeal throw — over the third baseman’s head and into the dugout.',
    options: [
      'Runners advance on the overthrow, and the defence may re-appeal once the ball is live',
      'Runners advance on the overthrow, and the defence has lost the right to make any appeal',
      'The appeal simply fails; runners hold',
      'Dead ball — do-over',
    ],
    correctIndex: 1,
    explanation:
      'An errant act during an appeal that kills the ball — like a throw out of play — counts as an attempted play and wipes out the right to any further appeal. Award the bases and move on.',
  },
  {
    id: 'll-017',
    ruleset: 'll',
    topic: 'Appeals',
    tier: 'intermediate',
    scenario:
      'Senior League game. Wanting to appeal a missed base, the pitcher stands on the pitcher’s plate with the ball, then backs off it with his free foot first before throwing to second.',
    options: [
      'Legal — how he steps off is irrelevant',
      'Improper — he must step off with the pivot foot first',
      'Legal only if the umpire first calls time',
      'An appeal may never start from the pitcher’s plate',
    ],
    correctIndex: 1,
    explanation:
      'An appeal may be made directly from the pitcher’s plate, but a pitcher who chooses to disengage must step off with the pivot foot first. (Stepping back incorrectly with runners on risks a balk at levels that have them.)',
  },
  {
    id: 'll-018',
    ruleset: 'll',
    topic: 'Appeals',
    tier: 'majors',
    scenario:
      'Majors game. Before appealing a missed second base, the shortstop fakes a throw to third to freeze R3, never releasing the ball, then the defence completes the appeal at second.',
    options: [
      'The appeal is lost — the fake was a play',
      'The appeal stands — a feint is not a play',
      'Both the fake and the appeal are illegal',
      'R3 is awarded home for the deke',
    ],
    correctIndex: 1,
    explanation:
      'In baseball, only a genuine effort with a released throw (or an actual tag attempt) counts as a play. A feint costs the defence nothing, so the appeal right survives.',
  },
  {
    id: 'll-019',
    ruleset: 'll',
    topic: 'Appeals',
    tier: 'majors',
    scenario:
      'Majors game, R2. Deep fly caught in centre. R2, standing a stride behind second base, times the catch and takes off for third from that rolling start without ever re-touching the bag. The defence throws to second and the fielder stands on the base with the ball.',
    options: [
      'Safe — he was close enough to the bag',
      'Out on appeal — a runner may not take a flying start',
      'The defence must verbally announce the appeal first',
      'R2 just returns to second',
    ],
    correctIndex: 1,
    explanation:
      'Tagging up means re-establishing contact with the base after the catch. A flying start from behind the bag fails that, and the fielder holding the ball on the base while the runner is off is itself an unmistakable appeal.',
  },
  {
    id: 'll-020',
    ruleset: 'll',
    topic: 'Appeals',
    tier: 'intermediate',
    scenario:
      'Intermediate game. The batter-runner beats the play at first but his foot misses the bag entirely as he crosses it. A second later the first baseman, holding the ball, is still standing on the base.',
    options: [
      'Automatic out — he never touched first',
      'Treated as having touched it — only a proper appeal retires him',
      'He must go back and touch before the fielder does anything',
      'Dead ball — umpire sorts it out',
    ],
    correctIndex: 1,
    explanation:
      'A runner who passes a base is treated as having acquired it until the defence appeals. The play at first after the miss is an appeal play, not a force play — the defence must make the claim unmistakably.',
  },
  {
    id: 'll-021',
    ruleset: 'll',
    topic: 'Appeals',
    tier: 'majors',
    scenario:
      'Majors game, two out. R2 and R3 both race home on a hit; R3 misses the plate and R2, right behind him, touches it. R3 starts back toward the plate as the catcher takes the throw. The defence appeals R3’s miss.',
    options: [
      'R3 may still scramble back and touch the plate',
      'R3 is out on appeal, and neither run scores',
      'Only R3’s run is removed; R2’s counts',
      'Both runs count — the plate was touched by someone',
    ],
    correctIndex: 1,
    explanation:
      'A runner may not return to touch a missed plate after a following runner has legally touched it. The appeal out is the third out made on a runner who failed to reach home, so no run on the play scores.',
  },
  {
    id: 'll-022',
    ruleset: 'll',
    topic: 'Appeals',
    tier: 'intermediate',
    scenario:
      'Junior League game. R1 rounds second on a fly ball he thought would drop, and on his way back to first to tag up he cuts across the infield, missing second. The ball is dropped after all, so he re-touches first and runs again, this time stepping on second on his way to third.',
    options: [
      'Out on appeal — he missed second on the way back to first',
      'No appeal succeeds — his last time by second was legal',
      'He must touch second twice to correct the miss',
      'Dead ball — return him to first',
    ],
    correctIndex: 1,
    explanation:
      '“Last time by” is what counts: a runner’s most recent pass of a base is the one that must be legal. Touching second on the final advance supersedes the miss on the way back.',
  },
  {
    id: 'll-023',
    ruleset: 'll',
    topic: 'Appeals',
    tier: 'majors',
    scenario:
      'Majors game. The third out of the inning is recorded, and the defence then realizes R3 left third before a caught fly on that same play and scored. All the infielders are still in fair territory. The manager wants the run cancelled.',
    options: [
      'Too late — the inning is over',
      'The ball is made live and the defence may still appeal',
      'Appeals are impossible once a third out exists',
      'The umpire cancels the run without any appeal needed',
    ],
    correctIndex: 1,
    explanation:
      'Appeal rights survive the third out until the defence leaves fair territory. With everyone gone but the pitcher needed, the ball is made live from the pitcher’s plate and the appeal proceeds; a fourth out against a scoring runner cancels the run.',
  },

  // ── Mandatory play & re-entry ────────────────────────────────────────
  {
    id: 'll-024',
    ruleset: 'll',
    topic: 'Mandatory play & re-entry',
    tier: 'majors',
    scenario:
      'Majors regular-season game, traditional batting order. A substitute enters at second base, plays three defensive outs, sits for an inning, then plays three more outs.',
    options: [
      'He has met mandatory play — six outs total',
      'He has not — the six outs must be consecutive',
      'Substitutes have no mandatory play requirement',
      'He met it as long as he also batted',
    ],
    correctIndex: 1,
    explanation:
      'Under the traditional batting order, a substitute must get six consecutive defensive outs before being removed. Starters are different: their six outs need not be consecutive because they carry re-entry rights.',
  },
  {
    id: 'll-025',
    ruleset: 'll',
    topic: 'Mandatory play & re-entry',
    tier: 'majors',
    scenario:
      'Majors game, traditional order. A starter is pulled in the third inning for a substitute. In the fifth, the manager wants the starter back in the game.',
    options: [
      'Never — removed players are done for the game',
      'Allowed once the substitute has met mandatory play',
      'Allowed anywhere in the order',
      'Allowed only if the substitute is injured',
    ],
    correctIndex: 1,
    explanation:
      'Starters have re-entry rights in Little League — a sharp difference from OBR — but the substitute must first satisfy mandatory play, and the starter must return to his own spot in the order. Violating either is protestable.',
  },
  {
    id: 'll-026',
    ruleset: 'll',
    topic: 'Mandatory play & re-entry',
    tier: 'majors',
    scenario:
      'Majors game, traditional order. A substitute is ejected for throwing his bat before reaching his six defensive outs. The manager sends the starter he replaced back onto the field.',
    options: [
      'Fine — the ejection frees the spot',
      'Not allowed — the starter’s re-entry right is gone',
      'Allowed with the umpire-in-chief’s permission',
      'The team plays a man short',
    ],
    correctIndex: 1,
    explanation:
      'Re-entry hangs on the substitute completing mandatory play. When ejection or injury prevents that, the starter’s re-entry right dies with it — another player must fill the spot.',
  },
  {
    id: 'll-027',
    ruleset: 'll',
    topic: 'Mandatory play & re-entry',
    tier: 'majors',
    scenario:
      'Majors game using the continuous batting order. The coach freely rotates all twelve players through defensive positions inning by inning, with no player getting six consecutive outs.',
    options: [
      'Violation — six consecutive defensive outs are always required',
      'Legal — but every player must still total six defensive outs',
      'Legal, and there is no defensive requirement at all',
      'Only starters must reach six outs',
    ],
    correctIndex: 1,
    explanation:
      'The continuous batting order brings free substitution, so nobody needs consecutive outs — but the six-defensive-out total still applies to every player. Everyone bats in the continuous order, which covers the offensive part.',
  },
  {
    id: 'll-028',
    ruleset: 'll',
    topic: 'Mandatory play & re-entry',
    tier: 'majors',
    scenario:
      'Majors game, continuous batting order, two out. The catcher of record is on second base. The coach sends in another player from the bench to run for him so he can put his gear on.',
    options: [
      'Illegal — courtesy runners do not exist in Little League',
      'Legal for the catcher of record with two outs',
      'Legal for anyone at any time with a continuous order',
      'Legal only in the last inning',
    ],
    correctIndex: 1,
    explanation:
      'With two outs, the pitcher or catcher of record may be replaced on base by a courtesy runner. It keeps the game moving and is specifically contemplated by the mandatory-play interpretations.',
  },
  {
    id: 'll-029',
    ruleset: 'll',
    topic: 'Mandatory play & re-entry',
    tier: 'majors',
    scenario:
      'Majors game, traditional order. In the fourth inning a starter re-enters — but into a different spot in the batting order. The opposing manager notices right away, before the next pitch.',
    options: [
      'Nothing can be done until the game is protested afterwards',
      'A protestable violation — correct it before the next pitch',
      'The re-entering player is ejected',
      'The game is immediately forfeited',
    ],
    correctIndex: 1,
    explanation:
      'A starter re-entering into the wrong batting spot is an improper substitution — a protestable rule violation to be resolved before the next pitch or play. Caught later, it goes to the local Board of Directors instead.',
  },

  // ── Pitching & balks ─────────────────────────────────────────────────
  {
    id: 'll-030',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'majors',
    scenario:
      'Majors game, R1 and R2. The pitcher rushes his delivery before the batter’s hands and eyes are up.',
    options: [
      'Balk — runners advance one base',
      'Ball on the batter — Majors has no balks',
      'Strike if the pitch crosses the strike zone',
      'Warning to the pitcher only',
    ],
    correctIndex: 1,
    explanation:
      'There are no balks in Majors and below. A quick pitch — delivered before the batter is reasonably set — is penalized as a ball to the batter at that level, runners on or not.',
  },
  {
    id: 'll-031',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'intermediate',
    scenario:
      'Junior League game, R1. The pitcher quick-pitches before the batter is reasonably set in the box.',
    options: [
      'Ball on the batter, runners hold',
      'Balk — quick pitch with a runner on base',
      'No penalty — the batter must be ready',
      'The pitch counts as delivered',
    ],
    correctIndex: 1,
    explanation:
      'At Intermediate (50/70), Junior, and Senior, the quick pitch is treated like conventional baseball: a balk with runners on, a ball with the bases empty. In Majors it would only ever be a ball.',
  },
  {
    id: 'll-032',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'intermediate',
    scenario:
      'Senior League game, R1 and R3. From the rubber, the pitcher steps toward third and fakes a throw — disengaging as he does — then steps toward first and throws over, nearly picking R1 off.',
    options: [
      'Balk — the fake-to-third, throw-to-first move is illegal',
      'Legal — Little League still allows the fake-to-third move',
      'Balk — a pitcher may only feint to second',
      'Legal only if he threw to third first',
    ],
    correctIndex: 1,
    explanation:
      'Little League still permits feinting to second or third (occupied, with a step) — the famous third-to-first move remains legal here, unlike modern professional rules, provided the feint takes the pitcher off the plate before the throw to first.',
  },
  {
    id: 'll-033',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'intermediate',
    scenario:
      'Intermediate game, R1. In the set position, the pitcher’s free foot swings back past the back edge of the pitcher’s plate — and he then throws to first for a pickoff.',
    options: [
      'Legal — free-foot position is meaningless in the set',
      'Balk — past the back edge, he is committed to pitching',
      'Legal because the runner was stealing',
      'Illegal pitch — ball on the batter',
    ],
    correctIndex: 1,
    explanation:
      'Once any part of the free foot passes the back edge of the pitcher’s plate, the pitcher is committed to delivering — the lone exception is a throw to second on a legitimate pickoff. Coming back to first from there is a balk.',
  },
  {
    id: 'll-034',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'intermediate',
    scenario:
      'Junior League game, R2. While engaged and taking the sign, the pitcher fumbles the ball; it drops and dribbles four feet, staying inside the foul lines.',
    options: [
      'No penalty — he simply picks it up and resumes',
      'Balk — the drop stayed inside the foul lines',
      'Ball on the batter in every case',
      'Dead ball, do-over',
    ],
    correctIndex: 1,
    explanation:
      'A ball dropped while engaged is an illegal pitch if it stays inside the foul lines — a balk with runners on at levels that have balks. If it crosses a foul line, it is instead a ball to the batter and stays live.',
  },
  {
    id: 'll-035',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'majors',
    scenario:
      'Majors game, bases empty. The pitcher wanders two steps off the mound with the ball, then fires a surprise pitch to the catcher without touching the pitcher’s plate.',
    options: [
      'Legal — with no runners on, nothing to penalize',
      'Ball on the batter — an illegal pitch',
      'Strike if the pitch is in the zone',
      'No pitch — warn the pitcher and reset',
    ],
    correctIndex: 1,
    explanation:
      'Two illegal pitches are penalized even with nobody on: the quick pitch and a pitch thrown while not in contact with the pitcher’s plate. Both are ruled a ball to the batter, at all levels.',
  },
  {
    id: 'll-036',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'majors',
    scenario:
      'Majors game, R1. The pitcher steps off the pitcher’s plate but keeps both hands together on the ball, then immediately steps back on and starts his motion.',
    options: [
      'Legal — he disengaged from the plate properly',
      'Improper — the hands must come apart first',
      'Automatic balk in all divisions',
      'Legal as long as the runner was on the base',
    ],
    correctIndex: 1,
    explanation:
      'Disengaging does not require separating the hands immediately, but before stepping back onto the plate the hands must come apart and drop to the sides. That protects runners and batters from a de facto quick pitch.',
  },
  {
    id: 'll-037',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'majors',
    scenario:
      'Majors game. The coach visits the mound to settle his pitcher in the third inning, then comes out to talk to the same pitcher again later in the same inning.',
    options: [
      'Fine — visits are unlimited in Majors',
      'The pitcher must be removed from the mound',
      'The coach is ejected',
      'The second visit costs a ball to the batter',
    ],
    correctIndex: 1,
    explanation:
      'In Majors, a coach gets one free visit to a pitcher per inning and two per game; the next visit at either threshold forces the pitcher’s removal from the mound. (Minor League allows one extra at each level.)',
  },
  {
    id: 'll-038',
    ruleset: 'll',
    topic: 'Pitching & balks',
    tier: 'intermediate',
    scenario:
      'Intermediate game, R1. The pitcher sets up in a stance that blends windup and set features — pivot foot on the plate, free foot slightly ahead, hands together in front. The offensive coach demands a balk for an “illegal hybrid stance.”',
    options: [
      'Balk — a pitcher must clearly declare windup or set',
      'No violation — nothing prohibits a hybrid stance',
      'Illegal pitch — ball on the batter',
      'Time — the umpire must make him restart in a legal stance',
    ],
    correctIndex: 1,
    explanation:
      'The interpretations are explicit: no rule prevents a hybrid pitching stance. The pitcher must still obey every normal delivery requirement, but the stance itself is not a balk.',
  },

  // ── Catch & carry ────────────────────────────────────────────────────
  {
    id: 'll-039',
    ruleset: 'll',
    topic: 'Catch & carry',
    tier: 'majors',
    scenario:
      'Majors game, R1 and R2, one out. The first baseman makes a fine running catch on a foul pop and his momentum carries him down the dugout steps, ball held high.',
    options: [
      'Catch stands and the ball stays live — hustle play',
      'No catch — foul ball',
      'Catch stands — ball dead, runners advance one base',
      'Catch stands and runners are frozen',
    ],
    correctIndex: 2,
    explanation:
      'A fielder who legally catches a fly ball and then steps or falls into dead-ball territory records the out, but the ball is dead and every runner is awarded one base from the time of the pitch.',
  },
  {
    id: 'll-040',
    ruleset: 'll',
    topic: 'Catch & carry',
    tier: 'majors',
    scenario:
      'Majors game. Chasing a pop-up toward his own dugout, the catcher gloves the ball with one foot on the dugout lip and the other foot planted on the top step inside.',
    options: [
      'Legal catch — one foot was on the lip',
      'No catch — a foot down inside the dugout makes him “inside”',
      'Legal catch, ball dead, runners advance',
      'Foul ball, but only if it would have landed inside the dugout',
    ],
    correctIndex: 1,
    explanation:
      'The lip counts as playing surface, but a foot on a step or the floor inside the dugout does not. With a foot down inside, the fielder is “inside the dugout” and cannot legally catch the ball.',
  },
  {
    id: 'll-041',
    ruleset: 'll',
    topic: 'Catch & carry',
    tier: 'majors',
    scenario:
      'Same chase, different footwork: the catcher gloves the pop-up with one foot on the dugout lip and the other foot in the air above the steps.',
    options: [
      'No catch — part of his body was over the dugout steps',
      'Legal catch — no foot was down in dead-ball territory',
      'Legal only if he does not fall in afterward',
      'Umpire’s discretion',
    ],
    correctIndex: 1,
    explanation:
      'A catch is valid when the fielder has a foot on or over the playing surface (the lip included) and no foot on the ground in the dead-ball area. If he then falls into the dugout, the catch stands and the catch-and-carry award applies.',
  },
  {
    id: 'll-042',
    ruleset: 'll',
    topic: 'Catch & carry',
    tier: 'majors',
    scenario:
      'Majors game, R2. The third baseman fields a ground ball and his errant throw to first sails into the stands.',
    options: [
      'Catch-and-carry — award one base from the time of pitch',
      'Not catch-and-carry — it is an overthrow, two bases',
      'The runner returns to second',
      'Dead ball, no awards',
    ],
    correctIndex: 1,
    explanation:
      'Catch-and-carry covers only batted fly balls carried into dead-ball territory after a catch. A wild throw out of play is a different animal with its own award — two bases for a throw by an infielder on the first play.',
  },
  {
    id: 'll-043',
    ruleset: 'll',
    topic: 'Catch & carry',
    tier: 'majors',
    scenario:
      'Majors game. An outfielder sprints toward the open bullpen gate, launches himself, and gloves the fly ball in mid-air before landing entirely inside the bullpen (a dead-ball area by ground rules), never having touched live-ball ground during the catch.',
    options: [
      'No catch — neither foot was on or over live-ball ground',
      'Catch — the ball is dead and a one-base award applies',
      'Catch — the ball stays live, play on',
      'Home run — the ball ended up in dead-ball territory',
    ],
    correctIndex: 0,
    explanation:
      'The catch must begin from the playing surface: one or both feet on or over live-ball ground. Diving fully into a dead-ball area with neither foot on or above the playing surface makes a valid catch impossible.',
  },

  // ── Interference ─────────────────────────────────────────────────────
  {
    id: 'll-044',
    ruleset: 'll',
    topic: 'Interference',
    tier: 'majors',
    scenario:
      'Majors game. A bunt dies right in front of the plate. The catcher springs out to field it and tangles legs with the batter-runner leaving the box; both stumble. The umpire judges nobody meant anything by it.',
    options: [
      'Interference — the batter-runner must yield to the catcher',
      'Obstruction — the catcher must yield to the batter-runner',
      'Nothing — incidental contact here is part of the play',
      'Dead ball, replay the pitch',
    ],
    correctIndex: 2,
    explanation:
      'The classic tangle/untangle: incidental contact between the catcher fielding the ball and the batter-runner starting to first is nothing. Signal safe — “that’s nothing” — and let the play continue.',
  },
  {
    id: 'll-045',
    ruleset: 'll',
    topic: 'Interference',
    tier: 'majors',
    scenario:
      'Same bunt, but this time the catcher, ball still on the ground, deliberately shoves the batter-runner off his line to first with both hands.',
    options: [
      'Still nothing — contact at the plate is always incidental',
      'Interference on the batter-runner',
      'Obstruction on the catcher — the shove was flagrant',
      'Ejection but no base award',
    ],
    correctIndex: 2,
    explanation:
      'The tangle/untangle exemption ends where flagrant or deliberate contact begins. A catcher who intentionally impedes the batter-runner commits obstruction; a batter-runner who flagrantly impedes the catcher commits interference.',
  },
  {
    id: 'll-046',
    ruleset: 'll',
    topic: 'Interference',
    tier: 'intermediate',
    scenario:
      'Senior League game, strike three in the dirt, batter-runner takes off. Because the ball squirted toward the first-base dugout, the catcher’s throw comes from foul ground — and the batter-runner, running in fair territory outside the running lane, is hit in the shoulder by it.',
    options: [
      'Interference — he was outside the lane, automatic out',
      'Not interference — the throw came from the foul side',
      'Dead ball, batter out, runners return',
      'The throw hitting him makes him out regardless of position',
    ],
    correctIndex: 1,
    explanation:
      'The running-lane rule still exists on an uncaught third strike, but when the throw originates from foul ground, the fair side is the legal place to be — being struck there is not interference absent intent.',
  },
  {
    id: 'll-047',
    ruleset: 'll',
    topic: 'Interference',
    tier: 'majors',
    scenario:
      'Majors game. While their teammate bats, the next batter stands outside the dugout swinging a bat to stay loose.',
    options: [
      'Perfectly fine — that is what the on-deck circle is for',
      'Not allowed — there is no on-deck position in Majors',
      'Allowed with a helmet on',
      'Allowed only if the field has no fence',
    ],
    correctIndex: 1,
    explanation:
      'The on-deck circle exists only in Intermediate, Junior, and Senior divisions. In Majors and below, the next batter gets a helmet on and waits — no bat in hand until their turn at bat.',
  },
  {
    id: 'll-048',
    ruleset: 'll',
    topic: 'Interference',
    tier: 'intermediate',
    scenario:
      'Junior League game. A batting weight is left lying in the on-deck circle. A foul pop drifts that way and the catcher, tracking the ball, trips over it and the ball drops.',
    options: [
      'Tough luck — the catcher should watch where he is going',
      'Interference on the offence — the batter can be ruled out',
      'Automatic dead ball, no penalty',
      'The catcher is charged with an error',
    ],
    correctIndex: 1,
    explanation:
      'Equipment not in use must be cleared from the on-deck circle and the field. When it affects a play, the umpire may rule interference against the offending team — costing an out or bases depending on who was hurt by it.',
  },
  {
    id: 'll-049',
    ruleset: 'll',
    topic: 'Interference',
    tier: 'majors',
    scenario:
      'Majors game, R1. A ground ball rolls toward the second baseman, and R1, running from first, is bumped as the fielder charges the ball; the fielder bobbles it and everyone is safe. The umpire judges the contact hindered the fielder.',
    options: [
      'Obstruction — award R1 second',
      'Interference — R1 is out and the ball is dead',
      'Nothing — the contact was accidental, play on',
      'Both players penalized',
    ],
    correctIndex: 1,
    explanation:
      'On a batted ball the fielder attempting to field it has the right of way. A runner who hinders him — intent or not — commits interference: the runner is out, the ball is dead, and other runners return.',
  },
  {
    id: 'll-050',
    ruleset: 'll',
    topic: 'Interference',
    tier: 'majors',
    scenario:
      'Majors game, R3, one out. The batter squares to bunt, fouls it straight down, and the ball spins into fair territory where R3, sprinting home on the squeeze, is struck by it in fair ground before it passes any fielder.',
    options: [
      'Run scores if he beats the ball home',
      'R3 is out and the batter is awarded first',
      'Foul ball — replay',
      'R3 returns to third, no out',
    ],
    correctIndex: 1,
    explanation:
      'A runner struck in fair territory by a fair batted ball before it passes an infielder is out and the ball is dead — same fundamentals as any level of baseball. The batter gets first on the play.',
  },

  // ── Double first base ────────────────────────────────────────────────
  {
    id: 'll-051',
    ruleset: 'll',
    topic: 'Double first base',
    tier: 'majors',
    scenario:
      'Majors game on a field with a double first base. A chopper down the line lands squarely on the orange half of the bag without touching the white.',
    options: [
      'Fair — it hit the base',
      'Foul — only the white half is fair',
      'Umpire’s judgment on the bounce',
      'Dead ball',
    ],
    correctIndex: 1,
    explanation:
      'Only the white half of a double first base is fair territory. A batted ball striking just the orange half — without first touching or bounding over the white — is a foul ball.',
  },
  {
    id: 'll-052',
    ruleset: 'll',
    topic: 'Double first base',
    tier: 'majors',
    scenario:
      'Majors game, double first base, bang-bang play on a ground ball. Which halves of the base are the fielder and the batter-runner each supposed to use?',
    options: [
      'Either player may use either half',
      'Fielder on the orange half, runner on the white half',
      'Fielder on the white, batter-runner on the orange',
      'Both must touch both halves',
    ],
    correctIndex: 2,
    explanation:
      'When a play is being made on the batter-runner, the defence takes the white half and the batter-runner’s first touch must be the orange half — that separation is the entire point of the safety base.',
  },
  {
    id: 'll-053',
    ruleset: 'll',
    topic: 'Double first base',
    tier: 'majors',
    scenario:
      'Majors game, close play at the double first base. The batter-runner beats the throw but steps only on the white half. Before he returns to the bag, the defence clearly appeals that he used the wrong half.',
    options: [
      'Safe — he touched some part of the base',
      'Treated like a missed base — the batter-runner is out',
      'He just gets sent back to touch the orange half',
      'The defence must tag him physically to win the appeal',
    ],
    correctIndex: 1,
    explanation:
      'On a play at first, touching only the white half is treated the same as missing the base. If the defence makes an unmistakable appeal before he returns to the bag, he is out; if they let him return, the miss is cured.',
  },
  {
    id: 'll-054',
    ruleset: 'll',
    topic: 'Double first base',
    tier: 'majors',
    scenario:
      'Majors game, double first base. The batter-runner laces a double-turned-single into the gap — no play anywhere near first — and touches the orange half rounding the bag before retreating to stand on it.',
    options: [
      'Out on appeal — with no play, he must use the white half',
      'Legal — with no play coming, either half may be touched',
      'He must re-touch the white half to be safe',
      'Interference',
    ],
    correctIndex: 1,
    explanation:
      'The white/orange split only governs plays at the bag. On balls to the outfield with no chance of a play at first, the batter-runner may touch either portion.',
  },
  {
    id: 'll-055',
    ruleset: 'll',
    topic: 'Double first base',
    tier: 'majors',
    scenario:
      'Majors game, double first base, R1 standing on the bag. On a pickoff throw, R1 dives back and grabs the orange half as the tag comes down on him.',
    options: [
      'Safe — any part of the double base counts',
      'Out — on a pickoff, only the white half is the base',
      'Safe if the first baseman was on the white half',
      'No play allowed at a double base',
    ],
    correctIndex: 1,
    explanation:
      'Once the batter-runner has become a runner occupying first, the orange half stops being his: for tagging up, taking a position, and pickoff plays, only the white half is the base.',
  },
  {
    id: 'll-056',
    ruleset: 'll',
    topic: 'Double first base',
    tier: 'intermediate',
    scenario:
      'Senior League game, double first base, uncaught third strike. The batter-runner sprints as the catcher retrieves the ball and fires to first, where the first baseman stretches with a foot on the orange half a beat before the runner hits the white half.',
    options: [
      'Runner safe — the fielder must use the white half',
      'Runner out — either player may use either half here',
      'No play — batters cannot run on strike three',
      'Runner safe — he touched the correct half',
    ],
    correctIndex: 1,
    explanation:
      'The uncaught third strike is the exception at the double base: throws often come from foul ground, so both the fielder and the batter-runner may legally use either the orange or the white half.',
  },

  // ── Batting & the box ────────────────────────────────────────────────
  {
    id: 'll-057',
    ruleset: 'll',
    topic: 'Batting & the box',
    tier: 'majors',
    scenario:
      'Majors game, nobody on, two strikes. The batter swings through strike three and the ball skips off the dirt past the catcher to the backstop. The batter takes off for first.',
    options: [
      'He can take first if he beats the throw',
      'He is out — batters cannot run on strike three in Majors',
      'He is automatically safe at first because the ball got away',
      'The pitch is replayed',
    ],
    correctIndex: 1,
    explanation:
      'Running on an uncaught third strike exists only in Intermediate (50/70), Junior, and Senior baseball. In Majors and below, strike three retires the batter no matter where the ball ends up.',
  },
  {
    id: 'll-058',
    ruleset: 'll',
    topic: 'Batting & the box',
    tier: 'intermediate',
    scenario:
      'Intermediate (50/70) game, R1 on first, one out. Strike three bounces off the catcher’s glove and rolls away. The batter sprints for first.',
    options: [
      'He may run — the ball was not caught cleanly by the catcher',
      'He is out — first is occupied with fewer than two outs',
      'He is out only if the catcher tags him',
      'R1 must advance for the batter to run',
    ],
    correctIndex: 1,
    explanation:
      'Even at levels where the uncaught third strike is live, the batter cannot run when first base is occupied with fewer than two outs — the rule that prevents cheap force double plays. With two outs he could run.',
  },
  {
    id: 'll-059',
    ruleset: 'll',
    topic: 'Batting & the box',
    tier: 'majors',
    scenario:
      'Majors game. Annoyed by a called strike, the batter steps out of the box without asking for time just as the pitcher delivers the next pitch, which crosses the plate.',
    options: [
      'No pitch — the box was empty',
      'The pitch counts — benefit of the doubt to the pitcher',
      'Automatic strike on the batter regardless of location',
      'The batter is out',
    ],
    correctIndex: 1,
    explanation:
      'A batter who leaves the box without time being granted is at his own risk: the pitch counts, and the umpire gives the pitcher the benefit of the doubt. Batters cannot step in and out at will.',
  },
  {
    id: 'll-060',
    ruleset: 'll',
    topic: 'Batting & the box',
    tier: 'intermediate',
    scenario:
      'Junior League game, R1. The pitcher has begun his motion when the batter abruptly steps out of the box, and the startled pitcher interrupts his delivery.',
    options: [
      'Balk — he stopped his motion with a runner on',
      'No balk — call time and let both players restart',
      'Strike on the batter as a penalty',
      'The batter is ejected',
    ],
    correctIndex: 1,
    explanation:
      'When the batter causes the interruption by stepping out mid-delivery, no balk or illegal pitch is charged. The umpire calls time, everyone resets, and the sequence starts over cleanly.',
  },
];
