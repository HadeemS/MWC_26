// Economy engine — coins, gems, rewards, and store transactions
// Designed for future IAP integration via expo-in-app-purchases or RevenueCat

const MATCH_REWARDS = {
  groupWin: 100,
  groupDraw: 40,
  knockoutWin: 200,
  tournamentWin: 1000,
  rivalryBonus: 150,
  cleanSheet: 50,
  youthDeveloped: 75,
};

const GEM_REWARDS = {
  tournamentWin: 25,
  achievement: 10,
  dailyLogin: 2,
  majorAchievement: 5,
};

export const createEconomyState = () => ({
  coins: 500,
  gems: 10,
  dailyRewardClaimed: false,
  lastDailyClaim: null,
  loginStreak: 0,
  unlockedCosmetics: [],
  purchasedUpgrades: [],
  totalCoinsEarned: 500,
  totalGemsEarned: 10,
});

export const awardCoins = (economy, reason, amount) => {
  const newEconomy = { ...economy };
  newEconomy.coins = (newEconomy.coins || 0) + amount;
  newEconomy.totalCoinsEarned = (newEconomy.totalCoinsEarned || 0) + amount;
  newEconomy.lastAward = { type: 'coins', reason, amount, timestamp: Date.now() };
  return newEconomy;
};

export const spendCoins = (economy, item, amount) => {
  if ((economy.coins || 0) < amount) return { success: false, economy, error: 'Insufficient coins' };
  const newEconomy = { ...economy };
  newEconomy.coins -= amount;
  newEconomy.lastPurchase = { item, amount, currency: 'coins', timestamp: Date.now() };
  return { success: true, economy: newEconomy };
};

export const awardGems = (economy, reason, amount) => {
  const newEconomy = { ...economy };
  newEconomy.gems = (newEconomy.gems || 0) + amount;
  newEconomy.totalGemsEarned = (newEconomy.totalGemsEarned || 0) + amount;
  newEconomy.lastAward = { type: 'gems', reason, amount, timestamp: Date.now() };
  return newEconomy;
};

export const spendGems = (economy, item, amount) => {
  if ((economy.gems || 0) < amount) return { success: false, economy, error: 'Insufficient gems' };
  const newEconomy = { ...economy };
  newEconomy.gems -= amount;
  newEconomy.lastPurchase = { item, amount, currency: 'gems', timestamp: Date.now() };
  return { success: true, economy: newEconomy };
};

export const claimDailyReward = (economy) => {
  const today = new Date().toDateString();
  if (economy.lastDailyClaim === today) {
    return { success: false, economy, error: 'Already claimed today' };
  }

  let newEconomy = { ...economy };
  const streak = economy.lastDailyClaim === new Date(Date.now() - 86400000).toDateString()
    ? (economy.loginStreak || 0) + 1
    : 1;

  const coinReward = 100 + streak * 10;
  newEconomy = awardCoins(newEconomy, 'daily_reward', coinReward);
  if (streak >= 7) {
    newEconomy = awardGems(newEconomy, 'weekly_streak', GEM_REWARDS.dailyLogin);
  }
  newEconomy.dailyRewardClaimed = true;
  newEconomy.lastDailyClaim = today;
  newEconomy.loginStreak = streak;

  return { success: true, economy: newEconomy, coinReward, streak };
};

export const calculateMatchRewards = (result, context = {}) => {
  let coins = 0;
  const bonuses = [];

  if (result === 'win') {
    coins = context.isKnockout ? MATCH_REWARDS.knockoutWin : MATCH_REWARDS.groupWin;
  } else if (result === 'draw') {
    coins = MATCH_REWARDS.groupDraw;
  }

  if (context.cleanSheet) {
    coins += MATCH_REWARDS.cleanSheet;
    bonuses.push({ label: 'Clean Sheet', amount: MATCH_REWARDS.cleanSheet });
  }
  if (context.isRivalry) {
    coins += MATCH_REWARDS.rivalryBonus;
    bonuses.push({ label: 'Rivalry Bonus', amount: MATCH_REWARDS.rivalryBonus });
  }

  return { coins, bonuses };
};

export const calculateTournamentRewards = (placement) => {
  if (placement === 1) {
    return { coins: MATCH_REWARDS.tournamentWin, gems: GEM_REWARDS.tournamentWin };
  }
  if (placement === 2) return { coins: 500, gems: 10 };
  if (placement <= 4) return { coins: 300, gems: 5 };
  if (placement <= 8) return { coins: 150, gems: 0 };
  return { coins: 50, gems: 0 };
};

export const unlockCosmetic = (economy, itemId) => {
  const newEconomy = { ...economy };
  newEconomy.unlockedCosmetics = [...(newEconomy.unlockedCosmetics || []), itemId];
  return newEconomy;
};

export const buyUpgrade = (economy, itemId) => {
  const newEconomy = { ...economy };
  newEconomy.purchasedUpgrades = [...(newEconomy.purchasedUpgrades || []), itemId];
  return newEconomy;
};

export { MATCH_REWARDS, GEM_REWARDS };
