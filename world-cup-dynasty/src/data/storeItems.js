// Store catalog — monetization-ready placeholders (no real payments in v1)
export const COIN_EARN_METHODS = [
  { id: 'daily', label: 'Daily Reward', coins: 100, description: 'Claim your daily bonus' },
  { id: 'watch_ad', label: 'Watch Ad for Coins', coins: 50, description: 'Coming soon — rewarded ads' },
  { id: 'challenge', label: 'Daily Challenge', coins: 75, description: 'Complete today\'s challenge' },
];

export const COSMETIC_ITEMS = [
  { id: 'classic_jersey', name: 'Classic Jersey Pack', type: 'cosmetic', currency: 'coins', price: 500, category: 'jersey' },
  { id: 'gold_trim', name: 'Gold Jersey Trim', type: 'cosmetic', currency: 'coins', price: 750, category: 'jersey' },
  { id: 'night_lights', name: 'Night Stadium Lights', type: 'cosmetic', currency: 'coins', price: 600, category: 'stadium' },
  { id: 'flag_pattern', name: 'Custom Flag Pattern Pack', type: 'cosmetic', currency: 'coins', price: 400, category: 'flag' },
  { id: 'rivalry_theme', name: 'Rivalry Matchday Theme', type: 'cosmetic', currency: 'coins', price: 800, category: 'theme' },
  { id: 'manager_suit', name: 'Manager Suit Pack', type: 'cosmetic', currency: 'gems', price: 15, category: 'manager' },
  { id: 'celebration', name: 'Trophy Celebration Pack', type: 'cosmetic', currency: 'gems', price: 20, category: 'celebration' },
  { id: 'light_show', name: 'Stadium Light Show', type: 'cosmetic', currency: 'gems', price: 25, category: 'stadium' },
];

export const UPGRADE_ITEMS = [
  { id: 'elite_training', name: 'Elite Training Session', type: 'upgrade', currency: 'coins', price: 300, effect: 'training_boost' },
  { id: 'scout_report', name: 'Advanced Scout Report', type: 'upgrade', currency: 'coins', price: 250, effect: 'scouting_boost' },
  { id: 'medical_recovery', name: 'Medical Recovery Boost', type: 'upgrade', currency: 'coins', price: 200, effect: 'fitness_recovery' },
  { id: 'youth_facility', name: 'Youth Academy Upgrade', type: 'upgrade', currency: 'coins', price: 1000, effect: 'youth_level' },
  { id: 'stadium_upgrade', name: 'Stadium Expansion', type: 'upgrade', currency: 'coins', price: 1500, effect: 'stadium_level' },
  { id: 'premium_scout', name: 'Premium Scouting Boost', type: 'upgrade', currency: 'gems', price: 10, effect: 'premium_scout' },
];

export const IAP_PLACEHOLDERS = [
  { id: 'starter_pack', name: 'Starter Pack', coins: 5000, gems: 50, price: '$4.99', description: 'Kickstart your dynasty' },
  { id: 'manager_elite', name: 'Manager Elite Pack', coins: 10000, gems: 100, price: '$9.99', description: 'Premium manager cosmetics + coins' },
  { id: 'stadium_pack', name: 'Stadium Upgrade Pack', coins: 7500, gems: 75, price: '$7.99', description: 'Stadium themes and upgrades' },
];

export const getStoreItem = (id) => {
  return [...COSMETIC_ITEMS, ...UPGRADE_ITEMS].find((item) => item.id === id);
};
