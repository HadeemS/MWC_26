// Weather conditions and their match effects
export const WEATHER_TYPES = [
  {
    id: 'clear',
    label: 'Clear',
    icon: 'sunny',
    effects: { passing: 0, stamina: 0, injury: 0, longShots: 0, gkMistakes: 0, crowd: 5 },
  },
  {
    id: 'rain',
    label: 'Rain',
    icon: 'rainy',
    effects: { passing: -8, stamina: -5, injury: 5, longShots: -5, gkMistakes: 10, crowd: -3 },
  },
  {
    id: 'heavy_rain',
    label: 'Heavy Rain',
    icon: 'thunderstorm',
    effects: { passing: -15, stamina: -10, injury: 10, longShots: -10, gkMistakes: 20, crowd: -8 },
  },
  {
    id: 'heat',
    label: 'Heat',
    icon: 'flame',
    effects: { passing: -3, stamina: -15, injury: 8, longShots: 0, gkMistakes: 5, crowd: -5 },
  },
  {
    id: 'snow',
    label: 'Snow',
    icon: 'snow',
    effects: { passing: -12, stamina: -8, injury: 12, longShots: -8, gkMistakes: 15, crowd: 3 },
  },
  {
    id: 'wind',
    label: 'Wind',
    icon: 'flag',
    effects: { passing: -10, stamina: -3, injury: 3, longShots: -12, gkMistakes: 8, crowd: 0 },
  },
];

export const getRandomWeather = () => WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)];

export const getWeatherById = (id) => WEATHER_TYPES.find((w) => w.id === id) || WEATHER_TYPES[0];
