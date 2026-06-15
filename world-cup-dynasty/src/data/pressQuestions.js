// Press conference questions — answers affect team dynamics
export const PRESS_QUESTIONS = {
  pre_match: [
    {
      id: 'pre_confidence',
      question: 'How confident are you going into this match?',
      answers: [
        { id: 'confident', text: 'We are ready to dominate.', effects: { morale: 8, mediaPressure: 10, fanApproval: 5 } },
        { id: 'humble', text: 'We respect our opponents and prepare hard.', effects: { morale: 5, federationTrust: 8, mediaPressure: -5 } },
        { id: 'aggressive', text: 'They cannot handle us at our best.', effects: { morale: 10, mediaPressure: 15, rivalry: 10 } },
      ],
    },
    {
      id: 'pre_tactics',
      question: 'Will you change your tactical approach?',
      answers: [
        { id: 'same', text: 'We stick to what works.', effects: { chemistry: 5, morale: 3 } },
        { id: 'surprise', text: 'We have a few surprises prepared.', effects: { mediaPressure: 10, morale: 5 } },
        { id: 'defensive', text: 'We will be solid and clinical.', effects: { defense: 5, fanApproval: 3 } },
      ],
    },
    {
      id: 'pre_rival',
      question: 'Your thoughts on facing this rival?',
      answers: [
        { id: 'respect', text: 'Great rivalry, great occasion.', effects: { rivalry: 5, morale: 5 } },
        { id: 'fire', text: 'We want to send a message today.', effects: { rivalry: 15, morale: 10, mediaPressure: 10 } },
        { id: 'dismiss', text: 'Just another match for us.', effects: { rivalry: -5, mediaPressure: 5 } },
      ],
    },
  ],
  post_match: [
    {
      id: 'post_result',
      question: 'Your reaction to today\'s result?',
      answers: [
        { id: 'praise_team', text: 'The players were magnificent.', effects: { morale: 12, fanApproval: 10 } },
        { id: 'disappointed', text: 'Not good enough. We must improve.', effects: { morale: -5, federationTrust: 5, mediaPressure: 5 } },
        { id: 'blame_ref', text: 'The officiating was unacceptable.', effects: { mediaPressure: 20, fanApproval: 8, federationTrust: -10, discipline: 5 } },
      ],
    },
    {
      id: 'post_player',
      question: 'A struggling player had a tough game. Comments?',
      answers: [
        { id: 'protect', text: 'I back him fully. He will bounce back.', effects: { morale: 10, loyalty: 10, fanApproval: 5 } },
        { id: 'criticize', text: 'He needs to step up. No excuses.', effects: { morale: -8, mediaPressure: 10, fanApproval: -5 } },
        { id: 'rotate', text: 'We will assess the squad for next match.', effects: { mediaPressure: 5, morale: -3 } },
      ],
    },
    {
      id: 'post_future',
      question: 'What is next for this team?',
      answers: [
        { id: 'ambitious', text: 'We are going all the way.', effects: { morale: 8, fanApproval: 8, mediaPressure: 10 } },
        { id: 'cautious', text: 'One game at a time.', effects: { federationTrust: 8, morale: 5 } },
        { id: 'challenge_rival', text: 'Our rivals should be worried.', effects: { rivalry: 12, mediaPressure: 12 } },
      ],
    },
  ],
};

export const getPressQuestions = (type) => PRESS_QUESTIONS[type] || PRESS_QUESTIONS.pre_match;
