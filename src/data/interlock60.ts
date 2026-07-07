import { Question } from '../types';

// District Interlock rules on the 60-foot diamond (Minor and Major
// divisions): local-option rule changes agreed between the participating
// districts for interleague play. Rulings verified against the current
// Interlock Rules document (Ontario Districts 2/6/7/8, March 2024);
// scenarios are original wording.
//
// Interlock shorthand used below:
//   Canadians = "A" tier, Nationals = "B" tier. Games are governed by
//   Little League rules except where the Interlock has adopted or declined
//   a local option.

export const INTERLOCK60_QUESTIONS: Question[] = [
  // ── Time Limits & Regulation ─────────────────────────────────────────────
  {
    id: 'ilk60-001',
    ruleset: 'interlock60',
    topic: 'Time Limits & Regulation',
    tier: 'sixty',
    scenario:
      'An Interlock Major game is scheduled for 6:00 PM but doesn’t get its first pitch until 6:25 because the previous game ran long. At 8:10 PM the score is tied and the home coach wants to start a new inning, arguing the two-hour clock runs from the first pitch. What’s the ruling?',
    options: [
      'A new inning may start — the limit runs from the actual start',
      'No new inning — the two-hour limit runs from the scheduled start time',
      'One extra inning is allowed at the umpire’s discretion',
      'The game ended at exactly 8:00 PM, mid-inning if necessary',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock time limit is two hours from the SCHEDULED start time, not the actual first pitch. No new inning may begin after that point, but an inning already underway is completed — the game never stops mid-inning on the time limit alone.',
  },
  {
    id: 'ilk60-002',
    ruleset: 'interlock60',
    topic: 'Time Limits & Regulation',
    tier: 'sixty',
    scenario:
      'It’s 8:40 PM on a field with no lights and dusk is coming fast. The two-hour limit hasn’t expired, but the plate umpire doubts the next inning can be finished before dark. Must the crew start it anyway?',
    options: [
      'Yes — innings must be started until the time limit expires',
      'No — an inning shouldn’t start without a reasonable expectation of completing it',
      'Only if both coaches agree to stop',
      'Yes, but the inning is capped at ten minutes',
    ],
    correctIndex: 1,
    explanation:
      'No inning should begin unless there is a reasonable expectation of completing the full inning, and games may be ended early for darkness at the sole discretion of the umpire. Starting an inning you can’t finish just forces a messy reversion later.',
  },
  {
    id: 'ilk60-003',
    ruleset: 'interlock60',
    topic: 'Time Limits & Regulation',
    tier: 'sixty',
    scenario:
      'Steady rain ends an Interlock Minor game in the bottom of the 4th inning, 1 hour and 50 minutes after it started. The trailing coach argues the game must be replayed from scratch because four innings weren’t completed. Is he right?',
    options: [
      'Yes — fewer than four complete innings means no game',
      'No — a game played for at least 1 hour 45 minutes is regulation',
      'Yes, unless both coaches agree to accept the score',
      'No — every started game counts no matter how short',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock adopted the option that a game is regulation once it has been played for 1 hour and 45 minutes, even if the usual innings requirement isn’t met. The final score then comes from the completed-inning reversion rules.',
  },
  {
    id: 'ilk60-004',
    ruleset: 'interlock60',
    topic: 'Time Limits & Regulation',
    tier: 'sixty',
    scenario:
      'A regulation game is called for weather during the top of the 5th. The visitors had just scored twice in that inning to take a 7–6 lead; the home team led 6–5 after four complete innings. What’s the final score?',
    options: [
      'Visitors win 7–6 — the score when the game was called stands',
      'Home wins 6–5 — the score reverts to the last complete inning',
      'The game is a 6–6 tie by rule',
      'The 5th inning is replayed from the start at a later date',
    ],
    correctIndex: 1,
    explanation:
      'When an inning is incomplete at the moment the game is called, the score reverts to the last complete inning. The only exception is when the HOME team is at bat in the partial inning and has tied or gone ahead — that isn’t the case here, so the visitors’ runs come off the board.',
  },
  {
    id: 'ilk60-005',
    ruleset: 'interlock60',
    topic: 'Time Limits & Regulation',
    tier: 'sixty',
    scenario:
      'Trailing 7–6, the home team bats in the bottom of the 5th and scores two runs to lead 8–7. Before the third out, thunder forces the game to be called and it can’t resume. The visiting coach demands the score revert to the end of the 4th. Ruling?',
    options: [
      'Score reverts — the 5th inning was never completed',
      'The 8–7 score stands — the home team tied or went ahead while at bat in the partial inning',
      'The game is recorded as a tie',
      'The game must be resumed from the point of interruption another day',
    ],
    correctIndex: 1,
    explanation:
      'The reversion rule has exactly one exception: if the home team is at bat in the incomplete inning and has tied the game or taken the lead, the score at the moment the game is called stands. Home wins 8–7.',
  },
  {
    id: 'ilk60-006',
    ruleset: 'interlock60',
    topic: 'Time Limits & Regulation',
    tier: 'sixty',
    scenario:
      'A regular-season Interlock game reaches regulation and is then called by curfew with the score 4–4. Both coaches ask you when the tie will be played off. What do you tell them?',
    options: [
      'It resumes from that point before the next meeting of the teams',
      'Nothing to schedule — Interlock allows ties and the 4–4 result stands',
      'Extra innings must be played immediately the next day',
      'The home team wins by rule on fewer at-bats',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock allows tie scores in the regular season. Once a game is regulation and is called for curfew or weather, a tied score simply stands — there is no continuation.',
  },
  {
    id: 'ilk60-007',
    ruleset: 'interlock60',
    topic: 'Time Limits & Regulation',
    tier: 'sixty',
    scenario:
      'How many innings make a complete (full-length) Interlock Minor or Major game, and how many must be complete for the game to be regulation if the home team is not ahead?',
    options: [
      'Seven innings; five for regulation',
      'Six innings; four for regulation',
      'Six innings; three for regulation',
      'Five innings; three for regulation',
    ],
    correctIndex: 1,
    explanation:
      'Minor and Major Interlock games are six innings, and a maximum of six. A game is regulation once four innings are complete — three and a half if the home team is ahead. (Junior/Senior play seven and need five.)',
  },
  {
    id: 'ilk60-008',
    ruleset: 'interlock60',
    topic: 'Time Limits & Regulation',
    tier: 'sixty',
    scenario:
      'Your game is running long and another league holds the permit for the next game on the same lit diamond. How long before the next permit’s start time must your game stop and the field and dugouts be cleared?',
    options: [
      'Right at the next game’s start time',
      'At least 10 minutes before, since it’s a night game under lights',
      'At least 30 minutes before',
      'Whenever the arriving teams physically take the field',
    ],
    correctIndex: 1,
    explanation:
      'The field and dugouts must be cleared at least 5 minutes before a following game — 10 minutes when the following booking is a night game on a field with lights. Umpires are asked to stop play in time to respect the next permit.',
  },

  // ── Run Limits & Mercy ───────────────────────────────────────────────────
  {
    id: 'ilk60-009',
    ruleset: 'interlock60',
    topic: 'Run Limits & Mercy',
    tier: 'sixty',
    scenario:
      'Interlock Major Canadians game, four runs already in this half-inning, bases loaded. The batter rips a double and two runners cross the plate before the ball comes back in. How many of those runs count?',
    options: [
      'Both — runs on the same play all score',
      'Only the first — the half-inning ends the moment the 5th run crosses the plate',
      'Both, but the inning ends after the play',
      'Neither — the play is dead as soon as the 5th run becomes possible',
    ],
    correctIndex: 1,
    explanation:
      'A team may score a maximum of five runs in an inning, and the half-inning is declared over as soon as the fifth run touches the plate. The sixth run never scores, even though both crossed on the same hit.',
  },
  {
    id: 'ilk60-010',
    ruleset: 'interlock60',
    topic: 'Run Limits & Mercy',
    tier: 'sixty',
    scenario:
      'Top of the 6th — the final inning. The trailing team has already scored five runs this inning and has the bases loaded with the rally alive. Their coach insists the last inning is “open” with no run cap. What’s the ruling?',
    options: [
      'He’s right — the final inning has no run limit',
      'The half-inning is over — the 5-run cap applies to every inning, including the last',
      'The cap doubles to ten in the final inning',
      'The umpire may waive the cap in a close game',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock specifically declined the “open final inning” option. The 5-run cap applies in the last inning exactly as in any other — the half-inning ended when the fifth run scored.',
  },
  {
    id: 'ilk60-011',
    ruleset: 'interlock60',
    topic: 'Run Limits & Mercy',
    tier: 'sixty',
    scenario:
      'In which Interlock tier does the 5-run inning cap NOT apply?',
    options: [
      'Major Canadians',
      'The Major All-Star tier',
      'Minor Nationals',
      'It applies everywhere without exception',
    ],
    correctIndex: 1,
    explanation:
      'The Major All-Star tier is the only exemption from the 5-run inning limit. Every other division and tier — Minor and Major, Canadians and Nationals, and Junior/Senior on the big diamond — plays with the cap.',
  },
  {
    id: 'ilk60-012',
    ruleset: 'interlock60',
    topic: 'Run Limits & Mercy',
    tier: 'sixty',
    scenario:
      'After four complete innings of an Interlock Minor game the visitors lead 13–2. The home coach wants to keep the game going because his hitters need the reps. What does the mercy rule say?',
    options: [
      'The game continues — mercy only applies after five innings',
      'The game is over — a 10-run lead after four complete innings ends it',
      'The game continues until a 15-run lead',
      'Mercy only applies if the losing coach requests it',
    ],
    correctIndex: 1,
    explanation:
      'At Minor and Major, a 10-run lead after four complete innings (three and a half with the home team ahead) ends the game. The Interlock declined the 15-run and 8-run options — ten after four is the rule on the 60-foot diamond.',
  },
  {
    id: 'ilk60-013',
    ruleset: 'interlock60',
    topic: 'Run Limits & Mercy',
    tier: 'sixty',
    scenario:
      'The mercy rule ends a game 12–1 after four innings, but the coaches agree to play two more innings as friendly practice, and the losing team scores six unanswered runs. What score gets reported?',
    options: [
      '12–7 — everything that happened on the field counts',
      '12–1 — the official score is fixed the moment the mercy rule takes effect',
      'Whatever the two coaches agree to submit',
      'The game reverts to the last complete inning before the mercy',
    ],
    correctIndex: 1,
    explanation:
      'The official score is the score at the time the mercy rule takes effect. Anything played afterward is exhibition and never touches the record.',
  },
  {
    id: 'ilk60-014',
    ruleset: 'interlock60',
    topic: 'Run Limits & Mercy',
    tier: 'sixty',
    scenario:
      'Heading to the 6th and final inning, the home team leads by seven runs. The visiting coach says there’s no point playing it and starts packing up. What do you do?',
    options: [
      'Agree — a lead bigger than the 5-run cap ends the game',
      'Require the inning to be played — a lead over 5 but under 10 doesn’t end anything, and a coach may not shorten the game',
      'Let the home coach decide whether to play on',
      'Record a forfeit against the visitors immediately',
    ],
    correctIndex: 1,
    explanation:
      'A lead between the run cap (5) and the mercy threshold (10) has no effect on game length. The final inning must still be played properly — the visitors bat in the top, and a coach must take the field when directed by the umpire.',
  },

  // ── Batting & Baserunning ────────────────────────────────────────────────
  {
    id: 'ilk60-015',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'Interlock Major game, runner on first. The pitcher, on the rubber, starts his delivery, stops halfway, and then throws home. On the big diamond this is a balk. What is it here?',
    options: [
      'A balk — runners advance one base',
      'An illegal pitch — there are no balks at Minor/Major',
      'Nothing — deception is legal on the 60-foot diamond',
      'Immediate ejection of the pitcher',
    ],
    correctIndex: 1,
    explanation:
      'There are no balks on the 60-foot diamond. The same act is called an illegal pitch at Minor and Major — signal it and apply the illegal-pitch penalty rather than awarding bases on a balk.',
  },
  {
    id: 'ilk60-016',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'Runner on second in an Interlock Minor game. On a steal attempt, what is the earliest moment the runner is permitted to break for third?',
    options: [
      'When the pitcher starts the windup',
      'When the ball leaves the pitcher’s hand',
      'When the pitch reaches the batter',
      'Any time — leads and steals are unrestricted',
    ],
    correctIndex: 2,
    explanation:
      'Stealing is allowed at Minor/Major, but with the standard 60-foot restriction: the runner may not advance until the pitch reaches the batter. There are no leadoffs on the small diamond.',
  },
  {
    id: 'ilk60-017',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'Interlock Minor game, two outs, runner on second. The batter swings through strike three and the ball bounces off the catcher’s mitt to the backstop. The batter sprints for first. What’s the call?',
    options: [
      'Live ball — the batter-runner may try for first',
      'The batter is out — at Minor the batter is always out on strike three, caught or not',
      'The batter is out only if first base was occupied',
      'Dead ball — everyone returns',
    ],
    correctIndex: 1,
    explanation:
      'At the Minor division the batter is out on a third strike whether or not the catcher holds it — there is no uncaught-third-strike advance on a 60-foot Interlock Minor field. (Other runners can still advance at their own risk while the ball is live.)',
  },
  {
    id: 'ilk60-018',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'Strike three skips away from the catcher with first base open in an Interlock MAJOR game. In which Major tier is the batter automatically out anyway?',
    options: [
      'Major Canadians (“A”)',
      'Major Nationals (“B”)',
      'The Major All-Star tier',
      'None — every Major tier allows the advance',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock elected the batter-is-out option for the Major NATIONAL tier only. In Major Canadians and Major All-Stars the batter-runner may attempt to advance on an uncaught third strike, just like standard Major rules.',
  },
  {
    id: 'ilk60-019',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'Between pitches, the batter steps completely out of the batter’s box with both feet to check the signs, then steps back in. The defensive coach asks you to enforce the box rule. What does the Interlock require?',
    options: [
      'Nothing — batters may leave the box between pitches',
      'The batter must keep at least one foot in the box throughout the at-bat',
      'The batter is out for leaving the box',
      'A warning first, then an automatic strike on the second offence',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock adopted the batter’s box option for all divisions and tiers: once the batter enters the box, at least one foot must remain in it for the entire at-bat (subject to the usual rule-book exceptions such as a swing or a wild pitch).',
  },
  {
    id: 'ilk60-020',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'While the pitcher warms up between innings at an Interlock Major game, the next batter kneels in the on-deck circle taking practice swings. What should the umpire do?',
    options: [
      'Nothing — on-deck batters are fine at every level',
      'Send them back to the dugout — there are no on-deck batters at Minor/Major',
      'Allow it only without a bat in hand',
      'Allow it only on the dugout side of the plate',
    ],
    correctIndex: 1,
    explanation:
      'On-deck batters are not permitted on the 60-foot diamond (Minor/Major). Only Junior and Senior players may wait on deck. Keep waiting batters and bats behind the fence.',
  },
  {
    id: 'ilk60-021',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'One out, the catcher of record is on second base, and the offensive coach asks for a courtesy runner so his catcher can start putting the gear on. Do you allow it?',
    options: [
      'Yes — courtesy runners for the catcher are always allowed',
      'No — courtesy runners are only permitted with two outs',
      'Yes, but only if the defence agrees',
      'No — the Interlock doesn’t allow courtesy runners at all',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock permits a courtesy runner for the catcher and/or pitcher of record only when there are two outs. With one out the catcher stays on the base.',
  },
  {
    id: 'ilk60-022',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'Two outs, pitcher of record on first. The coach wants to send a fresh bench player out as the courtesy runner. Who must the courtesy runner be?',
    options: [
      'Any player not currently on base',
      'The player in the batting order who made the last out',
      'The fastest available substitute',
      'The next batter due up',
    ],
    correctIndex: 1,
    explanation:
      'The courtesy runner must be in the team’s batting order and must be the player who made the last out. With continuous batting order there are no true bench players — the last out is the designated runner.',
  },
  {
    id: 'ilk60-023',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'A Major player jogs out to shortstop wearing metal cleats his older brother handed down. The opposing coach objects. What’s the ruling?',
    options: [
      'Metal cleats are fine at every division',
      'Metal cleats are not permitted at Minor/Major — he needs to change footwear',
      'Metal cleats are allowed for infielders only',
      'Allowed, but only on grass fields',
    ],
    correctIndex: 1,
    explanation:
      'Metal cleats are prohibited on the 60-foot diamond (Minor and Major). They only become legal at Junior and Senior.',
  },
  {
    id: 'ilk60-024',
    ruleset: 'interlock60',
    topic: 'Batting & Baserunning',
    tier: 'sixty',
    scenario:
      'Bases loaded, one out at Interlock Minor. The batter pops the ball straight up over the mound. The defensive coach yells that the infield fly rule “doesn’t apply in Minors.” Does it?',
    options: [
      'He’s right — no infield fly below Major',
      'The infield fly rule applies at all Interlock divisions — call it',
      'It applies only when the Nationals tier is playing',
      'It applies only with two outs',
    ],
    correctIndex: 1,
    explanation:
      'The infield fly rule is in force at every Interlock division, Minor through Senior. With runners on first and second or bases loaded and fewer than two outs, call the infield fly as usual.',
  },

  // ── Pitching ─────────────────────────────────────────────────────────────
  {
    id: 'ilk60-025',
    ruleset: 'interlock60',
    topic: 'Pitching',
    tier: 'sixty',
    scenario:
      'The starting pitcher is moved to shortstop in the 3rd inning and stays in the game. In the 5th, with the reliever struggling, the coach wants the starter back on the mound — he never left the lineup. What’s the ruling?',
    options: [
      'Allowed — a pitcher who stays in the game may return to the mound once',
      'Not allowed — once removed from the mound, a pitcher may not pitch again that game at any Interlock division',
      'Allowed only if he threw fewer than 20 pitches',
      'Allowed only in extra innings',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock rule is stricter than the option some leagues use: at all divisions, a pitcher removed from the mound may continue at any other position but may not return as a pitcher in the same game.',
  },
  {
    id: 'ilk60-026',
    ruleset: 'interlock60',
    topic: 'Pitching',
    tier: 'sixty',
    scenario:
      'Before a Minor NATIONALS game the home team sets the pitching plate at 42 feet. The visiting coach protests that Little League Minor pitching distance is 46 feet. What do you rule?',
    options: [
      'Move it to 46 feet — 42 is never legal',
      '42 feet is permitted for Minor National tier pitchers',
      '42 feet is only legal in the Rookie division',
      'Either distance, but only if both coaches agree',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock permits Minor National tier pitchers to pitch from 42 feet instead of 46. In Minor Canadians and all Major play the distance is 46 feet.',
  },
  {
    id: 'ilk60-027',
    ruleset: 'interlock60',
    topic: 'Pitching',
    tier: 'sixty',
    scenario:
      'Late in a game, a coach who used a call-up to reach nine players wants to put that call-up on the mound to protect his regular pitchers’ pitch counts. Can the call-up pitch?',
    options: [
      'Yes — a call-up is a full player once the game starts',
      'No — call-ups, call-overs, taxi-squad members, and over-age players are not eligible to pitch',
      'Yes, but only two innings',
      'Only if the opposing coach consents',
    ],
    correctIndex: 1,
    explanation:
      'Pitching eligibility is the big exception to call-up participation: call-ups, call-overs, taxi-squad players, and over-age players may not pitch (an over-age player may only pitch with specific Interlock Board approval).',
  },
  {
    id: 'ilk60-028',
    ruleset: 'interlock60',
    topic: 'Pitching',
    tier: 'sixty',
    scenario:
      'A rain-suspended game resumes three days later. The pitcher of record at the suspension had thrown 30 pitches. His coach wants him to start the continuation on the mound. Is that legal?',
    options: [
      'No — a suspended game means a fresh pitcher must start the continuation',
      'Yes — the pitcher of record may continue, to the extent of his eligibility for the new day, since the rest requirement was met',
      'Yes, and his count resets to zero for the continuation',
      'Only if he pitched fewer than 20 pitches in the first part',
    ],
    correctIndex: 1,
    explanation:
      'On continuation, the pitcher of record may keep pitching provided the required days of rest were observed, and only to the extent of his eligibility for that calendar day. Pitchers removed from the mound in the first part remain ineligible — it is the same game.',
  },

  // ── Lineups & Substitution ───────────────────────────────────────────────
  {
    id: 'ilk60-029',
    ruleset: 'interlock60',
    topic: 'Lineups & Substitution',
    tier: 'sixty',
    scenario:
      'A team starts an Interlock game with exactly eight players. The opposing coach hands you a lineup complaint: he wants an automatic out recorded every time the empty 9th spot comes up. What does the Interlock rule say?',
    options: [
      'He’s right — the 9th spot is an automatic out',
      'No automatic out — an 8-player lineup bats eight with no penalty',
      'The game can’t start with fewer than nine',
      'The 9th spot is an out only after the 3rd inning',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock adopted the 8-player minimum option: a team may play with eight, and there is no automatic out for a vacant 9th spot. Fewer than eight present, though, is a forfeit.',
  },
  {
    id: 'ilk60-030',
    ruleset: 'interlock60',
    topic: 'Lineups & Substitution',
    tier: 'sixty',
    scenario:
      'Leading 9–1 in the 5th, a team loses a player to ejection and is down to seven available players. The coach argues the game should stand as-is since the outcome is beyond doubt. What happens?',
    options: [
      'The score stands as a win — the game was already regulation',
      'The game is forfeited — dropping below eight players ends it regardless of score or inning',
      'The team finishes the game with seven',
      'The umpire suspends the game for the convenor to sort out',
    ],
    correctIndex: 1,
    explanation:
      'Falling below eight available players forfeits the game no matter when it happens or what the score is. Eight exactly is playable (with no auto-out); seven is a forfeit.',
  },
  {
    id: 'ilk60-031',
    ruleset: 'interlock60',
    topic: 'Lineups & Substitution',
    tier: 'sixty',
    scenario:
      'A player stuck in traffic arrives in the 3rd inning of an Interlock Major game. Where does she go in the batting order?',
    options: [
      'She can’t enter — the lineup locked at first pitch',
      'Added to the bottom of the continuous batting order',
      'Inserted wherever the coach chooses',
      'She may only play defence, not bat',
    ],
    correctIndex: 1,
    explanation:
      'Interlock uses continuous batting order, and a late-arriving player is simply added to the bottom of the order — this applies in continuation games too. Fifteen minutes of grace is also allowed at the start for late arrivals.',
  },
  {
    id: 'ilk60-032',
    ruleset: 'interlock60',
    topic: 'Lineups & Substitution',
    tier: 'sixty',
    scenario:
      'A player twists an ankle in the 2nd inning and can’t continue (the team still has nine others). In the 4th, his spot in the order comes up with two outs and the bases loaded. The defensive coach wants an automatic out. Ruling?',
    options: [
      'Automatic out — his spot must be covered',
      'Skip the spot with no penalty and move to the next batter',
      'The team forfeits for losing a batter',
      'The coach must insert a call-up immediately',
    ],
    correctIndex: 1,
    explanation:
      'An injured, ill, or departed player is skipped in the batting order without penalty — there is no automatic out. If he recovers and returns, he goes back into his original spot.',
  },
  {
    id: 'ilk60-033',
    ruleset: 'interlock60',
    topic: 'Lineups & Substitution',
    tier: 'sixty',
    scenario:
      'A coach swaps his left fielder and second baseman in the middle of an inning, the third defensive change that inning. The opposing manager objects that substitutions were never announced or recorded. What’s the ruling?',
    options: [
      'Illegal — defensive changes are limited to between innings',
      'Legal — defensive substitution is unlimited for everyone except the pitcher',
      'Legal, but each player may only change positions once per game',
      'Illegal — position changes require umpire approval',
    ],
    correctIndex: 1,
    explanation:
      'Because everyone bats in a continuous order, the Interlock allows unlimited defensive substitution at any time — the lone exception is the pitcher, who can’t return to the mound once removed from it.',
  },

  // ── Call-Ups & Rosters ───────────────────────────────────────────────────
  {
    id: 'ilk60-034',
    ruleset: 'interlock60',
    topic: 'Call-Ups & Rosters',
    tier: 'sixty',
    scenario:
      'A Major Canadians team has ten rostered players confirmed for tonight, and the coach still wants to bring a Nationals call-up “for depth.” Is the call-up allowed?',
    options: [
      'Yes — call-ups are always allowed from a lower tier',
      'No — call-ups may only bring a lineup up to ten, and a team with ten or more present may not use one',
      'Yes, up to a lineup of twelve',
      'Only if the call-up doesn’t bat',
    ],
    correctIndex: 1,
    explanation:
      'Call-ups exist to prevent forfeits, not to build depth: they may only bring the game-day lineup to a maximum of ten players, and a team that already has ten or more present may not use one at all. Call-ups must also be identified to the opposing manager before the game.',
  },
  {
    id: 'ilk60-035',
    ruleset: 'interlock60',
    topic: 'Call-Ups & Rosters',
    tier: 'sixty',
    scenario:
      'How many times may the same individual player be called up during one Interlock season?',
    options: [
      'Three times',
      'Five times',
      'Ten times',
      'No limit as long as each game is forfeit prevention',
    ],
    correctIndex: 1,
    explanation:
      'A specific player may be called up at most five times in an Interlock season. Managers and convenors are expected to spread call-ups across the willing players, and coaches don’t hand-pick them — the player agent or convenor selects from the pool.',
  },
  {
    id: 'ilk60-036',
    ruleset: 'interlock60',
    topic: 'Call-Ups & Rosters',
    tier: 'sixty',
    scenario:
      'A Nationals (“B”) Major team is short players, and a parent suggests borrowing a kid from the Canadians (“A”) team in the same division for the night. Is that legal?',
    options: [
      'Yes — any player in the division can fill in',
      'No — that’s a call-down, and call-downs are prohibited',
      'Yes, if the convenor is emailed first',
      'Yes, but the player can’t pitch or catch',
    ],
    correctIndex: 1,
    explanation:
      'Call-ups only flow upward: from a lower tier in the same division, or from any tier in the next lower division. Moving a player from a higher tier down to a lower one is a call-down, which the Interlock prohibits outright.',
  },

  // ── Game Administration ──────────────────────────────────────────────────
  {
    id: 'ilk60-037',
    ruleset: 'interlock60',
    topic: 'Game Administration',
    tier: 'sixty',
    scenario:
      'Spring Interlock season. After a walk, the defensive manager calls time and waves his middle infielders to the mound along with the pitcher and catcher for a strategy chat. What’s the Interlock rule?',
    options: [
      'Fine — mound visits may include any players',
      'In Spring, the visit may only include the battery — pitcher and catcher',
      'Mound visits are banned entirely in Spring',
      'Infielders may attend but it then counts as two visits',
    ],
    correctIndex: 1,
    explanation:
      'To stop player-visits being used to stall, Spring Interlock limits the coach’s mound visit to the battery only. In Summer Interlock other players may join. Either way it counts as a visit to the pitcher and should be kept short.',
  },
  {
    id: 'ilk60-038',
    ruleset: 'interlock60',
    topic: 'Game Administration',
    tier: 'sixty',
    scenario:
      'The offensive team’s runner at second is clearly relaying pitch types to the batter. The defensive manager demands the runner and the coach be ejected for stealing signs. What does the Interlock provide?',
    options: [
      'Eject the runner — sign stealing is an automatic ejection',
      'No ejection — the Interlock declined the option to eject for stealing signals',
      'Eject only on the second offence',
      'Award an automatic strike to the batter',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock declined the local option that allows ejection of players or coaches for stealing signals. Handle it with game management, not ejections.',
  },
  {
    id: 'ilk60-039',
    ruleset: 'interlock60',
    topic: 'Game Administration',
    tier: 'sixty',
    scenario:
      'Mid-inning you hear a low rumble of thunder in the distance; the sky overhead is mostly clear and neither coach seems concerned. What must you do?',
    options: [
      'Play on and monitor the sky',
      'Suspend play immediately and start a 30-minute delay that resets with every new thunder or lightning event',
      'Finish the current inning first, then delay 15 minutes',
      'Delay only if lightning is actually seen',
    ],
    correctIndex: 1,
    explanation:
      'If thunder is heard OR lightning is seen, play must be suspended and a 30-minute delay begins. It is a running clock: each new thunder or lightning event resets the full 30 minutes.',
  },
  {
    id: 'ilk60-040',
    ruleset: 'interlock60',
    topic: 'Game Administration',
    tier: 'sixty',
    scenario:
      'A manager was ejected on Tuesday. His team’s Wednesday game was rained out before it started, and he shows up Friday saying the rainout served as his suspension. Is he eligible to coach Friday?',
    options: [
      'Yes — the suspension attached to the next scheduled game',
      'No — the suspension applies to the next PHYSICALLY PLAYED game; rainouts don’t count',
      'Yes, if the Interlock Board hasn’t ruled yet',
      'Only if he watched the rainout from the parking lot',
    ],
    correctIndex: 1,
    explanation:
      'An ejected player or coach is automatically suspended for the team’s next physically played game at any level — Interlock, house, or tournament — and a rainout does not discharge the penalty. The Board may add further discipline on top.',
  },
  {
    id: 'ilk60-041',
    ruleset: 'interlock60',
    topic: 'Game Administration',
    tier: 'sixty',
    scenario:
      'Only the plate umpire shows up for an Interlock Major game. The home coach spots an experienced parent in the stands willing to do the bases. Can the parent work the game?',
    options: [
      'No — games must have two rostered umpires or be rescheduled',
      'Yes — with the opposing coach’s agreement, a volunteer spectator may take the bases as an exceptional measure',
      'Yes — the home coach may appoint anyone without asking',
      'No — the plate umpire must work the game alone',
    ],
    correctIndex: 1,
    explanation:
      'The home team is responsible for two umpires, but if only one arrives, a volunteer from the spectators may be asked to cover the bases with the opposing coach’s agreement. It should stay an exceptional circumstance, not a routine plan.',
  },
  {
    id: 'ilk60-042',
    ruleset: 'interlock60',
    topic: 'Game Administration',
    tier: 'sixty',
    scenario:
      'No umpires at all have arrived 30 minutes after the scheduled start of an Interlock game. Both teams are warmed up and waiting. What’s the outcome?',
    options: [
      'The coaches umpire the game themselves',
      'The home team forfeits the game to the visitors',
      'The game is postponed with no penalty',
      'The visitors forfeit for refusing to play without umpires',
    ],
    correctIndex: 1,
    explanation:
      'Arranging umpires is a home-team responsibility. If no umpires have shown up after a 30-minute wait, the home team forfeits the game to the visiting team.',
  },
  {
    id: 'ilk60-043',
    ruleset: 'interlock60',
    topic: 'Game Administration',
    tier: 'sixty',
    scenario:
      'A Minor Interlock game is forfeited. What score is recorded?',
    options: [
      '7–0 for the non-forfeiting team',
      '6–0 for the non-forfeiting team',
      '1–0 for the non-forfeiting team',
      '9–0 for the non-forfeiting team',
    ],
    correctIndex: 1,
    explanation:
      'Forfeits are recorded 6–0 in the Minor and Major divisions (7–0 at Junior/Senior — one run per regulation inning), with no standings points for the forfeiting team.',
  },
  {
    id: 'ilk60-044',
    ruleset: 'interlock60',
    topic: 'Game Administration',
    tier: 'sixty',
    scenario:
      'A manager believes you misapplied a rule and yells from the dugout that the game is “under protest,” then tells his scorekeeper to note it. Later he’s upset the protest wasn’t heard. What did he miss?',
    options: [
      'Nothing — announcing it to the dugout is enough',
      'A protest must be officially registered with the umpire at the designated time, per the rule book, or it won’t be heard',
      'Protests must be phoned to the district administrator during the game',
      'Play should have been suspended until the protest was resolved',
    ],
    correctIndex: 1,
    explanation:
      'Protests remain allowed under the standard rule-book procedure, and play is never suspended for one. The manager must officially register the protest with the umpire at the proper time; an unregistered protest is not heard by the Interlock Board.',
  },
];
