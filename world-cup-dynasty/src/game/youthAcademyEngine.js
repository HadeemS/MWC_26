// Youth academy — develop and promote young prospects
import { generateYouthPlayer } from '../data/fictionalPlayers';

export const createYouthAcademy = () => ({
  level: 1,
  capacity: 8,
  players: [],
  developmentRate: 1,
  facilities: {
    training: 1,
    medical: 1,
    scouting: 1,
  },
  tournamentsWon: 0,
});

export const generateAcademyIntake = (academy) => {
  const count = Math.min(3, academy.capacity - academy.players.length);
  const newPlayers = [];
  for (let i = 0; i < count; i++) {
    newPlayers.push(generateYouthPlayer());
  }
  return newPlayers;
};

export const developYouthPlayer = (player, academy) => {
  const growth = Math.floor(Math.random() * 3) + academy.developmentRate;
  const newOverall = Math.min(player.potential, player.overall + growth);
  const developed = newOverall > player.overall;

  return {
    ...player,
    overall: newOverall,
    pace: Math.min(99, player.pace + (developed ? 1 : 0)),
    shooting: Math.min(99, player.shooting + (developed ? 1 : 0)),
    passing: Math.min(99, player.passing + (developed ? 1 : 0)),
    defense: Math.min(99, player.defense + (developed ? 1 : 0)),
    developed,
  };
};

export const promoteToSenior = (player, squad) => {
  return [...squad, { ...player, age: player.age + 1 }];
};

export const upgradeAcademy = (academy) => {
  if (academy.level >= 5) return academy;
  return {
    ...academy,
    level: academy.level + 1,
    capacity: academy.capacity + 2,
    developmentRate: academy.developmentRate + 0.5,
    facilities: {
      training: academy.facilities.training + 1,
      medical: academy.facilities.medical + 1,
      scouting: academy.facilities.scouting + 1,
    },
  };
};

export const runYouthDevelopment = (academy) => {
  const developedPlayers = academy.players.map((p) => developYouthPlayer(p, academy));
  const starsPromoted = developedPlayers.filter((p) => p.overall >= 80);
  return { players: developedPlayers, starsPromoted };
};
