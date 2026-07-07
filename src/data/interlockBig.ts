import { Question } from '../types';

// District Interlock rules on the big diamond (Junior and Senior
// divisions, 90-foot bases with an 80-foot option for Junior): local-option
// rule changes agreed between the participating districts for interleague
// play. Rulings verified against the current Interlock Rules document
// (Ontario Districts 2/6/7/8, March 2024); scenarios are original wording.

export const INTERLOCK_BIG_QUESTIONS: Question[] = [
  // ── Time Limits & Regulation ─────────────────────────────────────────────
  {
    id: 'ilkbig-001',
    ruleset: 'interlockBig',
    topic: 'Time Limits & Regulation',
    tier: 'big',
    scenario:
      'How many innings make a complete Interlock Junior or Senior game, and how many must be complete for regulation if the home team is not ahead?',
    options: [
      'Six innings; four for regulation',
      'Seven innings; five for regulation',
      'Nine innings; five for regulation',
      'Seven innings; four for regulation',
    ],
    correctIndex: 1,
    explanation:
      'Junior and Senior Interlock games are seven innings (and a maximum of seven in the regular season). A game is regulation once five innings are complete — four and a half if the home team is ahead.',
  },
  {
    id: 'ilkbig-002',
    ruleset: 'interlockBig',
    topic: 'Time Limits & Regulation',
    tier: 'big',
    scenario:
      'A Senior Interlock game scheduled for 8:15 PM under lights starts 20 minutes late. The home coach argues a new inning can begin any time before 10:35 PM, two hours after the first pitch. Correct?',
    options: [
      'Yes — the limit runs from the actual first pitch',
      'No — no new inning may start more than two hours after the SCHEDULED start (10:15), and lights-out curfews may cut that shorter',
      'No — Senior games have no time limit',
      'Yes, but only with the umpire’s blessing',
    ],
    correctIndex: 1,
    explanation:
      'The two-hour no-new-inning limit runs from the scheduled start time, not the actual one. On a lit field with an automatic timer there is a second constraint: the game must end at least 10 minutes before the lights are scheduled to shut off.',
  },
  {
    id: 'ilkbig-003',
    ruleset: 'interlockBig',
    topic: 'Time Limits & Regulation',
    tier: 'big',
    scenario:
      'Rain ends a Junior Interlock game in the 4th inning after exactly 1 hour and 48 minutes of play. Five innings were never reached. Is this a regulation game?',
    options: [
      'No — Junior games need five complete innings, full stop',
      'Yes — a game played at least 1 hour 45 minutes is regulation by time',
      'Only if both coaches sign the scorebook',
      'No — it must be replayed from the first pitch',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock adopted the option making a game regulation once it has been played for 1 hour 45 minutes, regardless of innings. The final score then follows the reversion rules for the incomplete inning.',
  },
  {
    id: 'ilkbig-004',
    ruleset: 'interlockBig',
    topic: 'Time Limits & Regulation',
    tier: 'big',
    scenario:
      'A regulation Senior game is called for darkness during the top of the 6th with the visitors having scored three runs that inning to lead 9–8. The home team led 8–6 after five complete innings. Final score?',
    options: [
      'Visitors 9–8 — the score when called always stands',
      'Home 8–6 — the incomplete inning is wiped and the score reverts to the end of the 5th',
      'A 8–8 tie is recorded',
      'The game resumes from that exact point another day',
    ],
    correctIndex: 1,
    explanation:
      'With the inning incomplete when the game is called, the score reverts to the last complete inning — unless the home team is at bat and has tied or gone ahead during the partial inning. Here the visitors were batting, so their rally never happened: home wins 8–6.',
  },
  {
    id: 'ilkbig-005',
    ruleset: 'interlockBig',
    topic: 'Time Limits & Regulation',
    tier: 'big',
    scenario:
      'A regular-season Junior Interlock game reaches regulation tied 3–3 and is then stopped by the two-hour limit. The coaches want to know how the winner will be decided. What do you tell them?',
    options: [
      'Extra innings will be scheduled next week',
      'Nothing — regular-season ties are allowed and 3–3 is the final',
      'A five-run shootout decides it',
      'The team with more hits wins',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock allows tie scores in the regular season (worth 2 standings points each). Only playoff games must produce a winner.',
  },

  // ── Field & Equipment ────────────────────────────────────────────────────
  {
    id: 'ilkbig-006',
    ruleset: 'interlockBig',
    topic: 'Field & Equipment',
    tier: 'big',
    scenario:
      'A visiting Junior team arrives to find the home field set up with 80-foot bases and a 54-foot pitching distance. The visiting coach demands full 90/60′6″ dimensions because that’s what his home league uses. Who’s right?',
    options: [
      'The visitors — Junior must always be 90 feet',
      'The home team — Junior games use the dimensions of the home team’s field for that game',
      'The umpire chooses whichever seems safer',
      'The game is postponed until the convenor rules',
    ],
    correctIndex: 1,
    explanation:
      'Junior allows 90-foot bases with an 80-foot option (and 60′6″ pitching with a 54-foot option). For Interlock play, Junior teams use the dimensions of the field being used by the home team in that league’s area — visitors adapt.',
  },
  {
    id: 'ilkbig-007',
    ruleset: 'interlockBig',
    topic: 'Field & Equipment',
    tier: 'big',
    scenario:
      'A Senior player steps in wearing metal cleats and the opposing coach asks you to send him off for illegal footwear. What’s the ruling on the big diamond?',
    options: [
      'Metal cleats are banned at every Little League level',
      'Metal cleats are legal at Junior and Senior',
      'Legal only for pitchers and catchers',
      'Legal only on turf infields',
    ],
    correctIndex: 1,
    explanation:
      'Metal cleats are permitted at Junior and Senior. The prohibition only covers the 60-foot divisions (Minor/Major).',
  },
  {
    id: 'ilkbig-008',
    ruleset: 'interlockBig',
    topic: 'Field & Equipment',
    tier: 'big',
    scenario:
      'Before a Senior night game, the home coach hands you one scuffed practice ball to start the game. What does the Interlock require of the home team?',
    options: [
      'One ball is fine if both coaches agree',
      'At least two NEW approved leather game balls, plus spares available',
      'Three new balls per game, no exceptions',
      'The visitors must supply the game balls',
    ],
    correctIndex: 1,
    explanation:
      'The home team must supply at least two new approved leather game balls for the level of play and have additional approved spares available. The home team also takes the third-base dugout and provides the official scorer.',
  },

  // ── Run Limits & Mercy ───────────────────────────────────────────────────
  {
    id: 'ilkbig-009',
    ruleset: 'interlockBig',
    topic: 'Run Limits & Mercy',
    tier: 'big',
    scenario:
      'A Senior coach argues the 5-run inning cap is “a little-kids rule” that can’t possibly apply to his division. Does the cap apply at Junior/Senior Interlock?',
    options: [
      'No — big-diamond innings are open',
      'Yes — the 5-run cap applies everywhere except the Major All-Star tier',
      'Only in the Nationals tier',
      'Only in the first three innings',
    ],
    correctIndex: 1,
    explanation:
      'The 5-run-per-inning maximum applies to every Interlock division and tier except Major All-Stars. The half-inning ends the moment the fifth run crosses the plate — Junior and Senior included.',
  },
  {
    id: 'ilkbig-010',
    ruleset: 'interlockBig',
    topic: 'Run Limits & Mercy',
    tier: 'big',
    scenario:
      'Bottom of the 7th — the final inning of a Junior game. The home team has scored five runs to pull within two and has runners aboard. The dugout insists the final inning is open. What’s the call?',
    options: [
      'Play on — the last inning has no cap',
      'The half-inning ended when the fifth run scored — the cap applies to the final inning too',
      'The cap moves to ten runs in the 7th',
      'The umpire decides whether to open the inning',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock declined the open-final-inning option at every level. Five runs ends the half-inning in the 7th just as it would in the 2nd, even if it decides the game.',
  },
  {
    id: 'ilkbig-011',
    ruleset: 'interlockBig',
    topic: 'Run Limits & Mercy',
    tier: 'big',
    scenario:
      'After four complete innings a Junior Interlock game sits at 14–3. The winning coach starts shaking hands, citing the mercy rule. Is the game over?',
    options: [
      'Yes — a 10-run lead after four innings ends any Interlock game',
      'No — at Junior/Senior the mercy checkpoint is FIVE complete innings, not four',
      'Yes — a lead over 10 ends a game at any point',
      'No — Junior/Senior games have no mercy rule',
    ],
    correctIndex: 1,
    explanation:
      'On the big diamond the run rule is checked after five complete innings (four and a half with the home team ahead). Four innings only ends Minor/Major games. Play the 5th; if the lead is still ten or more, the game ends then.',
  },
  {
    id: 'ilkbig-012',
    ruleset: 'interlockBig',
    topic: 'Run Limits & Mercy',
    tier: 'big',
    scenario:
      'The mercy rule ends a Senior game 13–2 after five innings, and the teams agree to play out the remaining innings as a scrimmage. The trailing team storms back to make it 13–11. Which score is official?',
    options: [
      '13–11 — the full game counts',
      '13–2 — the score when the mercy rule took effect',
      'Whichever score the home scorekeeper prefers',
      'The scrimmage voids the game entirely',
    ],
    correctIndex: 1,
    explanation:
      'The official score is frozen at the moment the mercy rule takes effect. Anything played afterwards is exhibition and is never reported.',
  },

  // ── Batting & Baserunning ────────────────────────────────────────────────
  {
    id: 'ilkbig-013',
    ruleset: 'interlockBig',
    topic: 'Batting & Baserunning',
    tier: 'big',
    scenario:
      'Runner on first in a Junior Interlock game takes a three-step lead as the pitcher comes set, then breaks for second on first movement. The catcher screams that the runner left early. What’s the ruling?',
    options: [
      'The runner is out — no leadoffs at any Little League division',
      'Legal — leadoffs and unrestricted stealing apply at Junior/Senior',
      'Legal lead, but he can’t leave until the pitch crosses the plate',
      'Dead ball — runners return',
    ],
    correctIndex: 1,
    explanation:
      'Leadoffs are permitted and stealing is unrestricted on the big diamond. The pitch-must-reach-the-batter restriction only exists at Minor/Major on the 60-foot field.',
  },
  {
    id: 'ilkbig-014',
    ruleset: 'interlockBig',
    topic: 'Batting & Baserunning',
    tier: 'big',
    scenario:
      'Senior game, runner on second. The pitcher comes to his set position but never pauses before delivering. On the 60-foot diamond you’d call an illegal pitch. What is it here?',
    options: [
      'An illegal pitch — ball to the batter',
      'A balk — the runner is awarded third',
      'Nothing — the set-position pause is optional at Senior',
      'A warning on the first offence',
    ],
    correctIndex: 1,
    explanation:
      'Balks are called at Junior and Senior. Failing to come to a complete stop in the set position with a runner on is a balk, and the runner advances one base. The no-balk/illegal-pitch treatment applies only at Minor/Major.',
  },
  {
    id: 'ilkbig-015',
    ruleset: 'interlockBig',
    topic: 'Batting & Baserunning',
    tier: 'big',
    scenario:
      'Junior Interlock game, one out, first base unoccupied. Strike three bounces in the dirt and squirts away from the catcher. The batter takes off for first. What’s the ruling?',
    options: [
      'The batter is out — no uncaught-third-strike advances in Interlock play',
      'Live ball — the batter-runner may attempt to advance to first',
      'Dead ball — the batter returns to hit again',
      'The batter is awarded first automatically',
    ],
    correctIndex: 1,
    explanation:
      'At Junior and Senior the batter-runner may advance on an uncaught third strike (under the usual rule-book conditions — first base unoccupied, or two outs). The batter-is-out elections only affect Minor and the Major National tier.',
  },
  {
    id: 'ilkbig-016',
    ruleset: 'interlockBig',
    topic: 'Batting & Baserunning',
    tier: 'big',
    scenario:
      'A Senior batter grounds out, and two batters later the coach wants him to be the courtesy runner for the catcher of record, who just walked with two outs. Is this the right runner?',
    options: [
      'No — courtesy runners must be players not in the batting order',
      'Yes — the courtesy runner must be the player in the batting order who made the last out, and two outs is the right time',
      'No — courtesy runners are only for the pitcher',
      'Yes, but only in extra innings',
    ],
    correctIndex: 1,
    explanation:
      'Courtesy runners are allowed for the catcher and/or pitcher of record when there are two outs, and the runner must be the player in the batting order who made the last out. This one checks both boxes.',
  },
  {
    id: 'ilkbig-017',
    ruleset: 'interlockBig',
    topic: 'Batting & Baserunning',
    tier: 'big',
    scenario:
      'A Senior batter is in the habit of strolling several feet out of the box after every pitch to adjust his gloves. The opposing coach asks you to enforce the Interlock batter’s box rule. What does it require?',
    options: [
      'Nothing at Senior — the box rule is a small-diamond option',
      'At least one foot must remain in the box throughout the at-bat, at all divisions and tiers',
      'Both feet must stay in the box at all times',
      'The batter may leave the box freely with the umpire’s permission',
    ],
    correctIndex: 1,
    explanation:
      'The Interlock adopted the batter’s box option for ALL divisions and tiers: after entering the box, the batter must keep at least one foot in it for the whole at-bat, subject to the normal rule-book exceptions.',
  },
  {
    id: 'ilkbig-018',
    ruleset: 'interlockBig',
    topic: 'Batting & Baserunning',
    tier: 'big',
    scenario:
      'During a pitching change in a Junior game, the next batter waits in the on-deck circle taking swings. The opposing coach, used to Major rules, tells you to send him behind the fence. Ruling?',
    options: [
      'The coach is right — no on-deck batters in Little League',
      'On-deck batters are permitted at Junior and Senior',
      'On-deck is allowed only for the leadoff hitter each inning',
      'On-deck is allowed only without a bat',
    ],
    correctIndex: 1,
    explanation:
      'On-deck batters are permitted on the big diamond (Junior/Senior). The prohibition applies at Minor and Major only.',
  },

  // ── Pitching ─────────────────────────────────────────────────────────────
  {
    id: 'ilkbig-019',
    ruleset: 'interlockBig',
    topic: 'Pitching',
    tier: 'big',
    scenario:
      'A Senior coach moves his starter to first base in the 4th, then wants him back on the mound in the 6th, pointing out that regular Little League Senior rules can allow a pitcher to return. What does Interlock say?',
    options: [
      'He may return once, as in the regular rule book',
      'He may not — Interlock bars a removed pitcher from returning to the mound at ALL divisions, Senior included',
      'He may return if he threw under 40 pitches',
      'He may return only with the opposing coach’s consent',
    ],
    correctIndex: 1,
    explanation:
      'This is a deliberate Interlock override: at every division, Minor through Senior, a pitcher removed from the mound may keep playing elsewhere but may not pitch again in the same game — even where the standard rules would allow a return.',
  },
  {
    id: 'ilkbig-020',
    ruleset: 'interlockBig',
    topic: 'Pitching',
    tier: 'big',
    scenario:
      'A Junior team’s 15-year-old over-age player (approved by the Board to play in the division) is sent to the mound in a blowout. The opposing coach objects. Who’s right?',
    options: [
      'The pitching change stands — an approved player is a full player',
      'The objection stands — over-age players may not pitch unless the Board specifically approved them to pitch',
      'Over-age players may pitch a maximum of one inning',
      'Over-age players may pitch only in blowouts',
    ],
    correctIndex: 1,
    explanation:
      'Approval to play and approval to pitch are separate. Over-age players — like call-ups, call-overs, and taxi-squad members — are not eligible to pitch unless the Interlock Board has specifically approved that player to pitch.',
  },
  {
    id: 'ilkbig-021',
    ruleset: 'interlockBig',
    topic: 'Pitching',
    tier: 'big',
    scenario:
      'In the 6th inning a Senior coach brings in his fifth pitcher of the night. The opposing scorekeeper claims there’s a limit on the number of pitchers a team may use. Is there?',
    options: [
      'Yes — four pitchers per game',
      'No — there is no limit on pitchers used; only pitch counts and rest rules constrain them',
      'Yes — three pitchers per game unless there’s an injury',
      'Only in the playoffs',
    ],
    correctIndex: 1,
    explanation:
      'There is no restriction on how many pitchers a team uses in a game. What is strictly enforced are the Little League pitch-count regulations and days-of-rest requirements, plus the no-return-to-the-mound rule.',
  },
  {
    id: 'ilkbig-022',
    ruleset: 'interlockBig',
    topic: 'Pitching',
    tier: 'big',
    scenario:
      'A suspended Junior game resumes the following week. The reliever who was pitching when play stopped shows up rested and his coach wants him to continue. A pitcher who’d been pulled from the mound in the first part is also “available,” per the coach. What’s correct?',
    options: [
      'Both may pitch — it’s a new day',
      'The pitcher of record may continue (within his eligibility for the new day); the previously removed pitcher remains ineligible to pitch',
      'Neither may pitch in the continuation',
      'Only a pitcher who didn’t appear in the first part may pitch',
    ],
    correctIndex: 1,
    explanation:
      'A continuation is the same game resuming from the exact point of suspension. The pitcher of record may continue if the rest rules are satisfied, limited by his eligibility that day — but anyone already removed from the mound in the first part still can’t return to it.',
  },

  // ── Lineups & Substitution ───────────────────────────────────────────────
  {
    id: 'ilkbig-023',
    ruleset: 'interlockBig',
    topic: 'Lineups & Substitution',
    tier: 'big',
    scenario:
      'A Senior team is down 2–1 in the 6th when an injury leaves them with exactly eight healthy players. The opposing coach claims the game should end or an automatic out should be added. What happens?',
    options: [
      'The game is forfeited at eight players',
      'Play continues with eight and no automatic out in the vacated spot',
      'Play continues but with an automatic out each time the spot comes up',
      'The game is suspended for the convenor',
    ],
    correctIndex: 1,
    explanation:
      'Eight players is the floor: the game continues with no automatic out for the missing ninth spot. Only when a team drops BELOW eight is the game forfeited, regardless of inning or score.',
  },
  {
    id: 'ilkbig-024',
    ruleset: 'interlockBig',
    topic: 'Lineups & Substitution',
    tier: 'big',
    scenario:
      'A Junior game suspended in the 3rd resumes a week later. Two players from the original lineup are away at a tournament, and one new player who missed the first part is at the field. How is the batting order handled?',
    options: [
      'The order is re-drawn from scratch for the continuation',
      'Absent players are skipped without penalty; the new player is added to the bottom of the order',
      'Absent players are automatic outs; the new player may not play',
      'The new player takes over an absent player’s spot',
    ],
    correctIndex: 1,
    explanation:
      'In a continuation, players from the first part who are absent are skipped in the continuous order with no penalty, and players newly present are added to the bottom of the lineup regardless of where the order currently stands.',
  },
  {
    id: 'ilkbig-025',
    ruleset: 'interlockBig',
    topic: 'Lineups & Substitution',
    tier: 'big',
    scenario:
      'Between pitches, a Senior coach rotates three fielders to new positions for a pull hitter — no announcement to anyone. The opposing manager wants the moves disallowed as unannounced substitutions. Ruling?',
    options: [
      'Position changes must be announced and logged',
      'Legal — defensive substitution and repositioning are unlimited, except that a removed pitcher may not return to the mound',
      'Legal only between innings',
      'Each player may change position twice per game',
    ],
    correctIndex: 1,
    explanation:
      'With continuous batting order in effect, the Interlock allows unlimited defensive substitution at any time. The only defensive restriction in the whole scheme is the pitcher’s one-way trip off the mound.',
  },

  // ── Call-Ups & Rosters ───────────────────────────────────────────────────
  {
    id: 'ilkbig-026',
    ruleset: 'interlockBig',
    topic: 'Call-Ups & Rosters',
    tier: 'big',
    scenario:
      'A Nationals (“B”) Junior team has only eight players confirmed for tomorrow. Which of these is a LEGAL way to add a ninth?',
    options: [
      'Call down a player from the Canadians (“A”) Junior team',
      'Call up a rostered Major player (any tier of the next lower division)',
      'Borrow a 19U league player for the night',
      'Add a house-league player who isn’t Interlock-registered',
    ],
    correctIndex: 1,
    explanation:
      'Call-ups may come from a lower tier in the same division or from any tier in the next lower division — a Major player to a Junior team qualifies. Call-downs from a higher tier are prohibited, and call-ups must be regular rostered Interlock players.',
  },
  {
    id: 'ilkbig-027',
    ruleset: 'interlockBig',
    topic: 'Call-Ups & Rosters',
    tier: 'big',
    scenario:
      'A Senior coach uses two call-ups to get to ten players but never mentions it to anyone. In the 3rd inning the opposing manager notices unfamiliar faces and objects. What did the coach fail to do?',
    options: [
      'Nothing — call-ups need no disclosure',
      'Identify the call-ups to the opposing manager before the start of the game',
      'File a protest form before the game',
      'Have the call-ups sign the scorebook',
    ],
    correctIndex: 1,
    explanation:
      'A manager using one or more call-ups must identify them to the opposing manager before the game starts. Call-ups also can’t pitch, only exist to reach a maximum lineup of ten, and no player may be called up more than five times a season.',
  },
  {
    id: 'ilkbig-028',
    ruleset: 'interlockBig',
    topic: 'Call-Ups & Rosters',
    tier: 'big',
    scenario:
      'A league wants to protect against forfeits by keeping a list of registered players who aren’t on an Interlock roster but will fill in when needed. What does Interlock call this, and what’s the key restriction on those players?',
    options: [
      'A call-over pool; they may only play defence',
      'A taxi squad; taxi-squad members may not pitch',
      'A waiver wire; they must clear the convenor weekly',
      'A call-down list; they may only play at lower tiers',
    ],
    correctIndex: 1,
    explanation:
      'Leagues may form a taxi squad of registered, willing non-rostered players, submitted to the convenor. Because taxi-squad players can’t be added to the pitch-count tracking site, they are not permitted to pitch.',
  },

  // ── Game Administration ──────────────────────────────────────────────────
  {
    id: 'ilkbig-029',
    ruleset: 'interlockBig',
    topic: 'Game Administration',
    tier: 'big',
    scenario:
      'Summer Interlock, Senior game. After back-to-back doubles, the manager visits the mound and the shortstop and first baseman jog in to join the conversation. The opposing coach objects, citing the battery-only rule. Ruling?',
    options: [
      'Sustain the objection — mound visits are battery-only',
      'Allow it — in SUMMER Interlock, players besides the pitcher may join the manager’s visit; it still counts as a visit to the pitcher',
      'Allow it but charge two visits',
      'Disallow all player visits in either season',
    ],
    correctIndex: 1,
    explanation:
      'The battery-only restriction is a SPRING Interlock rule. In Summer Interlock, other players may visit with the manager on the mound. Either way, it counts as a visit to the pitcher and should be kept short.',
  },
  {
    id: 'ilkbig-030',
    ruleset: 'interlockBig',
    topic: 'Game Administration',
    tier: 'big',
    scenario:
      'A flash of lightning is spotted beyond the outfield during a Senior game; 25 minutes into the delay, thunder rolls again. When can play resume?',
    options: [
      'Five minutes later — the original 30-minute clock finishes',
      'Thirty minutes after the LATEST thunder or lightning — each event resets the full delay',
      'Immediately, since the storm is moving away',
      'Not at all — any second event ends the game',
    ],
    correctIndex: 1,
    explanation:
      'Thunder heard or lightning seen triggers a 30-minute suspension, and it’s a running delay: every new thunder or lightning event restarts the full 30 minutes. The second rumble means at least 30 more minutes from that moment.',
  },
  {
    id: 'ilkbig-031',
    ruleset: 'interlockBig',
    topic: 'Game Administration',
    tier: 'big',
    scenario:
      'A Junior Interlock game is forfeited when the visitors can’t field eight players. What score goes in the book?',
    options: [
      '6–0 for the home team',
      '7–0 for the home team',
      '2–0 for the home team',
      '1–0 for the home team',
    ],
    correctIndex: 1,
    explanation:
      'Forfeits at Junior/Senior are recorded 7–0 (one run per regulation inning); at Minor/Major it’s 6–0. The forfeiting team also receives no standings points.',
  },
  {
    id: 'ilkbig-032',
    ruleset: 'interlockBig',
    topic: 'Game Administration',
    tier: 'big',
    scenario:
      'A Senior player is ejected arguing a call. His team’s next game is an away tournament game with his house league, not an Interlock game. His coach says the suspension only covers Interlock play. Correct?',
    options: [
      'Yes — Interlock discipline stays inside Interlock',
      'No — the suspension applies to the team’s next physically played game at ANY level, tournament included',
      'Only if the Board confirms within 24 hours',
      'The player chooses which game to sit out',
    ],
    correctIndex: 1,
    explanation:
      'An ejection carries an automatic suspension for the next physically played game at any level — Interlock, house league, or tournament. Rainouts don’t discharge it, and the Board or the player’s league may add further penalties.',
  },
  {
    id: 'ilkbig-033',
    ruleset: 'interlockBig',
    topic: 'Game Administration',
    tier: 'big',
    scenario:
      'An ejection occurs in a testy Senior game. What is the reporting obligation on the umpire?',
    options: [
      'None — ejections are self-reporting through the coaches',
      'Submit an incident report through the district website the same evening, before the team’s next game',
      'Phone each league president within the hour',
      'Note it in the scorebook and nothing more',
    ],
    correctIndex: 1,
    explanation:
      'Every protest, ejection, and incident must be reported promptly to the Interlock Board — the same evening it happens, and certainly before the team’s next scheduled game — via the incident form on the district website. The umpire, coach, or any involved party files it.',
  },

  // ── Playoffs ─────────────────────────────────────────────────────────────
  {
    id: 'ilkbig-034',
    ruleset: 'interlockBig',
    topic: 'Playoffs',
    tier: 'big',
    scenario:
      'A Junior playoff game is still tied after seven innings, and the two-hour mark from the scheduled start has passed. The convenor is watching from the stands. What happens next?',
    options: [
      'The game ends as a tie and both teams advance on points',
      'Keep playing — the time limit and curfew do not apply to playoff games, and extra innings are required until there’s a winner',
      'A coin flip decides the winner',
      'The higher seed advances on the tiebreaker',
    ],
    correctIndex: 1,
    explanation:
      'Playoff games are sudden death and must produce a winner: the regular-season time limit and curfew do not apply, and tied games go to extra innings. Darkness or weather can still stop play, in which case a tied game resumes as soon as possible.',
  },
  {
    id: 'ilkbig-035',
    ruleset: 'interlockBig',
    topic: 'Playoffs',
    tier: 'big',
    scenario:
      'Darkness forces the umpire to call a Senior playoff game during the 6th inning. The home team leads 6–2 with five innings complete — regulation length for the division. The trailing coach demands the game resume another day since playoffs “must be played to completion.” Ruling?',
    options: [
      'He’s right — playoff games must always be finished on the field',
      'The result stands — the game reached regulation length with a winner, so there’s no requirement to resume',
      'Playoff games revert to a full 7-inning replay when called early',
      'The result stands only if both coaches agree',
    ],
    correctIndex: 1,
    explanation:
      'A playoff game may still end early for darkness, weather, lights, or a following permit. If it has reached regulation length and a winner can be declared, it does not resume — resumption is only required when a winner can’t be declared because the game is tied.',
  },
  {
    id: 'ilkbig-036',
    ruleset: 'interlockBig',
    topic: 'Playoffs',
    tier: 'big',
    scenario:
      'Before a Junior Canadians playoff game, the opposing manager challenges a star player’s eligibility, claiming he barely played all season. What participation does Interlock require for playoff eligibility on a Canadians roster?',
    options: [
      'Played at least one regular-season game',
      'Played at least 50% of the team’s regular-season games',
      'Played at least 75% of the team’s regular-season games',
      'No participation requirement exists',
    ],
    correctIndex: 1,
    explanation:
      'Playoff eligibility requires a player to have played at least half of the team’s regular-season games (40% for Nationals-tier rosters). No allowance is made for games missed playing other, non–Little League baseball — the rule exists to keep late-season ringers out.',
  },
  {
    id: 'ilkbig-037',
    ruleset: 'interlockBig',
    topic: 'Playoffs',
    tier: 'big',
    scenario:
      'Two Senior teams meet in a playoff game at a neutral-ish time slot and both coaches claim home team. How is home team decided in Interlock playoffs?',
    options: [
      'Coin flip at the plate meeting',
      'The team with the higher regular-season finish is home',
      'The team that traveled farther is home',
      'Alternates by inning',
    ],
    correctIndex: 1,
    explanation:
      'For any playoff game, the team with the higher place finish in the regular season is the home team — which also puts them in the third-base dugout with home-team responsibilities.',
  },
];
