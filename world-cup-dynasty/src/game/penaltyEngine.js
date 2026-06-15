// Penalty shootout mini-game engine
const DIRECTIONS = ['left', 'center', 'right', 'high_left', 'high_right'];

export const createPenaltyShootout = (homeTeam, awayTeam) => ({
  homeTeam: { id: homeTeam.id, name: homeTeam.name, score: 0 },
  awayTeam: { id: awayTeam.id, name: awayTeam.name, score: 0 },
  round: 1,
  currentKicker: 'home',
  maxRounds: 5,
  history: [],
  finished: false,
  winner: null,
  pressure: 30,
});

export const getShotSuccessChance = (player, direction, pressure) => {
  let base = (player?.shooting || 70) * 0.5 + (player?.composure || 70) * 0.4;
  base -= pressure * 0.2;
  if (player?.trait === 'Penalty Specialist') base += 15;
  if (player?.trait === 'Clutch Finisher') base += 8;
  if (player?.trait === 'Hot Head') base -= 5;
  return Math.max(20, Math.min(95, base));
};

export const getSaveChance = (gk, diveDirection, shotDirection, pressure) => {
  let base = (gk?.defense || 70) * 0.4 + (gk?.composure || 70) * 0.3;
  if (diveDirection === shotDirection) base += 25;
  else if (diveDirection === 'center' && shotDirection.includes('center')) base += 15;
  base += pressure * 0.05;
  return Math.max(10, Math.min(80, base));
};

export const takePenalty = (shootout, kicker, goalkeeper, shotDir, diveDir) => {
  const pressure = shootout.pressure + shootout.round * 8;
  const shotChance = getShotSuccessChance(kicker, shotDir, pressure);
  const saveChance = diveDirectionMatch(shotDir, diveDir) ? getSaveChance(goalkeeper, diveDir, shotDir, pressure) : 10;

  const scored = Math.random() * 100 < shotChance && Math.random() * 100 > saveChance;
  const team = shootout.currentKicker;

  if (scored) {
    if (team === 'home') shootout.homeTeam.score++;
    else shootout.awayTeam.score++;
  }

  shootout.history.push({
    round: shootout.round,
    team,
    kicker: kicker?.name || 'Player',
    shotDir,
    diveDir,
    scored,
    pressure,
  });

  shootout.currentKicker = team === 'home' ? 'away' : 'home';
  if (shootout.currentKicker === 'home') shootout.round++;

  // Check win conditions
  const remainingHome = shootout.maxRounds - shootout.round + (shootout.currentKicker === 'home' ? 1 : 0);
  const remainingAway = shootout.maxRounds - shootout.round + (shootout.currentKicker === 'away' ? 1 : 0);

  if (shootout.round > shootout.maxRounds) {
    if (shootout.homeTeam.score !== shootout.awayTeam.score) {
      shootout.finished = true;
      shootout.winner = shootout.homeTeam.score > shootout.awayTeam.score ? 'home' : 'away';
    } else if (shootout.round > shootout.maxRounds + 5) {
      shootout.finished = true;
      shootout.winner = 'home'; // sudden death fallback
    }
  }

  // Early win detection
  if (shootout.homeTeam.score > shootout.awayTeam.score + remainingAway) {
    shootout.finished = true;
    shootout.winner = 'home';
  } else if (shootout.awayTeam.score > shootout.homeTeam.score + remainingHome) {
    shootout.finished = true;
    shootout.winner = 'away';
  }

  return { shootout, scored, pressure };
};

const diveDirectionMatch = (shot, dive) => {
  if (shot === dive) return true;
  if (shot.includes('left') && dive.includes('left')) return true;
  if (shot.includes('right') && dive.includes('right')) return true;
  return false;
};

export const getPenaltyDirections = () => DIRECTIONS;

export const getDirectionLabel = (dir) => {
  const labels = {
    left: 'Bottom Left',
    center: 'Center',
    right: 'Bottom Right',
    high_left: 'Top Left',
    high_right: 'Top Right',
  };
  return labels[dir] || dir;
};
