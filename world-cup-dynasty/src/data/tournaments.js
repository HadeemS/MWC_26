// Global Cup tournament configuration — fictional branding
export const GLOBAL_CUP = {
  id: 'global_cup',
  name: 'Global Cup',
  subtitle: 'Road to Glory',
  teams: 16,
  groupSize: 4,
  groupMatches: 3,
  stages: ['Group Stage', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Final'],
};

export const GAME_MODES = [
  { id: 'quick', label: 'Quick Tournament', description: 'Jump into a fast Global Cup run', icon: 'flash' },
  { id: 'career', label: 'Career Mode', description: 'Build your manager career over seasons', icon: 'briefcase' },
  { id: 'create', label: 'Create-a-Country', description: 'Design your nation from scratch', icon: 'flag' },
  { id: 'road', label: 'Road to Glory', description: 'Underdog story to champions', icon: 'trophy' },
  { id: 'custom', label: 'Custom Cup Builder', description: 'Set up your own tournament', icon: 'construct' },
  { id: 'legacy', label: 'Legacy Mode', description: '20-year dynasty across tournaments', icon: 'time' },
];

export const ACHIEVEMENTS = [
  { id: 'first_win', title: 'First Win', description: 'Win your first match', gems: 0, coins: 50 },
  { id: 'first_clean_sheet', title: 'First Clean Sheet', description: 'Keep a shutout', gems: 0, coins: 50 },
  { id: 'beat_rival', title: 'Beat a Rival', description: 'Defeat a rival nation', gems: 2, coins: 100 },
  { id: 'var_disaster', title: 'Survive a VAR Disaster', description: 'Overcome a controversial VAR call', gems: 3, coins: 75 },
  { id: 'penalties', title: 'Win on Penalties', description: 'Win a knockout match on penalties', gems: 5, coins: 150 },
  { id: 'youth_star', title: 'Develop a Youth Star', description: 'Promote a youth player to 80+ overall', gems: 5, coins: 100 },
  { id: 'global_cup', title: 'Win the Global Cup', description: 'Lift the Global Cup trophy', gems: 25, coins: 1000 },
  { id: 'dynasty', title: 'Build a Dynasty', description: 'Win 3 tournaments in Legacy Mode', gems: 50, coins: 2000 },
  { id: 'win_streak', title: '10 Match Win Streak', description: 'Win 10 matches in a row', gems: 10, coins: 500 },
  { id: 'legend', title: 'Career Legend', description: 'Reach 90+ manager reputation', gems: 25, coins: 1500 },
];
