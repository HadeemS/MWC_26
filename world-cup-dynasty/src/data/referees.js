// Referee personalities affect match events and VAR outcomes
export const REFEREES = [
  { id: 'ref_fair', name: 'Anders Holm', personality: 'Fair', strictness: 50, homeBias: 0, dramaFactor: 20, cardRate: 0.3 },
  { id: 'ref_strict', name: 'Marcus Steele', personality: 'Strict', strictness: 85, homeBias: 0, dramaFactor: 30, cardRate: 0.55 },
  { id: 'ref_shady', name: 'Viktor Kross', personality: 'Shady', strictness: 40, homeBias: 15, dramaFactor: 70, cardRate: 0.4 },
  { id: 'ref_lenient', name: 'Paolo Gentile', personality: 'Lenient', strictness: 25, homeBias: 0, dramaFactor: 15, cardRate: 0.15 },
  { id: 'ref_home', name: 'Derek Walsh', personality: 'Home-biased', strictness: 45, homeBias: 25, dramaFactor: 40, cardRate: 0.35 },
  { id: 'ref_drama', name: 'Rico Valdez', personality: 'Drama-seeker', strictness: 55, homeBias: 5, dramaFactor: 90, cardRate: 0.45 },
  { id: 'ref_cards', name: 'Hans Berger', personality: 'Card-happy', strictness: 75, homeBias: 0, dramaFactor: 50, cardRate: 0.7 },
  { id: 'ref_pressure', name: 'Elias Nord', personality: 'Easily pressured', strictness: 35, homeBias: 10, dramaFactor: 60, cardRate: 0.35 },
];

export const VAR_TYPES = [
  { type: 'goal_review', label: 'Goal Under Review', description: 'Was the goal valid?' },
  { type: 'penalty_review', label: 'Penalty Check', description: 'Should a penalty be awarded?' },
  { type: 'red_card_review', label: 'Red Card Review', description: 'Does the challenge warrant a red?' },
  { type: 'offside_check', label: 'Offside Check', description: 'Was the attacker offside?' },
  { type: 'handball_check', label: 'Handball Check', description: 'Did the ball hit the hand?' },
  { type: 'last_man_foul', label: 'Last-Man Foul', description: 'Was it a clear goal-scoring opportunity?' },
];

export const getRandomReferee = () => REFEREES[Math.floor(Math.random() * REFEREES.length)];
