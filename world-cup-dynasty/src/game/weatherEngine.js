// Weather effects applied during match simulation
import { getRandomWeather, getWeatherById } from '../data/weather';

export const applyWeatherToTeam = (team, weather) => {
  const effects = weather.effects;
  return {
    ...team,
    fitness: Math.max(50, (team.fitness || 80) + effects.stamina),
    _weatherMods: {
      passing: effects.passing,
      injury: effects.injury,
      longShots: effects.longShots,
      gkMistakes: effects.gkMistakes,
      crowd: effects.crowd,
    },
  };
};

export const getWeatherMatchModifier = (weather) => {
  const e = weather.effects;
  return e.passing * 0.3 + e.longShots * 0.1 + e.crowd * 0.05;
};

export { getRandomWeather, getWeatherById };
