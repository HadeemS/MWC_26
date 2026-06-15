// Random locker room events between matches
export const LOCKER_ROOM_EVENTS = [
  {
    id: 'playing_time',
    title: 'Star Player Upset',
    description: 'Your star forward is unhappy about limited playing time.',
    choices: [
      { id: 'promise_starts', label: 'Promise more starts', effects: { morale: 10, chemistry: -5 } },
      { id: 'explain_tactics', label: 'Explain tactical rotation', effects: { morale: 3, federationTrust: 5 } },
      { id: 'bench_warning', label: 'Warn about attitude', effects: { morale: -8, discipline: 5 } },
    ],
  },
  {
    id: 'captain_tactics',
    title: 'Captain Questions Tactics',
    description: 'Your captain wants to discuss the formation privately.',
    choices: [
      { id: 'listen', label: 'Listen and adjust', effects: { morale: 8, chemistry: 10 } },
      { id: 'stand_firm', label: 'Stand by your tactics', effects: { morale: -3, federationTrust: 5 } },
      { id: 'compromise', label: 'Find a compromise', effects: { morale: 5, chemistry: 8 } },
    ],
  },
  {
    id: 'youth_chance',
    title: 'Young Player Wants a Chance',
    description: 'A promising academy graduate asks for a senior start.',
    choices: [
      { id: 'give_chance', label: 'Give him a start', effects: { morale: 12, development: 15, fanApproval: 8 } },
      { id: 'wait', label: 'Not yet — keep developing', effects: { morale: -5, development: 5 } },
      { id: 'cameo', label: 'Promise a late cameo', effects: { morale: 5, development: 8 } },
    ],
  },
  {
    id: 'player_argument',
    title: 'Dressing Room Argument',
    description: 'Two players had a heated argument after training.',
    choices: [
      { id: 'mediate', label: 'Mediate personally', effects: { chemistry: 10, morale: 5 } },
      { id: 'fine_both', label: 'Fine both players', effects: { discipline: 10, morale: -5 } },
      { id: 'ignore', label: 'Let them sort it out', effects: { chemistry: -10, morale: -3 } },
    ],
  },
  {
    id: 'veteran_speech',
    title: 'Veteran Leadership Speech',
    description: 'A veteran rallied the squad before a big match.',
    choices: [
      { id: 'endorse', label: 'Publicly endorse the speech', effects: { morale: 15, chemistry: 10 } },
      { id: 'acknowledge', label: 'Quiet acknowledgment', effects: { morale: 8 } },
      { id: 'take_credit', label: 'Take credit as manager', effects: { morale: -5, mediaPressure: 5 } },
    ],
  },
  {
    id: 'missed_training',
    title: 'Player Missed Training',
    description: 'A key midfielder missed training without notice.',
    choices: [
      { id: 'investigate', label: 'Investigate privately', effects: { federationTrust: 5, morale: 3 } },
      { id: 'drop', label: 'Drop from squad', effects: { discipline: 10, morale: -8, chemistry: 5 } },
      { id: 'warning', label: 'Issue formal warning', effects: { discipline: 5, morale: -3 } },
    ],
  },
  {
    id: 'lineup_leak',
    title: 'Media Leaked Lineup',
    description: 'Your starting lineup was leaked to the press.',
    choices: [
      { id: 'change_lineup', label: 'Change the lineup', effects: { mediaPressure: 10, chemistry: -5 } },
      { id: 'stick_plan', label: 'Stick to the plan', effects: { morale: 5, mediaPressure: 5 } },
      { id: 'investigate_leak', label: 'Investigate the leak', effects: { federationTrust: 8, discipline: 5 } },
    ],
  },
  {
    id: 'injury_scare',
    title: 'Injury Scare Before Final',
    description: 'Your captain picked up a knock in the final training session.',
    choices: [
      { id: 'risk_play', label: 'Risk playing him', effects: { morale: 10, injuryRisk: 30 } },
      { id: 'rest', label: 'Rest him — safety first', effects: { morale: -5, fitness: 10, fanApproval: -3 } },
      { id: 'late_decision', label: 'Late fitness test', effects: { mediaPressure: 10, morale: 5 } },
    ],
  },
];

export const getRandomLockerRoomEvent = () =>
  LOCKER_ROOM_EVENTS[Math.floor(Math.random() * LOCKER_ROOM_EVENTS.length)];
