// Decision consequence engine — applies choice effects to game state
const clamp = (val, min = 0, max = 100) => Math.max(min, Math.min(max, val));

export const applyEffects = (state, effects) => {
  const newState = { ...state };
  const teamStats = { ...(newState.teamStats || {}) };

  if (effects.morale !== undefined) teamStats.morale = clamp((teamStats.morale || 70) + effects.morale);
  if (effects.chemistry !== undefined) teamStats.chemistry = clamp((teamStats.chemistry || 70) + effects.chemistry);
  if (effects.fanApproval !== undefined) teamStats.fanApproval = clamp((teamStats.fanApproval || 70) + effects.fanApproval);
  if (effects.federationTrust !== undefined) teamStats.federationTrust = clamp((teamStats.federationTrust || 70) + effects.federationTrust);
  if (effects.mediaPressure !== undefined) teamStats.mediaPressure = clamp((teamStats.mediaPressure || 30) + effects.mediaPressure);
  if (effects.fitness !== undefined) teamStats.fitness = clamp((teamStats.fitness || 80) + effects.fitness);
  if (effects.discipline !== undefined) teamStats.disciplineRecord = (teamStats.disciplineRecord || 0) + effects.discipline;
  if (effects.loyalty !== undefined) {
    newState.squad = (newState.squad || []).map((p) => ({
      ...p,
      loyalty: clamp((p.loyalty || 70) + effects.loyalty),
    }));
  }
  if (effects.development !== undefined) {
    newState.youthAcademy = {
      ...(newState.youthAcademy || {}),
      developmentBonus: (newState.youthAcademy?.developmentBonus || 0) + effects.development,
    };
  }
  if (effects.rivalry !== undefined) {
    newState.rivalryIntensity = clamp((newState.rivalryIntensity || 50) + effects.rivalry, 0, 100);
  }

  if (effects.coins !== undefined && newState.economy) {
    newState.economy = { ...newState.economy, coins: (newState.economy.coins || 0) + effects.coins };
  }

  if (effects.reputation !== undefined) {
    newState.manager = {
      ...(newState.manager || {}),
      reputation: clamp((newState.manager?.reputation || 50) + effects.reputation),
    };
  }

  newState.teamStats = teamStats;
  return newState;
};

export const processDecision = (gameState, decision) => {
  return applyEffects(gameState, decision.effects || {});
};

export const processPressAnswer = (gameState, answer) => {
  return applyEffects(gameState, answer.effects || {});
};

export const processLockerRoomChoice = (gameState, choice) => {
  return applyEffects(gameState, choice.effects || {});
};

export const processVARReaction = (gameState, reaction) => {
  return applyEffects(gameState, reaction.effects || {});
};

export const processShadyRefResponse = (gameState, response) => {
  return applyEffects(gameState, response.effects || {});
};
