// Tournament bracket and group stage engine
import { COUNTRIES } from '../data/countries';
import { generateSquad } from '../data/fictionalPlayers';
import { GLOBAL_CUP } from '../data/tournaments';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const createTeamEntry = (country, isPlayer = false) => ({
  id: country.id,
  name: country.name,
  nickname: country.nickname,
  flagColors: country.flagColors,
  flagPattern: country.flagPattern,
  jerseyHome: country.jerseyHome,
  jerseyAway: country.jerseyAway,
  jerseyAccent: country.jerseyAccent,
  badgeShape: country.badgeShape,
  strength: country.strength,
  squad: country.squad || generateSquad(country.strength),
  chemistry: 70 + Math.floor(Math.random() * 20),
  morale: 70 + Math.floor(Math.random() * 20),
  fitness: 80 + Math.floor(Math.random() * 15),
  isPlayer,
});

export const createTournament = (playerCountry, teamCount = 16) => {
  const available = COUNTRIES.filter((c) => c.id !== playerCountry.id);
  const selected = shuffle(available).slice(0, teamCount - 1);
  const allTeams = shuffle([createTeamEntry(playerCountry, true), ...selected.map((c) => createTeamEntry(c))]);

  const groups = [];
  for (let i = 0; i < allTeams.length; i += GLOBAL_CUP.groupSize) {
    groups.push({
      id: `group_${String.fromCharCode(65 + groups.length)}`,
      name: `Group ${String.fromCharCode(65 + groups.length)}`,
      teams: allTeams.slice(i, i + GLOBAL_CUP.groupSize).map((team) => ({
        ...team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      })),
      fixtures: [],
      completed: false,
    });
  }

  // Generate round-robin fixtures within each group
  groups.forEach((group) => {
    const teams = group.teams;
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        group.fixtures.push({
          id: `fix_${group.id}_${i}_${j}`,
          home: teams[i],
          away: teams[j],
          homeScore: null,
          awayScore: null,
          played: false,
          stage: 'group',
        });
      }
    }
  });

  return {
    id: `tournament_${Date.now()}`,
    name: GLOBAL_CUP.name,
    stage: 'group',
    groups,
    knockout: [],
    currentRound: 0,
    playerTeamId: playerCountry.id,
    champion: null,
    completed: false,
  };
};

export const getGroupStandings = (group) => {
  return [...group.teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });
};

export const updateGroupAfterMatch = (group, homeId, awayId, homeScore, awayScore) => {
  const home = group.teams.find((t) => t.id === homeId);
  const away = group.teams.find((t) => t.id === awayId);
  if (!home || !away) return group;

  home.played++;
  away.played++;
  home.goalsFor += homeScore;
  home.goalsAgainst += awayScore;
  away.goalsFor += awayScore;
  away.goalsAgainst += homeScore;

  if (homeScore > awayScore) {
    home.won++;
    home.points += 3;
    away.lost++;
  } else if (awayScore > homeScore) {
    away.won++;
    away.points += 3;
    home.lost++;
  } else {
    home.drawn++;
    away.drawn++;
    home.points += 1;
    away.points += 1;
  }

  const fixture = group.fixtures.find(
    (f) => (f.home.id === homeId && f.away.id === awayId) || (f.home.id === awayId && f.away.id === homeId)
  );
  if (fixture) {
    fixture.played = true;
    fixture.homeScore = homeScore;
    fixture.awayScore = awayScore;
  }

  group.completed = group.fixtures.every((f) => f.played);
  return group;
};

export const getNextFixture = (tournament) => {
  if (tournament.stage === 'group') {
    const playerGroup = tournament.groups.find((g) =>
      g.teams.some((t) => t.id === tournament.playerTeamId)
    );
    if (!playerGroup) return null;
    return playerGroup.fixtures.find((f) => !f.played && (
      f.home.id === tournament.playerTeamId || f.away.id === tournament.playerTeamId
    ));
  }

  return tournament.knockout.find((m) => !m.played && (
    m.home.id === tournament.playerTeamId || m.away.id === tournament.playerTeamId
  ));
};

export const advanceToKnockout = (tournament) => {
  const qualifiers = [];
  tournament.groups.forEach((group) => {
    const standings = getGroupStandings(group);
    qualifiers.push(standings[0], standings[1]);
  });

  const roundNames = ['Round of 16', 'Quarterfinal', 'Semifinal', 'Final'];
  let teams = shuffle(qualifiers);
  const knockout = [];

  // Build bracket
  for (let i = 0; i < teams.length; i += 2) {
    knockout.push({
      id: `ko_r16_${i / 2}`,
      home: teams[i],
      away: teams[i + 1],
      homeScore: null,
      awayScore: null,
      played: false,
      stage: 'Round of 16',
      isKnockout: true,
    });
  }

  tournament.knockout = knockout;
  tournament.stage = 'knockout';
  tournament.currentRound = 0;
  return tournament;
};

export const advanceKnockoutRound = (tournament) => {
  const currentStage = tournament.knockout[0]?.stage;
  const winners = [];

  for (let i = 0; i < tournament.knockout.length; i += 2) {
    const m1 = tournament.knockout[i];
    const m2 = tournament.knockout[i + 1];
    if (!m1?.played) continue;

    const w1 = m1.homeScore > m1.awayScore ? m1.home : m1.away;
    if (m2) {
      const w2 = m2.homeScore > m2.awayScore ? m2.home : m2.away;
      winners.push(w1, w2);
    } else {
      winners.push(w1);
    }
  }

  if (winners.length <= 1) {
    tournament.champion = winners[0];
    tournament.completed = true;
    return tournament;
  }

  const stageMap = {
    'Round of 16': 'Quarterfinal',
    Quarterfinal: 'Semifinal',
    Semifinal: 'Final',
  };
  const nextStage = stageMap[currentStage] || 'Final';
  const nextRound = [];

  for (let i = 0; i < winners.length; i += 2) {
    if (winners[i + 1]) {
      nextRound.push({
        id: `ko_${nextStage}_${i / 2}`,
        home: winners[i],
        away: winners[i + 1],
        homeScore: null,
        awayScore: null,
        played: false,
        stage: nextStage,
        isKnockout: true,
      });
    }
  }

  tournament.knockout = nextRound;
  tournament.currentRound++;
  return tournament;
};

export const isPlayerEliminated = (tournament) => {
  if (tournament.stage === 'group') {
    const playerGroup = tournament.groups.find((g) =>
      g.teams.some((t) => t.id === tournament.playerTeamId)
    );
    if (playerGroup?.completed) {
      const standings = getGroupStandings(playerGroup);
      const position = standings.findIndex((t) => t.id === tournament.playerTeamId);
      return position >= 2;
    }
    return false;
  }

  const playerMatch = tournament.knockout.find(
    (m) => m.played && (m.home.id === tournament.playerTeamId || m.away.id === tournament.playerTeamId)
  );
  if (!playerMatch) return false;

  const won =
    (playerMatch.home.id === tournament.playerTeamId && playerMatch.homeScore > playerMatch.awayScore) ||
    (playerMatch.away.id === tournament.playerTeamId && playerMatch.awayScore > playerMatch.homeScore);

  return !won;
};

export const getAllGroupFixtures = (tournament) => {
  return tournament.groups.flatMap((g) => g.fixtures);
};
