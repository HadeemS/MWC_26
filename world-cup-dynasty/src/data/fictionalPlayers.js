// Fictional player name pools — no real athletes
const FIRST_NAMES = [
  'Marco', 'Elias', 'Theo', 'Luca', 'Kai', 'Felix', 'Nico', 'Rafael',
  'Andre', 'Victor', 'Leo', 'Dante', 'Soren', 'Milan', 'Enzo', 'Axel',
  'Hugo', 'Oscar', 'Ivan', 'Mateo', 'Bruno', 'Diego', 'Stefan', 'Julian',
];

const LAST_NAMES = [
  'Valetti', 'Storme', 'Blackwood', 'Rivera', 'Kessler', 'Montague',
  'Ashford', 'Delgado', 'Falkner', 'Grimaldi', 'Hartwell', 'Ibarra',
  'Jansen', 'Kovacs', 'Lindstrom', 'Moretti', 'Navarro', 'Okafor',
  'Petrov', 'Quinn', 'Rossi', 'Santoro', 'Thorne', 'Vargas',
];

export const PLAYER_TRAITS = [
  'Clutch Finisher', 'Playmaker', 'Lockdown Defender', 'Speed Demon',
  'Captain Mentality', 'Injury Prone', 'Big Game Player', 'Hot Head',
  'Young Prospect', 'Penalty Specialist', 'Set Piece Master',
  'Locker Room Leader', 'Media Star',
];

const POSITIONS = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD'];

let playerIdCounter = 1;

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generatePlayer = (options = {}) => {
  const position = options.position || randomFrom(POSITIONS);
  const age = options.age || randomInt(18, 34);
  const isYouth = age <= 21;
  const baseOverall = options.overall || randomInt(isYouth ? 58 : 65, isYouth ? 72 : 88);
  const potential = options.potential || Math.min(99, baseOverall + randomInt(3, 15));

  const pace = randomInt(baseOverall - 10, baseOverall + 5);
  const shooting = position === 'FWD' ? randomInt(baseOverall - 5, baseOverall + 8) : randomInt(baseOverall - 15, baseOverall);
  const passing = position === 'MID' ? randomInt(baseOverall - 3, baseOverall + 8) : randomInt(baseOverall - 12, baseOverall + 3);
  const defense = position === 'DEF' || position === 'GK' ? randomInt(baseOverall - 3, baseOverall + 8) : randomInt(baseOverall - 18, baseOverall);
  const stamina = randomInt(baseOverall - 8, baseOverall + 5);
  const composure = randomInt(baseOverall - 10, baseOverall + 8);

  const trait = options.trait || randomFrom(PLAYER_TRAITS);

  return {
    id: `player_${playerIdCounter++}`,
    name: options.name || `${randomFrom(FIRST_NAMES)} ${randomFrom(LAST_NAMES)}`,
    age,
    position,
    overall: baseOverall,
    pace: Math.min(99, Math.max(40, pace)),
    shooting: Math.min(99, Math.max(40, shooting)),
    passing: Math.min(99, Math.max(40, passing)),
    defense: Math.min(99, Math.max(40, defense)),
    stamina: Math.min(99, Math.max(40, stamina)),
    composure: Math.min(99, Math.max(40, composure)),
    morale: randomInt(60, 95),
    injuryRisk: trait === 'Injury Prone' ? randomInt(60, 85) : randomInt(10, 40),
    potential,
    marketValue: baseOverall * randomInt(80, 150) * 1000,
    salary: baseOverall * randomInt(5, 20) * 1000,
    loyalty: randomInt(50, 95),
    mediaPopularity: randomInt(30, 90),
    trait,
    appearances: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    injured: false,
    injuryWeeks: 0,
    isCaptain: false,
    isPenaltyTaker: false,
    isFreeKickTaker: false,
    isCornerTaker: false,
    appearance: {
      skinTone: randomFrom(['light', 'medium', 'tan', 'dark']),
      hairStyle: randomFrom(['short', 'curly', 'bald', 'long']),
      hairColor: randomFrom(['black', 'brown', 'blonde', 'red']),
    },
  };
};

export const generateSquad = (teamStrength = 75, size = 23) => {
  const squad = [];
  const positions = ['GK', 'GK', 'DEF', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD', 'FWD'];

  for (let i = 0; i < size; i++) {
    const pos = i < positions.length ? positions[i] : randomFrom(POSITIONS);
    const variance = randomInt(-8, 8);
    const overall = Math.min(92, Math.max(55, teamStrength + variance));
    squad.push(generatePlayer({ position: pos, overall }));
  }

  // Assign roles
  const captain = squad.reduce((best, p) => (p.overall > best.overall ? p : best), squad[0]);
  captain.isCaptain = true;
  captain.trait = 'Captain Mentality';

  const penaltyTaker = squad.filter((p) => p.position === 'FWD' || p.position === 'MID')
    .sort((a, b) => b.shooting - a.shooting)[0];
  if (penaltyTaker) penaltyTaker.isPenaltyTaker = true;

  const fkTaker = squad.filter((p) => p.passing > 70).sort((a, b) => b.passing - a.passing)[0];
  if (fkTaker) fkTaker.isFreeKickTaker = true;

  const cornerTaker = squad.filter((p) => p.passing > 65).sort((a, b) => b.passing - a.passing)[1] || fkTaker;
  if (cornerTaker) cornerTaker.isCornerTaker = true;

  return squad;
};

export const generateYouthPlayer = () => generatePlayer({ age: randomInt(15, 19), overall: randomInt(55, 68), trait: 'Young Prospect' });
