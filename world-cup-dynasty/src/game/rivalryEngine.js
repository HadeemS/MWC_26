// Rivalry tracking — remembers history between nations
export const createRivalryState = () => ({});

export const getRivalry = (rivalryState, teamAId, teamBId) => {
  const key = [teamAId, teamBId].sort().join('_');
  return rivalryState[key] || {
    wins: 0,
    losses: 0,
    draws: 0,
    knockoutEliminations: 0,
    controversialMatches: 0,
    fanTension: 50,
    mediaStorylines: [],
  };
};

export const updateRivalry = (rivalryState, teamAId, teamBId, result, context = {}) => {
  const key = [teamAId, teamBId].sort().join('_');
  const rivalry = getRivalry(rivalryState, teamAId, teamBId);
  const isAHome = true;

  if (result === 'win') {
    rivalry.wins++;
  } else if (result === 'loss') {
    rivalry.losses++;
  } else {
    rivalry.draws++;
  }

  if (context.knockoutElimination) rivalry.knockoutEliminations++;
  if (context.controversial) {
    rivalry.controversialMatches++;
    rivalry.fanTension = Math.min(100, rivalry.fanTension + 10);
    rivalry.mediaStorylines = [
      ...rivalry.mediaStorylines.slice(-4),
      context.headline || 'Controversial clash fuels rivalry',
    ];
  }

  if (result === 'win') rivalry.fanTension = Math.min(100, rivalry.fanTension + 5);
  else if (result === 'loss') rivalry.fanTension = Math.min(100, rivalry.fanTension + 8);

  return { ...rivalryState, [key]: rivalry };
};

export const isRivalMatch = (country, opponentId) => {
  return (country.rivals || []).includes(opponentId);
};

export const getRivalryIntensity = (rivalry) => {
  const total = rivalry.wins + rivalry.losses + rivalry.draws;
  if (total === 0) return 30;
  return Math.min(100, 30 + total * 5 + rivalry.controversialMatches * 10 + rivalry.knockoutEliminations * 15);
};

export const getRivalryMatchEffects = (intensity) => ({
  morale: Math.floor(intensity * 0.1),
  atmosphere: Math.floor(intensity * 0.15),
  mediaPressure: Math.floor(intensity * 0.12),
  refereeScrutiny: Math.floor(intensity * 0.08),
});
