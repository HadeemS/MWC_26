// AsyncStorage save/load manager — persists all game progress
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVE_PREFIX = '@wcd_save_';
const SETTINGS_KEY = '@wcd_settings';
const MAX_SLOTS = 3;

export const getDefaultGameState = () => ({
  version: 1,
  createdAt: Date.now(),
  lastPlayed: Date.now(),
  gameMode: null,
  manager: null,
  country: null,
  squad: [],
  teamStats: {
    chemistry: 75,
    morale: 75,
    fitness: 85,
    fanApproval: 70,
    federationTrust: 70,
    mediaPressure: 25,
    worldRanking: 20,
    disciplineRecord: 0,
  },
  economy: {
    coins: 500,
    gems: 10,
    dailyRewardClaimed: false,
    lastDailyClaim: null,
    loginStreak: 0,
    unlockedCosmetics: [],
    purchasedUpgrades: [],
  },
  tournament: null,
  currentMatch: null,
  youthAcademy: { level: 1, capacity: 8, players: [], developmentRate: 1, facilities: { training: 1, medical: 1, scouting: 1 } },
  scouting: { level: 1, activeReports: [], history: [], regionsUnlocked: ['northern', 'coastal'] },
  rivalries: {},
  trophies: [],
  achievements: [],
  careerHistory: [],
  legacy: { year: 1, maxYears: 20, tournamentsPlayed: 0 },
  winStreak: 0,
  settings: { sound: true, music: true, notifications: true },
});

export const saveGame = async (slotIndex, gameState) => {
  try {
    const key = `${SAVE_PREFIX}${slotIndex}`;
    const data = { ...gameState, lastPlayed: Date.now() };
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loadGame = async (slotIndex) => {
  try {
    const key = `${SAVE_PREFIX}${slotIndex}`;
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return { success: false, error: 'No save found' };
    return { success: true, data: JSON.parse(raw) };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteSave = async (slotIndex) => {
  try {
    const key = `${SAVE_PREFIX}${slotIndex}`;
    await AsyncStorage.removeItem(key);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getSaveSlots = async () => {
  const slots = [];
  for (let i = 0; i < MAX_SLOTS; i++) {
    const result = await loadGame(i);
    slots.push({
      index: i,
      occupied: result.success,
      data: result.success ? result.data : null,
    });
  }
  return slots;
};

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loadSettings = async () => {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { sound: true, music: true, notifications: true };
  } catch {
    return { sound: true, music: true, notifications: true };
  }
};

export { MAX_SLOTS };
