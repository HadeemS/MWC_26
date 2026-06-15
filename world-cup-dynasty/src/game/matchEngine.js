// Match simulation engine — calculates chances, events, and outcomes
import { getRandomReferee, VAR_TYPES } from '../data/referees';
import { getRandomWeather } from '../data/weather';

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

export const calculateTeamStrength = (team, modifiers = {}) => {
  const squad = team.squad || [];
  const avgOverall = squad.length
    ? squad.reduce((sum, p) => sum + p.overall, 0) / squad.length
    : team.strength || 70;

  let strength = avgOverall;
  strength += (team.chemistry || 70) * 0.1;
  strength += (team.morale || 70) * 0.08;
  strength += (team.fitness || 80) * 0.05;
  strength += modifiers.formationBonus || 0;
  strength += modifiers.tacticalBonus || 0;
  strength += modifiers.homeAdvantage || 0;
  strength += modifiers.weatherEffect || 0;
  strength += modifiers.rivalryBonus || 0;
  strength += modifiers.atmosphere || 0;
  strength += modifiers.decisionBonus || 0;

  return clamp(strength, 30, 99);
};

export const createMatchState = (homeTeam, awayTeam, options = {}) => {
  const referee = options.referee || getRandomReferee();
  const weather = options.weather || getRandomWeather();
  const isRivalry = options.isRivalry || false;

  return {
    homeTeam: { ...homeTeam, score: 0 },
    awayTeam: { ...awayTeam, score: 0 },
    minute: 0,
    phase: 'first_half',
    possession: 50,
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    injuries: [],
    events: [],
    momentum: 50,
    referee,
    weather,
    isRivalry,
    isKnockout: options.isKnockout || false,
    isHome: options.isHome !== false,
    tacticalModifiers: { home: {}, away: {} },
    pendingVAR: null,
    pendingDecision: null,
    finished: false,
    wentToExtraTime: false,
    wentToPenalties: false,
    stats: {
      homeStrength: 0,
      awayStrength: 0,
    },
  };
};

export const initMatchStrengths = (match) => {
  const homeMod = {
    homeAdvantage: match.isHome ? 5 : 0,
    weatherEffect: match.weather.effects.passing * 0.3,
    rivalryBonus: match.isRivalry ? 3 : 0,
    atmosphere: 5,
    ...match.tacticalModifiers.home,
  };
  const awayMod = {
    weatherEffect: match.weather.effects.passing * 0.3,
    rivalryBonus: match.isRivalry ? 3 : 0,
    ...match.tacticalModifiers.away,
  };

  match.stats.homeStrength = calculateTeamStrength(match.homeTeam, homeMod);
  match.stats.awayStrength = calculateTeamStrength(match.awayTeam, awayMod);
  return match;
};

const addEvent = (match, event) => {
  match.events = [...match.events, { ...event, minute: match.minute }];
  return event;
};

const simulateGoalChance = (match, isHomeAttack) => {
  const attackStr = isHomeAttack ? match.stats.homeStrength : match.stats.awayStrength;
  const defenseStr = isHomeAttack ? match.stats.awayStrength : match.stats.homeStrength;
  const chance = (attackStr - defenseStr + 50) / 200;

  if (Math.random() < chance * 0.15) {
    const team = isHomeAttack ? 'home' : 'away';
    match.shots[team]++;
    match.shotsOnTarget[team]++;

    if (Math.random() < 0.35 + chance * 0.2) {
      if (isHomeAttack) match.homeTeam.score++;
      else match.awayTeam.score++;

      const scorer = (isHomeAttack ? match.homeTeam : match.awayTeam).squad?.[
        Math.floor(Math.random() * 11)
      ];
      addEvent(match, {
        type: 'goal',
        team,
        player: scorer?.name || 'Unknown',
        text: `GOAL! ${scorer?.name || 'Player'} scores!`,
      });
      match.momentum = isHomeAttack ? clamp(match.momentum + 15, 0, 100) : clamp(match.momentum - 15, 0, 100);

      // VAR chance on goals
      if (Math.random() < 0.12) {
        match.pendingVAR = createVAREvent(match, 'goal_review', team);
      }
      return true;
    }
    addEvent(match, {
      type: 'shot',
      team,
      text: `Shot on target saved!`,
    });
  } else if (Math.random() < chance * 0.25) {
    const team = isHomeAttack ? 'home' : 'away';
    match.shots[team]++;
    addEvent(match, {
      type: 'shot_wide',
      team,
      text: 'Shot goes wide!',
    });
  }
  return false;
};

const simulateFoul = (match, referee) => {
  const cardChance = referee.cardRate * (referee.strictness / 100);
  if (Math.random() > cardChance) return;

  const isHomeFoul = Math.random() < 0.5 + (referee.homeBias / 200);
  const team = isHomeFoul ? 'home' : 'away';

  if (Math.random() < 0.15) {
    match.redCards[team]++;
    addEvent(match, { type: 'red_card', team, text: 'RED CARD! Sent off!' });
    if (Math.random() < 0.3) {
      match.pendingVAR = createVAREvent(match, 'red_card_review', team);
    }
  } else {
    match.yellowCards[team]++;
    addEvent(match, { type: 'yellow_card', team, text: 'Yellow card shown.' });
  }
};

