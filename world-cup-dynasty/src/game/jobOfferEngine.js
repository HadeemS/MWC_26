// Job offer engine — post-tournament career opportunities
import { COUNTRIES } from '../data/countries';

export const generateJobOffers = (careerState) => {
  const reputation = careerState.manager?.reputation || 50;
  const trophies = careerState.trophies?.length || 0;
  const fanApproval = careerState.teamStats?.fanApproval || 70;
  const offers = [];

  // Smaller country rebuild
  if (reputation >= 40) {
    const small = COUNTRIES.filter((c) => c.strength < 72).slice(0, 2);
    small.forEach((country) => {
      offers.push({
        id: `offer_rebuild_${country.id}`,
        type: 'rebuild',
        country,
        title: `${country.name} — Rebuild Project`,
        description: `Take charge of ${country.nickname} and build something special.`,
        salary: 50000 + reputation * 500,
        reputation_required: 40,
        appeal: 60 + Math.floor(Math.random() * 20),
      });
    });
  }

  // Bigger country
  if (reputation >= 60 || trophies >= 1) {
    const big = COUNTRIES.filter((c) => c.strength >= 78).slice(0, 2);
    big.forEach((country) => {
      offers.push({
        id: `offer_elite_${country.id}`,
        type: 'elite',
        country,
        title: `${country.name} — Contender`,
        description: `Lead ${country.nickname} in pursuit of Global Cup glory.`,
        salary: 150000 + reputation * 1000,
        reputation_required: 60,
        appeal: 80 + Math.floor(Math.random() * 15),
      });
    });
  }

  // Youth national team
  offers.push({
    id: 'offer_youth',
    type: 'youth_nt',
    country: null,
    title: 'Youth National Team',
    description: 'Develop the next generation of stars.',
    salary: 40000,
    reputation_required: 30,
    appeal: 50 + (careerState.youthAcademy?.level || 1) * 5,
  });

  // Federation director
  if (reputation >= 75 && trophies >= 2) {
    offers.push({
      id: 'offer_federation',
      type: 'federation',
      country: careerState.country,
      title: 'Federation Director',
      description: 'Shape the future of national football from the boardroom.',
      salary: 200000,
      reputation_required: 75,
      appeal: 90,
    });
  }

  // Stay with current team
  if (careerState.country) {
    offers.unshift({
      id: 'offer_stay',
      type: 'stay',
      country: careerState.country,
      title: `Stay with ${careerState.country.name}`,
      description: 'Continue building your dynasty.',
      salary: 80000 + trophies * 20000,
      reputation_required: 0,
      appeal: fanApproval,
    });
  }

  return offers.sort((a, b) => b.appeal - a.appeal).slice(0, 4);
};

export const acceptJobOffer = (careerState, offer) => {
  if (offer.type === 'stay') return { ...careerState, jobChanged: false };

  return {
    ...careerState,
    country: offer.country,
    jobChanged: true,
    manager: {
      ...careerState.manager,
      currentJob: offer.title,
      salary: offer.salary,
    },
    teamStats: {
      ...careerState.teamStats,
      fanApproval: 60,
      federationTrust: 65,
      mediaPressure: 30,
    },
  };
};
