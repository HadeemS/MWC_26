import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import PressQuestionCard from '../components/PressQuestionCard';
import { getPressQuestions } from '../data/pressQuestions';
import { COLORS, SPACING } from '../theme';
import { useGame } from '../context/GameContext';
import { processPressAnswer } from '../game/decisionEngine';

export default function PressConferenceScreen({ navigation, route }) {
  const type = route.params?.type || 'pre_match';
  const questions = getPressQuestions(type);
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState([]);
  const { gameState, setGameState } = useGame();

  const handleAnswer = (answer) => {
    const newState = processPressAnswer(gameState, answer);
    setGameState(newState);
    setAnswered([...answered, questions[currentQ].id]);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const done = answered.length >= questions.length;

  return (
    <ScreenWrapper title="Press Conference" navigation={navigation}>
      <Text style={styles.header}>🎤 Media Room</Text>
      <Text style={styles.sub}>{type === 'pre_match' ? 'Pre-Match' : 'Post-Match'} Press Conference</Text>

      {!done ? (
        <PressQuestionCard
          question={questions[currentQ]}
          onAnswer={handleAnswer}
        />
      ) : (
        <>
          <Text style={styles.done}>Press conference complete. Media reactions logged.</Text>
          <Button title="Continue" variant="gold" onPress={() => navigation.goBack()} />
        </>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { color: COLORS.gold, fontSize: 22, fontWeight: '800', textAlign: 'center' },
  sub: { color: COLORS.textMuted, textAlign: 'center', marginBottom: SPACING.lg },
  done: { color: COLORS.success, textAlign: 'center', marginBottom: SPACING.lg, fontSize: 16 },
});