const simulateInjury = (match) => {
  const team = Math.random() < 0.5 ? 'home' : 'away';
  const squad = team === 'home' ? match.homeTeam.squad : match.awayTeam.squad;
  const player = squad?.[Math.floor(Math.random() * Math.min(11, squad.length))];
  if (!player) return;

  match.injuries.push({ team, player: player.name, minute: match.minute });
  addEvent(match, { type: 'injury', team, player: player.name, text: `${player.name} is injured!` });
};

export const createVAREvent = (match, type, affectedTeam) => {
  const varType = VAR_TYPES.find((v) => v.type === type) || VAR_TYPES[0];
  const referee = match.referee;
  let overturnChance = 0.3;

  if (referee.personality === 'Shady') overturnChance = 0.45;
  if (referee.personality === 'Fair') overturnChance = 0.25;
  if (referee.personality === 'Drama-seeker') overturnChance = 0.5;

  return {
    ...varType,
    affectedTeam,
    overturnChance,
    originalDecision: type === 'goal_review' ? 'goal' : 'no_penalty',
    reviewed: false,
  };
};

export const resolveVAR = (match, varEvent, reaction) => {
  const overturned = Math.random() < varEvent.overturnChance;
  let text = '';

  if (varEvent.type === 'goal_review') {
    if (overturned) {
      if (varEvent.affectedTeam === 'home') match.homeTeam.score = Math.max(0, match.homeTeam.score - 1);
      else match.awayTeam.score = Math.max(0, match.awayTeam.score - 1);
      text = 'VAR: Goal DISALLOWED!';
    } else {
      text = 'VAR: Goal STANDS!';
    }
  } else if (varEvent.type === 'penalty_review') {
    if (overturned) {
      const team = varEvent.affectedTeam;
      if (team === 'home') match.homeTeam.score++;
      else match.awayTeam.score++;
      text = 'VAR: Penalty AWARDED and SCORED!';
    } else {
      text = 'VAR: No penalty.';
    }
  } else {
    text = overturned ? `VAR: Decision OVERTURNED!` : `VAR: Original decision stands.`;
  }

  addEvent(match, { type: 'var_result', text, overturned });
  match.pendingVAR = null;

  const moraleShift = reaction?.effects?.morale || 0;
  match.momentum = clamp(match.momentum + moraleShift, 0, 100);

  return { match, result: text, overturned };
};

export const simulateMinute = (match) => {
  if (match.finished || match.pendingVAR || match.pendingDecision) return match;

  match.minute++;
  const totalMinutes = match.wentToExtraTime ? 120 : 90;

  if (match.minute > totalMinutes) {
    if (match.isKnockout && match.homeTeam.score === match.awayTeam.score && !match.wentToExtraTime) {
      match.wentToExtraTime = true;
      match.minute = 91;
      addEvent(match, { type: 'extra_time', text: 'Extra time begins!' });
      return match;
    }
    match.finished = true;
    if (match.isKnockout && match.homeTeam.score === match.awayTeam.score) {
      match.wentToPenalties = true;
    }
    addEvent(match, { type: 'full_time', text: 'Full time!' });
    return match;
  }

  // Update possession based on strength
  const strDiff = match.stats.homeStrength - match.stats.awayStrength;
  match.possession = clamp(50 + strDiff * 0.3 + (Math.random() - 0.5) * 10, 20, 80);

  const homeAttacking = Math.random() < match.possession / 100;
  simulateGoalChance(match, homeAttacking);
  if (!homeAttacking) simulateGoalChance(match, false);

  if (Math.random() < match.referee.cardRate * 0.05) simulateFoul(match, match.referee);
  if (Math.random() < 0.008) simulateInjury(match);

  // Random decision moment
  if (Math.random() < 0.02 && match.minute > 15 && match.minute < 85) {
    match.pendingDecision = {
      id: `decision_${match.minute}`,
      minute: match.minute,
    };
  }

  // Momentum drift
  if (match.homeTeam.score > match.awayTeam.score) match.momentum = clamp(match.momentum + 1, 0, 100);
  else if (match.awayTeam.score > match.homeTeam.score) match.momentum = clamp(match.momentum - 1, 0, 100);

  return match;
};

export const applyTacticalDecision = (match, decision, isHome) => {
  const modKey = isHome ? 'home' : 'away';
  const effects = decision.effects || {};
  const mods = match.tacticalModifiers[modKey];

  mods.decisionBonus = (mods.decisionBonus || 0) + (effects.attack || 0) * 0.3 + (effects.defense || 0) * 0.2;
  match.tacticalModifiers[modKey] = mods;
  match.pendingDecision = null;

  addEvent(match, {
    type: 'tactical',
    team: modKey,
    text: `Manager: ${decision.label}`,
  });

  initMatchStrengths(match);
  return match;
};

export const getMatchResult = (match) => {
  if (match.homeTeam.score > match.awayTeam.score) return 'home_win';
  if (match.awayTeam.score > match.homeTeam.score) return 'away_win';
  return 'draw';
};

export const getPlayerTeamResult = (match, playerTeamId) => {
  const isHome = match.homeTeam.id === playerTeamId;
  const homeScore = match.homeTeam.score;
  const awayScore = match.awayTeam.score;

  if (homeScore === awayScore) return 'draw';
  if (isHome) return homeScore > awayScore ? 'win' : 'loss';
  return awayScore > homeScore ? 'win' : 'loss';
};
