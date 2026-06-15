// Scouting system — send scouts to regions for player reports
import { generatePlayer } from '../data/fictionalPlayers';

const REGIONS = [
  { id: 'northern', name: 'Northern Territories', cost: 200, quality: 0.7 },
  { id: 'southern', name: 'Southern Isles', cost: 250, quality: 0.75 },
  { id: 'continental', name: 'Continental Heartland', cost: 300, quality: 0.8 },
  { id: 'coastal', name: 'Coastal Regions', cost: 200, quality: 0.65 },
  { id: 'mountain', name: 'Mountain Provinces', cost: 350, quality: 0.85 },
];

const REPORT_TYPES = [
  { type: 'hidden_gem', label: 'Hidden Gem', minOverall: 70, maxOverall: 82 },
  { type: 'future_star', label: 'Future Star', minOverall: 65, maxOverall: 78, highPotential: true },
  { type: 'injury_prone', label: 'Injury-Prone Talent', minOverall: 68, maxOverall: 80, trait: 'Injury Prone' },
  { type: 'gk_prospect', label: 'Goalkeeper Prospect', position: 'GK', minOverall: 65, maxOverall: 78 },
  { type: 'defensive_leader', label: 'Defensive Leader', position: 'DEF', minOverall: 68, maxOverall: 82 },
  { type: 'creative_mid', label: 'Creative Midfielder', position: 'MID', minOverall: 68, maxOverall: 84 },
  { type: 'fast_winger', label: 'Fast Winger', position: 'FWD', minOverall: 66, maxOverall: 80 },
  { type: 'squad_depth', label: 'Squad Depth Option', minOverall: 60, maxOverall: 72 },
];

export const getScoutRegions = () => REGIONS;

export const sendScout = (regionId, scoutingLevel = 1) => {
  const region = REGIONS.find((r) => r.id === regionId);
  if (!region) return null;

  const reportType = REPORT_TYPES[Math.floor(Math.random() * REPORT_TYPES.length)];
  const qualityBonus = region.quality + scoutingLevel * 0.05;
  const overall = Math.floor(
    reportType.minOverall + Math.random() * (reportType.maxOverall - reportType.minOverall) * qualityBonus
  );

  const player = generatePlayer({
    position: reportType.position,
    overall,
    trait: reportType.trait,
    potential: reportType.highPotential ? overall + 15 : undefined,
  });

  return {
    id: `scout_${Date.now()}`,
    region: region.name,
    type: reportType.type,
    label: reportType.label,
    player,
    cost: region.cost,
    timestamp: Date.now(),
    signed: false,
  };
};

export const createScoutingState = () => ({
  level: 1,
  activeReports: [],
  history: [],
  regionsUnlocked: ['northern', 'coastal'],
});
