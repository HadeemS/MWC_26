import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getDefaultGameState, saveGame, loadGame } from '../game/saveManager';
import { createTournament, createTeamEntry } from '../game/tournamentEngine';
import { generateSquad } from '../data/fictionalPlayers';
import { createYouthAcademy } from '../game/youthAcademyEngine';
import { createScoutingState } from '../game/scoutingEngine';
import { createEconomyState, awardCoins, awardGems, spendCoins, spendGems, claimDailyReward, calculateMatchRewards, calculateTournamentRewards } from '../game/economyEngine';
import { updateRivalry, isRivalMatch } from '../game/rivalryEngine';
import { ACHIEVEMENTS } from '../data/tournaments';
import { getStoreItem } from '../data/storeItems';

const GameContext = createContext(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(getDefaultGameState());
  const [currentSlot, setCurrentSlot] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const updateState = useCallback((updater) => {
    setGameState((prev) => (typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }));
  }, []);

  const initNewGame = useCallback((mode, manager, country) => {
    const squad = country.squad || generateSquad(country.strength || 70);
    const state = {
      ...getDefaultGameState(),
      gameMode: mode,
      manager: { ...manager, reputation: 50 },
      country: { ...country, squad: undefined },
      squad,
      economy: createEconomyState(),
      youthAcademy: createYouthAcademy(),
      scouting: createScoutingState(),
      createdAt: Date.now(),
    };
    setGameState(state);
    return state;
  }, []);

  const startTournament = useCallback(() => {
    updateState((prev) => {
      const playerTeam = createTeamEntry(prev.country, true);
      playerTeam.squad = prev.squad;
      const tournament = createTournament(playerTeam);
      return { ...prev, tournament };
    });
  }, [updateState]);

  const saveCurrentGame = useCallback(async () => {
    return saveGame(currentSlot, gameState);
  }, [currentSlot, gameState]);

  const loadSlot = useCallback(async (slotIndex) => {
    setIsLoading(true);
    const result = await loadGame(slotIndex);
    if (result.success) {
      setGameState(result.data);
      setCurrentSlot(slotIndex);
    }
    setIsLoading(false);
    return result;
  }, []);

  const unlockAchievement = useCallback((achievementId) => {
    updateState((prev) => {
      if (prev.achievements?.includes(achievementId)) return prev;
      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
      let economy = prev.economy;
      if (achievement?.coins) economy = awardCoins(economy, achievementId, achievement.coins);
      if (achievement?.gems) economy = awardGems(economy, achievementId, achievement.gems);
      return {
        ...prev,
        achievements: [...(prev.achievements || []), achievementId],
        economy,
      };
    });
  }, [updateState]);

  const processMatchResult = useCallback((result, match, opponentId) => {
    updateState((prev) => {
      const isRivalry = isRivalMatch(prev.country, opponentId);
      const rewards = calculateMatchRewards(result, {
        isKnockout: match?.isKnockout,
        cleanSheet: match && getCleanSheet(prev, match),
        isRivalry,
      });

      let economy = awardCoins(prev.economy, 'match', rewards.coins);
      let winStreak = result === 'win' ? (prev.winStreak || 0) + 1 : 0;
      let rivalries = prev.rivalries || {};

      if (isRivalry && opponentId) {
        rivalries = updateRivalry(rivalries, prev.country.id, opponentId, result);
      }

      const teamStats = { ...prev.teamStats };
      if (result === 'win') {
        teamStats.fanApproval = Math.min(100, (teamStats.fanApproval || 70) + 5);
        teamStats.morale = Math.min(100, (teamStats.morale || 70) + 8);
      } else if (result === 'loss') {
        teamStats.fanApproval = Math.max(0, (teamStats.fanApproval || 70) - 5);
        teamStats.morale = Math.max(0, (teamStats.morale || 70) - 8);
      }

      return { ...prev, economy, winStreak, rivalries, teamStats, lastMatchRewards: rewards };
    });
  }, [updateState]);

  const purchaseItem = useCallback((itemId) => {
    const item = getStoreItem(itemId);
    if (!item) return { success: false, error: 'Item not found' };

    let result;
    updateState((prev) => {
      if (item.currency === 'coins') {
        result = spendCoins(prev.economy, itemId, item.price);
      } else {
        result = spendGems(prev.economy, itemId, item.price);
      }
      if (!result.success) return prev;

      const economy = result.economy;
      if (item.type === 'cosmetic') {
        economy.unlockedCosmetics = [...(economy.unlockedCosmetics || []), itemId];
      } else {
        economy.purchasedUpgrades = [...(economy.purchasedUpgrades || []), itemId];
      }
      return { ...prev, economy };
    });
    return result || { success: false };
  }, [updateState]);

  const claimDaily = useCallback(() => {
    let claimResult;
    updateState((prev) => {
      claimResult = claimDailyReward(prev.economy);
      if (!claimResult.success) return prev;
      return { ...prev, economy: claimResult.economy };
    });
    return claimResult;
  }, [updateState]);

  const addTrophy = useCallback((trophy) => {
    updateState((prev) => {
      const rewards = calculateTournamentRewards(1);
      let economy = awardCoins(prev.economy, 'tournament_win', rewards.coins);
      economy = awardGems(economy, 'tournament_win', rewards.gems);
      return {
        ...prev,
        trophies: [...(prev.trophies || []), trophy],
        economy,
        manager: { ...prev.manager, reputation: Math.min(99, (prev.manager?.reputation || 50) + 10) },
      };
    });
  }, [updateState]);

  const value = {
    gameState,
    setGameState: updateState,
    currentSlot,
    setCurrentSlot,
    isLoading,
    initNewGame,
    startTournament,
    saveCurrentGame,
    loadSlot,
    unlockAchievement,
    processMatchResult,
    purchaseItem,
    claimDaily,
    addTrophy,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const getCleanSheet = (state, match) => {
  if (!match) return false;
  const isHome = match.homeTeam?.id === state.country?.id;
  return isHome ? match.awayTeam?.score === 0 : match.homeTeam?.score === 0;
};
