// In-match and narrative decision moments
export const MATCH_DECISIONS = [
  {
    id: 'press_high',
    label: 'Press High',
    description: 'Push your line up and press aggressively',
    effects: { attack: 15, defense: -10, stamina: -8 },
  },
  {
    id: 'sit_back',
    label: 'Sit Back',
    description: 'Drop deep and absorb pressure',
    effects: { attack: -10, defense: 15, stamina: 5 },
  },
  {
    id: 'risky_sub',
    label: 'Risky Substitution',
    description: 'Bring on a fresh attacker, leave gaps at the back',
    effects: { attack: 20, defense: -15, morale: 5 },
  },
  {
    id: 'trust_youth',
    label: 'Trust a Young Player',
    description: 'Give a prospect a chance in a big moment',
    effects: { attack: 5, morale: 10, development: 15 },
  },
  {
    id: 'trust_veteran',
    label: 'Trust a Veteran',
    description: 'Rely on experience in a tight spot',
    effects: { composure: 15, morale: 8 },
  },
  {
    id: 'argue_ref',
    label: 'Argue with Referee',
    description: 'Confront the official about a bad call',
    effects: { morale: -5, mediaPressure: 15, cardRisk: 20, fanApproval: 5 },
  },
  {
    id: 'stay_calm',
    label: 'Stay Calm',
    description: 'Keep composure after a controversial call',
    effects: { morale: 10, federationTrust: 5, mediaPressure: -10 },
  },
  {
    id: 'change_formation',
    label: 'Change Formation',
    description: 'Switch tactical setup mid-match',
    effects: { attack: 8, defense: 8, chemistry: -5 },
  },
  {
    id: 'park_bus',
    label: 'Park the Bus',
    description: 'All-out defensive lockdown',
    effects: { attack: -20, defense: 25, fanApproval: -5 },
  },
  {
    id: 'all_out_attack',
    label: 'Go All-Out Attack',
    description: 'Throw everyone forward',
    effects: { attack: 25, defense: -25, stamina: -15 },
  },
  {
    id: 'save_energy',
    label: 'Save Energy',
    description: 'Conserve stamina for later',
    effects: { stamina: 15, attack: -8 },
  },
  {
    id: 'short_corner',
    label: 'Short Corner',
    description: 'Play a short corner routine',
    effects: { attack: 5, creativity: 10 },
  },
  {
    id: 'cross_box',
    label: 'Cross into the Box',
    description: 'Send it in for headers',
    effects: { attack: 12, aerial: 15 },
  },
  {
    id: 'star_penalty',
    label: 'Star Player Takes Penalty',
    description: 'Let your best finisher step up',
    effects: { penaltyChance: 15 },
  },
  {
    id: 'captain_penalty',
    label: 'Captain Takes Penalty',
    description: 'Leadership from the spot',
    effects: { penaltyChance: 10, morale: 5 },
  },
];

export const SHADY_REF_RESPONSES = [
  { id: 'professional', label: 'Stay Professional', effects: { federationTrust: 10, morale: 5, mediaPressure: -5 } },
  { id: 'criticize', label: 'Publicly Criticize Ref', effects: { mediaPressure: 20, fanApproval: 10, federationTrust: -10, discipline: 5 } },
  { id: 'complaint', label: 'File Official Complaint', effects: { federationTrust: 5, mediaPressure: 15, rivalry: 5 } },
  { id: 'motivate', label: 'Motivate the Team', effects: { morale: 15, fanApproval: 5 } },
  { id: 'adjust_tactics', label: 'Adjust Tactics', effects: { defense: 10, attack: -5 } },
  { id: 'avoid_tackles', label: 'Avoid Risky Tackles', effects: { defense: 5, cardRisk: -20 } },
  { id: 'media_pressure', label: 'Use Media After Match', effects: { mediaPressure: 25, fanApproval: 8, federationTrust: -5 } },
];

export const VAR_REACTIONS = [
  { id: 'accept', label: 'Accept the Decision', effects: { morale: 5, federationTrust: 5 } },
  { id: 'protest', label: 'Protest on the Touchline', effects: { morale: -3, mediaPressure: 15, cardRisk: 15 } },
  { id: 'calm_team', label: 'Calm the Team', effects: { morale: 10, composure: 10 } },
  { id: 'rally', label: 'Rally the Crowd', effects: { morale: 12, fanApproval: 10, atmosphere: 15 } },
];

export const FORMATIONS = [
  { id: '4-3-3', label: '4-3-3', attack: 10, defense: 5, midfield: 8 },
  { id: '4-4-2', label: '4-4-2', attack: 7, defense: 7, midfield: 7 },
  { id: '3-5-2', label: '3-5-2', attack: 8, defense: 6, midfield: 12 },
  { id: '5-3-2', label: '5-3-2', attack: 4, defense: 14, midfield: 5 },
  { id: '4-2-3-1', label: '4-2-3-1', attack: 9, defense: 8, midfield: 10 },
];
