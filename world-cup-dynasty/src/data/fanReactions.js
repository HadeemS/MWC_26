// Fictional fan social media reactions
export const FAN_REACTIONS = {
  win: [
    { username: 'GoldLionFan99', text: 'WHAT A PERFORMANCE! Manager got the tactics spot on! 🦁', sentiment: 'positive' },
    { username: 'TacticsGuru', text: 'That substitution was genius. We are cooking!', sentiment: 'positive' },
    { username: 'StadiumRoar', text: 'Best win of the season. BELIEVE!', sentiment: 'positive' },
  ],
  loss: [
    { username: 'FrustratedFan', text: 'How do we lose that? Substitutions were too late.', sentiment: 'negative' },
    { username: 'ArmchairBoss', text: 'I would have started the young striker. Just saying.', sentiment: 'negative' },
    { username: 'StillBelieve', text: 'Rough result but we fight on. Next match matters.', sentiment: 'neutral' },
  ],
  var_controversy: [
    { username: 'VARWatch', text: 'That VAR decision was a DISGRACE. Robbed!', sentiment: 'negative' },
    { username: 'FairPlayFan', text: 'Ref got it wrong but we move. Stay professional.', sentiment: 'neutral' },
    { username: 'ConspiracyFC', text: 'Shady ref agenda confirmed. Federation needs to investigate.', sentiment: 'negative' },
  ],
  rivalry_win: [
    { username: 'RivalSlayer', text: 'WE OWN THEM! Rivalry settled! 🔥', sentiment: 'positive' },
    { username: 'DerbyDay', text: 'Beat our rivals AND looked good doing it. Dynasty loading.', sentiment: 'positive' },
  ],
  substitution: [
    { username: 'SubWatch', text: 'Why take off our best player? Manager lost the plot.', sentiment: 'negative' },
    { username: 'FreshLegs', text: 'Smart sub. Fresh legs changed the game!', sentiment: 'positive' },
  ],
  youth_player: [
    { username: 'YouthWatch', text: 'Give the kid a start! He deserves it!', sentiment: 'neutral' },
    { username: 'AcademyPride', text: 'Academy graduate scoring! Future is bright!', sentiment: 'positive' },
  ],
};

export const getFanReactions = (context) => {
  const pool = FAN_REACTIONS[context] || FAN_REACTIONS.win;
  return pool.slice(0, 3 + Math.floor(Math.random() * 2));
};
